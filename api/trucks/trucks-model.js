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
    .join("users as u", "t.userId", "=", "u.userId")
    .select("t.truckId", "t.truckName", "t.truckImgURL", "t.cuisineType", "t.totalRating", "t.avgRating", "t.lat", "t.long", "t.departureTime", "u.username as truckOwner");
}

function findBy(filter) {
  return db("trucks as t")
    .join("users as u", "t.userId", "=", "u.userId")
    .select("t.truckId", "t.truckName", "t.truckImgURL", "t.cuisineType", "t.totalRating", "t.avgRating", "t.lat", "t.long", "t.departureTime", "u.username as truckOwner")
    .where(filter);
}

async function add(truck) {
  const [id] = await db("trucks").insert(truck, "id");
  return findById(id);
}

function findById(id) {
  return db("trucks as t")
    .join("users as u", "t.userId", "=", "u.userId")
    .select("t.truckId", "t.truckName", "t.truckImgURL", "t.cuisineType", "t.totalRating", "t.avgRating", "t.lat", "t.long", "t.departureTime", "u.username as truckOwner")
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