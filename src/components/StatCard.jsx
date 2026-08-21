function StatCard({ label, value, icon, color }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="text-2xl font-bold text-gray-800 mt-1">{value}</p>
      </div>
      <div
        className="w-12 h-12 rounded-lg flex items-center justify-center text-xl"
        style={{ backgroundColor: color }}
      >
        {icon}
      </div>
    </div>
  )
}

export default StatCard