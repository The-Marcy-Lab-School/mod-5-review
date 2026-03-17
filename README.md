# Checkpoint 5.1 Review — Backend Fundamentals

A full-stack review app: **JavaScript Vite frontend** + **Express server** using **MVC**. Covers the HTTP request-response cycle, Express middleware, MVC, REST endpoints, controllers vs models, and testing the API with curl.

## Quick Start

```bash
# Install dependencies (server + frontend)
cd server && npm install && cd ..
cd frontend && npm install && cd ..

# Run the server (serves API + frontend static files)
cd server && npm run dev
# or from repo root:
npm run dev
```

Open **http://localhost:8080** in the browser. The server serves both the API and the frontend.

To test the API with curl, use `http://localhost:8080/api/games` (see Part 7 below).

---

## Learning Goals

By the end of this review you should be able to explain:

- The **HTTP request-response cycle**
- **Express middleware**
- **MVC architecture**
- **REST endpoints**
- **Controllers vs Models** responsibilities
- **Testing APIs with curl**

---

## Part 1 — Internet + Server Fundamentals

| Term     | Meaning                                      |
|----------|----------------------------------------------|
| **Client** | Program making the request (browser/frontend) |
| **Server** | Program responding to the request             |
| **API**    | Interface the frontend uses to talk to the server |

**Example flow:**

```
Frontend (browser)  →  fetch()  →  Server (Express)  →  Model (data)  →  Response JSON
```

**Key terms:** request, response, endpoint, HTTP method, JSON.

---

## Part 2 — HTTP Methods + REST

**CRUD → HTTP mapping:**

| CRUD   | HTTP Method | Example Endpoint    |
|--------|-------------|---------------------|
| Create | POST        | `/api/games`        |
| Read   | GET         | `/api/games`        |
| Read One | GET      | `/api/games/:id`    |
| Update | PATCH       | `/api/games/:id`    |
| Delete | DELETE      | `/api/games/:id`    |

The **method + URL** together define the **endpoint**.

---

## Part 3 — MVC Architecture

| Layer      | Responsibility              |
|------------|-----------------------------|
| **Model**  | Data storage and logic      |
| **Controller** | Handles request + response |
| **View**   | Frontend (this Vite app)    |

**Flow:**

```
Request → Route → Controller → Model → Controller sends response
```

**Rule:** Models should **NOT** use `req` or `res`.

---

## Part 4 — Express Middleware

Middleware **order matters**. `next()` is critical — without it the server hangs.

```js
function logRoutes(req, res, next) {
  console.log(req.method, req.url);
  next();
}
app.use(logRoutes);
app.use(express.json());
app.use(express.static("frontend"));
```

---

## Part 5 — Controllers

Controllers:

1. Read inputs from the request  
2. Call the model  
3. Send the response  

**Where inputs come from:**

| Input Type  | Where        |
|-------------|--------------|
| URL param   | `req.params` |
| Request body| `req.body`   |
| Query       | `req.query`  |

Example: `PATCH /api/games/3` → `req.params.id === "3"` (parse to number in model if needed).

---

## Part 6 — Status Codes

| Code | Meaning     |
|------|-------------|
| 200  | Success     |
| 201  | Created     |
| 400  | Bad request |
| 404  | Not found   |

Example error: `res.status(404).json({ message: "Game not found" })`.

---

## Part 7 — Testing the API with curl

Run the server (`npm run dev` from repo root or `npm run dev` from `server/`), then use these commands to test the API. Expect the status codes and responses below.

**1. POST create** — expect **201** and the created game:

```bash
curl -X POST http://localhost:8080/api/games \
  -H "Content-Type: application/json" \
  -d '{"name": "Monopoly"}'
```

**2. GET all games** — expect **200** and `{ "games": [...] }`:

```bash
curl http://localhost:8080/api/games
```

**3. GET invalid id → 404** — expect **404** and `{ "message": "Game not found" }`:

```bash
curl http://localhost:8080/api/games/99999
```

**4. PATCH update** — replace `1` with a real game id; expect **200** and updated game:

```bash
curl -X PATCH http://localhost:8080/api/games/1 \
  -H "Content-Type: application/json" \
  -d '{"name": "New Name"}'
```

**5. DELETE game** — replace `1` with a real game id; expect **204** No Content:

```bash
curl -X DELETE http://localhost:8080/api/games/1
```

**6. Confirm deletion** — list games again; the deleted one should be gone:

```bash
curl http://localhost:8080/api/games
```

---

## Practice Review Questions

1. **Explain the request-response cycle.**  
   You should mention: client, server, HTTP request, response, JSON data.

2. **Where should this logic live?**  
   “Find a game by ID in the array” → **Model**.

3. **Where does `req.params.id` come from?**  
   **URL parameter** (e.g. `/api/games/5`).

4. **What HTTP method for “Create a new game”?**  
   **POST**.

5. **What status code for “game not found”?**  
   **404**.

---

## Mini Coding Exercise

Build routes for:

| Method | Endpoint        |
|--------|-----------------|
| GET    | `/api/games`    |
| GET    | `/api/games/:id`|
| POST   | `/api/games`    |

- **Validation** → Controller (or middleware).  
- **Data storage** → Model.  
- **Response** → Controller.

---

## Common Mistakes

1. **Model using `req` or `res`** — Models should only accept data, not request objects.  
2. **Missing status codes** — Use **201** for POST create.  
3. **Forgetting `next()` in middleware** — Server hangs.  
4. **Controllers modifying arrays directly** — Controllers must call model methods.  
5. **Not parsing `id`** — `req.params.id` is a string; convert to number when needed.

---

## Repo Structure

```
mod-5-review/
├── server/
│   ├── index.js              # Express app, middleware, endpoints
│   ├── package.json
│   ├── models/
│   │   └── gameModel.js      # Data + logic (no req/res)
│   └── controllers/
│       └── gameControllers.js # req → model → res
├── frontend/                 # Vite app (View)
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js        # proxy /api to port 8080
│   └── src/
│       ├── main.js
│       ├── fetch-helpers.js
│       ├── dom-helpers.js
│       └── style.css
├── package.json
└── README.md
```

## Scripts

- **From repo root:** `npm run dev` — Run server (nodemon) on port 8080; serves API + frontend.
- **From repo root:** `npm run start` — Run server (node) on port 8080.
- **From server:** `npm run dev` — Run with nodemon; `npm start` — Run with node.
- **From frontend:** `npm run dev` — Vite dev server (proxies `/api` to 8080); `npm run build` — Build to `dist` (for production with `NODE_ENV=production`).
