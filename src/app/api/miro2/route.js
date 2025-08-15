// // This is an API Route in Next.js 15 App Router
// export async function POST(request) {
//   try {
//     // Parse JSON body from request
//     const body = await request.json();

//     // Example: return the same data with a status
//     return new Response(
//       JSON.stringify({
//         success: true,
//         message: "POST request received",
//         data: body
//       }),
//       {
//         status: 200,
//         headers: { "Content-Type": "application/json" }
//       }
//     );
//   } catch (error) {
//     return new Response(
//       JSON.stringify({
//         success: false,
//         message: "Invalid request",
//         error: error.message
//       }),
//       { status: 400, headers: { "Content-Type": "application/json" } }
//     );
//   }
// }

// This is an API Route in Next.js 15 App Router
export async function POST(request) {
//   try {
//     // Parse JSON body from request
//     const body = await request.json();

//     // Example: return the same data with a status
//     return new Response(
//       JSON.stringify({
//         success: true,
//         message: "POST request received",
//         data: body
//       }),
//       {
//         status: 200,
//         headers: { "Content-Type": "application/json" }
//       }
//     );
//   } catch (error) {
//     return new Response(
//       JSON.stringify({
//         success: false,
//         message: "Invalid request",
//         error: error.message
//       }),
//       { status: 400, headers: { "Content-Type": "application/json" } }
//     );
//   }
console.log("Test")
}

