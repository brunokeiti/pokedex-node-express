const express = require("express");
const app = express();
const PORT = 8080;

const dataController = require("./dataController");

app.use(express.json());

app.get("/pokemon", dataController.getData);

app.post("/pokemon/:id", dataController.postData);

app.put("/pokemon/:id", dataController.updateData);

app.delete("/pokemon/:id", dataController.deleteData);

app.use(function (req, res, next) {
  res.status(404).send({ message: "Error: Nice try Team Rocket" });
});

app.listen(PORT, () => console.log(`Working on port ${PORT}`));
