const SettingsMenuItem = ({ title, description, icon, onClick}) => (
    <div onClick={onClick} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all cursor-pointer">
        <div className="flex items-start gap-4">
            <div className="text-3xl">{icon}</div>
            <div>
                <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
                <p className="mt-1 text-sm text-gray-600">{description}</p>
            </div>
        </div>
    </div>
);

export default SettingsMenuItem;