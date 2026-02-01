"use client";

import { useState, useEffect } from "react";
import {
  FaStar,
  FaTrash,
  FaHeart,
  FaEye,
  FaCalendar,
  FaShoppingBag,
  FaFilter,
} from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../components/Navbar";

interface Review {
  productId: number;
  productTitle: string;
  productImage: string;
  rating: number;
  timestamp: number;
}

const FloatingElements = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute animate-pulse opacity-10"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${3 + Math.random() * 4}s`,
          }}
        >
          <FaStar className="text-[#000000] text-xl" />
        </div>
      ))}
    </div>
  );
};

const StarDisplay = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <FaStar
          key={star}
          className={`text-xl ${
            star <= rating ? "text-[#000000]" : "text-gray-300"
          }`}
        />
      ))}
      <span className="text-lg text-[#4B5563] ml-3 font-bold">{rating}/5</span>
    </div>
  );
};

const ReviewCard = ({
  review,
  onDelete,
  index,
}: {
  review: Review;
  onDelete: (productId: number) => void;
  index: number;
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), index * 150);
    return () => clearTimeout(timer);
  }, [index]);

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getRatingText = (rating: number) => {
    switch (rating) {
      case 5:
        return "Absolutely Love It!";
      case 4:
        return "Really Good";
      case 3:
        return "It's Okay";
      case 2:
        return "Not Great";
      case 1:
        return "Disappointed";
      default:
        return "";
    }
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 4) return "text-green-600";
    if (rating >= 3) return "text-yellow-600";
    return "text-red-600";
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    setTimeout(() => {
      onDelete(review.productId);
    }, 300);
  };

  return (
    <div
      className={`transform transition-all duration-1000 ${
        isLoaded && !isDeleting
          ? "translate-y-0 opacity-100 scale-100"
          : "translate-y-8 opacity-0 scale-95"
      }`}
    >
      <div className="group bg-white/95 backdrop-blur-sm rounded-3xl shadow-lg hover:shadow-2xl border border-[#F3F4F6]/50 overflow-hidden transition-all duration-500 hover:border-[#000000]/30">
        <div className="p-6">
          {/* Header with Delete Button */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-[#000000]/10 to-[#4B5563]/10 rounded-2xl">
                <FaShoppingBag className="text-[#000000] text-2xl" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#000000] mb-1 group-hover:text-[#000000] transition-colors duration-300">
                  Product Review
                </h3>
                <div className="flex items-center gap-2 text-sm text-[#4B5563]/70">
                  <FaCalendar className="text-xs" />
                  <span>
                    {formatDate(review.timestamp)} at{" "}
                    {formatTime(review.timestamp)}
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="p-3 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-2xl transition-all duration-300 transform hover:scale-110 disabled:opacity-50"
              title="Delete Review"
            >
              <FaTrash className="text-lg cursor-pointer" />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Product Image */}
            <div className="lg:col-span-1">
              <div className="relative bg-gradient-to-br from-[#FFFFFF] to-[#F3F4F6] rounded-2xl p-4 h-80">
                <div className="relative w-full h-full bg-white rounded-xl shadow-inner overflow-hidden">
                  <Image
                    src={review.productImage}
                    alt={review.productTitle}
                    fill
                    className="object-contain p-3 transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                </div>
              </div>
            </div>

            {/* Review Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Product Title */}
              <div className="bg-gradient-to-r from-[#FFFFFF] to-[#F3F4F6]/50 rounded-2xl p-4">
                <h4 className="text-lg font-bold text-[#000000] mb-2">
                  {review.productTitle}
                </h4>
                <div className="flex items-center gap-2 text-sm text-[#4B5563]/70">
                  <span>Product ID: #{review.productId}</span>
                </div>
              </div>

              {/* Rating Section */}
              <div className="bg-gradient-to-br from-white to-[#FFFFFF]/30 rounded-2xl p-6 border-2 border-[#F3F4F6]/30">
                <div className="text-center mb-4">
                  <h5 className="text-lg font-semibold text-[#000000] mb-3">
                    Your Rating
                  </h5>
                  <StarDisplay rating={review.rating} />
                </div>

                <div className="text-center">
                  <span
                    className={`text-2xl font-bold ${getRatingColor(
                      review.rating
                    )}`}
                  >
                    {getRatingText(review.rating)}
                  </span>
                </div>

                {/* Rating Breakdown */}
                <div className="mt-6 grid grid-cols-3 gap-4">
                  <div className="text-center p-3 bg-[#F3F4F6]/30 rounded-xl">
                    <div className="text-2xl font-bold text-[#000000] mb-1">
                      {review.rating}
                    </div>
                    <div className="text-xs text-[#4B5563] font-medium">
                      Stars Given
                    </div>
                  </div>
                  <div className="text-center p-3 bg-[#F3F4F6]/30 rounded-xl">
                    <div className="text-2xl font-bold text-[#000000] mb-1">
                      {review.rating >= 4
                        ? "😍"
                        : review.rating >= 3
                        ? "😊"
                        : "😐"}
                    </div>
                    <div className="text-xs text-[#4B5563] font-medium">
                      Your Mood
                    </div>
                  </div>
                  <div className="text-center p-3 bg-[#F3F4F6]/30 rounded-xl">
                    <div className="text-2xl font-bold text-[#000000] mb-1">
                      {Math.round((review.rating / 5) * 100)}%
                    </div>
                    <div className="text-xs text-[#4B5563] font-medium">
                      Satisfaction
                    </div>
                  </div>
                </div>
              </div>

              {/* Thank You Message */}
              <div className="bg-gradient-to-r from-[#4B5563]/5 to-[#000000]/5 rounded-2xl p-4 border border-[#000000]/20">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#000000]/10 rounded-full">
                    <FaHeart className="text-[#000000]" />
                  </div>
                  <div>
                    <p className="text-[#4B5563] font-medium text-sm">
                      Thank you for your honest feedback! Your review helps
                      other customers and improves our service quality.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [sortBy, setSortBy] = useState<
    "newest" | "oldest" | "rating-high" | "rating-low"
  >("newest");

  useEffect(() => {
    const storedReviews = JSON.parse(localStorage.getItem("reviews") || "[]");
    setReviews(storedReviews);
    setTimeout(() => setIsLoaded(true), 300);
  }, []);

  const handleDeleteReview = (productId: number) => {
    const updatedReviews = reviews.filter(
      (review) => review.productId !== productId
    );
    setReviews(updatedReviews);
    localStorage.setItem("reviews", JSON.stringify(updatedReviews));
  };

  const handleClearAllReviews = () => {
    setReviews([]);
    localStorage.removeItem("reviews");
  };

  const sortedReviews = [...reviews].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return b.timestamp - a.timestamp;
      case "oldest":
        return a.timestamp - b.timestamp;
      case "rating-high":
        return b.rating - a.rating;
      case "rating-low":
        return a.rating - b.rating;
      default:
        return b.timestamp - a.timestamp;
    }
  });

  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce((sum, review) => sum + review.rating, 0) /
          reviews.length
        ).toFixed(1)
      : 0;

  const ratingDistribution = {
    5: reviews.filter((r) => r.rating === 5).length,
    4: reviews.filter((r) => r.rating === 4).length,
    3: reviews.filter((r) => r.rating === 3).length,
    2: reviews.filter((r) => r.rating === 2).length,
    1: reviews.filter((r) => r.rating === 1).length,
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#FFFFFF] via-[#F3F4F6] to-[#E5E7EB] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-20 w-20 border-4 border-[#000000]/30 border-t-[#000000] mx-auto mb-4"></div>
          <p className="text-[#4B5563] text-lg font-medium">
            Loading your reviews...
          </p>
        </div>
      </div>
    );
  }

  return (
    <main className="relative min-h-screen bg-gradient-to-br from-[#FFFFFF] via-[#F3F4F6] to-[#E5E7EB]">
      <Navbar />
      <FloatingElements />

      {/* Enhanced Hero Section */}
      <div className="relative z-10 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-6 mb-8 mt-8 cursor-pointer"></div>

            <h1 className="text-5xl md:text-7xl font-bold text-[#000000] mb-4 tracking-wide">
              Your
              <span className="block text-[#000000] italic font-serif">
                Reviews
              </span>
            </h1>
            <p className="text-xl text-[#4B5563] font-light max-w-2xl mx-auto">
              Your valuable feedback on our traditional collection
            </p>
          </div>

          {/* Enhanced Statistics Dashboard */}
          {reviews.length > 0 && (
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-[#F3F4F6]/50 overflow-hidden mb-12">
              {/* Main Stats */}
              <div className="p-8 bg-gradient-to-r from-[#FFFFFF] to-white">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="text-center group cursor-pointer">
                    <div className="p-4 bg-gradient-to-br from-[#000000]/10 to-[#4B5563]/10 rounded-2xl mb-3 group-hover:scale-105 transition-transform duration-300">
                      <FaStar className="text-3xl text-[#000000] mx-auto" />
                    </div>
                    <div className="text-3xl font-bold text-[#000000] mb-1">
                      {reviews.length}
                    </div>
                    <div className="text-sm text-[#4B5563] font-medium">
                      Total Reviews
                    </div>
                  </div>

                  <div className="text-center group cursor-pointer">
                    <div className="p-4 bg-gradient-to-br from-[#000000]/10 to-[#4B5563]/10 rounded-2xl mb-3 group-hover:scale-105 transition-transform duration-300">
                      <div className="text-3xl text-[#000000] mx-auto font-bold">
                        {averageRating}
                      </div>
                    </div>
                    <div className="text-3xl font-bold text-[#000000] mb-1">
                      ★
                    </div>
                    <div className="text-sm text-[#4B5563] font-medium">
                      Average Rating
                    </div>
                  </div>

                  <div className="text-center group cursor-pointer">
                    <div className="p-4 bg-gradient-to-br from-[#000000]/10 to-[#4B5563]/10 rounded-2xl mb-3 group-hover:scale-105 transition-transform duration-300">
                      <FaHeart className="text-3xl text-[#000000] mx-auto" />
                    </div>
                    <div className="text-3xl font-bold text-[#000000] mb-1">
                      {ratingDistribution[5]}
                    </div>
                    <div className="text-sm text-[#4B5563] font-medium">
                      5-Star Reviews
                    </div>
                  </div>

                  <div className="text-center group cursor-pointer">
                    <div className="p-4 bg-gradient-to-br from-[#000000]/10 to-[#4B5563]/10 rounded-2xl mb-3 group-hover:scale-105 transition-transform duration-300">
                      <div className="text-3xl text-[#000000] mx-auto">
                        {reviews.length > 0
                          ? Math.round(
                              (ratingDistribution[5] / reviews.length) * 100
                            )
                          : 0}
                        %
                      </div>
                    </div>
                    <div className="text-3xl font-bold text-[#000000] mb-1">
                      😍
                    </div>
                    <div className="text-sm text-[#4B5563] font-medium">
                      Satisfaction Rate
                    </div>
                  </div>
                </div>
              </div>

              {/* Rating Distribution */}
              <div className="px-8 pb-8">
                <h3 className="text-xl font-bold text-[#000000] mb-6 text-center">
                  Rating Distribution
                </h3>
                <div className="space-y-3">
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <div key={rating} className="flex items-center gap-4">
                      <div className="flex items-center gap-2 w-20">
                        <span className="text-sm font-bold text-[#4B5563]">
                          {rating}
                        </span>
                        <FaStar className="text-[#000000] text-sm" />
                      </div>
                      <div className="flex-1 bg-[#F3F4F6]/50 rounded-full h-4 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[#4B5563] to-[#000000] transition-all duration-1000 ease-out rounded-full"
                          style={{
                            width: `${
                              reviews.length > 0
                                ? (ratingDistribution[
                                    rating as keyof typeof ratingDistribution
                                  ] /
                                    reviews.length) *
                                  100
                                : 0
                            }%`,
                          }}
                        />
                      </div>
                      <span className="text-sm font-bold text-[#4B5563] w-8 text-right">
                        {
                          ratingDistribution[
                            rating as keyof typeof ratingDistribution
                          ]
                        }
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 px-4 pb-16 max-w-6xl mx-auto">
        {reviews.length === 0 ? (
          // Enhanced Empty State
          <div className="text-center py-20 bg-white/80 backdrop-blur-sm rounded-3xl border border-[#F3F4F6]/50 shadow-xl">
            <div className="mb-8">
              <div className="p-6 bg-gradient-to-br from-[#000000]/10 to-[#4B5563]/10 rounded-full w-24 h-24 mx-auto mb-6">
                <FaStar className="text-5xl text-[#000000] mx-auto mt-2" />
              </div>
              <h2 className="text-3xl font-bold text-[#000000] mb-4">
                No Reviews Yet
              </h2>
              <p className="text-lg text-[#4B5563] mb-8 max-w-md mx-auto leading-relaxed">
                Start rating products to see your thoughtful reviews here. Your
                feedback is valuable to us and other customers!
              </p>
              <Link
                href="/products"
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#4B5563] to-[#000000] text-white font-semibold rounded-2xl hover:from-[#000000] hover:to-[#4B5563] transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <FaStar className="text-white text-lg" />
                Start Rating Products
              </Link>
            </div>
          </div>
        ) : (
          <>
            {/* Enhanced Sort and Controls */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-[#F3F4F6]/50 shadow-lg mb-8">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <FaFilter className="text-[#000000]" />
                    <label className="text-sm font-bold text-[#4B5563]">
                      Sort by:
                    </label>
                  </div>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                    className="px-4 py-2 bg-[#FFFFFF] border-2 border-[#F3F4F6] rounded-xl text-[#000000] font-medium focus:outline-none focus:ring-2 focus:ring-[#000000] focus:border-[#000000] transition-all duration-300 cursor-pointer"
                  >
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                    <option value="rating-high">Highest Rated</option>
                    <option value="rating-low">Lowest Rated</option>
                  </select>
                </div>

                <button
                  onClick={handleClearAllReviews}
                  className="flex items-center gap-2 px-6 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer"
                >
                  <FaTrash />
                  Clear All Reviews
                </button>
              </div>
            </div>

            {/* Reviews List */}
            <div className="space-y-6">
              {sortedReviews.map((review, index) => (
                <ReviewCard
                  key={`${review.productId}-${review.timestamp}`}
                  review={review}
                  onDelete={handleDeleteReview}
                  index={index}
                />
              ))}
            </div>

            {/* Enhanced Back to Products Section */}
            <div className="mt-16 text-center bg-gradient-to-r from-white/80 to-[#FFFFFF]/80 backdrop-blur-sm rounded-3xl p-12 border border-[#F3F4F6]/50 shadow-xl">
              <div className="p-4 bg-gradient-to-br from-[#000000]/10 to-[#4B5563]/10 rounded-full w-16 h-16 mx-auto mb-6">
                <FaEye className="text-2xl text-[#000000] mx-auto mt-2" />
              </div>
              <h3 className="text-2xl font-bold text-[#000000] mb-4">
                Want to Review More Products?
              </h3>
              <p className="text-lg text-[#4B5563] mb-8 max-w-md mx-auto">
                Explore our beautiful collection and share your thoughts with
                other customers.
              </p>
              <Link
                href="/products"
                className="inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-[#4B5563] to-[#000000] text-white font-bold rounded-2xl hover:from-[#000000] hover:to-[#4B5563] transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl text-lg"
              >
                <FaStar className="text-white text-xl" />
                Browse More Products
              </Link>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
