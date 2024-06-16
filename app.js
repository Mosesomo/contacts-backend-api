const express = require('express');
const connectDb = require('./config/dbConnection');
const body_parser = require('body-parser');
const dotenv = require('dotenv').config();
const errorHandler = require('./middleware/errorHandler');

connectDb();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/contacts', require('./routes/contactsRouts'));
app.use('/api/users', require('./routes/userRoute'));
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server running on port ${port}...`)
})