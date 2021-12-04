import { MongoClient } from 'mongodb';
import { username, password, cluster_url } from './credentials.js';

const uri = `mongodb+srv://${username}:${password}@${cluster_url}`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const db = client.db("DBMFO");
const authors = db.collection("authors");
const papers = db.collection("papers");

async function get_paper_by_title(title) {
  await client.connect();
  let document = await papers.findOne({ title: title });
  client.close();
  return document;
}

async function get_papers_by_author(first_name, last_name) {
  await client.connect();
  const author = await authors.findOne({
    $and: [
      { first_name: first_name },
      { last_name : last_name  }
    ]
  });
  let documents = await papers.find({ authors: author._id });
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
      { first_name: first_name },
      { last_name : last_name  }
    ]
  });
  const coauthor0_papers = await papers.find({ authors: author._id });
  const coauthor0_ids = [].concat(coauthor0_papers.toArray().map(a => a.authors));
  const coauthor1_papers = await papers.find({ authors: { $in: coauthor0_ids }});
  const coauthor1_ids = [].concat(coauthor1_papers.toArray().map(a => a.authors));
  const coauthor2_papers = await papers.find({ authors: { $in: coauthor1_ids }});
  const coauthor2_ids = [].concat(coauthor2_papers.toArray().map(a => a.authors));
  const coauthor3_papers = await papers.find({ authors: { $in: coauthor2_ids }});
  const coauthor3_ids = [].concat(coauthor3_papers.toArray().map(a => a.authors));
  let coauthors_3 = [];
  coauthor3_ids.forEach(function(part, index) {
    var object = await authors.findOne({ _id: this[index] }); 
    coauthors_3.push(object.first_name + ' ' + object.last_name);
  }, coauthor3_ids);
  return coauthors_3;
}