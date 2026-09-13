import { MongoClient } from "mongodb";

// Cache the client so we don't reconnect on every function call
let cachedClient: MongoClient | null = null;

export async function onRequestPost(context: any) {
  try {
    const body = await context.request.json();
    const { MONGODB_URI } = context.env;

    if (!MONGODB_URI) {
      return new Response("Database configuration missing (MONGODB_URI)", { status: 500 });
    }

    if (!cachedClient) {
      cachedClient = new MongoClient(MONGODB_URI);
      await cachedClient.connect();
    }

    const db = cachedClient.db("rethen");
    const collection = db.collection("waitlist");

    const document = {
      ...body,
      submittedAt: new Date().toISOString()
    };

    await collection.insertOne(document);

    return new Response(JSON.stringify({ success: true }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: any) {
    console.error("MongoDB Driver Error:", err);
    return new Response(`Internal Server Error: ${err.message || err.toString()}`, { status: 500 });
  }
}
