// db.js
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const dotenv = require('dotenv')
dotenv.config();
const uri = process.env.MONGODB_URL
// console.log(uri)



const client = new MongoClient(uri, {
  // serverApi: {
  //   version: ServerApiVersion.v1,
  //   strict: true,
  //   deprecationErrors: true,
  // },
  // ssl: false,
});

async function connectDatabase() {
  await client.connect();
  return client.db('nextspark');
}

module.exports = { connectDatabase };