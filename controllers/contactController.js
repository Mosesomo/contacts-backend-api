//controller..performing the logics
const asyncHandler = require('express-async-handler');
const Contact = require('../models/contactsModel');


const getContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find({ user_id: req.user.id });
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
        email,
        user_id: req.user.id
    })

    res.json(contact);
});

const updateContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error('Not Found');
    }

    if (contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error('Not authourized')
    }

    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    res.json(updatedContact)
});

const deleteContact = asyncHandler(async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);
        if (!contact) {
            res.status(404).json({ message: 'Not Found' });
            return;
        }
        
        if (contact.user_id.toString() !== req.user.id) {
            res.status(403);
            throw new Error('Not authorized');
        }

        await Contact.deleteOne({ _id: req.params.id });
        res.status(200).json({ message: 'Deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = {
    getContacts,
    getContact,
    createContact,
    updateContact,
    deleteContact
};