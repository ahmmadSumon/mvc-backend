const express = require('express')
const router = express.Router()
const {createProduct,
    getAllProduct,
    getSingleProduct,
    deleteProduct,
    updateProduct,
 } = require('../controllers/productController')

router.route('/')
      .get(getAllProduct)
      .post( createProduct)


router.route('/:id')
       .get( getSingleProduct)
        .patch( updateProduct )
        .delete( deleteProduct) 

module.exports = router