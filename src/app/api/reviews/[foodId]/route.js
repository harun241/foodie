// app/api/reviews/[foodId]/route.js
import clientPromise from "@/lib/mongodb";

export async function GET(req, context) {
  try {
    // context.params একটি Promise হতে পারে, তাই unwrap করতে হবে
    const params = await context.params;
    const foodId = params.foodId;

    const client = await clientPromise;
    const db = client.db("foodiehub");

    const reviews = await db
      .collection("reviews")
      .find({ foodId })
      .sort({ createdAt: -1 })
      .toArray();

    return new Response(JSON.stringify(reviews), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return new Response(
      JSON.stringify({ message: "Failed to fetch reviews" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}