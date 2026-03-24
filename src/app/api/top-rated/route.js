import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("foodiehub");

    const topRated = await db.collection("reviews").aggregate([
      // 1. Rating onujayi sort kora
      { $sort: { rating: -1 } },
      
      // 2. Top 6-ti review nibo
      { $limit: 6 },

      // 3. IMPORTANT: foodId-ke ObjectId-te convert kora
      // Jodi database-e age thekei ObjectId thake, tobeo eta kaj korbe
      {
        $addFields: {
          convertedId: { $toObjectId: "$foodId" }
        }
      },

      // 4. Products collection-er sathe join kora
      {
        $lookup: {
          from: "products",         // Ekbar check korun collection-er nam 'products' naki 'foods'
          localField: "convertedId",
          foreignField: "_id",
          as: "productInfo"
        }
      },

      // 5. Array theke product data-ke ber kora
      { $unwind: "$productInfo" },

      // 6. Final data structure
      {
        $project: {
          _id: "$productInfo._id",
          name: "$productInfo.name",
          image: "$productInfo.image",
          description: "$productInfo.description",
          price: "$productInfo.price",
          rating: 1,
          comment: 1
        }
      }
    ]).toArray();

    // Debugging: Terminal-e check korar jonno
    console.log("Found Items:", topRated.length);

    return new Response(JSON.stringify(topRated), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    console.error("Aggregation Error:", err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}