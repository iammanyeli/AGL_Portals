// block: DashboardCard
const DashboardCard = ({ title, count, icon, variant, isActive, onClick }) => {
    const variantClasses = {
        info: 'bg-[var(--color-info)]',
        success: 'bg-[var(--color-success)]',
        warning: 'bg-[var(--color-warning)]',
        danger: 'bg-[var(--color-danger)]',
    };

    return (
        <div
            onClick={onClick}
            className={`${variantClasses[variant] || variantClasses.info} text-white rounded-2xl p-6 shadow-lg transition-all duration-300 cursor-pointer ${isActive ? 'scale-105 ring-2 ring-[var(--color-ring)]' : 'hover:scale-105'}`}
        >
            <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-bold opacity-80">{title}</span>
                <div className="opacity-70">{icon}</div>
            </div>
            <p className="text-3xl font-bold">{count}</p>
        </div>
    );
};

export default DashboardCard;