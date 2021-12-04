import { MongoClient } from 'mongodb';
import { username, password, cluster_url } from './credentials.js';

const uri = `mongodb+srv://${username}:${password}@${cluster_url}`;
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
  client.close();
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
  client.close();
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
  client.close();
  return -1;
}

async function get_all_papers() {
  await client.connect();
  let documents = await papers.find({});
  client.close();
  return documents.toArray();
}

async function get_paper_by_title(title) {
  await client.connect();
  let document = await papers.findOne({ "title": title });
  client.close();
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
  let documents = await papers.find({ "authors": author._id });
  client.close();
  return documents.toArray();
}

async function get_papers_by_publication_years(publisher, range_start, range_end) {
  await client.connect();
  let documents = await papers.find({
    $and: [
      { "publication.name": publisher },
      { "publication.year": { $gte: range_start } },
      { "publication.year": { $lte: range_end } }
    ]
  });
  client.close()
  return documents.toArray();
}

async function get_coauthors(first_name, last_name) {
  await client.connect();
  const author = await papers.findOne({
    $and: [
      { "first_name": first_name },
      { "last_name" : last_name  }
    ]
  });
  const coauthor0_papers = await papers.find({ "authors": author._id });
  const coauthor0_ids = [].concat(coauthor0_papers.toArray().map(a => a.authors));
  const coauthor1_papers = await papers.find({ "authors": { $in: coauthor0_ids }});
  const coauthor1_ids = [].concat(coauthor1_papers.toArray().map(a => a.authors));
  const coauthor2_papers = await papers.find({ "authors": { $in: coauthor1_ids }});
  const coauthor2_ids = [].concat(coauthor2_papers.toArray().map(a => a.authors));
  const coauthor3_papers = await papers.find({ "authors": { $in: coauthor2_ids }});
  const coauthor3_ids = [].concat(coauthor3_papers.toArray().map(a => a.authors));
  let coauthors_3 = [];
  for (var i = 0; i < coauthor3_ids.length; ++i) {
    var object = await authors.findOne({ "_id": coauthor3_ids[i] }); 
    coauthors_3.push(object.first_name + ' ' + object.last_name);
  }
  return coauthors_3;
}