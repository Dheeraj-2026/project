const asyncHandler = require('express-async-handler');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

const protect = asyncHandler (async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if(!token) {
            res.status(401)
            throw new Error("Not authorize, please login")
        }

        //Verify Token
        const verified = jwt.verify(token, process.env.JWT_SECRET)
        
        //Get userid form token
        const user = await User.findById(verified.id).select("-password")

        if(!user) {
            res.status(401)
            throw new Error("User Not found")
        }
        req.user = user
        next()
    }  catch (error) {
        res.status(401)
            throw new Error("Not authorize, please login")
    }
});

module.exports = {
    protect 
};