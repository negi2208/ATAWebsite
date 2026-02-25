// src/components/Product/ReviewSection.jsx
import React, { useState } from "react";
import { Star } from "lucide-react"; // YE IMPORT KIYA

export default function ReviewSection() {
  const [userRating, setUserRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);

  const totalReviews = 3;
  const averageRating = 4.33;
  const ratingBreakdown = { 5: 1, 4: 1, 3: 1, 2: 0, 1: 0 };

  const reviews = [
    { name: "Sohan Kumar", date: "June 26, 2025", rating: 5, verified: true, text: "Sed perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium." },
    { name: "Rohan Sharma", date: "June 25, 2025", rating: 4, verified: true, text: "Sed perspiciatis unde omnis iste natus aliquam sit voluptatem exercitationem doloremque laudantium." },
    { name: "Priya Singh", date: "June 23, 2025", rating: 5, verified: false, text: "Commodi perspiciatis unde omnis iste natus aliquam sit voluptatem exercitationem doloremque laudantium." }
  ];

  const StarIcon = ({ filled, hovered, size = 48 }) => (
    <Star
      size={size}
      className={`transition-all duration-200 transform hover:scale-110 ${
        filled || hovered ? "fill-yellow-400 text-yellow-400 drop-shadow-md" : "text-gray-300"
      }`}
    />
  );

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header + Rating Breakdown */}
      <div className="border-b border-gray-200 pb-8 mb-10">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">
          {totalReviews} reviews for{" "}
          <span className="font-normal text-gray-700">
            Castrol GTX High Mileage 5W-30 Synthetic Blend Motor Oil, 5 Quarts
          </span>
        </h3>

        <div className="flex flex-col md:flex-row gap-10">
          <div className="text-center">
            <div className="text-6xl font-bold text-gray-900">{averageRating}</div>
            <div className="flex justify-center gap-1 mt-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={36} className="fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <p className="text-sm text-gray-600 mt-2">Average of {totalReviews} reviews</p>
          </div>

          <div className="flex-1 space-y-3">
            {[5, 4, 3, 2, 1].map((star) => (
              <div key={star} className="flex items-center gap-3">
                <span className="text-sm text-gray-600 w-10">{star} star</span>
                <div className="flex-1 bg-gray-200 rounded-full h-4 overflow-hidden">
                  <div
                    className="bg-yellow-400 h-full rounded-full transition-all duration-700"
                    style={{ width: `${(ratingBreakdown[star] / totalReviews) * 100}%` }}
                  />
                </div>
                <span className="text-sm text-gray-600 w-8 text-right">{ratingBreakdown[star]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Individual Reviews */}
      <div className="space-y-10 pb-10">
        {reviews.map((review, i) => (
          <div key={i} className="flex gap-5">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md">
                {review.name.charAt(0)}
              </div>
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <h4 className="font-semibold text-gray-900">{review.name}</h4>
                {review.verified && (
                  <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-1 rounded-full">
                    Verified Purchase
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className={i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
                    />
                  ))}
                </div>
                <span>• {review.date}</span>
              </div>

              <p className="text-gray-700 leading-relaxed text-base">{review.text}</p>

            </div>
          </div>
        ))}
      </div>

      {/* Add a Review Form – REAL STAR ICONS */}
      <div className="mt-12 bg-gray-50 rounded-2xl p-8 border border-gray-200">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Add a review</h3>
        <p className="text-sm text-gray-600 mb-8">
          Your email address will not be published. Required fields are marked *
        </p>

        <form className="space-y-8">
          {/* Rating Stars */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-4">
              Your rating *
            </label>
            <div className="flex gap-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  onClick={() => setUserRating(star)}
                  className="focus:outline-none"
                >
                  <StarIcon
                    filled={star <= userRating}
                    hovered={star <= hoveredRating && star > userRating}
                    size={32}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Review Text */}
          <div>
            <label htmlFor="review-text" className="block text-sm font-medium text-gray-700 mb-3">
              Your review *
            </label>
            <textarea
              id="review-text"
              rows={6}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent resize-none transition-all"
              placeholder="Share your experience with this product..."
            />
          </div>

          {/* Name & Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-3">
                Name *
              </label>
              <input
                type="text"
                id="name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                placeholder="Enter your name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-3">
                Email *
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                placeholder="Enter your email"
              />
            </div>
          </div>

          {/* Save Info */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="save-info"
              className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-600"
            />
            <label htmlFor="save-info" className="ml-3 text-sm text-gray-600">
              Save my name, email, and website in this browser for the next time I comment.
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-primary-600 hover:bg-primary-700 text-white font-bold py-4 px-10 rounded-xl transition-all duration-200 hover:shadow-xl transform hover:-translate-y-0.5"
          >
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
}