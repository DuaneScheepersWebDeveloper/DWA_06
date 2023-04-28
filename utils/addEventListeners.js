export const addEventListeners = () => {
  document
    .querySelector('[data-search-cancel]')
    .addEventListener('click', () => {
      document.querySelector('[data-search-overlay]').open = false;
    });

  document
    .querySelector('[data-settings-cancel]')
    .addEventListener('click', () => {
      document.querySelector('[data-settings-overlay]').open = false;
    });
};
