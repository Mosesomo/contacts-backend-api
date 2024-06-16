//controller..performing the logics
const asyncHandler = require('express-async-handler');
const Contact = require('../models/contactsModel');


const getContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find();
    res.json(contacts);
});

const getContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error('Not Found')
    }
    res.json(contact);
});

const createContact = asyncHandler(async (req, res) => {
    console.log('The request body is: ', req.body);
    const { name, phone, email } = req.body;
    if (!name || !email || !phone) {
        res.status(400);
        throw new Error('All fields must be filled');
    }

    const contact = await Contact.create({
        name,
        phone,
        email
    })

    res.json(contact);
});

const updateContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error('Not Found');
    }

    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    res.json(updatedContact)
});

const deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error('Not Found');
    }
    contact.remove();
    res.json(contact)
});

module.exports = {
    getContacts,
    getContact,
    createContact,
    updateContact,
    deleteContact
};