export async function onRequestPost(context: any) {
  try {
    const body = await context.request.json();
    const db = context.env.DB; // This is the Cloudflare D1 binding

    if (!db) {
      return new Response("Database binding missing", { status: 500 });
    }

    const { email, company, building, hardest } = body;

    if (!email || !company || !building) {
      return new Response("Missing required fields", { status: 400 });
    }

    // Insert into D1 database
    const stmt = db.prepare(
      `INSERT INTO waitlist (email, company, building, hardest, submitted_at) VALUES (?, ?, ?, ?, ?)`
    );
    
    await stmt.bind(email, company, building, hardest || "", new Date().toISOString()).run();

    return new Response(JSON.stringify({ success: true }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: any) {
    console.error("D1 Error:", err);
    return new Response(`Internal Server Error: ${err.message || err.toString()}`, { status: 500 });
  }
}
