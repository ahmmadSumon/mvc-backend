const express = require('express')
const router = express.Router()
const {createProduct,
    getAllProduct,
    getSingleProduct,
    deleteProduct,
    updateProduct,
 } = require('../controllers/productController')
const {protect, admin} = require('../middlewares/authMiddleware')


router.route('/')
      .get(getAllProduct)
      .post(protect, admin, createProduct)


router.route('/:id')
       .get( getSingleProduct)
        .patch(protect, admin, updateProduct )
        .delete( deleteProduct) 

module.exports = router