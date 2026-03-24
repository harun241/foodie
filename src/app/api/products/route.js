import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("foodiehub");
    const products = await db.collection("products").find({}).toArray();

    const formattedProducts = products.map(p => ({
      _id: p._id.toString(),
      name: p.name,
      description: p.description,
      price: p.price,
      image: p.image,
      category: p.category
    }));

    return NextResponse.json(formattedProducts);
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}


export async function POST(req) {
  try {
    const client = await clientPromise;
    const db = client.db("foodiehub");

    const data = await req.json();
    // data = { name, description, price, image, category }
    const result = await db.collection("products").insertOne(data);

    return NextResponse.json({ success: true, id: result.insertedId });
  } catch (err) {
    return NextResponse.json({ error: "Failed to add product" }, { status: 500 });
  }
}