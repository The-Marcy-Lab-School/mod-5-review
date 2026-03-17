/**
 * Express server — MVC backend for Checkpoint 5.1 Review.
 * Middleware order matters: logRoutes → json → static → API routes.
 */

const path = require("path");
const fs = require("fs");
const express = require("express");
const gamesRoutes = require("./routes/gamesRoutes");

const app = express();
const PORT = process.env.PORT || 3000;
const frontendPath = path.join(__dirname, "..", "frontend", "dist");
const hasFrontendBuild = fs.existsSync(frontendPath);

// ——— Middleware (order matters) ———
// 1. Log every request (next() is critical — without it the server hangs)
function logRoutes(req, res, next) {
  console.log(req.method, req.url);
  next();
}
app.use(logRoutes);

// 2. Parse JSON request bodies
app.use(express.json());

// 3. Serve frontend static files when built (e.g. after npm run build)
if (hasFrontendBuild) {
  app.use(express.static(frontendPath));
}

// 4. API routes
app.use("/api/games", gamesRoutes);

// Fallback: serve index.html for SPA or hint when running dev
if (hasFrontendBuild) {
  app.get("*", (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send(
      "<p>Backend is running. Run <code>npm run frontend</code> in another terminal for the UI, or use <code>curl http://localhost:3000/api/games</code> to test the API.</p>"
    );
  });
}

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`API: http://localhost:${PORT}/api/games`);
});
