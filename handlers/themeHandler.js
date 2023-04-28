const settingsOverlay = document.querySelector('[data-settings-overlay]');
export const themeHandler = (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const { theme } = Object.fromEntries(formData);

  if (theme === 'night') {
    document.documentElement.style.setProperty('--color-dark', '255, 255, 255');
    document.documentElement.style.setProperty('--color-light', '10, 10, 20');
  } else {
    document.documentElement.style.setProperty('--color-dark', '10, 10, 20');
    document.documentElement.style.setProperty(
      '--color-light',
      '255, 255, 255'
    );
  }

  settingsOverlay.open = false;
};
