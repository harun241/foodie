"use client"; // because form needs client-side interactivity
import { useState } from "react";

export default function AddProductPage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, description, price: parseFloat(price), image, category })
    });
    const data = await res.json();
    if (data.success) {
      setMessage("Product added successfully!");
      setName(""); setDescription(""); setPrice(""); setImage(""); setCategory("");
    } else {
      setMessage("Failed to add product");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Add Product</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input className="p-2 border rounded" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
        <input className="p-2 border rounded" placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
        <input className="p-2 border rounded" placeholder="Price" type="number" step="0.01" value={price} onChange={e => setPrice(e.target.value)} />
        <input className="p-2 border rounded" placeholder="Image URL" value={image} onChange={e => setImage(e.target.value)} />
        <input className="p-2 border rounded" placeholder="Category" value={category} onChange={e => setCategory(e.target.value)} />
        <button className="bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition">Add Product</button>
      </form>
      {message && <p className="mt-4 text-green-600">{message}</p>}
    </div>
  );
}