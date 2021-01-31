const router = require("express").Router();
const Menu = require("./menu-model.js");
const restricted = require("../middleware/restricted-middleware.js");
const restrictRole = require('../middleware/rolerestricted-middleware.js');

// get all menu items
router.get("/", restricted, restrictRole("operator"), (req, res) => {
  Menu.find()
    .then( trucks => {
      res.status(200).json(trucks)
    })
    .catch( err => {
      res.status(500).json({ message: err })
    });
})

// // get a menu item
// router.get("/:truckId", restricted, restrictRole("operator"), (req, res) => {
  
// })

// //create a menu item
// router.post("/", restricted, restrictRole("operator"), (req, res) => {
  
// })

// //update a menu item
// router.put("/:truckId", restricted, restrictRole("operator"), (req, res) => {
  
// })

// //delete a menu item
// router.delete("/:truckId", restricted, restrictRole("operator"), (req, res) => {
  
// })