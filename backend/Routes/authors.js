const router = require('express').Router();
let Author = require('../models/authors.model');


router.route('/get').get((req, red) => {
    Author.find()
        .then(authors => red.json(authors))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/add').post((req, res) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const newAuthor = new Author({firstName, lastName});
  
    newAuthor.save()
      .then(() => res.json('User added!'))
      .catch(err => res.status(400).json('Error: ' + err));
  });

  module.exports = router;