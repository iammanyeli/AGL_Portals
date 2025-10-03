const Section = ({ title, children }) => (
    <div className="border-t border-slate-200 pt-6">
        <h3 className="text-lg font-bold text-slate-800 mb-4">{title}</h3>
        {children}
    </div>
);
