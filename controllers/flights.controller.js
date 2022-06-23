// import Flight model
const Flight = require('../models/Flight.model.js');

const createFlight = async (req) => {
    flightNumber = req["flight-number"];
    departure = req['departure-time'];
    arrival = req['arrival-time'];
    departureAirport = req['departure-airport'];
    arrivalAirport = req['arrival-airport'];
    passengerLimit = req['flight-capacity'];
    currNumPassengers = req['flight-passengers'];

    try {
        // if arrivalDate before departureDate or arrivalTime @/before departureTime, throw an error
        if (departure >= arrival) {
            throw "Departure Time must come before Arrival Time.";
        }

        // arrival airport must be different from departureAirport
        if (departureAirport === arrivalAirport) {
            throw "Arrival Airport must be different from Departure Airport";
        }

        // if currNumPassengers > passengerLimit, throw an error
        if (parseInt(currNumPassengers) > parseInt(passengerLimit)) {
            throw "Too many passengers on this flight, not enough seats.";
        }

        const duplicateFlight = await Flight.findOne({flightNumber});

        if (duplicateFlight) {
            throw "This flight number is already in use. Cannot have duplicates."
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

const findOneFlight = async(flightNumber) => {
    const flight = await Flight.find({flightNumber});
    return flight;
}


const findAllFlights = async() => {
    const flights = await Flight.find(); // get all flights
    return flights;
    // TODO: implement filtering functionality
    // {flightNumber: { $in: ids}}
}

const deleteFlight = async(flightNumber) => {
    const flights = await Flight.deleteOne({flightNumber});
    return flights;

}

const updateFlight = async (originalFlightNum, req) => {
    flightNumber = req["flight-number"];
    departure = req['departure-time'];
    arrival = req['arrival-time'];
    departureAirport = req['departure-airport'];
    arrivalAirport = req['arrival-airport'];
    passengerLimit = req['flight-capacity'];
    currNumPassengers = req['flight-passengers'];

    update = {
        flightNumber: req["flight-number"],
        departure: req['departure-time'],
        arrival: req['arrival-time'],
        departureAirport: req['departure-airport'],
        arrivalAirport: req['arrival-airport'],
        passengerLimit: req['flight-capacity'],
        currNumPassengers: req['flight-passengers']
    }

    try {
        // if arrivalDate before departureDate or arrivalTime @/before departureTime, throw an error
        if (departure >= arrival) {
            throw "Departure Time must come before Arrival Time.";
        }

        // arrival airport must be different from departureAirport
        if (departureAirport === arrivalAirport) {
            throw "Arrival Airport must be different from Departure Airport";
        }

        // if currNumPassengers > passengerLimit, throw an error
        if (parseInt(currNumPassengers) > parseInt(passengerLimit)) {
            throw "Too many passengers on this flight, not enough seats.";
        }

        const original = { flightNumber: String(originalFlightNum)};
        const opts = { new: true };

        Flight.findOneAndUpdate({flightNumber: {$eq:String(originalFlightNum)} },
            update, opts, function (err, docs) {
            if (err){
                throw(err);
            }
            else{
                return docs;
            }
        });

    }

    catch (err) {
        throw { status: 400, message: err};
    }
}

module.exports = { createFlight, findAllFlights, deleteFlight, findOneFlight, updateFlight};
