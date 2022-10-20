import { MongoClient } from "mongodb";

export async function connectDatabase() {
  const client = await MongoClient.connect(
    "mongodb+srv://patwary:mhpatwary72@cluster0.og93a4g.mongodb.net/?retryWrites=true&w=majority"
  );

  return client;
}

export async function insertedDocument(client, collection, document) {
  const db = client.db("events");
  const result = await db.collection(collection).insertOne(document);
  return result;
}

export async function getAllDocuments(client, collection, sort) {
  const db = client.db("events");
  const documents = await db.collection(collection).find().sort(sort).toArray();

  return documents;
}
