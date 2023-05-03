/**
 * @param {number} page - The current page number.
 * @param {number} BOOKS_PER_PAGE - The number of books to show per page.
 * @param {number} booksLength - The total number of books.
 * @param {Array} matches - An array of book IDs that match the current search criteria.
 */
const showMoreButton = document.querySelector('[data-list-button]');
export const updateShowMoreButton = (
  page,
  BOOKS_PER_PAGE,
  booksLength,
  matches
) => {
  const remainingBooks = booksLength - page * BOOKS_PER_PAGE;

  showMoreButton.innerText = `Show more (${remainingBooks})`;
  showMoreButton.disabled =
    remainingBooks <= 0 || remainingBooks < matches.length;
};
