const User = require('../models/user')
const jwt = require('jsonwebtoken')

//generate token
const createToken = (user) =>{
    return jwt.sign({id : user._id, role: user.role}, process.env.JWT_SECRET, {
        expiresIn: '1d'
    })
}

//register user
const registerUser = async (req, res) => {
    try {
        const {name, email, password} = req.body
        const user = await User.create({name, email, password})
        const token = createToken(user)
        res.status(200).json({user, token})
    } catch (error) {
        res.status(400).json({error : error.message})
    }
    
    
}

//login user
const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body
        const user = await User.findOne({email})
        if(!user) return res.status(400).json({message: 'Invalid email or password'})
        const isMatch = await user.comparePassword(password)
        if(!isMatch) return res.status(400).json({message :'Invalid email or password'})  
        const token = createToken(user)
        res.json({user, token})
    } catch (error) {
        res.status(500).json({error : error.message})
    }
}

module.exports = {registerUser, loginUser}