import { getGames, createGame, updateGame, deleteGame } from './fetch-helpers.js';
import { renderGames, renderError } from './dom-helpers.js';

const loadGames = async () => {
  const { data, error } = await getGames();
  if (error) return renderError(error.message);
  renderError();
  renderGames(data.games);
};

// Handle Form Submissions
const handleAddGame = async (e) => {
  e.preventDefault();
  const input = document.querySelector('#game-name-input');
  const name = input.value.trim();
  if (!name) return;

  const { error } = await createGame(name);
  if (error) return renderError(error.message);

  input.value = '';
  await loadGames();
};

// Handle Delete, Edit, and Save Clicks
const handleGamesListClick = async (e) => {
  const clickedListItem = e.target.closest('li');
  if (!clickedListItem) return;

  const id = clickedListItem.dataset.id;

  // Handle Delete Clicks
  if (e.target.classList.contains('delete-btn')) {
    const { error } = await deleteGame(id);
    if (error) return renderError(error.message);
    await loadGames();
  }

  // Handle Edit/Save Button Clicks
  if (e.target.classList.contains('edit-btn')) {
    const nameSpan = clickedListItem.querySelector('span');
    const editInput = clickedListItem.querySelector('input');
    const editBtn = clickedListItem.querySelector('.edit-btn');

    if (editBtn.textContent === 'Edit') {
      nameSpan.classList.add('hidden');
      editInput.classList.remove('hidden');
      editBtn.textContent = 'Save';
    } else {
      const { error } = await updateGame(id, editInput.value.trim());
      if (error) return renderError(error.message);
      await loadGames();
    }
  }
};

// Add Event Listeners
document.querySelector('#add-game-form').addEventListener('submit', handleAddGame);
document.querySelector('#games-list').addEventListener('click', handleGamesListClick);

// Load Games on Page Load
loadGames();
