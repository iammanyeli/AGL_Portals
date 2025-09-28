import React from 'react';

export const Card = ({ className, children }) => <div className={`bg-white dark:bg-white/5 rounded-lg border border-slate-200 dark:border-white/10 ${className}`}>{children}</div>;
export const CardHeader = ({ className, children }) => <div className={`p-6 border-b border-slate-200 dark:border-white/10 ${className}`}>{children}</div>;
export const CardContent = ({ className, children }) => <div className={`${className}`}>{children}</div>;
export const CardTitle = ({ className, children }) => <h3 className={`text-lg font-semibold leading-none tracking-tight text-[#1B365F] dark:text-slate-100 ${className}`}>{children}</h3>;
