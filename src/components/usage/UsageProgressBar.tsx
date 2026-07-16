'use client';

import { FaExclamationTriangle } from 'react-icons/fa';

interface UsageProgressBarProps {
  usage: {
    used: number;
    limit: number;
    unlimited: boolean;
  };
  percentageUsed: number;
  isNearLimit: boolean;
  isAlmostFull: boolean;
}

export const UsageProgressBar = ({ 
  usage, 
  percentageUsed, 
  isNearLimit, 
  isAlmostFull 
}: UsageProgressBarProps) => {
  if (usage.unlimited) return null;

  return (
    <div className="bg-sidebar-bg rounded-xl p-6 border border-sidebar-border">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-sm font-semibold text-foreground">Usage Progress</h3>
        <span className="text-sm text-muted">
          {usage.used.toLocaleString()} / {usage.limit.toLocaleString()} requests
        </span>
      </div>
      <div className="w-full h-3 bg-sidebar-border rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${
            isAlmostFull ? 'bg-gradient-to-r from-red-500 to-red-600' :
            isNearLimit ? 'bg-gradient-to-r from-yellow-400 to-yellow-500' :
            'bg-gradient-to-r from-primary to-secondary'
          }`}
          style={{ width: `${Math.min(percentageUsed, 100)}%` }}
        />
      </div>
      <div className="flex justify-between mt-2">
        <span className="text-xs text-muted">0%</span>
        <span className="text-xs text-muted">50%</span>
        <span className="text-xs text-muted">100%</span>
      </div>
      {isNearLimit && !usage.unlimited && (
        <div className="mt-3 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg flex items-start gap-2">
          <FaExclamationTriangle className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
          <p className="text-xs text-yellow-400">
            You&apos;re approaching your usage limit. Consider upgrading your plan for uninterrupted service.
          </p>
        </div>
      )}
    </div>
  );
};