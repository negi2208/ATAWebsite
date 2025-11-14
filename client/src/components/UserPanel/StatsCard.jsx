// src/components/UserPanel/StatsCard.jsx
export default function StatsCard({ title, value, icon: Icon, color }) {
  return (
    <div className="bg-white p-8 rounded-3xl shadow-lg border hover:shadow-2xl transition-all hover:scale-105">
      <div className="flex items-center justify-between mb-4">
        <p className="text-gray-600 font-medium">{title}</p>
        {Icon && <Icon className={`w-12 h-12 ${color}`} />}
      </div>
      <p className="text-5xl font-extrabold text-gray-900">{value}</p>
    </div>
  );
}