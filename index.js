const express = require("express");
const app = express();
const PORT = 8080;

var dataController = require("./dataController");

app.use(express.json());

app.get("/pokemon", dataController.getData);

app.post("/pokemon/:id", dataController.postData);

app.put("/pokemon/:id", dataController.updateData);

app.delete("/pokemon/:id", dataController.deleteData);

app.listen(PORT, () => console.log(`Working on port ${PORT}`));
