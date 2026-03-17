/**
 * ROUTES — Map HTTP method + URL (endpoint) to controller functions.
 * The method + URL together define the endpoint.
 */

const express = require("express");
const router = express.Router();
const gamesController = require("../controllers/gamesController");

// CRUD → HTTP mapping
router.get("/", gamesController.listGames);        // Read all
router.get("/:id", gamesController.getGameById);  // Read one
router.post("/", gamesController.createGame);      // Create
router.patch("/:id", gamesController.updateGame);  // Update
router.delete("/:id", gamesController.deleteGame); // Delete

module.exports = router;
