import express from "express";

const PORT = 2008;
const app = express();

app.get("/server", (req, res) => {
  res.send("Oh Hell Nah!");
});

app.get("/error", (req, res) => {
  res.status(418).send();
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
