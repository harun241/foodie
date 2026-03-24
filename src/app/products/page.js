import ProductsGrid from "./Productsgrids";


export default async function ProductsPage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products`, {
    cache: "no-store",
  });
  const products = await res.json();

  return <ProductsGrid products={products} />;
}