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
  await db("users").insert(user, "");
  const userObj = await db("users").where("username", user.username).first()
  console.log(userObj)
  return userObj;
}

function findById(id) {
  return db("users as u")
    .join("roles as r", "u.roleId", "=", "r.roleId")
    .select("u.userId", "u.username", "r.role as role")
    .where("u.userId", id)
    .first();
}