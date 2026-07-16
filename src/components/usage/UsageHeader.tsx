'use client';

import { FaChartLine } from 'react-icons/fa';

interface UsageHeaderProps {
  onRefresh: () => void;
  isRefreshing: boolean;
}

export const UsageHeader = ({ onRefresh, isRefreshing }: UsageHeaderProps) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 className="text-3xl md:mt-0 mt-12 font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          API Usage Dashboard
        </h1>
        <p className="text-muted text-sm mt-1">
          Monitor your API usage and plan details
        </p>
      </div>
      <button
        onClick={onRefresh}
        disabled={isRefreshing}
        className="flex items-center gap-2 px-4 py-2 bg-sidebar-bg border border-sidebar-border rounded-lg hover:border-primary/50 transition-colors disabled:opacity-50"
      >
        <FaChartLine className={`w-4 h-4 text-primary ${isRefreshing ? 'animate-spin' : ''}`} />
        <span className="text-sm font-medium">
          {isRefreshing ? 'Refreshing...' : 'Refresh'}
        </span>
      </button>
    </div>
  );
};