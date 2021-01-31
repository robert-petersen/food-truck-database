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
    .join("trucks as t", "i.truckId", "=", "t.truckId")
    .select("i.itemId", "i.itemName", "i.itemDescription", "i.itemImgURL", "i.price", "i.totalRating", "i.avgRating", "t.truckName as truck");
}

function findBy(filter) {
  return db("items as i")
    .join("trucks as t", "i.truckId", "=", "t.truckId")
    .select("i.itemId", "i.itemName", "i.itemDescription", "i.itemImgURL", "i.price", "i.totalRating", "i.avgRating", "t.truckName as truck")
    .where(filter);
}

async function add(truck) {
  const [id] = await db("trucks").insert(truck, "id");
  return findById(id);
}

function findById(id) {
  return db("items as i")
    .join("trucks as t", "i.truckId", "=", "t.truckId")
    .select("i.itemId", "i.itemName", "i.itemDescription", "i.itemImgURL", "i.price", "i.totalRating", "i.avgRating", "t.truckName as truck")
    .where("i.itemId", id)
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