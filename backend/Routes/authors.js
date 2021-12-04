const router = require('express').Router();
let Author = require('../models/authors.model');
const { get_coauthors, add_author, add_employment_to_author } = require('./DatabaseQueries');

router.route('/getCoauthors/:first/:last').get((req, res) => {
  res.send(await get_coauthors(req.params["first"], req.params["last"]));
});

router.route('/addAuthor').put((req, res) => {
  res.send(await add_author(req.params["first"], req.params["last"]));
});

router.route('/addEmployment/:first/:last').put((req, res) => {
  res.send(await add_employment_to_author(
    req.params["first"],
    req.params["last"],
    req.body["employment_name"],
    req.body["employment_start"],
    req.body["employment_end"]
  ));
});

module.exports = router;