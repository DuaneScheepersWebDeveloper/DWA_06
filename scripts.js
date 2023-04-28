import { books, authors, genres, BOOKS_PER_PAGE } from './data.js';
import { setTheme } from './utils/setTheme.js';
import { generateAuthorOptions } from './functions/generateAuthorOptions.js';
import { createGenreOptions } from './functions/createGenreOptions.js';
import { addEventListeners } from './utils/addEventListeners.js';
import { updateShowMoreButton } from './utils/updateShowMoreButton.js';
import { headerSearchHandler } from './handlers/headerSearchHandler.js';
import { headerSettingsHandler } from './handlers/headerSettingsHandler.js';
import { listCloseHandler } from './handlers/listCloseHandler.js';
import { themeHandler } from './handlers/themeHandler.js';
import { listButtonHandler } from './handlers/listButtonHandler.js';

let page = 1;
let matches = books;

const starting = document.createDocumentFragment();

//----------------------------------------------------------------
const settingsForm = document.querySelector('[data-settings-form]');
const headerSearch = document.querySelector('[data-header-search]');
const searchOverlay = document.querySelector('[data-search-overlay]');
const searchForm = document.querySelector('[data-search-form]');
const headerSettings = document.querySelector('[data-header-settings]');
const listItems = document.querySelector('[data-list-items]');
const listClose = document.querySelector('[data-list-close]');
const listButton = document.querySelector('[data-list-button]');
const listMessage = document.querySelector('[data-list-message]');
const listActive = document.querySelector('[data-list-active]');
const listBlur = document.querySelector('[data-list-blur]');
const listImage = document.querySelector('[data-list-image]');
const listTitle = document.querySelector('[data-list-title]');
const listSubtitle = document.querySelector('[data-list-subtitle]');
const listDescription = document.querySelector('[data-list-description]');
//----------------------------------------------------------------

const renderBookPreviews = (matches, numPerPage) => {
  for (const { author, id, image, title } of matches.slice(0, numPerPage)) {
    const element = document.createElement('button');
    element.classList = 'preview';
    element.setAttribute('data-preview', id);

    element.innerHTML = `
        <img
            class="preview__image"
            src="${image}"
        />

        <div class="preview__info">
            <h3 class="preview__title">${title}</h3>
            <div class="preview__author">${authors[author]}</div>
        </div>
    `;

    starting.appendChild(element);
  }
};

renderBookPreviews(matches, BOOKS_PER_PAGE);
listItems.appendChild(starting);
createGenreOptions(genres);
generateAuthorOptions(authors);
setTheme();
//----------------------------------------------------------------
updateShowMoreButton(page, BOOKS_PER_PAGE, books.length, matches);
//----------------------------------------------------------------
const searchFormHandler = (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);
  const filters = Object.fromEntries(formData);

  const result = [];
  for (const book of books) {
    let genreMatch = filters.genre === 'any';
    for (const singleGenre of book.genres) {
      if (genreMatch) break;
      if (singleGenre === filters.genre) {
        genreMatch = true;
      }
    }
    if (
      (filters.title.trim() === '' ||
        book.title.toLowerCase().includes(filters.title.toLowerCase())) &&
      (filters.author === 'any' || book.author === filters.author) &&
      genreMatch
    ) {
      result.push(book);
    }
  }

  page = 1;
  matches = result;

  listMessage.classList.toggle('list__message_show', result.length < 1);
  listItems.innerHTML = '';
  const newItems = document.createDocumentFragment();

  for (const { author, id, image, title } of result.slice(0, BOOKS_PER_PAGE)) {
    const element = document.createElement('button');
    element.classList = 'preview';
    element.setAttribute('data-preview', id);
    element.innerHTML = `
    <img class="preview__image" src="${image}" />
    <div class="preview__info">
        <h3 class="preview__title">${title}</h3>
        <div class="preview__author">${authors[author]}</div>
    </div>
    `;
    newItems.appendChild(element);
  }

  listItems.appendChild(newItems);

  listButton.disabled = matches.length - page * BOOKS_PER_PAGE < 1;
  listButton.innerHTML = `
    <span>Show more</span>
    <span class="list__remaining">
    (${
      matches.length - page * BOOKS_PER_PAGE > 0
        ? matches.length - page * BOOKS_PER_PAGE
        : 0
    })
    </span>
`;

  window.scrollTo({ top: 0, behavior: 'smooth' });
  searchOverlay.open = false;
};

//----------------------------------------------------------------
const listItemsHandler = (event) => {
  const pathArray = Array.from(event.path || event.composedPath());
  let active = null;

  for (const node of pathArray) {
    if (active) break;

    if (node?.dataset?.preview) {
      let result = null;
      for (const singleBook of books) {
        if (result) break;
        if (singleBook.id === node?.dataset?.preview) result = singleBook;
      }

      active = result;
    }
  }

  if (active) {
    listActive.open = true;
    listBlur.src = active.image;
    listImage.src = active.image;
    listTitle.innerText = active.title;

    listSubtitle.innerText = `${authors[active.author]} (${new Date(
      active.published
    ).getFullYear()})`;
    listDescription.innerText = active.description;
  }
};
//----------------------------------------------------------------
addEventListeners();
headerSearch.addEventListener('click', headerSearchHandler);
headerSettings.addEventListener('click', headerSettingsHandler);
listClose.addEventListener('click', listCloseHandler);
settingsForm.addEventListener('submit', themeHandler);
searchForm.addEventListener('submit', searchFormHandler);
listButton.addEventListener('click', listButtonHandler);
listItems.addEventListener('click', listItemsHandler);
