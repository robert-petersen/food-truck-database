const router = require("express").Router();
const Users = require("./users-model.js");
const Trucks = require("../trucks/trucks-model");
const Menus = require("../menus/menus-model.js");
const restricted = require("../middleware/restricted-middleware.js");
const restrictRole = require('../middleware/rolerestricted-middleware.js');

// admin get all users
router.get("/", restricted, restrictRole('admin'), (req, res) => {
  Users.find()
    .then(users => {
      res.json({ data: users });
    })
    .catch(err => res.send(err));
});

// user search by cuisine type
router.get("/search-by-cuisine", restricted, (req, res) => {

})

// user search by ratings
router.get("/search-by-ratings", restricted, (req, res) => {
  
})

// user search by distance
router.get("/search-by-distance", restricted, (req, res) => {
  
})

module.exports = router;
