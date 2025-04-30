const express = require('express')
const router = express.Router()
const {registerUser, loginUser } = require('../controllers/authController')
const {body, validationResult} = require('express-validator')
//Add validation with express-validator

router.post('/register',[
    body('name', "Name is required").notEmpty(),
    body('email', "Enter a valid email").isEmail(),
    body('password', "Password must be at least 6 characters").isLength({min: 6})
], (req, res, next) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()})
    }
    next()
} , registerUser)
router.post('/login', loginUser)

module.exports = router