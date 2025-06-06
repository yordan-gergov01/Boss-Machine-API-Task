const express = require("express");

const {
  addToDatabase,
  getAllFromDatabase,
  getFromDatabaseById,
  updateInstanceInDatabase,
  deleteFromDatabasebyId,
} = require("../db");

const minionsRouter = express.Router();

minionsRouter.param("minionId", (req, res, next, id) => {
  const minion = getFromDatabaseById("minions", id);

  if (minion) {
    req.minion = minion;
    next();
  } else {
    res.status(404).send();
  }
});

minionsRouter.get("/", (req, res, next) => {
  const minions = getAllFromDatabase("minions");

  res.send(minions);
});

minionsRouter.post("/", (req, res, next) => {
  const newMinion = addToDatabase("minions", req.body);

  res.status(201).send(newMinion);
});

minionsRouter.get("/:minionId", (req, res, next) => {
  res.status(200).send(req.minion);
});

minionsRouter.put("/:minionId", (req, res, next) => {
  const updatedMinion = updateInstanceInDatabase("minions", req.body);

  res.status(200).send(updatedMinion);
});

minionsRouter.delete("/:minionId", (req, res, next) => {
  const deletedMinion = deleteFromDatabasebyId("minions", req.params.minionId);

  if (deletedMinion) {
    res.status(204).send();
  } else {
    res.status(500).send();
  }
});

module.exports = minionsRouter;
