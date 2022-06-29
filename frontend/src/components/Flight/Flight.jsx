import axios from 'axios';
export const Flight = ({flightNumber, departureDate, arrivalDate, departureTime, arrivalTime, departureAirport, arrivalAirport, passengerLimit, currNumPassengers}) => {

    const handleClick = (event) => {
        axios.delete(`http://localhost:8080/flights/${flightNumber}`,
                        { flightNumber })
                        .then(() => {
                            window.location.reload();
                            alert("Flight " + flightNumber  + " deleted");
                        })
                        .catch(err => {
                            window.location.reload();
                            alert(err.response.data.message);
                        });
    }

    return (
        <article>

            <h2>{flightNumber}</h2>
            <h4>Departure Date: {departureDate}</h4>
            <h4>Departure Time: {departureTime}</h4>
            <h4>Arrival Date: {arrivalDate}</h4>
            <h4>Arrival Time: {arrivalTime}</h4>
            <h4>Departing From: {departureAirport}</h4>
            <h4>Arriving From: {arrivalAirport}</h4>
            <h4>Seats Remaining: {passengerLimit-currNumPassengers}/{passengerLimit}</h4>

            <button className="flight-delete" onClick={handleClick}>Delete Flight</button>
        </article>
    );
}
