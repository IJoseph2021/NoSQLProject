const router = require('express').Router();
let Paper = require('../models/papers.model');

router.route('/get').get((req, res) => {
  Paper.find()
    .then(exercises => res.json(exercises))
    .catch(err => res.status(400).json('Error: ' + err));
});



module.exports = router;