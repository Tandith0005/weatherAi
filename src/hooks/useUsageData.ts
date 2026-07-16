import { useState, useEffect, useCallback } from 'react';
import { weatherApi } from '@/src/lib/weatherApi';
import toast from 'react-hot-toast';
import { demoUsage } from '@/src/components/constants/demoResponse';

interface UsageData {
  plan: string;
  used: number;
  limit: number;
  remaining: number;
  unlimited: boolean;
}

export const useUsageData = () => {
  const [usage, setUsage] = useState<UsageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchUsage = useCallback(async (showToast: boolean = false) => {
    try {
      setIsRefreshing(true);
      const data = await weatherApi.getUsage();
      setUsage(data);
      // setUsage(demoUsage); // Uncomment for demo
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
  }, []);

  useEffect(() => {
    const loadData = async () => {
      await fetchUsage();
    };
    loadData();
  }, [fetchUsage]);

  return {
    usage,
    loading,
    isRefreshing,
    fetchUsage,
  };
};