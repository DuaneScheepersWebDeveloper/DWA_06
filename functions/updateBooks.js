export const updateBookList = (
  matches,
  newItems,
  listItems,
  listMessage,
  listButton
) => {
  listMessage.classList.toggle('list__message_show', matches.length < 1);
  listItems.innerHTML = '';
  listItems.appendChild(newItems);

  listButton.disabled = !matches.hasMore;
  listButton.innerHTML = `
    <span>Show more</span>
    <span class="list__remaining">${matches.remaining}</span>
  `;

  window.scrollTo({ top: 0, behavior: 'smooth' });
};
//The updateBookList function takes the results from searchBooks and updates the
//DOM accordingly. Finally,
//the searchFormHandler function is modified to use these two functions and takes
//additional parameters for the list items, list message, and list button.
