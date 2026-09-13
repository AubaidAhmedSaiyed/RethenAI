export async function onRequestPost(context: any) {
  try {
    const body = await context.request.json();
    const { MONGODB_API_KEY, MONGODB_ENDPOINT, MONGODB_CLUSTER } = context.env;

    if (!MONGODB_API_KEY || !MONGODB_ENDPOINT) {
      return new Response("Database configuration missing", { status: 500 });
    }

    let endpoint = MONGODB_ENDPOINT;
    if (!endpoint.startsWith("http")) {
      endpoint = `https://${endpoint}`;
    }

    const payload = {
      dataSource: MONGODB_CLUSTER || "Cluster0", 
      database: "rethen",
      collection: "waitlist",
      document: {
        ...body,
        submittedAt: new Date().toISOString()
      }
    };

    const response = await fetch(`${endpoint}/action/insertOne`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Request-Headers": "*",
        "api-key": MONGODB_API_KEY,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return new Response(`MongoDB Error: ${errorText}`, { status: 500 });
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: any) {
    return new Response(`Internal Server Error: ${err.message || err.toString()}`, { status: 500 });
  }
}
