const router = require('express').Router();
let Paper = require('../models/papers.model');
const { get_all_papers, get_paper_by_title, get_papers_by_author, get_papers_by_publication_years, add_paper } = require('./DatabaseQueries');

router.route('/getPapers').get((req, res) => {
  res.send(await get_all_papers());
});

router.route('/getPaper/:title').get((req, res) => {
  res.send(await get_paper_by_title(req.params["title"]));
});

router.route('/getPaper/:first/:last').get((req, res) => {
  res.send(await get_papers_by_author(req.params["first"], req.params["last"]));
});

router.route('/getPaper/:publisher/:start/:end').get((req, res) => {
  res.send(await get_papers_by_publication_years(
    req.params["publisher"],
    req.params["start"],
    req.params["end"]
  ));
});

router.route('/addPaper').put((req, res) => {
  res.send(await add_paper(
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
  ));
});



module.exports = router;