// import Movie model
const Flight = require('../models/Flight.model.js');

const createFlight = async ({flightNumber, departure, arrival, departureAirport, arrivalAirport, passengerLimit, currNumPassengers}) => {
    try {

        // if arrivalDate before departureDate or arrivalTime @/before departureTime, throw an error
        if (departure >= arrival) {
            throw "Departure Time must come before Arrival Time.";
        }

        // if currNumPassengers > passengerLimit, throw an error
        if (currNumPassengers > passengerLimit) {
            throw "Too many passengers on this flight, not enough seats.";
        }

        // arrival airport must be different from departureAirport
        if (departureAirport === arrivalAirport) {
            throw "Arrival Airport must be different from Departure Airport";
        }

        const flight = new Flight({
            flightNumber,
            departure,
            arrival,
            departureAirport,
            arrivalAirport,
            passengerLimit,
            currNumPassengers
        });
        await flight.save();

        return flight._id;
    }

    catch (err) {
        throw { status: 400, message: err};
    }
}

const findAllFlights = async(limit = 0) => {
    const flights = await Flight.find(); // get all flights
    return flights;
}

module.exports = { createFlight, findAllFlights};
