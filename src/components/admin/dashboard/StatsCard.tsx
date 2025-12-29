export function StatsCard({ title, value, icon: Icon, color }: any) {
  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-sm">
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${color.bg} ${color.text}`}>
        <Icon size={24} />
      </div>
      <p className="text-gray-400 text-sm font-bold">{title}</p>
      <h3 className="text-2xl font-black dark:text-white mt-1">{value}</h3>
    </div>
  );
}
