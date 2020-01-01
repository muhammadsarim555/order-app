const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Users = require("../models/users");

router.post("/signup", (req, res, next) => {
  Users.find({ email: req.body.email }).then(user => {
    if (user.length >= 1) {
      return res.status(409).json({ message: "Email Already Exist!" });
    } else {
      bcrypt.hash(req.body.password, 10, function(err, hash) {
        if (err) {
          return res.status(500).json({ error: err });
        } else {
          const user = new Users({
            _id: new mongoose.Types.ObjectId(),
            email: req.body.email,
            password: hash
          });
          user
            .save()
            .then(s => res.status(200).json(s))
            .catch(e => res.status(500).json({ error: e }));
        }
      });
    }
  });
});

module.exports = router;
