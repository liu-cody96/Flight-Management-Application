import { TableRow, TableCell } from '@mui/material';
import {Stack, Button} from "@mui/material";
import axios from 'axios';

export const ReadOnlyRow = ({flights, setFlights, flight, handleClickEdit}) => {
    const handleDelete = (flightNumber) => {
        axios.delete(`http://localhost:8080/flights/${flightNumber}`,
                        { flightNumber })
                        .then((res) => {
                            alert("Flight " + flightNumber  + " deleted");
                            let newFlights = [];
                            for (let flight of flights) {
                                if (flight.flightNumber !== flightNumber) {
                                    newFlights.push(flight)
                                }
                            }
                            setFlights(newFlights);
                        })
                        .catch(err => {
                            alert(err.response.data.message);
                        });
    }
    return (
        <>
        <TableRow sx={{ '&:last-child td, &:last-child th': {border: 0}}}>
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
                    <Button variant='contained' size="small" color='primary' onClick={(event)=>handleClickEdit(event,flight)}>Edit</Button>
                    <Button variant='contained' size="small" color='error'onClick={() => handleDelete(flight.flightNumber)}>Delete</Button>
                </Stack>
            </TableCell>
        </TableRow>
        </>
    );
}
