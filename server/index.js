const express = require('express');
const path = require('path');

const app = express();
let pathToFrontend = path.join(__dirname, '../frontend');
if (process.env.NODE_ENV === 'production') {
  pathToFrontend = path.join(__dirname, '../frontend/dist');
}

const gameControllers = require('./controllers/gameControllers');

////////////////////////
// Middleware
////////////////////////

const logRoutes = (req, res, next) => {
  const time = (new Date()).toLocaleString();
  console.log(`${req.method}: ${req.originalUrl} - ${time}`);
  next();
};

app.use(logRoutes);
app.use(express.static(pathToFrontend));
app.use(express.json());

////////////////////////
// Endpoints
////////////////////////

app.get('/api/games', gameControllers.listGames);
app.get('/api/games/:id', gameControllers.getGameById);
app.post('/api/games', gameControllers.createGame);
app.patch('/api/games/:id', gameControllers.updateGame);
app.delete('/api/games/:id', gameControllers.deleteGame);

app.get('*', (req, res, next) => {
  if (req.originalUrl.startsWith('/api')) return next();
  res.sendFile(pathToFrontend + '/index.html');
});

const port = 8080;
app.listen(port, () => console.log(`listening at http://localhost:${port}`));
