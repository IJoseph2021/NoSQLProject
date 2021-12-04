import { MongoClient } from 'mongodb';
import { username, password } from './credentials.js';

const uri = `mongodb+srv://${username}:${password}@nosqldb.b2v2m.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("sample_airbnb").collection("listingsAndReviews");
  var document = collection.findOne( { _id: "10006546" } );
  console.log(document);
  client.close();
});