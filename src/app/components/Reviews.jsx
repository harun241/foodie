"use client";
import { useEffect, useState, useRef } from "react";

export default function ReviewsCarousel() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef(null);

  // Fetch reviews
  useEffect(() => {
    fetch("/api/reviews")
      .then((res) => res.json())
      .then((data) => setReviews(Array.isArray(data) ? data : []))
      .catch((err) => console.error("Fetch error:", err))
      .finally(() => setLoading(false));
  }, []);

  // Continuous left → right loop scroll
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    let scrollLeft = 0;

    const step = () => {
      scrollLeft += 1;
      if (scrollLeft >= container.scrollWidth / 2) {
        scrollLeft = 0; // loop
      }
      container.scrollLeft = scrollLeft;
      requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }, [reviews]);

  if (loading) return <p className="text-center py-6">Loading reviews...</p>;
  if (reviews.length === 0)
    return <p className="text-center py-6 text-gray-500">No reviews yet.</p>;

  // Duplicate reviews for seamless loop
  const loopReviews = [...reviews, ...reviews];

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 relative">
      <h3 className="text-2xl font-bold mb-6 text-center">Customer Reviews</h3>

      <div
        ref={scrollRef}
        className="flex space-x-6 overflow-x-hidden whitespace-nowrap"
      >
        {loopReviews.map((review, idx) => (
          <div
            key={`${review._id}-${idx}`}
            className={`inline-block w-72 p-5 rounded-2xl shadow-lg transition transform hover:scale-105 ${
              idx % 2 === 0 ? "bg-orange-100 text-gray-800" : "bg-white text-gray-700"
            }`}
          >
            <div className="font-bold text-lg mb-1">{review.username}</div>
            <div className="font-semibold text-sm mb-2 text-orange-500">
             
            </div>
            <p className="text-sm line-clamp-4">{review.comment}</p>
          </div>
        ))}
      </div>

      {/* Optional left/right gradient overlays */}
      <div className="absolute left-0 top-0 h-full w-12 bg-gradient-to-r from-white pointer-events-none"></div>
      <div className="absolute right-0 top-0 h-full w-12 bg-gradient-to-l from-white pointer-events-none"></div>
    </div>
  );
}