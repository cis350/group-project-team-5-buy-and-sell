const express = require('express');
const { ObjectId } = require('mongodb');
const jwt = require('jsonwebtoken');
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

        const result = await itemsCollection.insertOne(newItem);
        //item: result.ops[0] 

        res.status(201).json({ message: 'Item added successfully' });
    } catch (error) {
        res.status(400).json({ message: 'Error adding item to database', error: error.message });
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

        if (!items) {
            res.status(404).json({ message: 'No items found' });
        } else {
            res.json(items);
        }
    } catch (error) {
        console.error('Error fetching items:', error);
        res.status(500).json({ error: 'Error fetching items' });
    }
    return res;
});

module.exports = router;
