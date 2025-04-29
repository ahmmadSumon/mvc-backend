const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`)
    res.statuts(404)
    next(error)
}

module.exports = notFound