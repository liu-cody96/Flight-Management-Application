const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create a flight schema
const flightSchema = new Schema({
    flightNumber: {
        type: String,
        required: true
    },
    departure: {
        type: Date,
        required: true,

    },
    arrival: {
        type: Date,
        required: true,

    },
    departureAirport: {
        type: String,
        required: true,
        enum: {
            values: ["DTW", "LGA", "MDW", "ORD","CHI", "SFO", "OAK"],
            message: "Must be a valid airport"
        }
    },
    arrivalAirport: {
        type: String,
        required: true,
        enum: {
            values: ["DTW", "LGA", "MDW", "ORD","CHI","SFO", "OAK"],
            message: "Must be a valid airport"
        }
    },
    passengerLimit: {
        type: Number,
        required: true,
        min: [1, 'Plane must be able to take at least 1 passenger']
    },
    currNumPassengers: {
        type: Number,
        required: true,
        min: [0, "Plane cannot have fewer than 0 passengers"]
    }

});

// TODO:  add more validation for other fields. mainly make sure that departure times go after arrival times

const Flight = mongoose.model('Flight', flightSchema, 'Flights');
module.exports = Flight;
