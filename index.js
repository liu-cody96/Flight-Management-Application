const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const { createFlight, findAllFlights, deleteFlight, findOneFlight, updateFlight } = require('./controllers/flights.controller');
const app = express();
const PORT = process.env.PORT || 8080; // default to 8080
const Flight = require('./models/Flight.model.js');
const ejs = require('ejs');


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
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());
app.listen(PORT, () => {
    console.log(`Server running on port ${ PORT }`)
});

// establish routes
app.get('/', (req,res) => {
    res.render('index');
})

// just do simple delete and put. modify get to be a search functionality sort of thing
app.get('/flights', async (req, res) => {
    try {
        const flights = await findAllFlights();
        res.render('flights', {
            flightsList: flights
        });
    } catch (err) {
        console.log(err);
        // if request fails...return 5OO
        res.status(err?.status || 500).json(err);
    }
});


app.post('/flights', async (req, res) => {
    try {
        // req contains post request data. createFlight deconstructs body so you can just pass in req.body here
        console.log(req.body)
        const flightId = await createFlight(req.body);
        res.status(201);

    } catch (err) {
        console.log(err);
        // if request fails...return 5OO
        res.status(err?.status || 500).json(err);
    }

});



app.post('/delete/:id', async (req, res) => {
    try {
        const deleted = await deleteFlight(req.params.id);
        const flights = await findAllFlights();
        res.render('flights', {
            flightsList: flights
        });
    } catch (err) {
        console.log(err);
        // if request fails...return 5OO
        res.status(err?.status || 500).json(err);
    }

});

app.get('/updates/:id', async (req, res) => {
    try {
        const flight = await findOneFlight(req.params.id);
        console.log(flight);
        res.render('updates', {
            flightData: flight[0]
        });
    } catch (err) {
        console.log(err);
        // if request fails...return 5OO
        res.status(err?.status || 500).json(err);
    }

});

app.post('/updates/:id/edit', async (req, res) => {
    try {
        const newFlight = await updateFlight(req.params.id, req.body);
        res.status(201);

    } catch (err) {
        console.log(err);
        // if request fails...return 5OO
        res.status(err?.status || 500).json(err);
    }
})

app.all('*', (req,res) => {
    res.status(404).send("we dont have the route you\'re looking for");
})
