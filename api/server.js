const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const server = express();
server.use(helmet());
server.use(express.json());
server.use(cors());

const authRouter = require("./auth/auth-router.js");
// const usersRouter = require("./users/users-router.js");

server.use("/api/auth", authRouter);
// server.use("/api/users", usersRouter);

server.get("/", (req, res) => {
  res.json(`
    Welcome to the FoodTruck API \n
    \n
    EndPoints: \n
    ------------------------------------------------------------------------\n
    CRUD    | Route                     | Description\n
    ------------------------------------------------------------------------\n
    POST    | "api/auth/register"       | 


  `);
});

module.exports = server;