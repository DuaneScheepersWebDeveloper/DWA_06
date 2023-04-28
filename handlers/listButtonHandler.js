const listItems = document.querySelector('[data-list-items]');
export const listButtonHandler = () => {
  const fragment = document.createDocumentFragment();

  for (const { author, id, image, title } of matches.slice(
    page * BOOKS_PER_PAGE,
    (page + 1) * BOOKS_PER_PAGE
  )) {
    const element = document.createElement('button');
    element.classList = 'preview';
    element.setAttribute('data-preview', id);

    // Set the button's inner HTML to the book preview template, populated with book data
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

    // Append the new button element to the document fragment
    fragment.appendChild(element);
  }

  // Append the document fragment to the list of book previews
  listItems.appendChild(fragment);

  // Increment the current page of book previews
  page += 1;
};
