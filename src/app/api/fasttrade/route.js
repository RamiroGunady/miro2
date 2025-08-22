// src/app/api/miro2/route.js
export async function POST(request) {
  try {
    const TELEGRAM_TOKEN = "7150593123:AAGP4xm3-XTKksZmxKWPiVRZR0xNsZBEVus";

    // Channel mapping
    const CHANNELS = {
      NEWBIE: {
        BULL: { chat_id: "-1002853340268", thread_id: 8 }, // Newbie saham IDX
      },
      PRO: {
        SAHAM: { chat_id: "-1003014525206", thread_id: 14 },
        CRYPTO: { chat_id: "-1003014525206", thread_id: 13 },
        FOREX: { chat_id: "-1003014525206", thread_id: 15 },
      },
    };

    // Ambil payload
    const body = await request.json();
    const { symbol, condition, interval, price, text } = body;

    // Validasi minimal
    if (!symbol || !condition || !interval || typeof price === "undefined") {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Missing required fields: symbol, condition, interval, price",
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Deteksi aset
    const isStock = /^[A-Z]{4}$/.test(symbol);
    const isCrypto = /USDT$/.test(symbol);
    const isForex = /^([A-Z]{3})([A-Z]{3})$/.test(symbol);

    let proTarget = null;
    if (isStock) proTarget = CHANNELS.PRO.SAHAM;
    else if (isCrypto) proTarget = CHANNELS.PRO.CRYPTO;
    else if (isForex) proTarget = CHANNELS.PRO.FOREX;

    // Format pesan
    const subject = symbol;
    const message = `🚀 ${condition} Signal - ${interval} 🚀\n\n${subject} = ${price}`;

    // --- ROUTING ---
    const targets = [];

    if (strategy === "bull") {
      // PRO selalu dapat (sesuai aset)
      if (proTarget) targets.push(proTarget);

      // NEWBIE hanya untuk saham
      if (isStock) targets.push(CHANNELS.NEWBIE.BULL);
    }

    if (targets.length === 0) {
      return new Response(
        JSON.stringify({
          success: false,
          message: `No channel mapping found for strategy: ${strategy} / asset type`,
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Kirim paralel ke semua target
    const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`;
    const sends = targets.map((t) =>
      fetch(telegramUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: t.chat_id,
          message_thread_id: t.thread_id,
          text: message,
          parse_mode: "Markdown",
        }),
      }).then(async (res) => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.description || "Telegram API Error");
        return data;
      })
    );

    const results = await Promise.all(sends);

    return new Response(
      JSON.stringify({
        success: true,
        message: "Alert sent to Telegram",
        data: { ...body, targets, results },
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
