import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { FrontPageHeader } from "../components/FrontPageHeader/FrontPageHeader";
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper } from '@mui/material';
import {Stack, Button} from "@mui/material";

export const GetFlights = () => {

    const [flights, setFlights] = useState([]);
    const [count, setCount] = useState(0);
    const [flightsPluralOrSingle, setflightsPluralOrSingle] = useState("flights");
    const navigate = useNavigate();

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

    const handleDelete = (flightNumber) => {
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
        <div>
            <FrontPageHeader><h2>{count} {flightsPluralOrSingle} to display.</h2></FrontPageHeader>

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
