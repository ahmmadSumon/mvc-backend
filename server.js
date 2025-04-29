const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const productRoutes = require('./routes/poductRoutes')
const authRoutes = require('./routes/auth')
const notFound = require('./middlewares/notFound')
const errorHandler = require('./middlewares/errorMiddleware')

dotenv.config()
const app = express()

app.use(express.json())

connectDB()

//routes
app.use('/api/products', productRoutes )
app.use('/api/auth',  authRoutes)

//eror handling middleware

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => [
    console.log(`Server running on port ${PORT}`)
])