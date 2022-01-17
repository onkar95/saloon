const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    ShopName: {
        type: String,
        require: true,
    },
    shopAddress: {
        type: String,
        require: true,
    },
    shopPincode: {
        type: String,
        require: true,
    },
    shopImage: {
        type: String,
        require: false,
    },
    hairstyle: {
        type:Array,
        styleName: { type: String },
        price: { type: Number }

    },
    categor: {
        
    },
    openTiming: {
        type: String,
        require: true,
    },
    closeTiming: {
        type: String,
        require: true,
    },

}, { timestamp: true })

module.exports = mongoose.model('shopkeeper', userSchema);