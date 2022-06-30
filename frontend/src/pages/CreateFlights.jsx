import { useRef, useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Form } from '../components/Form/Form';

export const CreateFlights = () => {

    const flightNumRef = useRef();
    const departureRef = useRef();
    const arrivalRef = useRef();
    const departureAirportRef = useRef();
    const arrivalAirportRef = useRef();
    const passengerLimitRef = useRef();
    const currPassengersRef = useRef();
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:8080/flights',
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
                            alert("Flight " + flightNumRef.current.value  + " created");
                        })
                        .catch(err => {
                            navigate('../new', {replace: true});
                            alert(err.response.data.message);
                        });
    }

    return (
        <>
        <Form>
            <form onSubmit={handleSubmit} style = {{border: "1px black", borderRadius: "3px"}}>
                <label htmlFor="flight-number">Flight Number:</label>
                <div>
                    <input type="number" id="flight-number" name="flight-number" min="0" ref={flightNumRef} required />
                </div>

                <label htmlFor="departure-time">Flight departure:</label>
                <div>
                    <input type="datetime-local" id="departure-time" name="departure-time" ref={departureRef} required />
                </div>

                <label htmlFor="arrival-time">Flight arrival:</label>
                <div>
                    <input type="datetime-local" id="arrival-time"name="arrival-time" ref={arrivalRef} required/>
                </div>


                <label htmlFor="departure-airport">Departure Airport</label>
                <div>
                    <input type="text" list="departure-airports" name="departure-airport" id="departure-airport" ref={departureAirportRef} required/>
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
                    <input type="text" list="arrival-airports" name="arrival-airport" id="arrival-airport" ref={arrivalAirportRef} required/>
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
                    <input type="number" id="flight-capacity" name="flight-capacity" min="1" ref={passengerLimitRef} required/>
                </div>

                <label htmlFor="flight-passengers">Current Passenger Total:</label>
                <div>
                    <input type="number" id="flight-passengers" name="flight-passengers" min="0" ref={currPassengersRef} required/>
                </div>
                <div>
                    <input type="submit" value="Add Flight" />
                </div>
            </form>
            </Form>
        </>
    );
}
