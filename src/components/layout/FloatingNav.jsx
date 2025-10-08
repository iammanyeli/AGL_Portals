import React, { useState, useEffect } from 'react';

/**
 * A floating navigation component that displays a dynamic set of links.
 * The specific links to display are passed in via the `navLinks` prop from the main App.jsx.
 * This allows each portal (or the main dashboard) to have its own unique navigation items.
 *
 * It determines the active item based on `currentPage` and `portalSubPage` props.
 */
const FloatingNav = ({ currentPage, portalSubPage, navLinks }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Determine which navigation item should be highlighted as "active"
  const isPortalView = currentPage !== 'hub-home' && currentPage !== 'hub-settings';
  const activeItem = isPortalView ? portalSubPage : currentPage;

  const handlePeelClick = () => {
      if (!isExpanded) {
          setIsExpanded(true);
      }
  }

  // Effect to collapse the menu when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
        const peel = document.getElementById('peelContent');
        if (peel && !peel.contains(event.target)) {
            setIsExpanded(false);
        }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
        document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  return (
    <nav className="fixed bottom-6 right-6 z-50">
      <div 
        id="peelContent"
        onClick={handlePeelClick}
        className={`p-2 glass-nav ${!isExpanded ? 'collapsed' : ''}`}
        // Dynamically set the expanded height based on the number of nav links
        style={{ height: !isExpanded ? '64px' : `${8 + navLinks.length * 56}px` }}
      >
        {navLinks.map(({ id, tooltip, Icon, action }, index) => (
          <button
            key={id}
            onClick={() => { action(); setIsExpanded(false); }}
            className={`nav-item w-12 h-12 rounded-full ${activeItem === id ? 'active' : ''}`}
            aria-label={tooltip}
            // Dynamically set the top position for the peel animation
            style={{ top: !isExpanded ? '50%' : `${8 + index * 56}px` }}
          >
            <Icon className="nav-icon" />
            <span className="tooltip">{tooltip}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default FloatingNav;