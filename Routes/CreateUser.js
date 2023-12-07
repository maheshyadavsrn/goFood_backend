const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs");
const jwtSecret = "Mynameismaheshyadavfrombhadohiparsipur@#$%"

router.post("/creatuser", [
    body('email', 'Incorrect Email').isEmail(),
    body('name').isLength({ min: 3 }),
    body('password', 'Incorrect Password').isLength({ min: 5 }),
],
    async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const salt = await bcrypt.genSalt(10);
        const setPassword = await bcrypt.hash(req.body.password, salt)
        try {
            await User.create({
                name: req.body.name,
                password: setPassword,
                email: req.body.email,
                location: req.body.location
            })
            res.json({ success: true });
        } catch (error) {
            console.log(error);
            res.json({ success: false })
        }
    })

router.post("/loginuser", [
    body('email', 'Incorrect Email').isEmail(),
    body('password', 'Incorrect Password').isLength({ min: 5 }),
],
    async (req, res) => {
        const{email,password}=req.body;
console.log(email,password)

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        // const email = req.body.email;
        try {
            let userData = await User.findOne({ email });
            console.log(userData);
            if (!userData) {
                return res.status(400).json({ errors: "Try logging with correct credentials" });
            }
            const passwordCompare = await bcrypt.compare(req.body.password, userData.password) // Compare the actual password with the hashed one

            if (!passwordCompare) {
                return res.status(400).json({ errors: "Try logging with correct credentials" });
            }

            const data = {
                user: {
                    id: userData.id
                }
            }
            const authToken = jwt.sign(data, jwtSecret)
            return res.json({ success: true, authToken: authToken })
        } catch (error) {
            console.log(error);
            res.json({ success: false })
        }
    })

module.exports = router;
