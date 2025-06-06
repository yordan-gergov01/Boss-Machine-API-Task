const express = require("express");

const meetingsRouter = express.Router();

const {
  addToDatabase,
  getAllFromDatabase,
  deleteAllFromDatabase,
} = require("../db");

meetingsRouter.get("/meetings", (req, res, next) => {
  const meetings = getAllFromDatabase("meetings");

  res.status(200).send(meetings);
});

meetingsRouter.post("/meetings", (req, res, next) => {
  const newMeeting = addToDatabase("meetings", req.body);

  res.status(201).send();
});

meetingsRouter.delete("/meetings", (req, res, next) => {
  const deletedMeeting = deleteAllFromDatabase("meetings");

  if (deletedMeeting) {
    req.status(204).send();
  } else {
    req.status(500).send();
  }
});

module.exports = meetingsRouter;
