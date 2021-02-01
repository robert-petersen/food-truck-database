const db = require("../../database/dbConfig.js");

module.exports = {
  find,
  findBy,
  findType,
  findByRating,
  distance
};

function find() {
  return db("trucks as t")
    .join("cuisineTypes as c", "t.cuisineId", "=", "c.cuisineId")
    .select("t.truckId", "t.truckName", "t.truckImgURL", "t.totalRatings", "t.avgRating", "t.lat", "t.long", "t.departureTime", "t.userId", "c.cuisineType as cuisineType");
}

function findBy(filter) {
  return db("trucks as t")
    .join("cuisineTypes as c", "t.cuisineId", "=", "c.cuisineId")
    .select("t.truckId", "t.truckName", "t.truckImgURL", "t.totalRatings", "t.avgRating", "t.lat", "t.long", "t.departureTime", "t.userId", "c.cuisineType as cuisineType")
    .where(filter);
}

function findType(id) {
  return db("cuisineTypes as c")
    .select("c.cuisineId", "c.cuisineType")
    .where("c.cuisineId", id)
}

function findByRating() {
  return db("trucks as t")
    .select("t.truckId", "t.truckName", "t.truckImgURL", "t.cuisineType", "t.totalRatings", "t.avgRating", "t.lat", "t.long", "t.departureTime", "t.userId")
    .orderBy("t.avgRating", "desc")
}

function distance() {
  return db("trucks as t")
    .select("t.truckId", "t.lat", "t.long", "t.departureTime")
}