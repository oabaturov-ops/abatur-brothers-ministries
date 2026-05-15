export async function POST(request: Request) {
  const data = await request.json();
  return Response.json({ success: true, message: "Сообщение получено!" });
}