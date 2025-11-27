import express from "express";
import cors from "cors";
import fs from "fs";
//
const PORT = 2008;
const FILE = "./todos.json";
const app = express();
//
app.use(express.json());
app.use(cors());

//
function loadTodos() {
  try {
    const data = fs.readFileSync(FILE, "utf8");
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}


//
function saveTodos(todos) {
  fs.writeFileSync(FILE, JSON.stringify(todos, null, 2));
}

//
app.get("/todos", (req, res) => {
  const todos = loadTodos();
  res.json(todos);
});

//
app.post("/todos", (req, res) => {
  const todos = loadTodos();
  const nextId = todos.length === 0 ? 1 : Math.max(...todos.map((t) => t.id)) + 1;
  const { title } = req.body;
  const newTodo = { id: nextId, title, done: false };
  todos.push(newTodo);
  saveTodos(todos)
  res.status(201).json(newTodo);
});

app.delete("/tasks/:id", (req, res) => {
  const id = Number(req.params.id);
  tasks = tasks.filter(t => t.id !== id);
  res.status(204).send();
});
//
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
