// test-topic.js
const fetch = require("node-fetch");

const TELEGRAM_TOKEN = "7150593123:AAGP4xm3-XTKksZmxKWPiVRZR0xNsZBEVus";

// ID grup utama (bukan username/link, tapi chat_id numerik grup)
const CHAT_ID = "2853340268";  

// ID topik (message_thread_id) yang ada di dalam grup
const TOPIC_ID = 5; // contoh dari link /2853340268/5

async function sendHello() {
  const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`;

  const res = await fetch(telegramUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: CHAT_ID,
      message_thread_id: TOPIC_ID,
      text: "Hello from my bot 👋 (test kirim ke topik)",
    }),
  });

  const data = await res.json();
  console.log(data);
}

sendHello();

