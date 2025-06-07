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

minionsRouter.param("workId", (req, res, next, id) => {
  const work = getFromDatabaseById("work", id);

  if (work) {
    req.work = work;
    next();
  } else {
    res.status(404).send();
  }
});

minionsRouter.get("/:minionId/work", (req, res, next) => {
  const allWork = getAllFromDatabase("work").filter((singleWork) => {
    return singleWork.minionId === req.params.minionId;
  });

  res.send(allWork);
});

minionsRouter.post("/:minionId/work", (req, res, next) => {
  const workToAdd = req.body;
  workToAdd.minionId = req.params.minionId;

  const newWork = addToDatabase("work", workToAdd);

  res.status(201).send(newWork);
});

minionsRouter.put("/:minionId/work/:workId", (req, res, next) => {
  if (req.params.minionId !== req.body.minionId) {
    res.status(400).send();
  } else {
    updatedWork = updateInstanceInDatabase("work", req.body);
    res.send(updatedWork);
  }
});

minionsRouter.delete("/:minionId/work/:workId", (req, res, next) => {
  const deletedWork = deleteFromDatabasebyId("work", req.params.workId);

  if (deletedWork) {
    res.status(204).send();
  } else {
    res.status(500).send();
  }
});

module.exports = minionsRouter;
