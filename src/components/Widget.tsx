import React from 'react';

interface WidgetProps {
  icon: React.ReactNode;
  title: string;
  topRightIcon?: React.ReactNode;
  children: React.ReactNode;
}

const Widget: React.FC<WidgetProps> = ({ icon, title, topRightIcon, children }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          {icon}
          <h2 className="text-lg font-semibold">{title}</h2>
        </div>
        {topRightIcon && <div>{topRightIcon}</div>}
      </div>
      <div>{children}</div>
      <div className="mt-4 flex justify-end">
        <button className="text-gray-500 hover:text-gray-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Widget;
