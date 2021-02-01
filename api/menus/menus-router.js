const router = require("express").Router();
const Menus = require("./menus-model.js");
const restricted = require("../middleware/restricted-middleware.js");
const restrictRole = require('../middleware/rolerestricted-middleware.js');

// get all menu items for a truck
router.get("/truck:truckId", restricted, restrictRole("operator"), (req, res) => {
  const id = req.params.truckId;
  Menus.findBy({ truckId: id })
    .then( items => {
      res.status(200).json({ data: items })
    })
    .catch( err => {
      res.status(500).json({ message: "Error retrieving the menu items", errMessage: err.message })
    });
})

// get a menu item by id
router.get("/:itemId", restricted, restrictRole("operator"), (req, res) => {
  Menus.findById(req.params.itemId)
    .then( item => {
      if (item) {
        res.status(200).json({ data: item });
      } else {
        res.status(404).json({ message: "Item not found" });
      }
    })
    .catch( err => {
      res.status(500).json({ message: "Error retrieving the item", errMessage: err.message })
    })
});

//create a new menu item
router.post("/truck:truckId", restricted, restrictRole("operator"), (req, res) => {
  const id = req.params.truckId;
  const originalNewitem = req.body;
  if (itemIsValid(originalNewitem)) {
    const newItem = {
      ...originalNewitem,
      totalRatings: 0,
      avgRating: 0,
      truckId: id
    }
    Menus.add(newItem)
      .then( truck => {
        res.status(201).json({ data: newItem })
      })
      .catch( err => {
        res.status(500).json({ message: "Error adding the new item", errMessage: err.message });
      })
  } else {
    res.status(400).json("Please provide all required fields for the new menu item.")
  }
});

//update a menu item
router.put("/truck:truckId/:itemId", restricted, restrictRole("operator"), (req, res) => {
  const originalChangedItem = req.body;
  const itemId = req.params.itemId;
  if (updatedItemIsValid(originalChangedItem)) {
    Menus.findById(itemId)
      .then( item => {
        const changedItem = {
          ...originalChangedItem,
          totalRatings: item.totalRatings,
          avgRating: item.avgRating,
          itemId: item.itemId,
          truckId: item.truckId
        }
        Menus.update(itemId, changedItem)
          .then( truck => {
            res.status(201).json({ data: changedItem })
          })
          .catch( err => {
            res.status(500).json({ message: "Error updating the menu item", errMessage: err.message });
          })
      })
      .catch( err => {
        res.status(500).json({ message: "Error retrieving the item", errMessage: err.message })
      })
  } else {
    res.status(400).json("Please provide all required fields for a menu item.")
  }
});

//delete a menu item
router.delete("/truck:truckId/:itemId", restricted, restrictRole("operator"), (req, res) => {
  const itemId = req.params.itemId;
  const truckId = req.params.truckId;
  Menus.findById(itemId)
    .then( item => {
      if( item.truckId == truckId) {
        Menus.remove(itemId)
        .then(count => {
          if (count > 0) {
            res.status(200).json({ message: "The menu item has been deleted" });
          } else {
            res.status(404).json({ message: "The menu item could not be found" });
          }
        })
        .catch(error => {
          console.log(error);
          res.status(500).json({ message: "Error deleting the menu item", errMessage: err.message });
        });
      } else {
        res.status(403).json({message: "Item doesnt belong to this truck"});
      }
    })
    .catch( err => {
      res.status(500).json({message: "Error finding item", errMessage: err.message })
    });
});

function itemIsValid(item) {
  return Boolean(
    item.itemName && typeof item.itemName === "string" &&
    item.itemDescription && typeof item.itemDescription === "string" &&
    item.itemImgURL && typeof item.itemImgURL === "string" &&
    item.price &&
    !item.totalRatings &&
    !item.avgRatings &&
    !item.itemId &&
    !item.truckId
  )
}

function updatedItemIsValid(item) {
  return Boolean(
    item.itemName && typeof item.itemName === "string" &&
    item.itemImgURL && typeof item.itemImgURL === "string" &&
    item.itemDescription && typeof item.itemDescription === "string" &&
    item.price &&
    !item.totalRatings &&
    !item.avgRatings &&
    !item.itemId &&
    !item.truckId
  )
}

module.exports = router;