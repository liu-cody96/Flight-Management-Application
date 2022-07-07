const router = require('express').Router();
const { createFlight, findAllFlights, updateFlight, deleteFlight } = require('../controllers/flight.controller');


router.get('/', async (req, res) => {
    try {
        const flights = await findAllFlights();
        res.status(200).json(flights);
    } catch (err) {
        console.log(err);
        // if request fails...return 5OO
        res.status(err?.status || 500).json(err);
    }
});

router.post('/', async (req, res) => {
    try {
        // req contains post request data. createFlight deconstructs body so you can just pass in req.body here
        const flightId = await createFlight(req.body);
        res.status(201).json({_id: flightId});

    } catch (err) {
        console.log(err);
        // if request fails...return 5OO
        res.status(err?.status || 500).json(err);
    }

});



router.put('/', async (req, res) => {
    try{
        const flightId = await updateFlight(req.body);
        res.status(201).json({_id: flightId});
    }catch (err){
        res.status(err?.status || 500).json(err);
    }
});



router.delete('/:id', async(req, res) => {
    try{
        const flight = await deleteFlight(req.params.id);
        res.status(200).json(flight);
    }catch (err){
        res.status(err?.status || 400).json(err);
    }
});

module.exports = router;
