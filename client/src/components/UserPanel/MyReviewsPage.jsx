// src/components/UserPanel/MyReviewsPage.jsx
import React, { useState, useEffect } from 'react';
import UserLayout from '../../Layout/UserLayout';
import { Star, Trash2, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { toast } from 'react-hot-toast';

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  }).format(date).replace(',', '');
};

export default function MyReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 5;

  // 12 DUMMY REVIEWS → 3 PAGES
  const dummyReviews = [
    { id: 1, productId: 101, productName: "Head Light Visor", productImage: "https://via.placeholder.com/80x80/1a1a1a/ffffff?text=HLV", rating: 5, comment: "Bahut achhi quality hai, fitting perfect hai. Highly recommended!", createdAt: "2025-11-10T10:30:00Z" },
    { id: 2, productId: 102, productName: "Front Mudguard", productImage: "https://via.placeholder.com/80x80/2d2d2d/ffffff?text=MUD", rating: 4, comment: "Color thoda fade hai, lekin quality achhi hai. Value for money.", createdAt: "2025-11-08T14:20:00Z" },
    { id: 3, productId: 103, productName: "Tail Panels", productImage: "https://via.placeholder.com/80x80/1f1f1f/ffffff?text=TP", rating: 3, comment: "Fitting issue hai, mechanic se lagwaya. Thoda improvement chahiye.", createdAt: "2025-11-05T09:15:00Z" },
    { id: 4, productId: 104, productName: "Exhaust Pipe", productImage: "https://via.placeholder.com/80x80/333333/ffffff?text=EXH", rating: 5, comment: "Sound bahut mast hai, power bhi badhi.", createdAt: "2025-11-03T11:45:00Z" },
    { id: 5, productId: 105, productName: "Side Mirror Set", productImage: "https://via.placeholder.com/80x80/444444/ffffff?text=MIR", rating: 4, comment: "Clear view, vibration kam hai.", createdAt: "2025-11-01T16:10:00Z" },
    { id: 6, productId: 106, productName: "LED Headlight", productImage: "https://via.placeholder.com/80x80/555555/ffffff?text=LED", rating: 5, comment: "Raat mein din jaisa dikhta hai!", createdAt: "2025-10-30T20:30:00Z" },
    { id: 7, productId: 107, productName: "Seat Cover", productImage: "https://via.placeholder.com/80x80/666666/ffffff?text=SEAT", rating: 2, comment: "Jaldi phat gaya, quality kam hai.", createdAt: "2025-10-28T12:00:00Z" },
    { id: 8, productId: 108, productName: "Handle Grip", productImage: "https://via.placeholder.com/80x80/777777/ffffff?text=GRP", rating: 4, comment: "Comfortable, good grip.", createdAt: "2025-10-25T18:45:00Z" },
    { id: 9, productId: 109, productName: "Chain Lube", productImage: "https://via.placeholder.com/80x80/888888/ffffff?text=LUBE", rating: 5, comment: "Smooth chain, no noise.", createdAt: "2025-10-22T10:20:00Z" },
    { id: 10, productId: 110, productName: "Brake Pads", productImage: "https://via.placeholder.com/80x80/999999/ffffff?text=BRK", rating: 3, comment: "Stops fast, but squeaks.", createdAt: "2025-10-20T14:55:00Z" },
    { id: 11, productId: 111, productName: "Foot Pegs", productImage: "https://via.placeholder.com/80x80/aaaaaa/ffffff?text=PEG", rating: 4, comment: "Strong, good grip.", createdAt: "2025-10-18T11:30:00Z" },
    { id: 12, productId: 112, productName: "Air Filter", productImage: "https://via.placeholder.com/80x80/bbbbbb/ffffff?text=AIR", rating: 5, comment: "Better pickup after install.", createdAt: "2025-10-15T09:10:00Z" }
  ];

  useEffect(() => {
    const saved = localStorage.getItem('myReviews');
    if (saved && JSON.parse(saved).length > 0) {
      setReviews(JSON.parse(saved));
    } else {
      // FORCE 12 REVIEWS
      setReviews(dummyReviews);
      localStorage.setItem('myReviews', JSON.stringify(dummyReviews));
    }
  }, []);

  const handleDelete = (id) => {
    const updated = reviews.filter(r => r.id !== id);
    setReviews(updated);
    localStorage.setItem('myReviews', JSON.stringify(updated));
    toast.success('Review deleted!', { style: { background: '#ef4444', color: 'white' } });

    const totalPages = Math.ceil(updated.length / reviewsPerPage);
    if (currentPage > totalPages && totalPages > 0) setCurrentPage(totalPages);
  };

  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);
  const totalPages = Math.ceil(reviews.length / reviewsPerPage);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <UserLayout activePage="reviews">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        <div className="mb-8">
          <h1 className="text-3xl font-black text-gray-800 flex items-center gap-3">
            <Star className="w-8 h-8 text-yellow-500 fill-current" />
            My Reviews
          </h1>
          <p className="text-gray-600 mt-1">Manage and delete your product reviews</p>
        </div>

        {/* 5 REVIEWS */}
        <div className="space-y-6 mb-10">
          {currentReviews.map((review) => (
            <div key={review.id} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all">
              <div className="flex flex-col sm:flex-row gap-5">
                <div className="flex-shrink-0">
                  <img src={review.productImage} alt={review.productName} className="w-20 h-20 rounded-lg object-cover border border-gray-200" />
                </div>
                <div className="flex-1 space-y-3">
                  <h3 className="font-semibold text-lg text-gray-800">{review.productName}</h3>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                    ))}
                    <span className="text-sm text-gray-600 ml-2">{review.rating}.0</span>
                  </div>
                  <p className="text-gray-700 leading-relaxed">{review.comment}</p>
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(review.createdAt)}</span>
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(review.id)}
                  className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-all group"
                  title="Delete Review"
                >
                  <Trash2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* PAGINATION */}
        <div className="flex justify-center items-center gap-2 pt-6 border-t">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className={`p-2 rounded-lg ${currentPage === 1 ? 'bg-gray-100 text-gray-400' : 'bg-white text-gray-700 hover:bg-red-50 hover:text-red-600 border'}`}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex gap-1">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i + 1}
                onClick={() => goToPage(i + 1)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                  currentPage === i + 1 ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-red-50 hover:text-red-600'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`p-2 rounded-lg ${currentPage === totalPages ? 'bg-gray-100 text-gray-400' : 'bg-white text-gray-700 hover:bg-red-50 hover:text-red-600 border'}`}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

      </div>
    </UserLayout>
  );
}