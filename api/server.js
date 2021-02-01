const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const server = express();
server.use(helmet());
server.use(express.json());
server.use(cors());

const authRouter = require("./auth/auth-router.js");
const adminRouter = require("./admin/admin-router.js");
const trucksRouter = require("./trucks/trucks-router.js");
const menusRouter = require("./menus/menus-router.js");
const searchRouter = require("./search/search-router.js");

server.use("/api/auth", authRouter);
server.use("/api/admin", adminRouter);
server.use("/api/trucks", trucksRouter); 
server.use("/api/menus", menusRouter); 
server.use("/api/search", searchRouter);

server.get("/", (req, res) => {
  res.json(`Welcome to the FoodTruck API`);
});

module.exports = server;