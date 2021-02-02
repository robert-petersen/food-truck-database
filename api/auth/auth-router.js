const bcryptjs = require("bcryptjs");
const jwt = require('jsonwebtoken')
const router = require("express").Router();
const { jwtSecret } = require('../../config/secrets.js')
const Users = require("../admin/admin-model.js");

router.post("/register-user", (req, res) => {
  const credentials = req.body;
  if (isValid(credentials)) {
    const rounds = process.env.BCRYPT_ROUNDS || 8;
    const hash = bcryptjs.hashSync(credentials.password, rounds);
    credentials.password = hash;
    Users.add(credentials)
      .then(user => {
        res.status(201).json({ data: user });
      })
      .catch(error => {
        res.status(500).json({ message: "Error validating credentials", errMessage: error.message });
      });
  } else {
    res.status(400).json({
      message: "Please provide username and password!",
    });
  }
});

router.post("/register-operator", (req, res) => {
  const originalCredentials = req.body;
  const credentials = {
    username: originalCredentials.username,
    email: originalCredentials.email,
    password: originalCredentials.password,
    roleId: 2
  }
  if (isValid(credentials)) {
    const rounds = process.env.BCRYPT_ROUNDS || 8;
    const hash = bcryptjs.hashSync(credentials.password, rounds);
    credentials.password = hash;
    Users.add(credentials)
      .then(operator => {
        res.status(201).json({ data: operator });
      })
      .catch(error => {
        res.status(500).json({ message: "Error validating credentials", errMessage: error.message });
      });
  } else {
    res.status(400).json({
      message: "Please provide username and password!",
    });
  }
});

router.post("/register-admin", (req, res) => {
  const originalCredentials = req.body;
  if (originalCredentials.adminCode === process.env.ADMIN_CODE || "developmentPlaceholder") {
    const credentials = {
      username: originalCredentials.username,
      email: originalCredentials.email,
      password: originalCredentials.password,
      roleId: 3
    }
    if (isValid(credentials)) {
      const rounds = process.env.BCRYPT_ROUNDS || 8;
      const hash = bcryptjs.hashSync(credentials.password, rounds);
      credentials.password = hash;
      Users.add(credentials)
        .then(admin => {
          res.status(201).json({ data: admin });
        })
        .catch(error => {
          res.status(500).json({ message: "Error validating credentials", errMessage: error.message });
        });
    } else {
      res.status(400).json({
        message: "Please provide username and password!",
      });
    }
  } else {
    res.status(400).json({message: "Invalid Admin Code!"})
  }
});

router.post("/login", (req, res) => {
  const loginuser = {
    username: req.body.username,
    password: req.body.password
  }
  if (isValidLogin(loginuser)) {
    Users.findBy({ username: loginuser.username })
      .then(([user]) => {
        if (user && bcryptjs.compareSync(loginuser.password, user.password)) {
          const token = generateToken(user);
          const isOperator = Boolean(user.role === "operator")
          res.status(200).json({ message: `Welcome ${user.username}`, token, isOperator });
        } else {
          res.status(401).json({ message: "Invalid Credentials!" });
        }
      })
      .catch(error => {
        res.status(500).json({ message: "Error loging in", errMessage: error.message, isOperator: op });
      });
  } else {
    res.status(400).json({
      message: "Please provide username and password!", recived: req.body
    });
  }
});

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
    role: user.role,
  }
  const options = {
    expiresIn: "1d",
  }

  return jwt.sign(payload, jwtSecret, options)
}

function isValid(user) {
  return Boolean(
    user.username && 
    user.password && 
    typeof user.password === "string" && 
    user.email && 
    typeof user.email === "string"
  );
}

function isValidLogin(user) {
  return Boolean(
    user.username && 
    user.password && 
    typeof user.password === "string"
  );
}

module.exports = router;
