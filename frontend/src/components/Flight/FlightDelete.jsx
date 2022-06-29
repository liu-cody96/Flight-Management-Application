import axios from 'axios';

export const FlightDeleteButton = () => {

    const handleClick = (event) => {
        axios.delete('http://localhost:8080/flights',
                        { flightNumber: flightNumRef.current.value,
                            departure: departureRef.current.value,
                            arrival: arrivalRef.current.value,
                            departureAirport: departureAirportRef.current.value,
                            arrivalAirport: arrivalAirportRef.current.value,
                            passengerLimit: passengerLimitRef.current.value,
                            currNumPassengers: currPassengersRef.current.value
                        })
                        .then(() => {
                            navigate('../new', {replace: true});
                            alert("Flight " + flightNumRef.current.value  + " deleted");
                        })
                        .catch(err => {
                            navigate('../new', {replace: true});
                            alert(err.response.data.message);
                        });
    }

    return (
        <button class="flight-delete">Delete Flight</button>
    );
}
