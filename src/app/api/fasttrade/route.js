import fetch from "node-fetch";

const TELEGRAM_TOKEN = "7150593123:AAGP4xm3-XTKksZmxKWPiVRZR"; // token dari kamu
const TELEGRAM_API = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`;

const CHANNELS = {
  STARTER: { chat_id: "-1002853340268", thread_id: 14 }, // Starter saham IDX
  PRO: {
    STOCK: { chat_id: "-1003014525206", thread_id: 14 },
    CRYPTO: { chat_id: "-1003014525206", thread_id: 13 },
    FOREX: { chat_id: "-1003014525206", thread_id: 15 },
  },
};

// Helper kirim message
function makeMessage(chat_id, thread_id, text) {
  return {
    chat_id,
    message_thread_id: thread_id,
    text,
  };
}

async function sendBatch(messages) {
  const results = await Promise.all(
    messages.map((msg) =>
      fetch(TELEGRAM_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(msg),
      }).then((res) => res.json())
    )
  );
  console.log("Results:", results);
}

async function tester() {
  const batch = [
    // Starter (saham ASII)
    makeMessage(CHANNELS.STARTER.chat_id, CHANNELS.STARTER.thread_id, "[Starter] ASII terkirim ke diskusi saham"),

    // Pro (saham ASII)
    makeMessage(CHANNELS.PRO.STOCK.chat_id, CHANNELS.PRO.STOCK.thread_id, "[PRO] ASII diarahkan ke STOCK"),

    // Pro (crypto BTCUSDT.P)
    makeMessage(CHANNELS.PRO.CRYPTO.chat_id, CHANNELS.PRO.CRYPTO.thread_id, "[PRO] BTCUSDT.P diarahkan ke CRYPTO"),

    // Pro (forex EURUSD)
    makeMessage(CHANNELS.PRO.FOREX.chat_id, CHANNELS.PRO.FOREX.thread_id, "[PRO] EURUSD diarahkan ke FOREX"),
  ];

  await sendBatch(batch);
}

tester();
