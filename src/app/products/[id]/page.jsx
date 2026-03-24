import FoodDetails from "@/app/components/FoodDetails";

export default async function ProductPage({ params }) {
  // 1. Unwrap params here (This is where Next.js sends them)
  const resolvedParams = await params;
  const id = resolvedParams.id;

  // 2. Fetch your data here
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) return <p>Product not found.</p>;

  const product = await res.json();
  const user = { id: "user123", name: "John Doe" };

  // 3. Pass the data to your component as normal props
  return <FoodDetails product={product} user={user} />;
}