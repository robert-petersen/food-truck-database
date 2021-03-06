const db = require("../../database/dbConfig.js");

module.exports = {
  add,
  find,
  findBy,
  findById,
  update,
  remove,
};

function find() {
  return db("trucks as t")
    .select("t.truckId", "t.truckName", "t.truckImgURL", "t.cuisineId", "t.totalRatings", "t.avgRating", "t.lat", "t.long", "t.departureTime", "t.userId");
}

function findBy(filter) {
  return db("trucks as t")
    .select("t.truckId", "t.truckName", "t.truckImgURL", "t.cuisineId", "t.totalRatings", "t.avgRating", "t.lat", "t.long", "t.departureTime", "t.userId")
    .where(filter);
}

async function add(truck) {
  await db("trucks").insert(truck, "");
  const truckObj = await db("trucks").where("truckName", truck.truckName).first()
  console.log(truckObj)
  return truckObj.truckId;
}

function findById(id) {
  return db("trucks as t")
    .select("t.truckId", "t.truckName", "t.truckImgURL", "t.cuisineId", "t.totalRatings", "t.avgRating", "t.lat", "t.long", "t.departureTime", "t.userId")
    .where("t.truckId", id)
    .first();
}

function update(id, changes) {
  return db('trucks as t')
    .where("t.truckId", id)
    .update(changes, '*');
}

function remove(id) {
  return db('trucks as t')
    .where("t.truckId", id)
    .del();
}