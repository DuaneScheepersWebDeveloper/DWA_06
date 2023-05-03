export const searchBooks = (formData, books, BOOKS_PER_PAGE, authors) => {
  /**
   *
   * @param {Object[]} matches
   * @param {string} matches[].author
   * @param {string} matches[].id
   * @param {string} matches[].image
   * @param {string} matches[].title
   * @param {number} numPerPage
   */
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

  return {
    matches: result,
    newItems: newItems,
    hasMore: result.length > BOOKS_PER_PAGE,
    remaining: Math.max(result.length - BOOKS_PER_PAGE, 0),
  };
};

//The searchBooks function takes the form data, the list of books, the number
//of books per page, and the authors and returns an object that contains the
//matching books, the HTML elements for the matching books, and information
//about whether there are more books to display.
