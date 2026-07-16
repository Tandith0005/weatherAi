"use client";

import { UsageHeader } from "@/src/components/usage/UsageHeader";
import { UsagePlanDetails } from "@/src/components/usage/UsagePlanDetails";
import { UsageProgressBar } from "@/src/components/usage/UsageProgressBar";
import { UsageQuickTips } from "@/src/components/usage/UsageQuickTips";
import { UsageStatsCards } from "@/src/components/usage/UsageStatsCards";
import { UsageUpgradeCard } from "@/src/components/usage/UsageUpgradeCard";
import { useUsageData } from "@/src/hooks/useUsageData";

import { calculatePercentage, getUsageStatus } from "@/src/lib/usageUtils";

export default function UsagePage() {
  const { usage, loading, isRefreshing, fetchUsage } = useUsageData();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!usage) {
    return (
      <div className="flex items-center justify-center h-96 flex-col gap-4">
        <p className="text-muted">No usage data available</p>
        <button
          onClick={() => fetchUsage(true)}
          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  const percentageUsed = calculatePercentage(usage);
  const isNearLimit = percentageUsed > 80 && !usage.unlimited;
  const isAlmostFull = percentageUsed > 90 && !usage.unlimited;

  return (
    <div className="space-y-8 pb-12">
      <UsageHeader onRefresh={() => fetchUsage(true)} isRefreshing={isRefreshing} />
      
      <UsageStatsCards 
        usage={usage}
        percentageUsed={percentageUsed}
        isNearLimit={isNearLimit}
        isAlmostFull={isAlmostFull}
      />

      <UsageProgressBar 
        usage={usage}
        percentageUsed={percentageUsed}
        isNearLimit={isNearLimit}
        isAlmostFull={isAlmostFull}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <UsagePlanDetails usage={usage} />
        <UsageUpgradeCard usage={usage} isNearLimit={isNearLimit} />
      </div>

      <UsageQuickTips />
    </div>
  );
}