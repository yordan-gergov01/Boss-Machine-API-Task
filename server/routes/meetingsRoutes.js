const express = require("express");

const meetingsRouter = express.Router();

const {
  addToDatabase,
  getAllFromDatabase,
  deleteAllFromDatabase,
  createMeeting,
} = require("../db");

meetingsRouter.get("/", (req, res, next) => {
  const meetings = getAllFromDatabase("meetings");

  res.status(200).send(meetings);
});

meetingsRouter.post("/", (req, res, next) => {
  const newMeeting = addToDatabase("meetings", createMeeting());

  res.status(201).send(newMeeting);
});

meetingsRouter.delete("/", (req, res, next) => {
  const deletedMeeting = deleteAllFromDatabase("meetings");

  if (deletedMeeting) {
    req.status(204).send();
  } else {
    req.status(500).send();
  }
});

module.exports = meetingsRouter;
