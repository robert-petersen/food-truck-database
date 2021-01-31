const router = require("express").Router();
const Users = require("./users-model.js");
const restricted = require("../middleware/restricted-middleware.js");
const restrictRole = require('../middleware/rolerestricted-middleware.js');

router.get("/", restricted, restrictRole('admin'), (req, res) => {
  Users.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});

module.exports = router;
