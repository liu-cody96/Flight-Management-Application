import { Flight } from "../components/Flight/Flight";
import axios from 'axios';
import { useEffect, useState } from 'react';

export const GetFlights = () => {

    const [flights, setFlights] = useState([]);

    const updateFlights = () => {
        axios.get('http://localhost:8080/flights')
        .then(res => setFlights(res.data));
    }

    useEffect(() => {
        updateFlights();
    }, []);

    return (
        <>
            <div>
                {/* Transform the movies array into an array of JSX elements */}
                {flights.map((flight, index) => {
                    // For our keys, we should use some unique property for the key value
                    // Using index is a last resort if you have nothing else to use
                    // Unique ids should be used ONLY if the id was created at time of data creation (It won't change)
                    return (
                        <Flight key={flight._id} flightNumber={flight.flightNumber} departure={flight.departure} arrival={flight.arrival} departureAirport={flight.departureAirport} arrivalAirport={flight.arrivalAirport} passengerLimit={flight.passengerLimit} currNumPassengers={flight.currNumPassengers}>
                        </Flight>
                    );
                })}
            </div>



        </>
    );
}
