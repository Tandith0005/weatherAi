/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useRef } from 'react';
import { weatherApi } from '@/src/lib/weatherApi';
import toast from 'react-hot-toast';
import { demoTreeAnalysis, demoUsage } from '@/src/components/constants/demoResponse';

interface UsageData {
  plan: string;
  used: number;
  limit: number;
  remaining: number;
  unlimited: boolean;
}

interface FormData {
  farmerId: string;
  county: string;
  landAcres: string;
  location: string;
  notes: string;
}

export const useTreeAnalysis = () => {
  const [file, setFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [usage, setUsage] = useState<UsageData | null>(null);
  const [isCheckingPlan, setIsCheckingPlan] = useState(true);
  const [formData, setFormData] = useState<FormData>({
    farmerId: '',
    county: '',
    landAcres: '',
    location: '',
    notes: ''
  });
  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkPlan = async () => {
      try {
        const data = await weatherApi.getUsage();
        setUsage(data);
        // setUsage(demoUsage); // Uncomment for demo
      } catch (error) {
        console.error('Error fetching usage:', error);
      } finally {
        setIsCheckingPlan(false);
      }
    };
    checkPlan();
  }, []);

  useEffect(() => {
    if (result && resultsRef.current) {
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }, 300);
    }
  }, [result]);

  const isPlanAllowed = usage && (usage.plan === 'pro' || usage.plan === 'scale' || usage.unlimited);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setFilePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      toast.error('Please select an image to analyze');
      return;
    }
    if (!isPlanAllowed) {
      toast.error('Tree Analysis is only available on Pro and Scale plans');
      return;
    }

    setLoading(true);
    try {
      const form = new FormData();
      form.append('image', file);
      if (formData.farmerId) form.append('farmerId', formData.farmerId);
      if (formData.county) form.append('county', formData.county);
      if (formData.landAcres) form.append('landAcres', formData.landAcres);
      if (formData.location) form.append('location', formData.location);
      if (formData.notes) form.append('notes', formData.notes);

      const data = await weatherApi.analyzeTree(form);
      setResult(data);
      toast.success('🌳 Analysis completed successfully!');
    } catch (error: any) {
      if (error.response?.status === 403) {
        toast.error('Your plan does not include Tree Analysis. Please upgrade to Pro or Scale.');
      } else {
        toast.error('Failed to analyze tree image');
      }
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setFilePreview(null);
    setResult(null);
    setFormData({
      farmerId: '',
      county: '',
      landAcres: '',
      location: '',
      notes: ''
    });
  };

  const loadDemo = () => {
    setResult(demoTreeAnalysis);
  };

  return {
    file,
    filePreview,
    loading,
    result,
    usage,
    isCheckingPlan,
    isPlanAllowed,
    formData,
    resultsRef,
    handleFileChange,
    handleInputChange,
    handleSubmit,
    handleReset,
    loadDemo,
  };
};