const Product = require('../models/product')

//create product
const createProduct = async (req, res) => {
    try {
        const create = await Product.create(req.body)
        res.status(200).json(create)
    } catch (error) {
        res.status(404).json({error: error.message})
    }
}

//get all product

const getAllProduct = async (req, res) => {
    try {
        const {inStock, sort, search, page = 1, limit = 10 } = req.query
        let productObject = {}

        //filter
        if(inStock ){
            productObject.inStock = inStock === "true"
        }

        //search
        if(search){
            productObject.name = {$regex : search, $options: 'i'}
        }
          
        let productQuery =  Product.find(productObject)

        //sort
        if(sort === 'price_asc'){
            productQuery = productQuery.sort({price:1})
        } else if(sort === 'price_desc'){
            productQuery = productQuery.sort({price: -1})
        }

        //pagination
        const skip = (Number(page) - 1) * Number(limit)
        productQuery = productQuery.skip(skip).limit(Number(limit))
        
        const products = await productQuery

        res.status(200).json(products)
    } catch (error) {
        res.status(404).json({error : error.message})
    }
}

//get single product

const getSingleProduct = async (req, res) => {
    try {
        const {id} = req.params
        const product = await Product.findById(id)
        if(!product){
            return res.status(404).json({ message: "Product not found" })
        }
        res.status(200).json(product)
    } catch (error) {
        res.status(404).json({error : error.message})
    }
}

//update product

const updateProduct = async (req, res) => {
    try {
        const update = await Product.findByIdAndUpdate(
            req.params.id,
             req.body, 
             {new : true})
        res.status(200).json(update)
         
    } catch (error) {
        res.status(404).json({error : error.message})
    }

}

//delete product

const deleteProduct = async (req, res) =>{
    try {
        const product = await Product.findByIdAndDelete(req.params.id)
        res.json(product)
        
    } catch (error) {
        res.status(404).json({error : error.message})
    }
}



module.exports = {
    createProduct,
    getAllProduct,
    getSingleProduct,
    deleteProduct,
    updateProduct,
    
}