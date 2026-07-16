'use client';

import { WiDaySunny } from 'react-icons/wi';
import { FaClock, FaCheckCircle } from 'react-icons/fa';

export const UsageQuickTips = () => {
  return (
    <div className="bg-sidebar-bg rounded-xl p-6 border border-sidebar-border">
      <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
        <WiDaySunny className="w-5 h-5 text-primary" />
        Quick Tips
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex items-start gap-3 p-3 bg-background/50 rounded-lg border border-sidebar-border">
          <div className="p-1.5 rounded-lg bg-blue-500/10">
            <FaClock className="w-4 h-4 text-blue-400" />
          </div>
          <div>
            <p className="text-sm font-medium">🌦️ Plan Ahead</p>
            <p className="text-xs text-muted">Review the 7-day forecast before making outdoor plans or scheduling trips.</p>
          </div>
        </div>
        <div className="flex items-start gap-3 p-3 bg-background/50 rounded-lg border border-sidebar-border">
          <div className="p-1.5 rounded-lg bg-green-500/10">
            <FaCheckCircle className="w-4 h-4 text-green-400" />
          </div>
          <div>
            <p className="text-sm font-medium">Monitor Usage</p>
            <p className="text-xs text-muted">Keep an eye on your usage to avoid hitting limits.</p>
          </div>
        </div>
      </div>
    </div>
  );
};