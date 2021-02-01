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
  return db("items as i")
    .select("i.itemId", "i.itemName", "i.itemDescription", "i.itemImgURL", "i.price", "i.totalRatings", "i.avgRating", "i.truckId");
}

function findBy(filter) {
  return db("items as i")
    .select("i.itemId", "i.itemName", "i.itemDescription", "i.itemImgURL", "i.price", "i.totalRatings", "i.avgRating", "i.truckId")
    .where(filter);
}

async function add(item) {
  const [id] = await db("items").insert(item, "id");
  return findById(id);
}

function findById(id) {
  return db("items as i")
    .select("i.itemId", "i.itemName", "i.itemDescription", "i.itemImgURL", "i.price", "i.totalRatings", "i.avgRating", "i.truckId")
    .where("i.itemId", id)
    .first();
}

function update(id, changes) {
  return db("items as i")
    .where("i.itemId", id)
    .update(changes, '*');
}

function remove(id) {
  return db("items as i")
    .where("i.itemId", id)
    .del();
}