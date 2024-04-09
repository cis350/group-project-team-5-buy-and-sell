const mongoose = require('mongoose');
// const User = require('./userModel');

const { Schema } = mongoose;

const itemSchema = mongoose.Schema(
{
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
        default: '',
    },
    category: {
        type: String,
        enum: ['fashion', 'electronics', 'living', 'books', 'furniture', 'miscellaneous'],
        required: true,
    },
    payment: {
        type: String,
        enum: ['venmo', 'zelle', 'cash', 'credit card', 'no preference'],
        required: true,
    },
    delivery: {
        type: String,
        enum: ['meetup', 'shipping', 'no preference'],
        required: true,
    },
    numBookmarks: {
        type: Number,
        default: 0,
    },
    postedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    photos: [{
        type: String,
        required: true,
    }],
},
{
    timestamps: true,
},
);

const Item = mongoose.model('Item', itemSchema);
module.exports = Item;
