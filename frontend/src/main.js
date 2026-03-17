/**
 * VIEW (Frontend) — Uses fetch() to talk to the API (Express server).
 * Request → Server → Model → Response JSON
 */

const API_BASE = "/api/games";

async function loadGames() {
  const res = await fetch(API_BASE);
  if (!res.ok) throw new Error("Failed to load games");
  const data = await res.json();
  return data.games;
}

async function createGame(name) {
  const res = await fetch(API_BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Failed to create game");
  }
  return res.json();
}

async function updateGame(id, name) {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  });
  if (!res.ok) throw new Error("Failed to update game");
  return res.json();
}

async function deleteGame(id) {
  const res = await fetch(`${API_BASE}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete game");
}

function renderGames(games) {
  const list = document.getElementById("game-list");
  list.innerHTML = games
    .map(
      (g) => `
    <li class="game-item" data-id="${g.id}">
      <span class="game-name">${escapeHtml(g.name)}</span>
      <div class="game-actions">
        <button class="btn-edit" data-id="${g.id}">Edit</button>
        <button class="btn-delete" data-id="${g.id}">Delete</button>
      </div>
    </li>`
    )
    .join("");
}

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

function bindEvents() {
  const form = document.getElementById("game-form");
  const list = document.getElementById("game-list");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const input = document.getElementById("game-name");
    const name = input.value.trim();
    if (!name) return;
    try {
      await createGame(name);
      input.value = "";
      refreshGames();
    } catch (err) {
      alert(err.message);
    }
  });

  list.addEventListener("click", async (e) => {
    const id = e.target.dataset?.id;
    if (!id) return;
    if (e.target.classList.contains("btn-delete")) {
      if (!confirm("Delete this game?")) return;
      try {
        await deleteGame(id);
        refreshGames();
      } catch (err) {
        alert(err.message);
      }
    } else if (e.target.classList.contains("btn-edit")) {
      const item = e.target.closest(".game-item");
      const nameEl = item.querySelector(".game-name");
      const newName = prompt("New name:", nameEl.textContent);
      if (newName == null || !newName.trim()) return;
      try {
        await updateGame(id, newName.trim());
        refreshGames();
      } catch (err) {
        alert(err.message);
      }
    }
  });
}

async function refreshGames() {
  try {
    const games = await loadGames();
    renderGames(games);
    document.getElementById("error").textContent = "";
  } catch (err) {
    document.getElementById("error").textContent = err.message;
    document.getElementById("game-list").innerHTML = "";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  bindEvents();
  refreshGames();
});
