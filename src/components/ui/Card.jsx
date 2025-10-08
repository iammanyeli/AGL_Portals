import React from 'react';

export const Card = ({ className, children }) => <div className={`bg-[var(--color-surface)] rounded-lg border border-[var(--color-border)] shadow-[var(--shadow-card)] ${className}`}>{children}</div>;
export const CardHeader = ({ className, children }) => <div className={`p-6 border-b border-[var(--color-divider)] ${className}`}>{children}</div>;
export const CardContent = ({ className, children }) => <div className={`${className}`}>{children}</div>;
export const CardTitle = ({ className, children }) => <h3 className={`text-xl font-bold leading-none tracking-tight text-[var(--color-header)] ${className}`}>{children}</h3>;