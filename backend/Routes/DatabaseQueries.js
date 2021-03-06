//import { MongoClient } from 'mongodb';
MongoClient = require('mongodb').MongoClient

//import { username, password, cluster_url } from './credentials.js';

//const username = require('./credentials.js')
//const password = require('./credentials.js')
//const cluster_url = require('./credentials.js')

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}


const uri = "mongodb+srv://user1:pCtxRghEsDA3JAV@nosqldb.b2v2m.mongodb.net";
console.log(uri)
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
let db = client.db("DBMFO");
let authors = db.collection("authors");
let papers = db.collection("papers");

async function add_author(first_name, last_name) {
  let document = {
    "first_name": first_name,
    "last_name": last_name,
    "employment": []
  };
  await client.connect();
  await authors.insertOne(document);
  ;
}

async function add_employment_to_author(first_name, last_name, employment_name, employment_start, employment_end){
  let query = {
    $and: [
      { "first_name": first_name },
      { "last_name":  last_name  }
    ]
  };
  let update = {
    $push: {
      "employment": {
        "name": employment_name,
        "start": employment_start,
        "end": employment_end
      }
    }
  };
  await client.connect();
  await authors.findOneAndUpdate(query, update);
  ;
}

async function get_employment_by_author(first_name, last_name) {
  let query = {
    $and: [
      { "first_name": first_name },
      { "last_name":  last_name  }
    ]
  };
  await client.connect();
  let author = await authors.findOne(query);
  return author.employment;
}

async function add_paper(
  title,
  author_first_names,
  author_last_names,
  publication_name,
  publication_journal,
  publication_number,
  publication_year,
  publication_location,
  url,
  page_number
){
  await client.connect();
  let author_ids = [];
  console.log(title,
    author_first_names,
    author_last_names,
    publication_name,
    publication_journal,
    publication_number,
    publication_year,
    publication_location,
    url,
    page_number)
  for (var i = 0; i < author_first_names.length; i++) {
    var author = await authors.findOne({
      $and: [
        { "first_name": author_first_names[i] },
        { "last_name" : author_last_names[i]  }
      ]
    });
    
    if (author) {
      author_ids.push(author._id);
      
    }
    else {
      return i;
    }
  }
  let document = {
    "title": title,
    "authors": author_ids,
    "publication": {
      "name": publication_name,
      "journal": publication_journal,
      "number": publication_number,
      "year": publication_year,
      "location": publication_location
    },
    "url": url,
    "page_number": page_number
  }
  await papers.insertOne(document);
  return -1;
}

async function get_all_papers() {
  
  await client.connect();
  let documents = await papers.find({}).toArray();
  for (var i = 0; i < documents.length; i++) {
    for (var j = 0; j < documents[i].authors.length; j++) {
      var id = documents[i].authors[j];
      var obj = await authors.findOne(id);
      documents[i].authors[j] = obj.first_name + " " + obj.last_name;
    }
  }
  return documents;
}

async function get_paper_by_title(title) {
  await client.connect();
  let document = await papers.findOne({ "title": title });
  let ids = document.authors;
  for (var i = 0; i < ids.length; i++) {
    var obj = await authors.findOne(ids[i]);
    document.authors[i] = obj.first_name + " " + obj.last_name;
  }
  return document;
}

async function get_papers_by_author(first_name, last_name) {
  await client.connect();
  const author = await authors.findOne({
    $and: [
      { "first_name": first_name },
      { "last_name" : last_name  }
    ]
  });
  let documents = await papers.find({ "authors": author._id }).toArray();
  for (var i = 0; i < documents.length; i++) {
    for (var j = 0; j < documents[i].authors.length; j++) {
      var id = documents[i].authors[j];
      var obj = await authors.findOne(id);
      documents[i].authors[j] = obj.first_name + " " + obj.last_name;
    }
  }
  return documents;
}

async function get_papers_by_publication_years(publisher, range_start, range_end) {
  await client.connect();
  let documents = await papers.find({
    $and: [
      { "publication.name": publisher },
      { "publication.year": { $gte: range_start } },
      { "publication.year": { $lte: range_end } }
    ]
  }).toArray();
  for (var i = 0; i < documents.length; i++) {
    for (var j = 0; j < documents[i].authors.length; j++) {
      var id = documents[i].authors[j];
      var obj = await authors.findOne(id);
      documents[i].authors[j] = obj.first_name + " " + obj.last_name;
    }
  }
  return documents;
}

async function get_coauthors(first_name, last_name) {
  await client.connect();
  const author = await authors.findOne({
    $and: [
      { "first_name": first_name },
      { "last_name" : last_name  }
    ]
  });
  const coauthor0_papers = await papers.find({ "authors": author._id }).toArray();
  const coauthor0_ids = coauthor0_papers.map(a => a.authors).flat().filter(onlyUnique);
  const coauthor1_papers = await papers.find({ "authors": { $in: coauthor0_ids }}).toArray();
  const coauthor1_ids = coauthor1_papers.map(a => a.authors).flat().filter(onlyUnique);
  const coauthor2_papers = await papers.find({ "authors": { $in: coauthor1_ids }}).toArray();
  const coauthor2_ids = coauthor2_papers.map(a => a.authors).flat().filter(onlyUnique);
  const coauthor3_papers = await papers.find({ "authors": { $in: coauthor2_ids }}).toArray();
  const coauthor3_ids = coauthor3_papers.map(a => a.authors).flat().filter(onlyUnique);
  let coauthors_3 = [];
  for (var i = 0; i < coauthor3_ids.length; ++i) {
    var object = await authors.findOne({ "_id": coauthor3_ids[i] }); 
    coauthors_3.push(object.first_name + ' ' + object.last_name);
  }
  return coauthors_3.filter(onlyUnique);
}

//get_coauthors("Billy", "Bob").then(res => console.log(res));

module.exports = {get_all_papers, add_author, add_employment_to_author, get_coauthors, get_paper_by_title, get_papers_by_author, get_papers_by_publication_years, add_paper, get_employment_by_author};