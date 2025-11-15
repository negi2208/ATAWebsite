import useAdminStore from '../store/useAdminStore';

export default function AdminDashboard() {
  const { stats, topProducts } = useAdminStore();

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Object.entries(stats).map(([key, value]) => {
          const title = key.replace('total', 'Total ').replace(/([A-Z])/g, ' $1').trim();
          const icons = {
            Users: Users,
            Vendors: Store,
            Products: Package,
            Orders: ShoppingBag,
          };
          const Icon = icons[title.split(' ')[1]];
          const colors = {
            Users: "bg-orange-500",
            Vendors: "bg-green-500",
            Products: "bg-purple-500",
            Orders: "bg-blue-500",
          };
          return (
            <StatsCard
              key={key}
              title={title}
              value={value}
              icon={Icon}
              color={colors[title.split(' ')[1]]}
            />
          );
        })}
      </div>

      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">Top Selling Products</h2>
          <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">This Month</span>
        </div>
        <div className="space-y-4">
          {topProducts.map((product, i) => (
            <TopProductCard key={i} product={product} index={i + 1} />
          ))}
        </div>
      </div>
    </div>
  );
}