const SettingsMenuItem = ({ title, description, icon, onClick}) => (
    <div onClick={onClick} className="bg-[var(--color-surface)] p-6 rounded-xl shadow-[var(--shadow-card)] hover:shadow-xl hover:scale-105 transition-all cursor-pointer hover:bg-[var(--color-surface-hover)]">
        <div className="flex items-start gap-4">
            <div className="text-3xl">{icon}</div>
            <div>
                <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">{title}</h3>
                <p className="mt-1 text-sm text-[var(--color-text-secondary)]">{description}</p>
            </div>
        </div>
    </div>
);

export default SettingsMenuItem;