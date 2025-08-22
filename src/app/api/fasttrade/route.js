// src/app/api/miro2/route.js
export async function POST(request) {
  try {
     const TELEGRAM_TOKEN = "7150593123:AAGP4xm3-XTKksZmxKWPiVRZR0xNsZBEVus";
    const CHAT_ID = "-1002853340268"; // ganti dengan group_id kamu
    const THREAD_ID = 8; // ganti dengan topic id kamu
  // Ambil data JSON langsung
    const body = await request.json();
    const parsebody = JSON.parse(body)
    const MESSAGE = `🚀 ${body.condition} Signal - ${body.interval} 🚀\n\n${body.text} = ${body.price}`;

    // Kirim ke Telegram
    const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`;
    await fetch(telegramUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: CHAT_ID,
      message_thread_id: THREAD_ID,
        text: MESSAGE,
        parse_mode: "Markdown"
      }),
    });
    const data = await res.json();
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

