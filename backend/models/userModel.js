const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
        },

        lastName: {
            type: String,
            required: true,
        },

        email: {
            type: String,
            trim: true,
            unique: true,
            required: true,
            validate: {
              validator: (value) => {
                const eduEmailRegex = /^.+@.+\.edu$/; // Matches email ending with ".edu"
                return eduEmailRegex.test(value);
              },
              message: 'A valid school email ending with ".edu" must be used.',
            },
          },
        password: {
            type: String,
            minlength: 5,
            required: true,
        },
        role: {
            type: Number,
            default: 0, // 0 for normal user, 1 for admin
        },
        token: {
            type: String,
        },
        tokenExp: {
            type: Number,
        },

    },
    {
        timestamps: true,
    }
);

const User = mongoose.model('User', userSchema);
module.exports = User;