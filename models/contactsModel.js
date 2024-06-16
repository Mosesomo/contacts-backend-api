const mongoose = require('mongoose');

const contactSchema = mongoose.Schema(
    {
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