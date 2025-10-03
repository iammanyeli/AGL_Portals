const DashboardCard = ({ title, count, icon, color, isActive, onClick }) => (
    <div
        onClick={onClick}
        className={`${color} text-white rounded-xl p-6 shadow-lg transition-transform duration-300 cursor-pointer ${isActive ? 'scale-105 ring-4 ring-white ring-opacity-60' : 'hover:scale-105'}`}
    >
        <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold opacity-80">{title}</span>
            {icon}
        </div>
        <p className="text-3xl font-bold">{count}</p>
    </div>
);

export default DashboardCard;