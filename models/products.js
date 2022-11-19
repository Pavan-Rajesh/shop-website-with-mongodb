const mongoose = require('mongoose')
const productsSchema = new mongoose.Schema({
    productName: String,
    quantity: Number
})

module.exports = mongoose.model("grocery", productsSchema)