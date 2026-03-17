export const renderGames = (games) => {
  const list = document.querySelector('#games-list');
  list.innerHTML = '';

  games.forEach((game) => {
    const { id, name } = game;
    const li = document.createElement('li');
    li.dataset.id = id;

    const nameSpan = document.createElement('span');
    nameSpan.textContent = name;

    const editInput = document.createElement('input');
    editInput.type = 'text';
    editInput.value = name;
    editInput.classList.add('hidden');

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.classList.add('edit-btn');

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn');

    li.append(nameSpan, editInput, editBtn, deleteBtn);
    list.append(li);
  });
};

export const renderError = (msg) => {
  const errorEl = document.querySelector('#error');

  if (!msg) {
    errorEl.classList.add('hidden');
    errorEl.textContent = '';
    return;
  }

  errorEl.classList.remove('hidden');
  errorEl.textContent = msg;
};
