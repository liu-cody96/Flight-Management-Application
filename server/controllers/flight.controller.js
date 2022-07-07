// import Flight model
const Flight = require('../models/Flight.model.js');

// create and return a Flight object for the Flight MongoDB Schema based on inputs
const createFlightObject = (formDataBody) => {
    flightNumber = formDataBody["flightNumber"];
    departure = formDataBody['departure'];
    arrival = formDataBody['arrival'];
    departureAirport = formDataBody['departureAirport'];
    arrivalAirport = formDataBody['arrivalAirport'];
    passengerLimit = formDataBody['passengerLimit'];
    currNumPassengers = formDataBody['currNumPassengers'];

    // parse departure into departureTime and departureDate, and parse arrival into arrivalTime and arrivalDate
    // split a string like '2022-06-27T22:56' into ['2022-06-27','22:56']
    departureArr = departure.split('T');
    departureDate = departureArr[0];
    departureTime = departureArr[1];
    arrivalArr = arrival.split('T');
    arrivalDate = arrivalArr[0];
    arrivalTime = arrivalArr[1];

    const newFlight = {
        flightNumber,
        departureDate,
        arrivalDate,
        departureTime,
        arrivalTime,
        departureAirport,
        arrivalAirport,
        passengerLimit,
        currNumPassengers
    };

    return newFlight;
}

const validateFormData = (formDataBody) => {
    flightNumber = formDataBody["flightNumber"];
    departure = formDataBody['departure'];
    arrival = formDataBody['arrival'];
    departureAirport = formDataBody['departureAirport'];
    arrivalAirport = formDataBody['arrivalAirport'];
    passengerLimit = formDataBody['passengerLimit'];
    currNumPassengers = formDataBody['currNumPassengers'];

    // if arrivalDate before departureDate or arrivalTime @/before departureTime, throw an error
    if (departure >= arrival) {
        throw "ERROR: Departure Time must come before Arrival Time.";
    }

    // arrival airport must be different from departureAirport
    if (departureAirport === arrivalAirport) {
        throw "ERROR: Arrival Airport must be different from Departure Airport";
    }

    // if currNumPassengers > passengerLimit, throw an error
    if (parseInt(currNumPassengers) > parseInt(passengerLimit)) {
        throw "ERROR: Too many passengers on this flight, not enough seats.";
    }

}



const createFlight = async (formData) => {

    try {

        flightNumber = formData["flightNumber"];
        const duplicateFlight = await Flight.findOne({flightNumber});
        if (duplicateFlight) {
            throw "ERROR: This flight number is already in use. Cannot have duplicates.";
        }
        validateFormData(formData);
        let flight = new Flight(createFlightObject(formData));
        await flight.save();
        return flight._id;

    }

    catch (err) {
        throw { status: 400, message: err};
    }
}

const findAllFlights = async() => {
    const flights = await Flight.find();
    return flights;
}


const deleteFlight = async(flightNumber) => {
    const deleted = await Flight.deleteOne({flightNumber});
    return deleted;
}


const updateFlight = async (formData) => {

    try {
        updateFlightNum = formData["flightNumber"];
        const flightFound = await Flight.findOne({flightNumber: updateFlightNum});


        if (flightFound === null) {
            let errMsg = `ERROR: Cannot update Flight ${updateFlightNum} as it does not exist.`
            throw errMsg;
        }

        validateFormData(formData);
        const opts = { new: true };
        const updatedFlightData = createFlightObject(formData);

        const updatedFlight = await Flight.findOneAndUpdate({ flightNumber: updateFlightNum } , updatedFlightData, opts);

        return updatedFlight;
    }

    catch (err) {
        throw { status: 400, message: err};
    }

}

module.exports = { createFlight, updateFlight, findAllFlights, deleteFlight};
