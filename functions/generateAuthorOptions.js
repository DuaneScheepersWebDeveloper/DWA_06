export const generateAuthorOptions = (authors) => {
  const authorsHtml = document.createDocumentFragment();

  const firstAuthorElement = document.createElement('option');
  firstAuthorElement.value = 'any';
  firstAuthorElement.innerText = 'All Authors';
  authorsHtml.appendChild(firstAuthorElement);

  for (const [id, name] of Object.entries(authors)) {
    const element = document.createElement('option');
    element.value = id;
    element.innerText = name;
    authorsHtml.appendChild(element);
  }

  document.querySelector('[data-search-authors]').appendChild(authorsHtml);
};
