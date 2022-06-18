const router = require('express').Router();

router.get('/:id', (req, res) => {
    res.send(`GET flight by ${req.params.id}`);
})

router.get('/', (req, res) => {
    res.send('GET all flights');
});

router.post('/', (req, res) => {
    res.send('POST flight');
});

router.delete('/:id', (req, res) => {
    res.send(`DELETE flight with ${req.params.id}`);
});

router.put('/:id', (req, res) => {
    res.send(`PUT flight with ${req.params.id}`);
});

// TODO: implement routing

module.exports = router;
