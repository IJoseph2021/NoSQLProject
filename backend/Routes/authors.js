const router = require('express').Router();
let Author = require('../models/authors.model');
const { get_coauthors, add_author, add_employment_to_author, get_employment_by_author } = require('./DatabaseQueries');

router.route('/getCoauthors/:first/:last').get((req, res) => {
  get_coauthors(req.params["first"], req.params["last"]).then(value => {res.send(value)})
});

router.route('/addAuthor').put((req, res) => {
  res.send(add_author(req.body["first"], req.body["last"]).then(res=>console.log(res)));
});

router.route('/addEmployment/:first/:last').put((req, res) => {
  res.send(add_employment_to_author(
    req.params["first"],
    req.params["last"],
    req.body["employment_name"],
    req.body["employment_start"],
    req.body["employment_end"]
  ).then(value => {res.send(value)}));
});


router.route('/getEmployment/:first/:last').get((req, res) => {
  get_employment_by_author(req.params["first"], req.params["last"]).then(value => {res.send(value)})
});

module.exports = router;