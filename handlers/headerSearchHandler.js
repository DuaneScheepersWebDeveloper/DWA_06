const searchTitle = document.querySelector('[data-search-title]');
const searchOverlay = document.querySelector('[data-search-overlay]');
export const headerSearchHandler = () => {
  searchOverlay.open = true;
  searchTitle.focus();
};
