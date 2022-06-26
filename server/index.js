const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const { createFlight, findAllFlights, deleteFlight, findOneFlight, updateFlight } = require('./controllers/flight.controller');


const app = express();
const PORT = process.env.PORT || 8080; // default to 8080
app.use(express.json());
app.use(cors());

const Flight = require('./models/Flight.model.js');
const flightRouter =  require('./routes/flight.route.js');

// connect to database
const connectToDB = async () => {
    try {
        const result = await mongoose.connect(process.env.MONGO_URI);
        console.log("connected to db")
    }
    catch (err) {
        console.error(err);
        process.exit(1);

    }
}

// connect to database
connectToDB();

// start app
app.use('/flights', flightRouter);
app.listen(PORT, () => {
    console.log(`Server running on port ${ PORT }`)
});

// establish routes

app.get('/', (req,res) => {
    console.log('request made to home page');
    res.status(200);
})

app.all('*', (req,res) => {
    res.status(404).send("we dont have the route you\'re looking for");
})
