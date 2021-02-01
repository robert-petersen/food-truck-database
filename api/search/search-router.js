const router = require("express").Router();
const Search = require("./search-model.js");
const restricted = require("../middleware/restricted-middleware.js");

// user search all trucks
router.get("/all", restricted, (req, res) => {
  Search.find()
    .then( trucks => {
      res.status(200).json({ data: trucks })
    })
    .catch( err => {
      res.status(500).json({ message: "Error retrieving the trucks", errMessage: err.message })
    });
});

// user search by cuisine type
router.get("/by-cuisine", restricted, (req, res) => {
  const cuisineId = req.body.cuisineId;
  Search.findType(cuisineId)
    .then( ([type]) => {
      console.log(type)
      console.log(type.cuisineType)
      Search.findBy({ cuisineType: type.cuisineType })
        .then( trucks => {
          res.status(200).json({ data: trucks })
        })
        .catch( err => {
          res.status(500).json({ message: "Error retrieving the trucks", errMessage: err.message })
        });
    })
    .catch( err => {
      res.status(500).json({ message: "Error retrieving the cuisine type", errMessage: err.message })
    });
});

// user search by ratings (high to low)
router.get("/by-ratings", restricted, (req, res) => {
  Search.findByRating()
  .then( trucks => {
    res.status(200).json({ data: trucks })
  })
  .catch( err => {
    res.status(500).json({ message: "Error retrieving the trucks by ratings", errMessage: err.message })
  });
});

// // user search by distance (closest to furthest)
// router.get("/by-distance", restricted, (req, res) => {
//   const userLocation = req.body.location;
//   Search.distance()
//     .then( trucks => {

//     })
//     .catch( err => {
//       res.status(500).json({ message: "Error retrieving the trucks", errMessage: err.message })
//     })
// });

module.exports = router;