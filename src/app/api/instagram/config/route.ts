export async function GET(request: Request) {
  return new Response(
    JSON.stringify({
      clientId: process.env.INSTAGRAM_CLIENT_ID || "",
      redirectUri: process.env.INSTAGRAM_REDIRECT_URI || "",
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
}
