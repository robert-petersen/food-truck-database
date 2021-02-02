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
  await db("users").insert(user, "id");
  const userObj = findBy(user.username);
  return userObj.id;
}

function findById(id) {
  return db("users as u")
    .join("roles as r", "u.roleId", "=", "r.roleId")
    .select("u.userId", "u.username", "r.role as role")
    .where("u.userId", id)
    .first();
}