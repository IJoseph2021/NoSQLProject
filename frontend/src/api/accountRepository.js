import { MongoClient } from 'mongodb';
import { username, password, cluster_url } from './credentials.js';

const uri = `mongodb+srv://${username}:${password}@${cluster_url}`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
async function test() {
  await client.connect();
  const db = client.db("sample_airbnb");
  const collection = db.collection("listingsAndReviews");
  const document = await collection.findOne( { _id: "10006546" } );
  console.log(document.listing_url);
  client.close();
};

await test();