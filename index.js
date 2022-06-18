const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8080; // default to 8080
const Flight = require('./models/Flight.model.js');

app.use('/flights', require('./routes/flight.route.js'));


// connect to database
const connectToDB = async () => {
    try {
        const result = await mongoose.connect(process.env.MONGO_URI);
        console.log("connected to db")
    }
    catch {
        console.error(result);
        process.exit(1);

    }
}

// connect to database & start app
connectToDB();

app.listen(PORT, () => {
    console.log(`Server running on port ${ PORT }`)
})
