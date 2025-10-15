import React from 'react';

// primitive: Button
const Button = ({ className = '', ...props }) => (
  <button
    {...props}
    className={`flex items-center gap-3 px-4 py-3 font-semibold rounded-lg transition-all duration-300 w-full text-left no-print ${className}`}
  />
);

/* helper: button state styling
  Purpose: Handles active/inactive visual state logic.
  Keeps all theming centralized here for easier maintenance.
*/
const getButtonStateClasses = (isActive, custom = {}) => {
  const activeDefaults = {
    bg: 'bg-[var(--color-tab-button-active-bg)]',
    text: 'text-[var(--color-tab-button-active-text)]',
    extras: 'shadow-lg scale-105',
  };

  const inactiveDefaults = {
    bg: 'bg-[var(--color-surface)]',
    text: 'text-[var(--color-text-secondary)]',
    extras: 'hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text-primary)]',
  };

  const active = { ...activeDefaults, ...(custom.active || {}) };
  const inactive = { ...inactiveDefaults, ...(custom.inactive || {}) };

  return isActive
    ? `${active.bg} ${active.text} ${active.extras}`
    : `${inactive.bg} ${inactive.text} ${inactive.extras}`;
};

// variant: Button_Stateful
const Button_Stateful = ({ label, icon, isActive, onClick, customStyles }) => {
  const stateClasses = getButtonStateClasses(isActive, customStyles);
  return (
    <Button onClick={onClick} className={stateClasses}>
      {icon && <span>{icon}</span>}
      {label && <span>{label}</span>}
    </Button>
  );
};

// wrapper
const TabButton = (props) => <Button_Stateful {...props} />;

export default TabButton;
