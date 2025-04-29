const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: [3, "atleast 3 character needed"]
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase :true
    },
    password: {
        type: String,
        required: true,
        minlength: [6, "password must be atleast 6 character"]
    },
    role:{
        type: String,
        enum:['user' , 'admin'],
        default: 'user'
    }
})

//hash password before passing
userSchema.pre('save', async function (next) {
     if(!this.isModified('password')) return next()
    this.password = await bcrypt.hash(this.password, 10)
})

//compare password
userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password)
}

module.exports = mongoose.model('User', userSchema)