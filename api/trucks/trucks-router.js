const router = require("express").Router();
const Trucks = require("./trucks-model.js");
const restricted = require("../middleware/restricted-middleware.js");
const restrictRole = require('../middleware/rolerestricted-middleware.js');

// get all trucks owned by a user
router.get("/user:userId", restricted, restrictRole("operator"), (req, res) => {
  const id = req.params.userId;
  Trucks.findBy({ userId: id })
    .then( trucks => {
      res.status(200).json({ data: trucks })
    })
    .catch( err => {
      res.status(500).json({ message: "Error retrieving the trucks", errMessage: err.message })
    });
});

// get a truck by id
router.get("/:truckId", restricted, restrictRole("operator"), (req, res) => {
  const id = req.params.truckId
  Trucks.findById(id)
    .then( truck => {
      console.log(truck)
      if (truck) {
        res.status(200).json({ data: truck });
      } else {
        res.status(404).json({ message: "Truck not found" });
      }
    })
    .catch( err => {
      res.status(500).json({ message: "Error retrieving the truck", errMessage: err.message })
    })
});

//create a truck
router.post("/user:userId", restricted, restrictRole("operator"), (req, res) => {
  const stringId = req.params.userId;
  const id = parseInt(stringId, 10);
  const originalNewTruck = req.body;
  if (truckIsValid(originalNewTruck)) {
    const newTruck = {
      ...originalNewTruck,
      totalRatings: 0,
      avgRating: 0,
      lat: null,
      long: null,
      departureTime: "Not Available",
      userId: id
    }
    Trucks.add(newTruck)
      .then( truck => {
        res.status(201).json({ data: newTruck })
      })
      .catch( err => {
        res.status(500).json({ message: "Error adding the truck", errMessage: err.message });
      })
  } else {
    res.status(400).json("Please provide all required fields for a truck.")
  }
});

//update a truck
router.put("/user:userId/:truckId", restricted, restrictRole("operator"), (req, res) => {
  const originalChangedTruck = req.body;
  const truckId = req.params.truckId;
  if (updatedTruckIsValid(originalChangedTruck)) {
    Trucks.findById(truckId)
      .then( truck => {
        console.log(truck)
        const changedTruck = {
          ...originalChangedTruck,
          totalRatings: truck.totalRatings,
          avgRating: truck.avgRating,
          userId: truck.userId,
          truckId: truck.truckId
        }
        Trucks.update(truckId, changedTruck)
          .then( truck => {
            res.status(201).json({ data: changedTruck })
          })
          .catch( err => {
            res.status(500).json({ message: "Error updating the truck", errMessage: err.message });
          })
      })
      .catch( err => {
        res.status(500).json({ message: "Error retrieving the truck", errMessage: err.message })
      })
  } else {
    res.status(400).json("Please provide all required fields for a truck.")
  }
});

//delete a truck
router.delete("/user:userId/:truckId", restricted, restrictRole("operator"), (req, res) => {
  const truckId = req.params.truckId;
  const userId = req.params.userId;
  Trucks.findById(truckId)
    .then( truck => {
      if (truck.userId == userId) {
        Trucks.remove(truckId)
          .then(count => {
            if (count > 0) {
              res.status(200).json({ message: "The Truck has been deleted" });
            } else {
              res.status(404).json({ message: "The Truck could not be found" });
            }
          })
          .catch(error => {
            console.log(error);
            res.status(500).json({ message: "Error deleting the Truck", errMessage: err.message });
          });
      } else {
        res.status(403).json({message: "Truck doesnt belong to this user"});
      }
    })
    .catch( err => {
      res.status(500).json({message: "Error finding truck", errMessage: err.message });
    })
});

function truckIsValid(truck) {
  return Boolean(
    truck.truckName && typeof truck.truckName === "string" &&
    truck.truckImgURL && typeof truck.truckImgURL === "string" &&
    truck.cuisineId &&
    !truck.totalRatings &&
    !truck.avgRatings &&
    !truck.lat &&
    !truck.long &&
    !truck.departureTime &&
    !truck.userId &&
    !truck.truckId
  )
}

function updatedTruckIsValid(truck) {
  return Boolean(
    truck.truckName && typeof truck.truckName === "string" &&
    truck.truckImgURL && typeof truck.truckImgURL === "string" &&
    truck.cuisineId &&
    !truck.totalRatings &&
    !truck.avgRatings &&
    truck.lat &&
    truck.long &&
    truck.departureTime && typeof truck.departureTime === "string" &&
    !truck.userId &&
    !truck.truckId
  )
}

module.exports = router;