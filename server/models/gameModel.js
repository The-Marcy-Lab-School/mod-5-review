let id = 1;
const getId = () => id++;

// Restrict access to our mock "database" to just this Model file
const games = [
  { name: 'Chess', id: getId() },
  { name: 'Checkers', id: getId() },
  { name: 'Go', id: getId() },
];

// Can be used like "gameModel.create()"
module.exports.create = (name) => {
  const newGame = { name, id: getId() };
  games.push(newGame);
  return { ...newGame };
};

module.exports.list = () => {
  return [...games];
};

module.exports.find = (id) => {
  const game = games.find((g) => g.id === id);
  if (!game) {
    return null;
  }
  return { ...game };
};

module.exports.update = (id, gameName) => {
  const game = games.find((g) => g.id === id);
  if (!game) return null;
  game.name = gameName;
  return { ...game };
};

module.exports.destroy = (id) => {
  const gameIndex = games.findIndex((g) => g.id === id);
  if (gameIndex < 0) {
    return false;
  }
  games.splice(gameIndex, 1);
  return true;
};
