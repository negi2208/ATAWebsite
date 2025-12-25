// src/components/AdminPanel/BestSellerItem.jsx
export default function BestSellerItem({ rank, image, title, sales = 0, maxSales = 10 }) {
  const percentage = (sales / maxSales) * 100;

  return (
    <div className="flex items-center gap-4 bg-white rounded-xl p-4 shadow hover:shadow-md transition-shadow">
      <img src={image} alt={title} className="w-16 h-16 rounded-lg object-cover" />
      
      <div className="flex-1">
        <div className="flex items-start justify-between">
          <div className="max-w-xs">
            <p className="font-medium text-gray-800 line-clamp-2">{title}</p>
            <p className="text-xs text-gray-500 mt-1">#{rank} best seller</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-orange-600">{sales}</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-3 relative">
          <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full transition-all duration-1000"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}