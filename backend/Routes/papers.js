const router = require('express').Router();
let Paper = require('../models/papers.model');
const { get_all_papers, get_paper_by_title, get_papers_by_author, get_papers_by_publication_years, add_paper } = require('./DatabaseQueries');

router.route('/getPapers').get((req, res) => {
  res.send(get_all_papers().then(res=>console.log(res)));
});

router.route('/getPaper/:title').get((req, res) => {
  res.send(get_paper_by_title(req.params["title"]).then(res=>console.log(res)));
});

router.route('/getPaper/:first/:last').get((req, res) => {
  res.send(get_papers_by_author(req.params["first"], req.params["last"]).then(res=>console.log(res)));
});

router.route('/getPaper/:publisher/:start/:end').get((req, res) => {
  res.send(get_papers_by_publication_years(
    req.params["publisher"],
    req.params["start"],
    req.params["end"]
  ).then(res=>console.log(res)));
});

router.route('/addPaper').put((req, res) => {
  res.send(add_paper(
    req.body["title"],
    req.body["author_first_names"],
    req.body["author_last_names"],
    req.body["publication_name"],
    req.body["publication_journal"],
    req.body["publication_number"],
    req.body["publication_year"],
    req.body["publication_location"],
    req.body["url"],
    req.body["page_number"]
  ).then(res=>console.log(res)));
});



module.exports = router;