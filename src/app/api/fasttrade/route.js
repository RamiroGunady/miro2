// src/app/api/miro2/route.js
export async function POST(request) {
  try {
    const TELEGRAM_TOKEN = "7150593123:AAGP4xm3-XTKksZmxKWPiVRZR0xNsZBEVus";

    // chat_id group (pakai -100...)
    const CHAT_ID = "6269053173"; 

    // ID topik (contoh: 5 dari link t.me/c/2853340268/5)
    const TOPIC_ID = 8;  

    let bodyText;
    let body;

    try {
      // Coba parse sebagai JSON
      body = await request.json();
      bodyText = JSON.stringify(body, null, 2);
    } catch (err) {
      // Kalau gagal, berarti plain text
      bodyText = await request.text();
      body = { message: bodyText };
    }

    // Format pesan
    const message = `🚀 Buy Signal 🚀\n\n${bodyText}`;

    // Kirim ke Telegram
    const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`;
    await fetch(telegramUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        // <<< tambahan penting
        text: message,
        parse_mode: "Markdown"
      }),
    });

    return new Response(
      JSON.stringify({
        success: true,
        message: "Alert sent to Telegram topic",
        data: body,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );

  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        message: "Failed to send alert",
        error: error.message,
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}



