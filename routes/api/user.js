const express = require("express");
const router = express.Router();
const {check, validationResult} = require('express-validator/check');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('../../Models/User');
const auth = require('../../middleware/auth');

//Load existing user if already log in
router.get('/auth', auth, async (req, res) => {
    try {
       
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    }catch(err){
        console.error(err.message);
        res.status(500).send("Server err")
    }
});

//Post api/user
//Desc register user
router.post('/register', 
//Validate using express
[
    check('username', 'Username is required').not().isEmpty(),
    check('password', 'Please enter a password with min 6 character').isLength({min: 6})
], 

async (req, res) => {
    //Validate using express
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({errors: error.array()})
    }
    const {username, password, avatar} = req.body;

    try{
        //See if user existed 
        let user = await User.findOne({username});
        if (user){
           return res.status(400).json({errors: [{msg: "User is already existed"}]})
        }

        user = new User({
            username, 
            password,
            avatar
        })

    //Encrypt password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();

    //return jsonwebtoken
        const payload = {
            user: {
                id: user.id
            }
        }
        jwt.sign(
            payload, 
            config.get('jwtsecret'),
            {expiresIn: 360000},
            (err, token) => {
                if(err) return err;
                res.json({token})
            }
        );
        
    }
    catch(err){
        console.log(err.message);
        res.status(500).send("Server error")
    }

    
});

//Login user
router.post('/login', 
//Validate using express
[
    check('username', 'Please enter a username').not().isEmpty(),
    check('password', 'Password required').exists()
], 

async (req, res) => {
    //Validate using express
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({errors: error.array()})
    }
    const {username, password} = req.body;

    try{
        //See if user existed 
        let user = await User.findOne({username});
        if (!user){
           return res.status(400).json({errors: [{msg: "Invalid credential"}]})
        }

        
    //return jsonwebtoken
        //check password
        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch){
            return res.status(400).json({errors: [{msg: "Invalid credential"}]})
        }

        const payload = {
            user: {
                id: user.id
            }
        }
        jwt.sign(
            payload, 
            config.get('jwtsecret'),
            {expiresIn: 360000},
            (err, token) => {
                if(err) return err;
                res.json({token})
            }
        );
        
    }
    catch(err){
        console.log(err.message);
        res.status(500).send("Server erro")
    }

    
});
module.exports = router;