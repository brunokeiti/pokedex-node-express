const path = require("path");
const fs = require("fs");

const basePathToData = path.join(__dirname, "/data");

const getJsonData = (basePathToData, filename) => {
  const fullFilename = path.join(basePathToData, filename);
  return JSON.parse(fs.readFileSync(fullFilename, "utf-8"));
};

const saveJsonData = (data, filename) => {
  const fullFilename = path.join(basePathToData, filename);
  const stringifyData = JSON.stringify(data);
  fs.writeFileSync(fullFilename, stringifyData);
};

exports.getData = (request, response) => {
  const data = getJsonData(basePathToData, "pokedex.json");
  setTimeout(() => {
    return response.status(200).send(data);
  }, 100);
};

exports.postData = (request, response) => {
  try {
    let data = getJsonData(basePathToData, "pokedex.json");
    const { id } = request.params;
    const { name } = request.body;
    if (!name) {
      return response
        .status(400)
        .send({ message: "Error: A Pokemon must have a name" });
    }
    if (!Number.isInteger(Number(id)) || Number(id) < 1) {
      return response
        .status(400)
        .send({ message: "Error: Invalid Pokemon ID" });
    }
    if (data.some((e) => e.id.toString() === id)) {
      return response
        .status(400)
        .send({ message: "Error: Pokemon ID already taken" });
    }
    data.push({ id: parseInt(id), name });
    saveJsonData(data, "pokedex.json");
    setTimeout(() => {
      return response.send({
        message: `New pokemon ${name} / ${id} registered!`,
      });
    }, 100);
  } catch (e) {
    console.error(e);
    return response
      .status(500)
      .send({ message: "Error: Prof. Oak tripped over the server cable" });
  }
};

exports.updateData = (request, response) => {
  try {
    let data = getJsonData(basePathToData, "pokedex.json");
    const { id } = request.params;
    const { name } = request.body;
    const index = data.findIndex((pokemon) => pokemon.id.toString() === id);
    console.log(index);
    if (!name) {
      return response
        .status(400)
        .send({ message: "Error: A Pokemon must have a name" });
    }
    if (!Number.isInteger(Number(id)) || Number(id) < 1) {
      return response
        .status(400)
        .send({ message: "Error: Invalid Pokemon ID" });
    }
    if (index === -1) {
      return response
        .status(400)
        .send({ message: "Error: Pokemon ID does not exist" });
    }
    data[index].name = name;
    saveJsonData(data, "pokedex.json");
    setTimeout(() => {
      return response.send({
        message: `Pokemon ${name} / ${id} renamed!`,
      });
    }, 100);
  } catch (e) {
    console.error(e);
    return response
      .status(500)
      .send({ message: "Error: Prof. Oak tripped over the server cable" });
  }
};

exports.deleteData = (request, response) => {
  try {
    const { id } = request.params;
    let data = getJsonData(basePathToData, "pokedex.json");
    if (!Number.isInteger(Number(id)) || Number(id) < 1) {
      return response
        .status(400)
        .send({ message: "Error: Invalid Pokemon ID" });
    }
    if (!data.some((pokemon) => pokemon.id.toString() === id)) {
      return response
        .status(400)
        .send({ message: "Error: Pokemon ID does not exist" });
    }
    data = data.filter((pokemon) => pokemon.id.toString() !== id);
    saveJsonData(data, "pokedex.json");
    setTimeout(() => {
      return response.send({
        message: `Pokemon deleted!`,
      });
    }, 100);
  } catch (e) {
    console.error(e);
    return response
      .status(500)
      .send({ message: "Error: Prof. Oak tripped over the server cable" });
  }
};
