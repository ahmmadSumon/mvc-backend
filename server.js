const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const productRoutes = require('./routes/poductRoutes')
dotenv.config()
const app = express()

app.use(express.json())

connectDB()

//routes
app.use('/api/products', productRoutes )

//eror handling middleware

app.use((err, req, res, next) =>{
    console.error(err.stack);
    res.status(500).json({error: "something went wrong"})
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => [
    console.log(`Server running on port ${PORT}`)
])