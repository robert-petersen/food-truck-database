const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const server = express();
server.use(helmet());
server.use(express.json());
server.use(cors());

const authRouter = require("./auth/auth-router.js");
const usersRouter = require("./users/users-router.js");
const trucksRouter = require("./trucks/trucks-router.js");
const menuRouter = require("./menu/menu-router.js");

server.use("/api/auth", authRouter);
server.use("/api/users", usersRouter);
server.use("/api/trucks", trucksRouter); //"/api/users/:userId/trucks"
server.use("/api/menu", menuRouter); //"/api/users/:userId/trucks/:truckId/menu"

server.get("/", (req, res) => {
  res.json(`

Welcome to the FoodTruck API \n
\n
EndPoints: \n
------------------------------------------------------------------------------------\n
CRUD    | Route                             | Description\n
------------------------------------------------------------------------------------\n
------------------------------------------------------------------------------------\n
POST    | "api/auth/register-user"          | Registers a user (as a customer)\n
        |                                   | Requires username, email, and password\n
        |                                   | {\n
        |                                   |   username: "",\n
        |                                   |   password: "",\n
        |                                   |   email: "",\n
        |                                   | }\n
        |                                   | Returns a user object\n
------------------------------------------------------------------------------------\n
POST    | "api/auth/register-operator"      | Registers a user (as a operator)\n
        |                                   | Requires username, email, and password\n
        |                                   | {\n
        |                                   |   username: "",\n
        |                                   |   password: "",\n
        |                                   |   email: "",\n
        |                                   | }\n
        |                                   | Returns a user object\n
------------------------------------------------------------------------------------\n
POST    | "api/auth/register-admin"         | Registers a admin (not required)\n
        |                                   | Requires username, email, password\n
        |                                   | and admin code (check for in slack)\n
        |                                   | {\n
        |                                   |   username: "",\n
        |                                   |   password: "",\n
        |                                   |   email: "",\n
        |                                   |   adminCode: "",\n
        |                                   | }\n
        |                                   | Returns a user object\n
------------------------------------------------------------------------------------\n
POST    | "api/auth/login"                  | Logs a user in (works for all roles)\n
        |                                   | Requires username and password\n
        |                                   | {\n
        |                                   |   username: "",\n
        |                                   |   password: "",\n
        |                                   | }\n
        |                                   | Returns a token\n
------------------------------------------------------------------------------------\n
POST    | "api/users"                       | gets all users (only admins allowed)\n
        |                                   | Requires token in Authorization header\n
        |                                   | Made this for fun\n
------------------------------------------------------------------------------------\n





  `);
});

module.exports = server;