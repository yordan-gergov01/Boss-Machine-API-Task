const express = require("express");

const ideasRouter = express.Router();

const {
  addToDatabase,
  getAllFromDatabase,
  getFromDatabaseById,
  updateInstanceInDatabase,
  deleteFromDatabasebyId,
} = require("../db");

ideasRouter.param("ideaId", (req, res, next, id) => {
  const idea = getFromDatabaseById("ideas", id);

  if (idea) {
    req.idea = idea;
    next();
  } else {
    res.status(404).send();
  }
});

ideasRouter.get("/", (req, res, next) => {
  const ideas = getAllFromDatabase("ideas");

  res.send(ideas);
});

ideasRouter.post("/", (req, res, next) => {
  const newIdea = addToDatabase("ideas", req.body);

  res.status(201).send(newIdea);
});

ideasRouter.get("/:ideaId", (req, res, next) => {
  req.status(200).send(req.idea);
});

ideasRouter.put("/:ideaId", (req, res, next) => {
  const updatedIdea = updateInstanceInDatabase("ideas", req.body);

  res.status(200).send(updatedIdea);
});

ideasRouter.delete("/:ideaId", (req, res, next) => {
  const deletedIdea = deleteFromDatabasebyId("ideas", req.params.id);

  if (deletedIdea) {
    res.status(204).send();
  } else {
    res.status(500).send();
  }
});

module.exports = ideasRouter;
