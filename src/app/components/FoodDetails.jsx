"use client";

import { useState, useEffect } from "react";

// ✅ Components
function RatingStars({ rating, setRating }) {
  const [hover, setHover] = useState(0);

  return (
    <div className="flex text-2xl cursor-pointer">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          onClick={() => setRating(star)}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(0)}
          className={(hover || rating) >= star ? "text-yellow-500" : "text-gray-300"}
        >
          ★
        </span>
      ))}
    </div>
  );
}

// ✅ Review Form
function ReviewForm({ productId, user, refresh }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = async () => {
    if (!user) return alert("Login required");

    const res = await fetch("/api/reviews", {
      method: "POST",
      body: JSON.stringify({
        foodId: productId,
        userId: user.id,
        username: user.name,
        rating,
        comment,
      }),
    });

    const data = await res.json();
    alert(data.message);

    if (res.ok) {
      setRating(0);
      setComment("");
      refresh();
    }
  };

  return (
    <div className="mt-6">
      <h3 className="font-semibold mb-2">Give Review</h3>

      <RatingStars rating={rating} setRating={setRating} />

      <textarea
        className="w-full border p-2 mt-2 rounded"
        placeholder="Write your review..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />

      <button
        onClick={handleSubmit}
        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Submit
      </button>
    </div>
  );
}

// ✅ Review List
function ReviewList({ reviews, user, onDelete }) {
  const avg =
    reviews.length > 0
      ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
      : 0;

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-2">
        Reviews ({reviews.length})
      </h2>

      {/* Average rating */}
      <div className="flex items-center gap-2 mb-3">
        <span className="font-semibold">{avg.toFixed(1)}</span>
        <div className="flex">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={star <= Math.round(avg) ? "text-yellow-500" : "text-gray-300"}
            >
              ★
            </span>
          ))}
        </div>
        <span className="text-gray-500">({reviews.length})</span>
      </div>

      {/* Review items */}
      {reviews.length === 0 ? (
        <p>No reviews yet</p>
      ) : (
        reviews.map((r) => (
          <div key={r._id} className="border p-3 rounded mb-2">
            <h4 className="font-semibold">{r.username}</h4>
            <p>⭐ {r.rating}</p>
            <p>{r.comment}</p>

            {/* Delete button for user's own review */}
            {user?.id === r.userId && (
           <button
  type="button"
  onClick={() => onDelete(r._id)}
  className="mt-1 text-sm text-white bg-red-600 px-2 py-1 rounded hover:underline focus:outline-none focus:ring-2 focus:ring-red-400 transition"
>
  Delete
</button>
            )}
          </div>
        ))
      )}
    </div>
  );
}

// ✅ Main Component
export default function FoodDetails({ product, user }) {
  const [reviews, setReviews] = useState([]);

  const loadReviews = async () => {
    const res = await fetch(`/api/reviews/${product._id}`);
    const data = await res.json();
    setReviews(data);
  };

  useEffect(() => {
    loadReviews();
  }, [product._id]);

  const handleDelete = async (reviewId) => {
    await fetch("/api/reviews", {
      method: "DELETE",
      body: JSON.stringify({ reviewId }),
    });
    loadReviews();
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Product Info */}
      <div className="grid md:grid-cols-2 gap-6 bg-white shadow-lg rounded-xl p-6">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover rounded-lg"
        />
        <div>
          <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
          <p className="text-gray-700 mb-4">{product.description}</p>
          <p className="text-lg font-semibold mb-2">Price: ${product.price}</p>
        </div>
      </div>

      {/* Review Form */}
      <ReviewForm productId={product._id} user={user} refresh={loadReviews} />

      {/* Review List */}
      <ReviewList reviews={reviews} user={user} onDelete={handleDelete} />
    </div>
  );
}