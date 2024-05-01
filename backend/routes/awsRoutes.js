const express = require('express');
const AWS = require('aws-sdk');
require('dotenv').config();

const router = express.Router();

// Configure AWS with your access and secret keys here
// (Ideally, these should be environment variables)
AWS.config.update({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const s3 = new AWS.S3();

// Route to generate a presigned URL for file uploads
router.get('/generate-presigned-url', (req, res) => {
  const params = {
    Bucket: process.env.S3_BUCKET_NAME, // Your bucket name
    Key: req.query.filename, // File name you want to save as in S3
    Expires: 60, // Time does URL expire in seconds
  };

  s3.getSignedUrl('putObject', params, (err, url) => {
    if (err) {
      return res.status(500).json({ error: 'Error generating presigned URL' });
    }
    return res.json({ url });
  });
});

module.exports = router;
