const listActive = document.querySelector('[data-list-active]');
const listBlur = document.querySelector('[data-list-blur]');
const listImage = document.querySelector('[data-list-image]');
const listTitle = document.querySelector('[data-list-title]');
const listSubtitle = document.querySelector('[data-list-subtitle]');
const listDescription = document.querySelector('[data-list-description]');
export const listItemsHandler = (event) => {
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

  // If a matching book was found, update the active book display with its information.
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
