import axios from 'axios';
import { useEffect, useState, Fragment } from 'react';
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper } from '@mui/material';
import {Stack, Button} from "@mui/material";
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {EditableRow} from '../components/Flight/EditableRow';
import {ReadOnlyRow} from '../components/Flight/ReadOnlyRow';

export const GetFlights = () => {

    const [flights, setFlights] = useState([]);
    const [formValues, setFormValues] = useState({});
    const [editFormValues, setEditFormValues] = useState({});
    const [editId, setEditId] = useState();
    const [expanded, setExpanded] = useState(false);

    //expand accordion on mount
    useEffect(() => {
        setExpanded(true);
    }, []);


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
          ...formValues,
          [name]: value,
        });
    };

    const handleClickEdit = (event, flight) => {
        event.preventDefault();
        setEditId(parseInt(flight.flightNumber));
        setEditFormValues({...flight});
    }

    const handleEditFormChange = (event) => {
        event.preventDefault();
        const fieldName = event.target.getAttribute('name');
        const fieldValue = event.target.value;

        const newFormData = { ...editFormValues};
        newFormData[fieldName] = fieldValue;

        setEditFormValues(newFormData);
    }

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
                        .then((res) => {
                            alert("Flight " + formValues["flightNumber"]  + " created");
                            // avoid page reload by resetting state
                            // avoid making an additional HTTP request by using the new flight returned from the backend
                            setFlights([...flights, res.data._id]);
                        })
                        .catch(err => {
                            alert(err.response.data.message);
                        });
    }

    const handleEditCancel = (event) => {
        event.preventDefault();
        setEditFormValues({});
        setEditId(null);
    }

    const handleEditSubmit = (event) => {
        event.preventDefault();
        const currState = {
            flightNumber: editFormValues.flightNumber,
            arrival: editFormValues.arrivalDate + "T" + editFormValues.arrivalTime,
            departure: editFormValues.departureDate + "T" + editFormValues.departureTime,
            departureAirport: editFormValues.departureAirport,
            arrivalAirport: editFormValues.arrivalAirport,
            passengerLimit: editFormValues.passengerLimit,
            currNumPassengers: editFormValues.currNumPassengers
        }
        axios.put('http://localhost:8080/flights', currState)
            .then((res) => {
                alert("Flight " + currState.flightNumber + " updated");

                // avoid page reload by resetting state
                // avoid making an additional HTTP request by using the new flight returned from the backend
                setEditFormValues({});
                setEditId(null);
                let newFlights = flights.map(element => element._id === res.data._id._id ? {...res.data._id} : element);
                setFlights(newFlights);
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


    return (
        <>
        <div style={{padding: '15px'}}>
            <Accordion>
                    <AccordionSummary
                    id='panel1-header'
                    aria-controls='panel1-content' expandIcon = {<ExpandMoreIcon/>} sx={{
                        backgroundColor: '#203182',
                        color: 'white'
                    }}>
                        <Typography>Add New Flight</Typography>
                    </AccordionSummary>
                    <AccordionDetails sx = {{paddingTop: '15px'}}>
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
            <form onSubmit={handleEditSubmit}>
                <Accordion expanded={expanded===true}>
                    <AccordionSummary
                        id='panel1-header'
                        expandIcon = {<ExpandMoreIcon/>}
                        aria-controls='panel1-content' sx={{
                            backgroundColor: '#203182',
                            color: 'white'
                        }} onClick={() => setExpanded(!expanded)}>
                            <Typography>View Flights</Typography>
                    </AccordionSummary>
                    <TableContainer component={Paper} sx={{maxHeight: '75vh'}}>
                            <Table aria-label='simple-table' stickyHeader>
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{backgroundColor: '#E3E3E3'}}>Flight Number</TableCell>
                                        <TableCell sx={{backgroundColor: '#E3E3E3'}}width='100px'>Departure Date</TableCell>
                                        <TableCell sx={{backgroundColor: '#E3E3E3'}}>Departure Time (24-hour clock)</TableCell>
                                        <TableCell width='100px' sx={{backgroundColor: '#E3E3E3'}}>Arrival Date</TableCell>
                                        <TableCell sx={{backgroundColor: '#E3E3E3'}}>Arrival Time (24-hour clock)</TableCell>
                                        <TableCell sx={{backgroundColor: '#E3E3E3'}}>Departing From</TableCell>
                                        <TableCell sx={{backgroundColor: '#E3E3E3'}}>Arriving From</TableCell>
                                        <TableCell sx={{backgroundColor: '#E3E3E3'}}>Seats Remaining</TableCell>
                                        <TableCell sx={{backgroundColor: '#E3E3E3'}} align='center'>Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        flights.map(flight => (
                                            <Fragment key={flight._id}>
                                                {editId === parseInt(flight.flightNumber) ?
                                                <EditableRow flight={editFormValues} handleEditFormChange={handleEditFormChange} handleEditCancel={handleEditCancel}/> : <ReadOnlyRow flights={flights} setFlights={setFlights} flight={flight} handleClickEdit={handleClickEdit}/>}
                                            </Fragment>
                                        ))
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Accordion>
                </form>
            </div>


        </>
    );
}
