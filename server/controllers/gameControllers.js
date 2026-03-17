const gameModel = require('../models/gameModel.js');

/*
These controllers take incoming requests and utilize the
methods provided by gameModel before sending a
response back to the client (or an error message).
*/

// Get All (Read)
module.exports.listGames = (req, res) => {
  const games = gameModel.list();
  res.status(200).json({ games });
};

// Get One (Read)
module.exports.getGameById = (req, res) => {
  const { id } = req.params;
  const game = gameModel.find(Number(id));

  if (!game) {
    return res.status(404).json({
      message: 'Game not found'
    });
  }
  res.status(200).json(game);
};

// Create
module.exports.createGame = (req, res) => {
  const { name } = req.body;
  if (!name || !String(name).trim()) {
    return res.status(400).json({ message: 'Invalid name' });
  }

  const newGame = gameModel.create(String(name).trim());
  res.status(201).json(newGame);
};

// Update
module.exports.updateGame = (req, res) => {
  const { name } = req.body;
  if (!name || !String(name).trim()) {
    return res.status(400).json({ message: 'Invalid name' });
  }

  const { id } = req.params;
  const updatedGame = gameModel.update(Number(id), String(name).trim());

  if (!updatedGame) {
    return res.status(404).json({
      message: 'Game not found'
    });
  }

  res.status(200).json(updatedGame);
};

// Delete
module.exports.deleteGame = (req, res) => {
  const { id } = req.params;
  const didDelete = gameModel.destroy(Number(id));

  if (!didDelete) {
    return res.status(404).json({
      message: 'Game not found'
    });
  }

  res.sendStatus(204);
};
