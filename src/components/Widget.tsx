import React from 'react';

interface WidgetProps {
  icon: React.ReactNode;
  title: string;
  topRightIcon?: React.ReactNode;
  children: React.ReactNode;
}

const Widget: React.FC<WidgetProps> = ({ icon, title, topRightIcon, children }) => {
  return (
    <div className="icloud-panel rounded-xl overflow-hidden">
      <div className="bg-gradient-to-r from-[var(--color-bg-secondary)] to-[var(--color-bg-primary)] p-4 border-b border-[var(--color-border)]">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="text-[var(--color-accent)]">{icon}</div>
            <h2 className="font-medium text-[var(--color-text-primary)]">{title}</h2>
          </div>
          {topRightIcon && <div className="text-[var(--color-text-primary)]">{topRightIcon}</div>}
        </div>
      </div>
      <div className="p-4 bg-[var(--color-bg-secondary)]">{children}</div>
    </div>
  );
};

export default Widget;
