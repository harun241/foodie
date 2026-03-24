import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET(req, context) {
  const params = await context.params; // ✅ must await in API route
  const { id } = params;

  if (!ObjectId.isValid(id)) {
    return new Response(JSON.stringify({ message: "Invalid product ID" }), { status: 400 });
  }

  const client = await clientPromise;
  const db = client.db("foodiehub");

  const product = await db.collection("products").findOne({ _id: new ObjectId(id) });
  if (!product) {
    return new Response(JSON.stringify({ message: "Product not found" }), { status: 404 });
  }

  product._id = product._id.toString();

  return new Response(JSON.stringify(product), { status: 200 });
}