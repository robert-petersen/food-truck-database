const router = require("express").Router();
const Trucks = require("./trucks-model.js");
const restricted = require("../middleware/restricted-middleware.js");
const restrictRole = require('../middleware/rolerestricted-middleware.js');

// get all trucks
router.get("/", restricted, restrictRole("operator"), (req, res) => {
  Trucks.find()
    .then( trucks => {
      res.status(200).json(trucks)
    })
    .catch( err => {
      res.status(500).json({ message: err })
    });
})

// // get a truck by id
// router.get("/:truckId", restricted, restrictRole("operator"), (req, res) => {
  
// })

// //create a truck
// router.post("/", restricted, restrictRole("operator"), (req, res) => {
  
// })

// //update a truck
// router.put("/:truckId", restricted, restrictRole("operator"), (req, res) => {
  
// })

// //delete a truck
// router.delete("/:truckId", restricted, restrictRole("operator"), (req, res) => {
  
// })