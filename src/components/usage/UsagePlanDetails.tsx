'use client';

import { FaInfoCircle } from 'react-icons/fa';
import { getPlanColor } from '@/src/lib/usageUtils';

interface UsagePlanDetailsProps {
  usage: {
    plan: string;
    used: number;
    limit: number;
    remaining: number;
    unlimited: boolean;
  };
}

export const UsagePlanDetails = ({ usage }: UsagePlanDetailsProps) => {
  return (
    <div className="bg-sidebar-bg rounded-xl p-6 border border-sidebar-border">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <FaInfoCircle className="w-5 h-5 text-primary" />
        Plan Details
      </h3>
      <div className="space-y-3">
        <div className="flex justify-between items-center py-2 border-b border-sidebar-border/50">
          <span className="text-sm text-muted">Current Plan</span>
          <span className={`text-sm font-medium capitalize ${getPlanColor(usage.plan)}`}>
            {usage.plan}
          </span>
        </div>
        <div className="flex justify-between items-center py-2 border-b border-sidebar-border/50">
          <span className="text-sm text-muted">Requests Used</span>
          <span className="text-sm font-medium">{usage.used.toLocaleString()}</span>
        </div>
        <div className="flex justify-between items-center py-2 border-b border-sidebar-border/50">
          <span className="text-sm text-muted">Requests Limit</span>
          <span className="text-sm font-medium">
            {usage.unlimited ? '♾️ Unlimited' : usage.limit.toLocaleString()}
          </span>
        </div>
        <div className="flex justify-between items-center py-2">
          <span className="text-sm text-muted">Remaining</span>
          <span className={`text-sm font-medium ${usage.unlimited ? 'text-green-400' : ''}`}>
            {usage.unlimited ? '♾️ Unlimited' : usage.remaining.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
};