/**
 * MODEL — Data storage and logic only.
 * Models should NOT use req or res.
 * They accept plain data and return plain data.
 */

let games = [
  { id: 1, name: "Chess" },
  { id: 2, name: "Checkers" },
  { id: 3, name: "Go" },
];

let nextId = 4;

/**
 * Get all games.
 * @returns {Array} All games
 */
function findAll() {
  return [...games];
}

/**
 * Find a game by ID in the array.
 * @param {number} id - Game ID
 * @returns {Object|undefined} Game or undefined if not found
 */
function findById(id) {
  const numericId = Number(id);
  if (Number.isNaN(numericId)) return undefined;
  return games.find((g) => g.id === numericId);
}

/**
 * Create a new game.
 * @param {Object} data - { name: string }
 * @returns {Object} Created game with id
 */
function create(data) {
  const name = data?.name?.trim();
  if (!name) return null;
  const game = { id: nextId++, name };
  games.push(game);
  return game;
}

/**
 * Update a game by ID.
 * @param {number} id - Game ID
 * @param {Object} data - { name?: string }
 * @returns {Object|null} Updated game or null if not found
 */
function updateById(id, data) {
  const game = findById(id);
  if (!game) return null;
  if (data.name !== undefined) game.name = String(data.name).trim() || game.name;
  return game;
}

/**
 * Delete a game by ID.
 * @param {number} id - Game ID
 * @returns {boolean} True if deleted, false if not found
 */
function deleteById(id) {
  const index = games.findIndex((g) => g.id === Number(id));
  if (index === -1) return false;
  games.splice(index, 1);
  return true;
}

module.exports = {
  findAll,
  findById,
  create,
  updateById,
  deleteById,
};
