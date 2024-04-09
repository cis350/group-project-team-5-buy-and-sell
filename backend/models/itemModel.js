const mongoose = require('mongoose');
const itemSchema = mongoose.Schema({
    price: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    delivery: {
        type: String,
        enum: ['pickup', 'delivery'],
        required: true,
    },
    numBookmarks: {
        type: Number,
        default: 0,
    },
},
{
    timestamps: true,
});

const Item = mongoose.model('Item', itemSchema);
module.exports = Item;