import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import axios from "axios";

export default function ReviewsSection() {
  const scrollRef = useRef(null);
  const isMobile = window.innerWidth < 768;

  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const dummyReviews = [
    { name: "Jessica Lindström", date: "3 days ago", rating: 5, comment: "Great quality, fast delivery and excellent customer service..." },
    { name: "John Malkovich", date: "3 days ago", rating: 5, comment: "Great quality, fast delivery and excellent customer service..." },
    { name: "Teresa Holland", date: "3 days ago", rating: 5, comment: "Great quality, fast delivery and excellent customer service..." },
    { name: "Michael Smith", date: "5 days ago", rating: 5, comment: "High quality, arrived on time, very satisfied with the purchase." },
  ];

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/reviews`);
        setReviews(res.data);
      } catch {
        setReviews(dummyReviews);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  const scrollLeft = () =>
    scrollRef.current?.scrollBy({ left: -320, behavior: "smooth" });

  const scrollRight = () =>
    scrollRef.current?.scrollBy({ left: 320, behavior: "smooth" });

  // ✅ Mobile-only autoplay
  useEffect(() => {
    if (!isMobile || !scrollRef.current) return;

    const interval = setInterval(() => {
      scrollRef.current.scrollBy({ left: 320, behavior: "smooth" });

      // If end reached, go back to start
      if (
        scrollRef.current.scrollLeft + scrollRef.current.clientWidth >=
        scrollRef.current.scrollWidth - 10
      ) {
        scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
      }
    }, 2500);

    return () => clearInterval(interval);
  }, [isMobile]);

  if (loading) return null;

  return (
    <section className="pb-10 bg-white relative">
      <hr className="border-gray-200 w-full max-w-[1200px] mx-auto py-8" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex flex-col md:flex-row gap-10">

          {/* LEFT TEXT */}
          <div className="w-full md:w-80">
            <h2 className="text-3xl font-bold mb-2">Excellent</h2>

            <div className="flex items-center gap-1 mb-1">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-green-600 text-2xl">★</span>
              ))}
            </div>

            <p className="text-gray-600 mb-4">
              Based on <strong>{reviews.length}</strong> reviews
            </p>

            <p className="text-gray-600 italic">
              All comments are from real users who purchased.
            </p>
          </div>

          {/* RIGHT SECTION */}
          <div className="flex-1 min-w-0">

            {/* SLIDER */}
            <div
              ref={scrollRef}
              className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth px-2 py-2"
            >
              {reviews.map((review, idx) => (
                <div
                  key={idx}
                  className="flex-shrink-0 w-64 sm:w-72 md:w-80 bg-gray-50 p-4 rounded-xl shadow-sm"
                >
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(review.rating)].map((_, i) => (
                      <span key={i} className="text-green-600 text-xl">★</span>
                    ))}
                    <span className="text-xs text-gray-500 ml-1">Purchased user</span>
                  </div>

                  <p className="text-sm text-gray-800 mb-2 line-clamp-3">{review.comment}</p>
                  <p className="font-medium text-gray-900">{review.name}</p>
                  <p className="text-xs text-gray-500">{review.date}</p>
                </div>
              ))}
            </div>

            {/* ARROWS — ALWAYS VISIBLE */}
            <div className="flex justify-center sm:justify-end gap-4 mt-4">
              <button
                onClick={scrollLeft}
                className="w-9 h-9 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-100"
              >
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>

              <button
                onClick={scrollRight}
                className="w-9 h-9 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-100"
              >
                <ChevronRight className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Styles */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
}
