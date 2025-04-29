const jwt = require('jsonwebtoken')
const User = require('../models/user')

const protect = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1]
        if(!token){ return res.satatus(401).json({error: error.message})}
        const decoded =   jwt.verify(token , 'secretkey')
        req.user = await User.findById(decoded.id).select('-password')
        next()    
    } catch (error) {
        res.status(401).json({message : 'Not authorized , token failed'})
    }
}

//only admin can access
const admin = (req, res) => {
    if(req.user && req.user.role === 'admin'){
        next()
    } else{
        res.status(401).json({message: 'admin only'})
    }
}

module.exports = {protect, admin}