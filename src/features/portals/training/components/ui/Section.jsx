const Section = ({ title, children }) => (
    <div className="border-t border-[var(--color-divider)] pt-6">
        <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-4">{title}</h3>
        {children}
    </div>
);

export default Section;