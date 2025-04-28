const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name : {
        type: String,
        required : [true, "product must have a name"],
        minLenght : [2, "Atleast have 2 character"],
        trim : true
    },
    price : {
        type: Number,
        required : [true , " product must have a price"],
        min : [0, "price must be positive"]
    },
    inStock : {
        type : Boolean,
        default: true
    }
},{ timestamps: true })

const Product = mongoose.model('Product', productSchema)
module.exports = Product