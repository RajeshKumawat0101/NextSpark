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

let dbInstance;

async function connectDatabase() {
  if(!dbInstance){
    await client.connect();
    dbInstance = client.db('nextspark');
    // console.log(dbInstance);
    console.log("DB Connected");
  }
  return dbInstance;
}

connectDatabase();

const getDBInstance = async()=>{
  if(!dbInstance){
    await connectDatabase();
  }
  return dbInstance;
}

module.exports = { getDBInstance };