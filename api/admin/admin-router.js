const router = require("express").Router();
const Admin = require("./admin-model.js");
const restricted = require("../middleware/restricted-middleware.js");
const restrictRole = require('../middleware/rolerestricted-middleware.js');

// admin get all users
router.get("/users", restricted, restrictRole('admin'), (req, res) => {
  Admin.find()
    .then(users => {
      res.json({ data: users });
    })
    .catch(err => res.send(err));
});

// admin update truck
router.get("/:truckId", restricted, restrictRole('admin'), (req, res) => {

});

// admin delete truck
router.get("/:truckId", restricted, restrictRole('admin'), (req, res) => {

});

// admin update menu item
router.get("/:itemId", restricted, restrictRole('admin'), (req, res) => {

});

// admin delete menu item
router.get("/:itemId", restricted, restrictRole('admin'), (req, res) => {

});

module.exports = router;
