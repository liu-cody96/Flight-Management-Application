import { TableRow, TableCell } from '@mui/material';
import {Stack, Button} from "@mui/material";

export const EditableRow = ({flight, handleEditFormChange}) => {

    return (
        <>
            <TableRow sx={{ '&:last-child td, &:last-child th': {border: 0}}}>
                <TableCell>{flight.flightNumber}</TableCell>
                <TableCell><input type="date" name="departureDate" defaultValue={flight.departureDate} onChange={handleEditFormChange} required /></TableCell>
                <TableCell><input type="time" name="departureTime" defaultValue={flight.departureTime} onChange={handleEditFormChange} required /></TableCell>
                <TableCell><input type="date" name="arrivalDate" defaultValue={flight.arrivalDate} onChange={handleEditFormChange} required/></TableCell>
                <TableCell><input type="time" name="arrivalTime" defaultValue={flight.arrivalTime} onChange={handleEditFormChange} required/></TableCell>
                <TableCell><input type="text" list="departure-airports" name="departureAirport" id="departure-airport" defaultValue={flight.departureAirport} onChange={handleEditFormChange} required/>
                    <datalist id="departure-airports">
                        <option value="DTW"/>
                        <option value="LGA"/>
                        <option value="MDW"/>
                        <option value="ORD"/>
                        <option value="CHI"/>
                        <option value="SFO"/>
                        <option value="OAK"/>
                    </datalist>
                </TableCell>
                <TableCell>
                    <input type="text" list="arrival-airports" name="arrivalAirport" id="arrival-airport" defaultValue={flight.arrivalAirport} onChange={handleEditFormChange} required/>
                    <datalist id="arrival-airports">
                        <option value="DTW"/>
                        <option value="LGA"/>
                        <option value="MDW"/>
                        <option value="ORD"/>
                        <option value="CHI"/>
                        <option value="SFO"/>
                        <option value="OAK"/>
                    </datalist>
                </TableCell>
                <TableCell>
                    <label htmlFor="flight-capacity">Flight Capacity:</label>
                    <input type="number" id="flight-capacity" name="passengerLimit" min="1" defaultValue={flight.passengerLimit} onChange={handleEditFormChange} required/>

                    <label htmlFor="flight-passengers">Current Passenger Total:</label>
                    <input type="number" id="flight-passengers" name="currNumPassengers" min="0" defaultValue={flight.currNumPassengers} onChange={handleEditFormChange} required/>
                </TableCell>
                <TableCell>
                <Stack spacing={.5} direction='row'>
                    <Button variant='outlined' size="small" color='success' type="submit">Save</Button>
                    <Button variant='outlined' size="small" color='error' onClick={(event) => {console.log('as')}}>Cancel</Button>
                </Stack>

                </TableCell>
            </TableRow>
        </>
    );
}
