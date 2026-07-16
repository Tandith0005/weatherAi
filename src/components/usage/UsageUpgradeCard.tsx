'use client';

import { FaRocket, FaClock } from 'react-icons/fa';
import Link from 'next/link';

interface UsageUpgradeCardProps {
  usage: {
    plan: string;
    used: number;
    limit: number;
    remaining: number;
    unlimited: boolean;
  };
  isNearLimit: boolean;
}

export const UsageUpgradeCard = ({ usage, isNearLimit }: UsageUpgradeCardProps) => {
  return (
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
          <Link href="https://weather-ai.co/">
            <button className="px-6 py-2.5 bg-gradient-to-r cursor-pointer from-primary to-secondary text-white font-medium rounded-lg hover:opacity-90 transition-opacity shadow-lg shadow-primary/25">
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
  );
};