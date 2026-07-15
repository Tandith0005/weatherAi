"use client";

import { useState, useEffect } from "react";
import { weatherApi } from "@/src/lib/weatherApi";
import { 
  FaChartLine, 
  FaServer, 
  FaClock, 
  FaExclamationTriangle,
  FaCheckCircle,
  FaInfoCircle,
  FaPercentage,
  FaRocket
} from "react-icons/fa";
import { WiDaySunny } from "react-icons/wi";
import toast from "react-hot-toast";
import { demoUsage } from "@/src/components/constants/demoResponse";
import Link from "next/link";

interface UsageData {
  plan: string;
  used: number;
  limit: number;
  remaining: number;
  unlimited: boolean;
}

const UsagePage = () => {
  const [usage, setUsage] = useState<UsageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    fetchUsage();
  }, []);

  const fetchUsage = async (showToast: boolean = false) => {
    try {
      setIsRefreshing(true);
    //   const data = await weatherApi.getUsage();
    //   setUsage(data);
    setUsage(demoUsage);
      if (showToast) {
        toast.success("Usage data refreshed!");
      }
    } catch (error) {
      console.error("Error fetching usage:", error);
      toast.error("Failed to fetch usage data");
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

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

  // Calculate percentage
  const percentageUsed = usage.unlimited ? 0 : Math.round((usage.used / usage.limit) * 100);
  const isNearLimit = percentageUsed > 80 && !usage.unlimited;
  const isAlmostFull = percentageUsed > 90 && !usage.unlimited;

  // Get plan color
  const getPlanColor = (plan: string) => {
    switch (plan.toLowerCase()) {
      case 'free':
        return 'text-blue-400';
      case 'pro':
        return 'text-purple-400';
      case 'enterprise':
        return 'text-amber-400';
      default:
        return 'text-primary';
    }
  };

  // Get plan badge color
  const getPlanBadgeColor = (plan: string) => {
    switch (plan.toLowerCase()) {
      case 'free':
        return 'bg-blue-500/20 border-blue-500/30 text-blue-400';
      case 'pro':
        return 'bg-purple-500/20 border-purple-500/30 text-purple-400';
      case 'enterprise':
        return 'bg-amber-500/20 border-amber-500/30 text-amber-400';
      default:
        return 'bg-primary/20 border-primary/30 text-primary';
    }
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            API Usage Dashboard
          </h1>
          <p className="text-muted text-sm mt-1">
            Monitor your API usage and plan details
          </p>
        </div>
        <button
          onClick={() => fetchUsage(true)}
          disabled={isRefreshing}
          className="flex items-center gap-2 px-4 py-2 bg-sidebar-bg border border-sidebar-border rounded-lg hover:border-primary/50 transition-colors disabled:opacity-50"
        >
          <FaChartLine className={`w-4 h-4 text-primary ${isRefreshing ? 'animate-spin' : ''}`} />
          <span className="text-sm font-medium">
            {isRefreshing ? 'Refreshing...' : 'Refresh'}
          </span>
        </button>
      </div>

      {/* Plan & Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Plan Card */}
        <div className="bg-sidebar-bg rounded-xl p-6 border border-sidebar-border hover:border-primary/30 transition-colors">
          <div className="flex items-center gap-3 mb-2">
            <div className={`p-2 rounded-lg ${getPlanBadgeColor(usage.plan)}`}>
              <FaRocket className="w-4 h-4" />
            </div>
            <span className="text-xs text-muted uppercase tracking-wider">Current Plan</span>
          </div>
          <p className={`text-2xl font-bold ${getPlanColor(usage.plan)} capitalize`}>
            {usage.plan}
          </p>
          {usage.unlimited && (
            <span className="text-xs text-green-400 mt-1 inline-block">♾️ Unlimited</span>
          )}
        </div>

        {/* Used Card */}
        <div className="bg-sidebar-bg rounded-xl p-6 border border-sidebar-border hover:border-primary/30 transition-colors">
          <div className="flex items-center gap-3 mb-2">
            <FaServer className="w-4 h-4 text-cyan-400" />
            <span className="text-xs text-muted uppercase tracking-wider">Used</span>
          </div>
          <p className="text-2xl font-bold">
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
          <div className="flex items-center gap-3 mb-2">
            <FaPercentage className="w-4 h-4 text-purple-400" />
            <span className="text-xs text-muted uppercase tracking-wider">Usage</span>
          </div>
          {usage.unlimited ? (
            <p className="text-2xl font-bold text-green-400">Unlimited</p>
          ) : (
            <>
              <p className={`text-2xl font-bold ${isNearLimit ? 'text-yellow-400' : ''} ${isAlmostFull ? 'text-red-400' : ''}`}>
                {percentageUsed}%
              </p>
              <span className="text-xs text-muted mt-1 block">
                {percentageUsed < 50 ? 'Good' : percentageUsed < 80 ? 'Moderate' : percentageUsed < 95 ? 'High' : 'Critical'} usage
              </span>
            </>
          )}
        </div>

        {/* Status Card */}
        <div className="bg-sidebar-bg rounded-xl p-6 border border-sidebar-border hover:border-primary/30 transition-colors">
          <div className="flex items-center gap-3 mb-2">
            {isNearLimit && !usage.unlimited ? (
              <FaExclamationTriangle className="w-4 h-4 text-yellow-400" />
            ) : (
              <FaCheckCircle className="w-4 h-4 text-green-400" />
            )}
            <span className="text-xs text-muted uppercase tracking-wider">Status</span>
          </div>
          {usage.unlimited ? (
            <p className="text-2xl font-bold text-green-400">Active</p>
          ) : isAlmostFull ? (
            <p className="text-2xl font-bold text-red-400">Critical</p>
          ) : isNearLimit ? (
            <p className="text-2xl font-bold text-yellow-400">Warning</p>
          ) : (
            <p className="text-2xl font-bold text-green-400">Healthy</p>
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

      {/* Progress Bar */}
      {!usage.unlimited && (
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
      )}

      {/* Plan Details & Upgrade */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Plan Features */}
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

        {/* Upgrade / Info */}
        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl p-6 border border-primary/20">
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <FaRocket className="w-5 h-5 text-primary" />
            {usage.unlimited ? '🎉 You\'re on Unlimited Plan!' : 'Need More Requests?'}
          </h3>
          {usage.unlimited ? (
            <p className="text-sm text-muted">
              You have unlimited access to all features. Enjoy the full power of WeatherAI!
            </p>
          ) : (
            <>
              <p className="text-sm text-muted mb-4">
                You&apos;ve used {usage.used.toLocaleString()} out of {usage.limit.toLocaleString()} requests.
                {isNearLimit && ' Consider upgrading to avoid interruptions.'}
              </p>
              <Link href="https://weather-ai.co/" >
                <button
                className="px-6 py-2.5 bg-gradient-to-r cursor-pointer from-primary to-secondary text-white font-medium rounded-lg hover:opacity-90 transition-opacity shadow-lg shadow-primary/25"
              >
                Upgrade Plan →
              </button>
              </Link>
            </>
          )}
          <div className="mt-4 p-3 bg-background/50 rounded-lg border border-sidebar-border">
            <p className="text-xs text-muted flex items-center gap-2">
              <FaClock className="w-3 h-3 text-primary" />
              {usage.unlimited ? (
                'Usage resets: Never (Unlimited)'
              ) : (
                `Usage resets monthly. ${usage.remaining.toLocaleString()} requests remaining this month.`
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Additional Info */}
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
    </div>
  );
};

export default UsagePage;