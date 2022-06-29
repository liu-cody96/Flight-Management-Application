import { Flight } from "../components/Flight/Flight";
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Center } from '../components/StylePractice/StyledComponents';


export const GetFlights = () => {

    const [flights, setFlights] = useState([]);
    const [count, setCount] = useState(0);
    const [flightsPluralOrSingle, setflightsPluralOrSingle] = useState("flights");

    const getFlights = () => {
        axios.get('http://localhost:8080/flights')
        .then((res) => {
            setFlights(res.data);
            setCount(res.data.length);
            if (res.data.length === 1) {
                setflightsPluralOrSingle("flight");
            }
            else {
                setflightsPluralOrSingle("flights");
            }
        });
    }

    useEffect(() => {
        getFlights();
    }, []);

    return (
        <>
        <div>
            <Center><h2>{count} {flightsPluralOrSingle} to display.</h2></Center>

        </div>
        <div>
            {/* Transform the movies array into an array of JSX elements */}
            {flights.map((flight, index) => {
                // For our keys, we should use some unique property for the key value
                // Using index is a last resort if you have nothing else to use
                // Unique ids should be used ONLY if the id was created at time of data creation (It won't change)
                return (
                    <Flight key={flight._id} flightNumber={flight.flightNumber} departureDate={flight.departureDate} departureTime={flight.departureTime} arrivalDate={flight.arrivalDate} arrivalTime={flight.arrivalTime} departureAirport={flight.departureAirport} arrivalAirport={flight.arrivalAirport} passengerLimit={flight.passengerLimit} currNumPassengers={flight.currNumPassengers}>
                    </Flight>
                );
            })}
        </div>



        </>
    );
}
