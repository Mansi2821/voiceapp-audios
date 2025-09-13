import { MongoClient, GridFSBucket } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI);

export async function connectToDB() {
  if (!client.isConnected()) await client.connect();
  const db = client.db(process.env.MONGODB_DB);
  return { db, client };
}

export async function getGridFSBucket() {
  const { db } = await connectToDB();
  return new GridFSBucket(db, { bucketName: "audios" });
}
