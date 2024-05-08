const express = require('express');
const { ObjectId } = require('mongodb');
const { getDB } = require('../models/dbUtils'); // Utility to get DB instance
const { verifyToken } = require('../controllers/auth'); // Assuming this is a middleware to verify JWTs

const router = express.Router();

// Middleware to verify JWT and add user to request
router.use(verifyToken);

// Add an item
router.post('/additem', async (req, res) => {
    if (!req.userId) {
        return res.status(401).json({ message: 'Unauthorized: userId does not exist' });
    }

    const db = await getDB();
    const itemsCollection = db.collection('items');

    try {
        const newItem = {
            price: req.body.price,
            name: req.body.name,
            description: req.body.description,
            category: req.body.category,
            payment: req.body.payment,
            delivery: req.body.delivery,
            postedBy: req.userId,
            photos: req.body.photos, // Array of photo URLs
            createdAt: new Date(), // Adding creation timestamp
        };

        await itemsCollection.insertOne(newItem);
        return res.status(201).json({ message: 'Item added successfully' });
    } catch (error) {
        return res.status(400).json({ message: 'Error adding item to database', error: error.message });
    }
});

// Get an item by its ID
router.get('/:itemId', async (req, res) => {
    if (!req.userId) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const db = await getDB();
    const itemsCollection = db.collection('items');

    try {
        const item = await itemsCollection.findOne({ _id: new ObjectId(req.params.itemId) });

        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }
        return res.json(item);
    } catch (error) {
        return res.status(500).json({ error: 'Error fetching item' });
    }
});

/**
 * Get items posted by a user by userId.
 * @name GET /:userId/items
 * @function
 * @memberof module:itemRoutes
 * @param {string} req.params.userId - The ID of the user.
 * @returns {Object} The items posted by the user if found,
 * or an error message if no items are found.
 */
router.get('/:userId/items', async (req, res) => {
    if (!req.userId) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const db = await getDB();
    const itemsCollection = db.collection('items');

    try {
        const items = await itemsCollection.find({ postedBy: req.userId }).toArray();

        // Check directly if the items array is empty
        if (items.length === 0) {
            return res.status(404).json({ message: 'No items found' });
        }

        // If items are found, respond with them
        return res.json(items);
    } catch (error) {
        // If an error occurs, log it and return an error response
        return res.status(500).json({ error: 'Error fetching items' });
    }
});

module.exports = router;
