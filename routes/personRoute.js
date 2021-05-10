const express = require("express");
const router = express.Router();

const PersonModel = require("../models/person");

// Find all persons
router.route("/persons").get((req, res) => {
  PersonModel.find()
    .then((persons) => {
      res.status(200).json({
        message: "Items retrieved successfully",
        persons,
      });
    })
    .catch((err) => res.status(400).json(err));
});

// Find a single person
router.route("/person/:id").get((req, res) => {
  PersonModel.findById(req.params.id)
    .populate("name", "email", "country")
    .exec()
    .then((person) => {
      if (!person) {
        return res.status(404).json({
          message: "Not found",
        });
      }
      res.status(200).json({
        message: "Objects retrieved successfully",
        person,
      });
    })
    .catch((err) => res.status(400).json(err));
});

// Post new person
router.route("/persons").post((req, res) => {
  const person = new PersonModel({
    name: req.body.name,
    email: req.body.email,
    country: req.body.country,
  });
  person
    .save()
    .then(() => {
      res.status(201).json({
        message: "Created object successfully",
        data: person,
      });
    })
    .catch((err) => res.status(400).json(err));
});

//Update a person
router.route("/persons/:id").put((req, res) => {
  const person = new PersonModel({
    _id: req.params.id,
    name: req.body.name,
    email: req.body.email,
    country: req.body.country,
  });
  person
    .updateOne({ _id: req.params.id }, person)
    .then(() => {
      res.status(201).json({
        message: "Object successfully updated",
        data: person,
      });
    })
    .catch((err) => res.status(400).json(err));
});

// Delete a person
router.delete("/persons/:id", (req, res) => {
  PersonModel.deleteOne({ _id: req.params.id })
    .then(() => {
      res.status(200).json({
        message: "person deleted successfully",
      });
    })
    .catch((err) => res.status(400).json(err));
});

module.exports = router;
