const mongoose = require('mongoose');

const contactSchema = mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        name: {
            type: String,
            required: [true, 'This field is required'],
        },
        email: {
            type: String,
            required: [true, 'This field is required'],
        },
        phone: {
            type: String,
            required: [true, 'This field is required'],
        },
    },
    {
        timeStamps: true
    }
);

module.exports = mongoose.model('Contacts', contactSchema);