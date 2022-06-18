const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create a flight schema
const flightSchema = new Schema({
    flightNumber: {
        type: String,
        required: true
    },
    departureDate: {
        type: Date,
        required: true
    },
    arrivalDate: {
        type: Date,
        required: true
    },
    departureTime: {
        type: Date,
        required: true
    },
    arrivalTime: {
        type: Date,
        required: true
    },
    departureAirport: {
        type: String,
        required: true
    },
    arrivalAirport: {
        type: String,
        required: true
    },
    passengerLimit: {
        type: Number,
        required: true,
        min: [1, 'Plane must be able to take at least 1 passenger']
    },
    currNumPassengers: {
        type: Number,
        required: true,
        min: [0, "Plane cannot have fewer than 0 passengers"],
        validator: [passengerLimitValidator = (value) => { return value <= this.passengerLimit }, "Number of passengers cannot exceed plane's capacity"]
    }
});

// TODO:  add more validation for other fields. mainly make sure that departure times go after arrival times

const Flight = mongoose.model('Flight', flightSchema, 'Flights');
module.exports = Flight;
