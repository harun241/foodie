import clientPromise from "@/lib/mongodb";

export async function POST(req) {
  try {
    const { name, phone, date, time } = await req.json();

    if (!name || !phone || !date || !time) {
      return new Response(JSON.stringify({ message: "All fields required" }), { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("foodiehub");

    const result = await db.collection("bookings").insertOne({
      name,
      phone,
      date,
      time,
      createdAt: new Date(),
    });

    return new Response(JSON.stringify({ bookingId: result.insertedId }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ message: "Server error" }), { status: 500 });
  }
}