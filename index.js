const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');


const app = express();
const PORT = process.env.PORT || 8080; // default to 8080
const Flight = require('./models/Flight.model.js');

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

// connect to database
connectToDB();

// start app
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());
app.listen(PORT, () => {
    console.log(`Server running on port ${ PORT }`)
});

// establish routes
app.get('/', (req,res) => {
    res.sendFile(__dirname + '/views/index.html');
})

app.get('/flights/:id', (req, res) => {
    res.send(`GET flight by ${req.params.id}`);
})

app.get('/flights', async (req, res) => {
    const movies = await findAllFlights();
    res.json(movies);
});

app.post('/flights', (req, res) => {
    console.log(req.body);
    /*
    try {
        // req contains post request data. createFlight deconstructs body so you can just pass in req.body here
        console.log(req.body)
        const flightId = await createFlight(req.body);
        res.status(201).json({_id: flightId}); // 201 indicates successful resource creation

    } catch (err) {
        console.log(err);
        // if request fails...return 5OO
        res.status(err?.status || 500).json(err);
    }
    */
   res.redirect(201, '/');
});

app.delete('/flights/:id', (req, res) => {
    res.send(`DELETE flight with ${req.params.id}`);
});

app.put('/flights/:id', (req, res) => {
    res.send(`PUT flight with ${req.params.id}`);
});

app.all('*', (req,res) => {
    res.status(404).send("we dont have the route you\'re looking for");
})
