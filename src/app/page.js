"use client"; // <-- make this page a Client Component

import Banner from "./components/Banner";
import Footer from "./components/Footer";
import ReviewsCarousel from "./components/Reviews";
import TopRatedFood from "./components/TopRated";

export default function Home() {
  return (
    <div>
      <Banner />
      <TopRatedFood />
      <ReviewsCarousel></ReviewsCarousel>
      
    </div>
  );
}