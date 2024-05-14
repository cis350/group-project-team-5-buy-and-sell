const express = require('express');
const { ObjectId } = require('mongodb');
const { getDB } = require('../models/dbUtils'); // Utility to get DB instance
const { verifyToken } = require('../controllers/auth'); // Assuming this is a middleware to verify JWTs
const users = require('../models/users'); // Assume you have CRUD operations and user fetching in this file

const router = express.Router();

// Middleware to verify JWT and add user to request
router.use(verifyToken);

/**
 * Add an item.
 * @name POST /additem
 * @function
 * @memberof module:itemRoutes
 * @param {Object} req - The request object.
 * @param {Object} req.body - The request body.
 * @param {number} req.body.price - The price of the item.
 * @param {string} req.body.name - The name of the item.
 * @param {string} req.body.description - The description of the item.
 * @param {string} req.body.category - The category of the item.
 * @param {string} req.body.payment - The payment method for the item.
 * @param {string} req.body.delivery - The delivery method for the item.
 * @param {string} req.userId - The ID of the user making the request.
 * @param {Array<string>} req.body.photos - The URLs of the item's photos.
 * @returns {Object} The response object.
 * @throws {Error} If there is an error adding the item to the database.
 */
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
            bookmarked: 0,
        };

        await itemsCollection.insertOne(newItem);
        return res.status(201).json({ message: 'Item added successfully' });
    } catch (error) {
        return res.status(400).json({ message: 'Error adding item to database', error: error.message });
    }
});

/**
 * Get an item by its ID.
 * @name GET /:itemId
 * @function
 * @memberof module:itemRoutes
 * @param {Object} req - The request object.
 * @param {string} req.params.itemId - The ID of the item.
 * @param {string} req.userId - The ID of the user making the request.
 * @returns {Object} The response object.
 * @throws {Error} If there is an error fetching the item from the database.
 */
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
 * @param {Object} req - The request object.
 * @param {string} req.params.userId - The ID of the user.
 * @param {string} req.userId - The ID of the user making the request.
 * @returns {Object} The response object.
 * @throws {Error} If there is an error fetching the items from the database.
 */
router.get('/:userId/items', async (req, res) => {
    if (!req.userId) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const db = await getDB();
    const itemsCollection = db.collection('items');

    try {
        const items = await itemsCollection.find({ postedBy: req.params.userId }).toArray();

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

/**
 * Bookmark an item.
 * @name POST /bookmark/:itemId
 * @function
 * @memberof module:itemRoutes
 * @param {Object} req - The request object.
 * @param {string} req.params.itemId - The ID of the item to bookmark.
 * @param {string} req.userId - The ID of the user making the request.
 * @returns {Object} The response object.
 * @throws {Error} If there is an error processing the request.
 */
router.post('/bookmark/:itemId', async (req, res) => {
    if (!req.userId) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const db = await getDB();
    const itemsCollection = db.collection('items');

    try {
        const itemId = new ObjectId(req.params.itemId);
        const item = await itemsCollection.findOne({ _id: itemId });

        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }

        // Check if the user is trying to bookmark their own item
        if (item.postedBy === req.userId) {
            return res.status(400).json({ message: 'Users cannot bookmark their own items' });
        }

        // Increment the 'bookmarked' count or initialize it to 1 if undefined
        const bookmarkedCount = item.bookmarked ? item.bookmarked + 1 : 1;
        await itemsCollection.updateOne({ _id: itemId }, { $set: { bookmarked: bookmarkedCount } });

        // Fetch the user object using the postedBy field
        const user = await users.getUser(item.postedBy);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Return the user's email
        return res.json({ email: user.email });
    } catch (error) {
        return res.status(500).json({ error: 'Error processing request' });
    }
});

module.exports = router;
