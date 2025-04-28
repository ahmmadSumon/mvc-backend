const express = require('express')
const router = express.Router()
const {createProduct,
    getAllProduct,
    getSingleProduct,
    deleteProduct,
    updateProduct,
 } = require('../controllers/productController')

router.post('/', createProduct)
router.get('/', getAllProduct)
router.get("/:id" , getSingleProduct)
router.patch("/:id", updateProduct )
router.delete("/:id", deleteProduct) 

module.exports = router