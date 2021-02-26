const { Router } = require("express");

const router = require("express").Router();
const db = require("../models");

router.get("/new", (req, res) => {
  res.render("users/new");
});

router.post("/", async (req, res) => {
  try {
    const user = await db.user.create({
      email: req.body.email,
      password: req.body.password,
    });
    res.cookie("userId", user.id);
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
});

// GET login form
router.get("/login", (req, res) => {
  res.render("users/login");
});

// POST user login
router.post("/login", async (req, res) => {
  try {
    const user = await db.user.findOne({
      where: { email: req.body.email },
    });
    if (req.body.password === user.password) {
      res.cookie("userId", user.id);
      res.redirect("/");
    } else {
      res.render("users/login");
      console.log("Wrong password");
    }
  } catch (err) {
    console.log(err);
  }
});

// GET logout form
router.get("/logout", (req, res) => {
  res.clearCookie("userId");
  res.redirect("/");
});

// GET profile
router.get("/profile", (req, res) => {
    try {
        if(res.locals.user !== null){
            res.render("users/profile")
        } else {
            res.redirect("/users/login")
        }
    } catch (err) {
        console.log(err)
    }
})

module.exports = router;
