import axios from 'axios';
import { FlightContainer } from './FlightContainer';
import { FlightUpdateButton} from './FlightUpdateButton';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";


export const Flight = ({flightNumber, departureDate, arrivalDate, departureTime, arrivalTime, departureAirport, arrivalAirport, passengerLimit, currNumPassengers}) => {
    const navigate = useNavigate();
    const handleDelete = (event) => {
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

    const navigateToUpdate = () => {
        navigate("/update", {
            state: {
                flightNumber: flightNumber,
                arrival: arrivalDate + "T" + arrivalTime,
                departure: departureDate + "T" + departureTime,
                departureAirport: departureAirport,
                arrivalAirport: arrivalAirport,
                passengerLimit: passengerLimit,
                currNumPassengers: currNumPassengers
            },
        });
    };

    return (
        <FlightContainer margin='15px'>
            <div>
                <h4>{flightNumber}</h4>
            </div>

            <div>
                <p>Departure Date: {departureDate}</p>
                <p>Departure Time: {departureTime}</p>
                <p>Arrival Date: {arrivalDate}</p>
                <p>Arrival Time: {arrivalTime}</p>
                <p>Departing From: {departureAirport}</p>
                <p>Arriving From: {arrivalAirport}</p>
                <p>Seats Remaining: {passengerLimit-currNumPassengers}/{passengerLimit}</p>
                <div>
                    <button className="flight-delete" onClick={handleDelete}>Delete Flight</button>
                </div>
                <div>
                    <button onClick={navigateToUpdate}>Update Flight</button>
                </div>


            </div>


        </FlightContainer>
    );
}
