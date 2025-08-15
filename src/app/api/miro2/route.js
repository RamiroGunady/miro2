// src/app/api/miro2/route.js

export async function POST(request) {
  try {
    const TELEGRAM_TOKEN = "7150593123:AAGP4xm3-XTKksZmxKWPiVRZR0xNsZBEVus";
    const CHAT_ID = "815565811"; // Ambil dari @userinfobot di Telegram

    // Ambil JSON dari TradingView
    const body = await request.json();

    // Format pesan
      const message = `🚀 Buy Signal 🚀\n\n${JSON.stringify(body, null, 2)}`;

    // Kirim ke Telegram
    const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`;
    await fetch(telegramUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: message,
        parse_mode: "Markdown"
      }),
    });

    return new Response(
      JSON.stringify({
        success: true,
        message: "Alert sent to Telegram",
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

//  // Format pesan
//     const message = `🚀 Buy Signal 🚀\n\n${JSON.stringify(body, null, 2)}`;