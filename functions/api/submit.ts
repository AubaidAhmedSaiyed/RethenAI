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

    // Send Email Notification via Resend
    const resendApiKey = context.env.RESEND_API_KEY;
    const notifyEmail = context.env.NOTIFY_EMAIL;
    
    if (!resendApiKey || !notifyEmail) {
      return new Response("Missing RESEND_API_KEY or NOTIFY_EMAIL", { status: 500 });
    }

    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${resendApiKey}`
      },
      body: JSON.stringify({
        from: "Rethen AI <onboarding@resend.dev>",
        to: notifyEmail,
        subject: "🚀 New Waitlist Submission",
        html: `
          <h2>New Waitlist Submission!</h2>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Company:</strong> ${company}</p>
          <p><strong>Building:</strong> ${building}</p>
          <p><strong>Hardest:</strong> ${hardest || "N/A"}</p>
        `
      }),
    });

    if (!emailResponse.ok) {
      const errorText = await emailResponse.text();
      return new Response(`Resend Error: ${errorText}`, { status: 500 });
    }

    return new Response(JSON.stringify({ success: true, version: "v2-error-throwing" }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: any) {
    console.error("D1 Error:", err);
    return new Response(`Internal Server Error: ${err.message || err.toString()}`, { status: 500 });
  }
}
