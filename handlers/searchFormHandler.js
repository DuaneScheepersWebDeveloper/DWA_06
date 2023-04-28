export const searchFormHandler = (event) => {
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
