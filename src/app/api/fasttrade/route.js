export async function POST(request) {
  try {
    const data = await request.json();

    // Pastikan data selalu array
    const items = Array.isArray(data) ? data : [data];

    for (const item of items) {
      const { symbol, condition, interval, price } = item;

      // Validasi
      if (!symbol || !condition || !interval || typeof price === "undefined") {
        return new Response(
          JSON.stringify({
            success: false,
            message: "Missing required fields: symbol, condition, interval, price",
          }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
      }

      // Routing logika kamu (contoh simple dulu)
      console.log(`Kirim alert: ${symbol} | ${condition} | ${interval} | ${price}`);
      // await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, { ... })
    }

    return new Response(
      JSON.stringify({ success: true, message: "All alerts processed" }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ success: false, message: "Internal server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
