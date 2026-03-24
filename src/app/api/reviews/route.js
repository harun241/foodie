// app/api/reviews/route.js
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

// ➕ Add Review
export async function POST(req) {
  const { foodId, userId, username, rating, comment } = await req.json();

  const client = await clientPromise;
  const db = client.db("foodiehub");

  const existing = await db.collection("reviews").findOne({ foodId, userId });

  if (existing) {
    return NextResponse.json({ message: "Already reviewed" }, { status: 400 });
  }

  await db.collection("reviews").insertOne({
    foodId,
    userId,
    username,
    rating: Number(rating),
    comment,
    createdAt: new Date(),
  });

  return NextResponse.json({ message: "Review added" });
}

// ✏️ Edit Review
export async function PUT(req) {
  const { reviewId, rating, comment } = await req.json();

  const client = await clientPromise;
  const db = client.db("foodiehub");

  await db.collection("reviews").updateOne(
    { _id: new ObjectId(reviewId) },
    { $set: { rating: Number(rating), comment } }
  );

  return NextResponse.json({ message: "Updated" });
}

// ❌ Delete Review
export async function DELETE(req) {
  const { reviewId } = await req.json();

  const client = await clientPromise;
  const db = client.db("foodiehub");

  await db.collection("reviews").deleteOne({
    _id: new ObjectId(reviewId),
  });

  return NextResponse.json({ message: "Deleted" });
}

// ✅ Get all reviews
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("foodiehub");

    const reviews = await db.collection("reviews").find({}).toArray();

    const formatted = reviews.map((r) => ({
      _id: r._id,
      username: r.username,
      comment: r.comment,
    }));

    return NextResponse.json(formatted);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Failed to fetch reviews" }, { status: 500 });
  }
}