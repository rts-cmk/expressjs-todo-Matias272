import express, { request, response } from "express";

const PORT = 2008;
const app = express();

app.get("/api/server", (required, response) => {
  response.send("sigma dreng");
});
app.get("/error", (request, response) => {
  response.status(418).send();
});s
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    
});
