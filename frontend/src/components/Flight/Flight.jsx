import { Center } from "../StylePractice/StyledComponents";

export const Flight = ({flightNumber, departure, arrival, departureAirport, arrivalAirport, passengerLimit, currNumPassengers}) => {
    return (
        <article>

            <h2>{flightNumber}</h2>
            <h4>Departure Date/Time: {departure}</h4>
            <h4>Arrival Date/Time: {arrival}</h4>
            <h4>Departing From: {departureAirport}</h4>
            <h4>Arriving From: {arrivalAirport}</h4>
            <h4>Seats Remaining: {passengerLimit-currNumPassengers}</h4>

        </article>
    );
}
