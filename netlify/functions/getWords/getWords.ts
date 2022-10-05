import { Handler } from "@netlify/functions";
import { MongoClient } from "mongodb";
require("dotenv").config();

const database_uri: string = process.env.MONGODB_URI!;
const database_db: string = process.env.MONGODB_DATABASE!;
const database_collection: string = process.env.MONGODB_COLLECTION!;

const mongo_client = new MongoClient(database_uri);

const client_promise = mongo_client.connect();

const handler: Handler = async () => {
  try {
    const database = (await client_promise).db(database_db);
    const collection = database.collection(database_collection);
    const results = await collection.find({}).toArray();

    return {
      statusCode: 200,
      body: JSON.stringify(results)
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() };
  }

}

export { handler };