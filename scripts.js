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
import { searchBooks } from './functions/searchBooks.js';
import { updateBookList } from './functions/updateBooks.js';
let page = 1;
let matches = books;

const starting = document.createDocumentFragment();

//----------------------------------------------------------------
const settingsForm = document.querySelector('[data-settings-form]');
const headerSearch = document.querySelector('[data-header-search]');
const searchForm = document.querySelector('[data-search-form]');
const headerSettings = document.querySelector('[data-header-settings]');
//list
const listItems = document.querySelector('[data-list-items]');
const listClose = document.querySelector('[data-list-close]');
const listButton = document.querySelector('[data-list-button]');
const listActive = document.querySelector('[data-list-active]');
const listBlur = document.querySelector('[data-list-blur]');
const listImage = document.querySelector('[data-list-image]');
const listTitle = document.querySelector('[data-list-title]');
const listSubtitle = document.querySelector('[data-list-subtitle]');
const listDescription = document.querySelector('[data-list-description]');
//----------------------------------------------------------------
/**
   * 
   * @param {Object[]} matches
   * @param {string} matches[].author
   * @param {string} matches[].id
   * @param {string} matches[].image
   * @param {string} matches[].title

   */
const bookPreview = {
  render(matches, numPerPage) {
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
  },
};

bookPreview.render(matches, BOOKS_PER_PAGE);
listItems.appendChild(starting);
createGenreOptions(genres);
generateAuthorOptions(authors);
setTheme();
//----------------------------------------------------------------
updateShowMoreButton(page, BOOKS_PER_PAGE, books.length, matches);
//----------------------------------------------------------------
const searchFormHandler = (
  event,
  books,
  BOOKS_PER_PAGE,
  authors,
  listItems,
  listMessage,
  listButton
) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const { matches, newItems, hasMore, remaining } = searchBooks(
    formData,
    books,
    BOOKS_PER_PAGE,
    authors
  );

  updateBookList(matches, newItems, listItems, listMessage, listButton);

  event.target.reset();
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
