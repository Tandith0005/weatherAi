'use client';

import { 
  FaRocket, 
  FaServer, 
  FaPercentage, 
  FaExclamationTriangle,
  FaCheckCircle
} from 'react-icons/fa';
import { getPlanColor, getPlanBadgeColor, getUsageStatus } from '@/src/lib/usageUtils';

interface UsageData {
  plan: string;
  used: number;
  limit: number;
  remaining: number;
  unlimited: boolean;
}

interface UsageStatsCardsProps {
  usage: UsageData;
  percentageUsed: number;
  isNearLimit: boolean;
  isAlmostFull: boolean;
}

export const UsageStatsCards = ({ 
  usage, 
  percentageUsed, 
  isNearLimit, 
  isAlmostFull 
}: UsageStatsCardsProps) => {
  const status = getUsageStatus(percentageUsed, usage.unlimited);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-center">
      {/* Plan Card */}
      <div className="bg-sidebar-bg rounded-xl p-6 border border-sidebar-border hover:border-primary/30 transition-colors">
        <div className="flex items-center gap-3 mb-2 justify-center">
          <div className={`p-2 rounded-lg ${getPlanBadgeColor(usage.plan)}`}>
            <FaRocket className="w-4 h-4" />
          </div>
          <span className="text-xs text-muted uppercase tracking-wider">Current Plan</span>
        </div>
        <p className={`text-3xl font-bold ${getPlanColor(usage.plan)} capitalize mt-3`}>
          {usage.plan}
        </p>
        {usage.unlimited && (
          <span className="text-xs text-green-400 mt-1 inline-block">♾️ Unlimited</span>
        )}
      </div>

      {/* Used Card */}
      <div className="bg-sidebar-bg rounded-xl p-6 border border-sidebar-border hover:border-primary/30 transition-colors">
        <div className="flex items-center gap-3 mb-2 justify-center ">
          <FaServer className="w-4 h-4 text-cyan-400" />
          <span className="text-xs text-muted uppercase tracking-wider">Used</span>
        </div>
        <p className="text-2xl font-bold mt-3">
          {usage.used.toLocaleString()}
          {!usage.unlimited && (
            <span className="text-sm font-normal text-muted"> / {usage.limit.toLocaleString()}</span>
          )}
        </p>
        {!usage.unlimited && (
          <span className="text-xs text-muted mt-1 block">
            {usage.remaining.toLocaleString()} requests remaining
          </span>
        )}
      </div>

      {/* Usage Percentage Card */}
      <div className="bg-sidebar-bg rounded-xl p-6 border border-sidebar-border hover:border-primary/30 transition-colors">
        <div className="flex items-center gap-3 mb-2 justify-center ">
          <FaPercentage className="w-4 h-4 text-purple-400" />
          <span className="text-xs text-muted uppercase tracking-wider">Usage</span>
        </div>
        {usage.unlimited ? (
          <p className="text-2xl font-bold text-green-400">Unlimited</p>
        ) : (
          <>
            <p className={`text-2xl mt-3 font-bold ${isNearLimit ? 'text-yellow-400' : ''} ${isAlmostFull ? 'text-red-400' : ''}`}>
              {percentageUsed}%
            </p>
            <span className="text-xs text-muted mt-1 block">
              {status.label} usage
            </span>
          </>
        )}
      </div>

      {/* Status Card */}
      <div className="bg-sidebar-bg rounded-xl p-6 border border-sidebar-border hover:border-primary/30 transition-colors">
        <div className="flex items-center gap-3 mb-2 justify-center ">
          {isNearLimit && !usage.unlimited ? (
            <FaExclamationTriangle className="w-4 h-4 text-yellow-400" />
          ) : (
            <FaCheckCircle className="w-4 h-4 text-green-400" />
          )}
          <span className="text-xs text-muted uppercase tracking-wider">Status</span>
        </div>
        {usage.unlimited ? (
          <p className="text-2xl mt-3 font-bold text-green-400">Active</p>
        ) : isAlmostFull ? (
          <p className="text-2xl mt-3 font-bold text-red-400">Critical</p>
        ) : isNearLimit ? (
          <p className="text-2xl mt-3 font-bold text-yellow-400">Warning</p>
        ) : (
          <p className="text-2xl mt-3 font-bold text-green-400">Healthy</p>
        )}
        {!usage.unlimited && (
          <span className="text-xs text-muted mt-1 block">
            {isAlmostFull ? '⚠️ Usage is critical!' : 
             isNearLimit ? '⚠️ Approaching limit' : 
             '✅ All good'}
          </span>
        )}
      </div>
    </div>
  );
};