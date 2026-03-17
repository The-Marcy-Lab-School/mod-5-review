/**
 * CONTROLLER — Handles request and response.
 * Reads inputs from request (params, body, query), calls the model, sends response.
 * Controllers must NOT modify data directly; they call model methods.
 */

const gameModel = require("../models/gameModel");

/**
 * GET /api/games — List all games
 */
function listGames(req, res) {
  const games = gameModel.findAll();
  res.status(200).json({ games });
}

/**
 * GET /api/games/:id — Get one game by ID
 * req.params.id comes from the URL parameter (e.g. /api/games/5 → id is "5")
 */
function getGameById(req, res) {
  const game = gameModel.findById(req.params.id);
  if (!game) {
    return res.status(404).json({ message: "Game not found" });
  }
  res.status(200).json(game);
}

/**
 * POST /api/games — Create a new game
 * req.body comes from the request body (e.g. JSON: { "name": "Monopoly" })
 */
function createGame(req, res) {
  const game = gameModel.create(req.body);
  if (!game) {
    return res.status(400).json({ message: "Bad request: name is required" });
  }
  res.status(201).json(game);
}

/**
 * PATCH /api/games/:id — Update a game
 * req.params.id = URL param, req.body = request body
 */
function updateGame(req, res) {
  const game = gameModel.updateById(req.params.id, req.body);
  if (!game) {
    return res.status(404).json({ message: "Game not found" });
  }
  res.status(200).json(game);
}

/**
 * DELETE /api/games/:id — Delete a game
 */
function deleteGame(req, res) {
  const deleted = gameModel.deleteById(req.params.id);
  if (!deleted) {
    return res.status(404).json({ message: "Game not found" });
  }
  res.status(200).json({ message: "Game deleted" });
}

module.exports = {
  listGames,
  getGameById,
  createGame,
  updateGame,
  deleteGame,
};
