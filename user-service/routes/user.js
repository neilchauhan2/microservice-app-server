const route = require("express").Router();
const { User } = require("../models/User");
const auth = require("../middleware/auth");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { createUser, getUser } = require("../controllers/user");

// create user
route.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log(req.body);
    // validation
    if (!name || !email || !password) {
      return res.status(400).send("Please enter all credentials!");
    }
    // check for existing user
    const user = await User.findOne({
      email,
    });

    if (user) {
      return res.status(400).send("User already exists!");
    }

    const newUser = await createUser(name, email, password);

    jwt.sign(
      {
        id: newUser.id,
      },
      process.env.JWT_SECRET,
      (err, token) => {
        if (err) throw err;
        res.send({
          token,
          user: {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
          },
        });
      }
    );
  } catch (error) {
    throw error;
  }
});

// login user
route.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Simple validation
    if (!email || !password) {
      return res.status(400).send("Please enter all credentials!");
    }

    // check for existing user
    const user = await User.findOne({
      email,
    });
    if (!user) {
      return res.status(400).send("User does not exist!");
    }

    // compare password
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      jwt.sign(
        {
          id: user.id,
        },
        process.env.JWT_SECRET,
        (err, token) => {
          if (err) throw err;
          res.send({
            token,
            user: {
              id: user.id,
              name: user.name,
              email: user.email,
            },
          });
        }
      );
    } else {
      return res.status(400).send("Password incorrect!");
    }
  } catch (error) {
    throw error;
  }
});

// get user
route.get("/", auth, async (req, res) => {
  try {
    const user = await getUser(req.user.id);
    if (!user) throw Error("User Does not exist");
    res.send({
      id: user._id,
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

module.exports = route;
