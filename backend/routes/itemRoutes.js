const express = require('express');
const Item = require('../models/itemModel'); // Adjust the path as necessary

const router = express.Router();

router.post('/additem', async (req, res) => {
    try {
        // Create a new item using the data in req.body
        const newItem = new Item({
            price: req.body.price,
            name: req.body.name,
            description: req.body.description,
            category: req.body.category,
            payment: req.body.payment,
            delivery: req.body.delivery,
            postedBy: req.body.postedBy,
            photos: req.body.photos, // Array of photo URLs
        });

        // Save the new item to the database
        await newItem.save();

        // Send a response to the client
        res.status(201).json({ message: 'Item added successfully', item: newItem });
    } catch (error) {
        // If there's an error, send a 400 response with the error message
        res.status(400).json({ message: 'Error adding item', error: error.message });
    }
});

// Route to get an item by its ID
router.get('/:itemId', async (req, res) => {
    try {
        // Extract the itemId from the request parameters
        const { itemId } = req.params;

        // Find the item in the database by its ID
        const item = await Item.findById(itemId);

        // If no item was found, return a 404 response
        if (!item) {
            res.status(404).json({ message: 'Item not found' });
        }

        // If the item was found, return it in the response
        res.json(item);
    } catch (error) {
        console.error('Error fetching item:', error);
        // Return a 500 response if an error occurs
        res.status(500).json({ error: 'Error fetching item' });
    }
});

module.exports = router;
