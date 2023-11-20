const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const privateKey = process.env.JWT_PRIVATE_KEY;
const saltRounds = 10;
router.use(function(req, res, next) {
    bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(req.body.password, salt, function(err, hash) {
            req.hashedPassword = hash;
            next();
        });
    });
});

router.post("/register", async function (req, res, next) {
    if (req.body.email && req.body.password && req.body.passwordConfirmation) {
        if (req.body.password === req.body.passwordConfirmation) {
            const user = new User({
                email: req.body.email,
                password: req.hashedPassword,
            });
            return await user
                .save()
                .then((savedUser) => {
                    return res.status(201).json({
                        id: savedUser._id,
                        email: savedUser.email,
                    });
                })
                .catch((error) => {
                    return res.status(500).json({ error: error.message });
                });
        }
        res.status(400).json({ error: "Passwords not matching" });
    } else {
        res.status(400).json({ error: "Username or Password Missing" });
    }
});


router.post("/login", async function (req, res, next) {
    if (req.body.email && req.body.password) {
        const user = await User.findOne()
            .where("email")
            .equals(req.body.email)
            .exec();
        if (user) {
            return bcrypt
                .compare(req.body.password, user.password)
                .then((result) => {
                    if (result === true) {
                        const token = jwt.sign({ id: user._id }, privateKey, {
                            algorithm: "RS256",
                        });
                        return res.status(200).json({ access_token: token, id: user._id });
                    } else {
                        return res.status(401).json({ error: "Invalid credentials." });
                    }
                })
                .catch((error) => {
                    return res.status(500).json({ error: error.message });
                });
        }
        return res.status(401).json({ error: "Invalid credentials." });
    } else {
        res.status(400).json({ error: "Username or Password Missing" });
    }
});


module.exports = router;
