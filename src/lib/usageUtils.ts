interface UsageData {
  plan: string;
  used: number;
  limit: number;
  remaining: number;
  unlimited: boolean;
}

export const calculatePercentage = (usage: UsageData): number => {
  return usage.unlimited ? 0 : Math.round((usage.used / usage.limit) * 100);
};

export const getUsageStatus = (percentage: number, unlimited: boolean) => {
  if (unlimited) return { label: 'Unlimited', color: 'green', status: 'Active' };
  if (percentage > 90) return { label: 'Critical', color: 'red', status: 'Critical' };
  if (percentage > 80) return { label: 'Warning', color: 'yellow', status: 'Warning' };
  if (percentage > 50) return { label: 'Moderate', color: 'blue', status: 'Healthy' };
  return { label: 'Good', color: 'green', status: 'Healthy' };
};

export const getPlanColor = (plan: string) => {
  const colors: Record<string, string> = {
    'free': 'text-blue-400',
    'pro': 'text-purple-400',
    'enterprise': 'text-amber-400',
  };
  return colors[plan.toLowerCase()] || 'text-primary';
};

export const getPlanBadgeColor = (plan: string) => {
  const colors: Record<string, string> = {
    'free': 'bg-blue-500/20 border-blue-500/30 text-blue-400',
    'pro': 'bg-purple-500/20 border-purple-500/30 text-purple-400',
    'enterprise': 'bg-amber-500/20 border-amber-500/30 text-amber-400',
  };
  return colors[plan.toLowerCase()] || 'bg-primary/20 border-primary/30 text-primary';
};