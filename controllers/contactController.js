//controller..performing the logics
const asyncHandler = require('express-async-handler');


const getContacts = asyncHandler(async (req, res) => {
    res.json({message: 'Get all contacts'});
});

const getContact = asyncHandler(async (req, res) => {
    res.json({message: `Get contact for id ${req.params.id}`});
});

const createContact = asyncHandler(async (req, res) => {
    console.log('The request body is: ', req.body);
    const { name, phone, email } = req.body;
    if (!name || !email || !phone) {
        res.status(400);
        throw new Error('All fields must be filled');
    }
    res.json({message: 'Contact created!'})
});

const updateContact = asyncHandler(async (req, res) => {
    res.json({message: `Update contact for id ${req.params.id}`})
});

const deleteContact = asyncHandler(async (req, res) => {
    res.json({message: `Delete contact for id ${req.params.id}`})
});

module.exports = {
    getContacts,
    getContact,
    createContact,
    updateContact,
    deleteContact
};