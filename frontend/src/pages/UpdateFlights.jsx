import { useRef, useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {Form } from '../components/Form/Form';
import { useLocation} from "react-router-dom";

export const UpdateFlights = (props) => {

    const flightNumRef = useRef();
    const departureRef = useRef();
    const arrivalRef = useRef();
    const departureAirportRef = useRef();
    const arrivalAirportRef = useRef();
    const passengerLimitRef = useRef();
    const currPassengersRef = useRef();
    const navigate = useNavigate();

    const location = useLocation();

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.put('http://localhost:8080/flights',
                        { flightNumber: flightNumRef.current.value,
                            departure: departureRef.current.value,
                            arrival: arrivalRef.current.value,
                            departureAirport: departureAirportRef.current.value,
                            arrivalAirport: arrivalAirportRef.current.value,
                            passengerLimit: passengerLimitRef.current.value,
                            currNumPassengers: currPassengersRef.current.value
                        })
                        .then(() => {
                            navigate('../update', {replace: true});
                            alert("Flight " + flightNumRef.current.value  + " updated");
                        })
                        .catch(err => {
                            navigate('../update', {replace: true});
                            alert(err.response.data.message);
                        });
    }

    return (
        <>
        <Form>
            <form className="MyForm" onSubmit={handleSubmit} >
                <div>
                    <h2>Editing Flight Number: {location.state.flightNumber}</h2>
                </div>
                <br></br>
                <label htmlFor="departure-time">Flight departure:</label>
                <div>
                    <input type="datetime-local" id="departure-time" name="departure-time" defaultValue={location.state.flightDeparture} ref={departureRef} required />
                </div>

                <label htmlFor="arrival-time">Flight arrival:</label>
                <div>
                    <input type="datetime-local" id="arrival-time"name="arrival-time" defaultValue={location.state.flightArrival} ref={arrivalRef} required/>
                </div>


                <label htmlFor="departure-airport">Departure Airport</label>
                <div>
                    <input type="text" list="departure-airports" name="departure-airport" id="departure-airport" defaultValue={location.state.departureAirport} ref={departureAirportRef} required/>
                    <datalist id="departure-airports">
                        <option value="DTW"/>
                        <option value="LGA"/>
                        <option value="MDW"/>
                        <option value="ORD"/>
                        <option value="CHI"/>
                        <option value="SFO"/>
                        <option value="OAK"/>
                    </datalist>
                </div>

                <label htmlFor="arrival-airport">Arrival Airport</label>
                <div>
                    <input type="text" list="arrival-airports" name="arrival-airport" id="arrival-airport" defaultValue = {location.state.arrivalAirport} ref={arrivalAirportRef} required/>
                    <datalist id="arrival-airports">
                        <option value="DTW"/>
                        <option value="LGA"/>
                        <option value="MDW"/>
                        <option value="ORD"/>
                        <option value="CHI"/>
                        <option value="SFO"/>
                        <option value="OAK"/>
                    </datalist>
                </div>

                 <label htmlFor="flight-capacity">Flight Capacity:</label>
                 <div>
                    <input type="number" id="flight-capacity" name="flight-capacity" min="1" defaultValue={location.state.passengerLimit} ref={passengerLimitRef} required/>
                </div>
                <label htmlFor="flight-passengers">Current Passenger Total:</label>
                <div>
                    <input type="number" id="flight-passengers" name="flight-passengers" min="0" defaultValue={location.state.currNumPassengers} ref={currPassengersRef} required/>
                </div>
                <div>
                    <input type="submit" value="Submit Edit" />
                </div>
            </form>
        </Form>
        </>
    );
}
