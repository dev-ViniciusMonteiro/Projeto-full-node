const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static("public"));
app.use(express.json());

const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./database/db.sqlite");

db.serialize(() => {
  db.run("CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY AUTOINCREMENT, task TEXT)");
});

app.post("/add-task", (req, res) => {
  const task = req.body.task;
  if (task) {
    db.run("INSERT INTO tasks (task) VALUES (?)", [task], (err) => {
      if (err) {
        res.status(500).json({ error: "Erro ao adicionar tarefa" });
      } else {
        res.sendStatus(200);
      }
    });
  } else {
    res.status(400).json({ error: "Nenhuma tarefa fornecida" });
  }
});

app.get("/tasks", (req, res) => {
  db.all("SELECT * FROM tasks", (err, rows) => {
    if (err) {
      res.status(500).json({ error: "Erro ao buscar tarefas" });
    } else {
      res.json(rows);
    }
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
