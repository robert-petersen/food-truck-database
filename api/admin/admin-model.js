const db = require("../../database/dbConfig.js");

module.exports = {
  add,
  find,
  findBy,
  findById,
};

function find() {
  return db("users as u")
    .join("roles as r", "u.roleId", "=", "r.roleId")
    .select("u.userId", "u.username", "r.role as role");
}

function findBy(filter) {
  return db("users as u")
    .join("roles as r", "u.roleId", "=", "r.roleId")
    .select("u.userId", "u.username", "r.role as role", "u.password")
    .where(filter);
}

async function add(user) {
  const [id] = await db("users").insert(user, "id");
  return findById(id);
}

function findById(id) {
  return db("users as u")
    .join("roles as r", "u.roleId", "=", "r.roleId")
    .select("u.userId", "u.username", "r.role as role")
    .where("u.userId", id)
    .first();
}