import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper } from '@mui/material';
import {Stack, Button} from "@mui/material";
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export const GetFlights = () => {


    const [flights, setFlights] = useState([]);
    const [formValues, setFormValues] = useState({});
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
          ...formValues,
          [name]: value,
        });
      };


    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:8080/flights',
                        { flightNumber: formValues["flightNumber"],
                            departure: formValues["departure"],
                            arrival: formValues["arrival"],
                            departureAirport: formValues["departureAirport"],
                            arrivalAirport: formValues["arrivalAirport"],
                            passengerLimit: formValues["passengerLimit"],
                            currNumPassengers: formValues["currNumPassengers"]
                        })
                        .then(() => {
                            alert("Flight " + formValues["flightNumber"]  + " created");
                        })
                        .catch(err => {
                            alert(err.response.data.message);
                        });
    }


    const getFlights = () => {
        axios.get('http://localhost:8080/flights')
        .then((res) => {
            setFlights(res.data);
        });
    }

    useEffect(() => {
        getFlights();

    }, []);

    const handleDelete = (flightNumber) => {
        axios.delete(`http://localhost:8080/flights/${flightNumber}`,
                        { flightNumber })
                        .then(() => {
                            window.location.reload();
                            alert("Flight " + flightNumber  + " deleted");
                        })
                        .catch(err => {
                            alert(err.response.data.message);
                        });
    }

    const navigateToUpdate = (inputs) => {
        navigate("/update", {
            state: {
                flightNumber: inputs.flightNumber,
                arrival: inputs.arrivalDate + "T" + inputs.arrivalTime,
                departure: inputs.departureDate + "T" + inputs.departureTime,
                departureAirport: inputs.departureAirport,
                arrivalAirport: inputs.arrivalAirport,
                passengerLimit: inputs.passengerLimit,
                currNumPassengers: inputs.currNumPassengers
            },
        });
    };



    return (
        <>
        <div style={{padding: '15px'}}>
            <Accordion>
                    <AccordionSummary
                    id='panel1-header'
                    aria-controls='panel1-content'
                    expandIcon = {<ExpandMoreIcon/>}>
                        <Typography>Add New Flight</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <form id="myForm" onSubmit={handleSubmit}>
                            <Stack spacing={2}>
                                <Stack spacing={2} direction='row'>
                                    <label htmlFor="flight-number">Flight Number:</label>
                                    <input label='Flight Number' id='flight-number' name="flightNumber" value={formValues.name} type="number" min="0" onChange={handleInputChange} required/>
                                    <label htmlFor="flight-capacity">Flight Capacity:</label>
                                    <input type="number" id="flight-capacity" name="passengerLimit" min="1" value={formValues.name} onChange={handleInputChange} required/>
                                    <label htmlFor="flight-passengers">Current Passenger Total:</label>
                                    <input type="number" id="flight-passengers" name="currNumPassengers" min="0" value={formValues.name} onChange={handleInputChange} required/>
                                </Stack>
                                <Stack spacing={2} direction='row'>
                                    <label htmlFor="departure-time">Flight departure:</label>
                                    <input type="datetime-local" id="departure-time" name="departure" value={formValues.name} onChange={handleInputChange} required />
                                    <label htmlFor="arrival-time">Flight arrival:</label>
                                    <input type="datetime-local" id="arrival-time"name="arrival" value={formValues.name} onChange={handleInputChange} required/>
                                </Stack>
                                <Stack spacing={2} direction='row'>
                                    <label htmlFor="departure-airport">Departure Airport:</label>
                                    <input type="text" list="departure-airports" name="departureAirport" id="departure-airport" value={formValues.name} onChange={handleInputChange} required/>
                                    <datalist id="departure-airports">
                                        <option value="DTW"/>
                                        <option value="LGA"/>
                                        <option value="MDW"/>
                                        <option value="ORD"/>
                                        <option value="CHI"/>
                                        <option value="SFO"/>
                                        <option value="OAK"/>
                                    </datalist>
                                    <label htmlFor="arrival-airport">Arrival Airport:</label>
                                    <input type="text" list="arrival-airports" name="arrivalAirport" id="arrival-airport" value={formValues.name} onChange={handleInputChange} required/>
                                    <datalist id="arrival-airports">
                                        <option value="DTW"/>
                                        <option value="LGA"/>
                                        <option value="MDW"/>
                                        <option value="ORD"/>
                                        <option value="CHI"/>
                                        <option value="SFO"/>
                                        <option value="OAK"/>
                                    </datalist>
                                    <Button variant="contained" color="primary" type="submit">Submit</Button>
                                    <Button variant="contained" color="secondary" onClick={() => document.getElementById("myForm").reset()}>Clear</Button>
                                </Stack>


                            </Stack>
                        </form>
                    </AccordionDetails>

            </Accordion>
        </div>

        <div style={{padding: '15px'}}>
            <TableContainer component={Paper} sx={{maxHeight: '75vh'}}>
                    <Table aria-label='simple-table' stickyHeader>
                        <TableHead>
                            <TableRow>
                                <TableCell>Flight Number</TableCell>
                                <TableCell width='100px'>Departure Date</TableCell>
                                <TableCell>Departure Time (24-hour clock)</TableCell>
                                <TableCell width='100px'>Arrival Date</TableCell>
                                <TableCell>Arrival Time (24-hour clock)</TableCell>
                                <TableCell>Departing From</TableCell>
                                <TableCell>Arriving From</TableCell>
                                <TableCell>Seats Remaining</TableCell>
                                <TableCell align='center'>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                flights.map(flight => (
                                    <TableRow key={flight._id} sx={{ '&:last-child td, &:last-child th': {border: 0}}}>
                                        <TableCell>{flight.flightNumber}</TableCell>
                                        <TableCell>{flight.departureDate}</TableCell>
                                        <TableCell>{flight.departureTime}</TableCell>
                                        <TableCell>{flight.arrivalDate}</TableCell>
                                        <TableCell>{flight.arrivalTime}</TableCell>
                                        <TableCell>{flight.departureAirport}</TableCell>
                                        <TableCell>{flight.arrivalAirport}</TableCell>
                                        <TableCell>{flight.passengerLimit - flight.currNumPassengers}/{flight.passengerLimit}</TableCell>
                                        <TableCell>
                                            <Stack spacing={.5} direction='row'>
                                                <Button variant='contained' size="small" color='primary' onClick={() => navigateToUpdate({
                                                        flightNumber: flight.flightNumber,
                                                        arrivalDate: flight.arrivalDate,
                                                        arrivalTime: flight.arrivalTime,
                                                        departureDate: flight.departureDate,
                                                        departureTime: flight.departureTime,
                                                        departureAirport: flight.departureAirport,
                                                        arrivalAirport: flight.arrivalAirport,
                                                        passengerLimit: flight.passengerLimit,
                                                        currNumPassengers: flight.currNumPassengers
                                                    })}>Edit</Button>
                                                <Button variant='contained' size="small" color='error'onClick={() => handleDelete(flight.flightNumber)}>Delete</Button>

                                            </Stack>
                                         </TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>


        </>
    );
}
