/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { weatherApi } from '@/src/lib/weatherApi';
import { useState, useEffect, useRef } from 'react';
import toast from 'react-hot-toast';
import { 
  FaCloudUploadAlt, 
  FaSpinner, 
  FaTree, 
  FaLeaf, 
  FaSeedling,
  FaCheckCircle,
  FaExclamationTriangle,
  FaInfoCircle,
  FaChartPie,
  FaImage,
  FaDownload,
  FaLock,
  FaCrown,
  FaArrowRight,
  FaRegCheckCircle,
  FaRegTimesCircle,
  FaRegClock,
  FaChartBar,
  FaMapMarkerAlt,
  FaUser,
  FaCalendarAlt,
  FaTag,
  FaExternalLinkAlt
} from 'react-icons/fa';
import { WiDaySunny, WiHumidity, WiStrongWind } from 'react-icons/wi';
import Link from 'next/link';
import { demoTreeAnalysis, demoUsage } from '@/src/components/constants/demoResponse';

interface UsageData {
  plan: string;
  used: number;
  limit: number;
  remaining: number;
  unlimited: boolean;
}

export default function TreeAnalyse() {
  const [file, setFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [usage, setUsage] = useState<UsageData | null>(null);
  const [isCheckingPlan, setIsCheckingPlan] = useState(true);
  const [formData, setFormData] = useState({
    farmerId: '',
    county: '',
    landAcres: '',
    location: '',
    notes: ''
  });

  // Ref for scrolling to results
  const resultsRef = useRef<HTMLDivElement>(null);

  // Check user's plan on load
  useEffect(() => {
    const checkPlan = async () => {
      try {
        // const data = await weatherApi.getUsage();
        // setUsage(data);
        setUsage(demoUsage);
      } catch (error) {
        console.error('Error fetching usage:', error);
      } finally {
        setIsCheckingPlan(false);
      }
    };
    checkPlan();
  }, []);

  // Scroll to results when result is set
  useEffect(() => {
    if (result && resultsRef.current) {
      // Small delay to ensure DOM is updated
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

  // Loading state
  if (isCheckingPlan) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
      </div>
    );
  }

  // Not allowed 
  if (!isPlanAllowed) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-sidebar-bg rounded-2xl p-8 border border-sidebar-border text-center">
          <div className="w-20 h-20 bg-gradient-to-r from-amber-500/20 to-amber-600/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <FaLock className="w-10 h-10 text-amber-500" />
          </div>
          <h2 className="text-2xl font-bold mb-3">Premium Feature</h2>
          <p className="text-muted mb-6 max-w-md mx-auto">
            Tree Analysis is available exclusively on <span className="text-primary font-semibold">Pro</span> and <span className="text-primary font-semibold">Scale</span> plans. 
            Upgrade to unlock AI-powered tree counting, health analysis, and agronomic insights.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto mb-8">
            <div className="bg-background/50 rounded-lg p-4 border border-sidebar-border">
              <div className="flex items-center gap-2 mb-2">
                <FaTree className="w-4 h-4 text-green-400" />
                <span className="text-sm font-medium">Tree Counting</span>
              </div>
              <p className="text-xs text-muted">AI-powered tree detection and counting</p>
            </div>
            <div className="bg-background/50 rounded-lg p-4 border border-sidebar-border">
              <div className="flex items-center gap-2 mb-2">
                <FaChartPie className="w-4 h-4 text-blue-400" />
                <span className="text-sm font-medium">Health Analysis</span>
              </div>
              <p className="text-xs text-muted">Detailed health breakdown of your trees</p>
            </div>
            <div className="bg-background/50 rounded-lg p-4 border border-sidebar-border">
              <div className="flex items-center gap-2 mb-2">
                <FaImage className="w-4 h-4 text-purple-400" />
                <span className="text-sm font-medium">Overlay Images</span>
              </div>
              <p className="text-xs text-muted">Annotated overlay of detected trees</p>
            </div>
            <div className="bg-background/50 rounded-lg p-4 border border-sidebar-border">
              <div className="flex items-center gap-2 mb-2">
                <WiDaySunny className="w-4 h-4 text-cyan-400" />
                <span className="text-sm font-medium">Gemini Insights</span>
              </div>
              <p className="text-xs text-muted">AI-powered agronomic recommendations</p>
            </div>
          </div>

          <Link
            href="/usage"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white font-medium rounded-lg hover:opacity-90 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-primary/25"
          >
            <FaCrown className="w-4 h-4" />
            Upgrade Now
            <FaArrowRight className="w-4 h-4" />
          </Link>
          <p className="text-xs text-muted mt-4">
            Current plan: <span className="font-medium capitalize">{usage?.plan || 'Free'}</span>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12 px-4 sm:px-0">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-4">
          <div className="p-4 rounded-2xl bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 shadow-lg shadow-green-500/10">
            <FaTree className="w-8 h-8 text-green-500" />
          </div>
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent">
              Tree Analysis
            </h1>
            <p className="text-muted text-sm mt-0.5 flex items-center gap-2">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              AI-powered tree counting and health analysis
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full shadow-lg shadow-green-500/5">
          <div className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
          <span className="text-xs text-green-400 font-medium uppercase tracking-wider">
            {usage?.plan?.toUpperCase()} Plan
          </span>
        </div>
      </div>

      {/* Upload Form */}
      <div className="bg-sidebar-bg rounded-2xl p-6 sm:p-8 border border-sidebar-border shadow-xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium mb-2 flex items-center gap-2">
              <FaCloudUploadAlt className="w-4 h-4 text-primary" />
              Upload Farm Image
              <span className="text-xs text-muted font-normal">(Drone, aerial, or satellite)</span>
            </label>
            <div 
              className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
                filePreview 
                  ? 'border-green-500/50 bg-green-500/5' 
                  : 'border-sidebar-border hover:border-green-500/50 hover:bg-green-500/5'
              }`}
            >
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleFileChange}
                className="hidden"
                id="image-upload"
              />
              <label htmlFor="image-upload" className="cursor-pointer block">
                {filePreview ? (
                  <div className="relative">
                    <div className="relative w-full max-w-2xl mx-auto aspect-video rounded-lg overflow-hidden">
                      <img 
                        src={filePreview} 
                        alt="Preview" 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end justify-center p-4">
                        <span className="text-white text-sm font-medium bg-black/50 px-4 py-1.5 rounded-full backdrop-blur-sm">
                          {file?.name}
                        </span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setFile(null);
                        setFilePreview(null);
                      }}
                      className="absolute -top-2 -right-2 p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-lg"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ) : (
                  <div className="py-8">
                    <div className="w-20 h-20 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FaCloudUploadAlt className="w-10 h-10 text-green-500" />
                    </div>
                    <p className="text-sm text-muted">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-muted/70 mt-1">
                      JPEG, PNG, WEBP · Max 20MB
                    </p>
                  </div>
                )}
              </label>
            </div>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1.5">
                Farmer ID <span className="text-xs text-muted">(optional)</span>
              </label>
              <input
                type="text"
                name="farmerId"
                value={formData.farmerId}
                onChange={handleInputChange}
                placeholder="e.g., F-001"
                className="w-full px-4 py-2.5 rounded-lg border border-sidebar-border bg-background focus:outline-none focus:ring-2 focus:ring-green-500/50 transition"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">
                County/Region <span className="text-xs text-muted">(optional)</span>
              </label>
              <input
                type="text"
                name="county"
                value={formData.county}
                onChange={handleInputChange}
                placeholder="e.g., Bomet"
                className="w-full px-4 py-2.5 rounded-lg border border-sidebar-border bg-background focus:outline-none focus:ring-2 focus:ring-green-500/50 transition"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">
                Land Area <span className="text-xs text-muted">(acres, optional)</span>
              </label>
              <input
                type="number"
                name="landAcres"
                value={formData.landAcres}
                onChange={handleInputChange}
                placeholder="e.g., 2.5"
                step="0.1"
                className="w-full px-4 py-2.5 rounded-lg border border-sidebar-border bg-background focus:outline-none focus:ring-2 focus:ring-green-500/50 transition"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">
                Location <span className="text-xs text-muted">(optional)</span>
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="Farm name or GPS"
                className="w-full px-4 py-2.5 rounded-lg border border-sidebar-border bg-background focus:outline-none focus:ring-2 focus:ring-green-500/50 transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5">
              Notes <span className="text-xs text-muted">(optional)</span>
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              placeholder="Additional context for Gemini (e.g., 'Tea plantation, recently pruned')"
              rows={3}
              className="w-full px-4 py-2.5 rounded-lg border border-sidebar-border bg-background focus:outline-none focus:ring-2 focus:ring-green-500/50 transition resize-none"
            />
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="submit"
              disabled={loading || !file}
              className="flex-1 min-w-[200px] py-3.5 rounded-xl bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600 text-white font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-green-500/25"
            >
              {loading ? (
                <>
                  <FaSpinner className="animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <FaSeedling />
                  Analyze Image
                </>
              )}
            </button>
            <button
              type="button"
              onClick={() => {
                setResult(demoTreeAnalysis);
                // Scroll will be triggered by the useEffect
              }}
              className="px-6 py-3.5 rounded-xl border border-dashed border-green-500/50 hover:bg-green-500/10 text-green-500 font-medium transition-colors"
            >
              Load Demo Analysis
            </button>
            {file && (
              <button
                type="button"
                onClick={handleReset}
                className="px-6 py-3.5 rounded-xl border border-sidebar-border hover:bg-sidebar-border transition-colors text-sm font-medium"
              >
                Clear
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Results - Premium Redesign */}
      {result && (
        <div ref={resultsRef} className="animate-fadeIn scroll-mt-4">
          {/* Results Header */}
          <div className="bg-gradient-to-r from-green-600/10 via-emerald-500/10 to-green-600/10 rounded-2xl p-6 border border-green-500/20 mb-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-500/20 rounded-xl">
                  <FaCheckCircle className="w-6 h-6 text-green-500" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Analysis Complete</h2>
                  <p className="text-sm text-muted flex items-center gap-2">
                    <FaTag className="w-3 h-3" />
                    ID: {result.analysis_id}
                    <span className="w-1 h-1 rounded-full bg-muted" />
                    <FaCalendarAlt className="w-3 h-3" />
                    {new Date(result.timestamp).toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  result.low_confidence 
                    ? 'bg-yellow-500/20 text-yellow-500 border border-yellow-500/30' 
                    : 'bg-green-500/20 text-green-500 border border-green-500/30'
                }`}>
                  {result.low_confidence ? '⚠️ Low Confidence' : '✅ High Confidence'}
                </span>
              </div>
            </div>
          </div>

          {/* Stats Grid - Premium Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-sidebar-bg rounded-2xl p-5 border border-sidebar-border hover:border-green-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/5 group">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-green-500/10 rounded-lg group-hover:bg-green-500/20 transition-colors">
                  <FaTree className="w-4 h-4 text-green-500" />
                </div>
                <span className="text-xs text-muted uppercase tracking-wider font-medium">Total Trees</span>
              </div>
              <p className="text-3xl font-bold text-green-500">{result.total_tree_count}</p>
            </div>
            <div className="bg-sidebar-bg rounded-2xl p-5 border border-sidebar-border hover:border-blue-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/5 group">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-blue-500/10 rounded-lg group-hover:bg-blue-500/20 transition-colors">
                  <FaChartBar className="w-4 h-4 text-blue-500" />
                </div>
                <span className="text-xs text-muted uppercase tracking-wider font-medium">Density/Acre</span>
              </div>
              <p className="text-3xl font-bold text-blue-500">{result.tree_density_per_acre}</p>
            </div>
            <div className="bg-sidebar-bg rounded-2xl p-5 border border-sidebar-border hover:border-cyan-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/5 group">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-cyan-500/10 rounded-lg group-hover:bg-cyan-500/20 transition-colors">
                  <WiDaySunny className="w-5 h-5 text-cyan-500" />
                </div>
                <span className="text-xs text-muted uppercase tracking-wider font-medium">Canopy Cover</span>
              </div>
              <p className="text-3xl font-bold text-cyan-500">{result.canopy_coverage_pct}%</p>
            </div>
            <div className="bg-sidebar-bg rounded-2xl p-5 border border-sidebar-border hover:border-purple-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/5 group">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-purple-500/10 rounded-lg group-hover:bg-purple-500/20 transition-colors">
                  <FaCheckCircle className="w-4 h-4 text-purple-500" />
                </div>
                <span className="text-xs text-muted uppercase tracking-wider font-medium">Confidence</span>
              </div>
              <p className="text-3xl font-bold text-purple-500">{(result.confidence_score * 100).toFixed(0)}%</p>
            </div>
          </div>

          {/* Two Column Layout for Health and Details */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Health Breakdown */}
            <div className="lg:col-span-2 bg-sidebar-bg rounded-2xl p-6 border border-sidebar-border">
              <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
                <FaChartPie className="w-4 h-4 text-primary" />
                Tree Health Breakdown
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-green-500/5 border border-green-500/20 rounded-xl p-4 hover:bg-green-500/10 transition-colors">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-muted">Healthy</p>
                      <p className="text-3xl font-bold text-green-500">{result.tree_health.healthy}</p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
                      <FaCheckCircle className="w-6 h-6 text-green-500" />
                    </div>
                  </div>
                  <div className="mt-2 w-full h-1.5 bg-sidebar-border rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 rounded-full" style={{ 
                      width: `${(result.tree_health.healthy / result.total_tree_count) * 100}%` 
                    }} />
                  </div>
                </div>
                <div className="bg-yellow-500/5 border border-yellow-500/20 rounded-xl p-4 hover:bg-yellow-500/10 transition-colors">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-muted">Needs Care</p>
                      <p className="text-3xl font-bold text-yellow-500">{result.tree_health.needs_care}</p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center">
                      <FaExclamationTriangle className="w-6 h-6 text-yellow-500" />
                    </div>
                  </div>
                  <div className="mt-2 w-full h-1.5 bg-sidebar-border rounded-full overflow-hidden">
                    <div className="h-full bg-yellow-500 rounded-full" style={{ 
                      width: `${(result.tree_health.needs_care / result.total_tree_count) * 100}%` 
                    }} />
                  </div>
                </div>
                <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-4 hover:bg-red-500/10 transition-colors">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-muted">Needs Replacement</p>
                      <p className="text-3xl font-bold text-red-500">{result.tree_health.needs_replacement}</p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center">
                      <FaRegTimesCircle className="w-6 h-6 text-red-500" />
                    </div>
                  </div>
                  <div className="mt-2 w-full h-1.5 bg-sidebar-border rounded-full overflow-hidden">
                    <div className="h-full bg-red-500 rounded-full" style={{ 
                      width: `${(result.tree_health.needs_replacement / result.total_tree_count) * 100}%` 
                    }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Info Card */}
            <div className="bg-sidebar-bg rounded-2xl p-6 border border-sidebar-border">
              <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
                <FaInfoCircle className="w-4 h-4 text-primary" />
                Quick Info
              </h3>
              <div className="space-y-3">
                {result.tree_species_guess && (
                  <div className="flex items-start gap-3 p-2 bg-background/50 rounded-lg">
                    <FaLeaf className="w-4 h-4 text-green-400 mt-0.5" />
                    <div>
                      <p className="text-xs text-muted">Species Guess</p>
                      <p className="text-sm font-medium">{result.tree_species_guess}</p>
                    </div>
                  </div>
                )}
                {result.farmer_id && (
                  <div className="flex items-start gap-3 p-2 bg-background/50 rounded-lg">
                    <FaUser className="w-4 h-4 text-blue-400 mt-0.5" />
                    <div>
                      <p className="text-xs text-muted">Farmer ID</p>
                      <p className="text-sm font-medium">{result.farmer_id}</p>
                    </div>
                  </div>
                )}
                {result.county && (
                  <div className="flex items-start gap-3 p-2 bg-background/50 rounded-lg">
                    <FaMapMarkerAlt className="w-4 h-4 text-red-400 mt-0.5" />
                    <div>
                      <p className="text-xs text-muted">County</p>
                      <p className="text-sm font-medium">{result.county}</p>
                    </div>
                  </div>
                )}
                {result.land_acres && (
                  <div className="flex items-start gap-3 p-2 bg-background/50 rounded-lg">
                    <FaChartBar className="w-4 h-4 text-purple-400 mt-0.5" />
                    <div>
                      <p className="text-xs text-muted">Land Area</p>
                      <p className="text-sm font-medium">{result.land_acres} acres</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Observations & Recommendations - Premium Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {result.observations && result.observations.length > 0 && (
              <div className="bg-sidebar-bg rounded-2xl p-6 border border-sidebar-border hover:border-amber-500/30 transition-all duration-300">
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-2 bg-amber-500/10 rounded-lg">
                    <FaInfoCircle className="w-4 h-4 text-amber-400" />
                  </div>
                  <h3 className="text-sm font-semibold">Observations</h3>
                  <span className="ml-auto text-xs text-muted bg-background/50 px-2 py-0.5 rounded-full">
                    {result.observations.length}
                  </span>
                </div>
                <ul className="space-y-2">
                  {result.observations.map((obs: string, i: number) => (
                    <li key={i} className="text-sm text-muted flex items-start gap-2 p-2 bg-background/30 rounded-lg hover:bg-background/50 transition-colors">
                      <span className="text-amber-400 mt-0.5 text-xs">●</span>
                      <span>{obs}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {result.recommendations && result.recommendations.length > 0 && (
              <div className="bg-sidebar-bg rounded-2xl p-6 border border-sidebar-border hover:border-green-500/30 transition-all duration-300">
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-2 bg-green-500/10 rounded-lg">
                    <FaSeedling className="w-4 h-4 text-green-400" />
                  </div>
                  <h3 className="text-sm font-semibold">Recommendations</h3>
                  <span className="ml-auto text-xs text-muted bg-background/50 px-2 py-0.5 rounded-full">
                    {result.recommendations.length}
                  </span>
                </div>
                <ul className="space-y-2">
                  {result.recommendations.map((rec: string, i: number) => (
                    <li key={i} className="text-sm text-muted flex items-start gap-2 p-2 bg-background/30 rounded-lg hover:bg-background/50 transition-colors">
                      <span className="text-green-400 mt-0.5 text-xs">◆</span>
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Images Section - Premium Gallery */}
          {(result.original_image_url || result.overlay_image_url) && (
            <div className="bg-sidebar-bg rounded-2xl p-6 border border-sidebar-border mb-6">
              <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
                <FaImage className="w-4 h-4 text-primary" />
                Image Gallery
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {result.original_image_url && (
                  <a 
                    href={result.original_image_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="group relative overflow-hidden rounded-xl border border-sidebar-border hover:border-primary/50 transition-all duration-300"
                  >
                    <div className="aspect-video bg-background/50 flex items-center justify-center">
                      <div className="text-center p-6">
                        <FaImage className="w-8 h-8 text-primary mx-auto mb-2 group-hover:scale-110 transition-transform" />
                        <p className="text-sm font-medium">Original Image</p>
                        <p className="text-xs text-muted mt-1">Click to view full size</p>
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center p-4">
                      <span className="text-white text-sm font-medium flex items-center gap-2">
                        <FaExternalLinkAlt className="w-3 h-3" />
                        View Original
                      </span>
                    </div>
                  </a>
                )}
                {result.overlay_image_url && (
                  <a 
                    href={result.overlay_image_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="group relative overflow-hidden rounded-xl border border-sidebar-border hover:border-purple-500/50 transition-all duration-300"
                  >
                    <div className="aspect-video bg-background/50 flex items-center justify-center">
                      <div className="text-center p-6">
                        <FaImage className="w-8 h-8 text-purple-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                        <p className="text-sm font-medium">Overlay Image</p>
                        <p className="text-xs text-muted mt-1">Annotated with detections</p>
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center p-4">
                      <span className="text-white text-sm font-medium flex items-center gap-2">
                        <FaExternalLinkAlt className="w-3 h-3" />
                        View Overlay
                      </span>
                    </div>
                  </a>
                )}
              </div>
            </div>
          )}

          {/* Footer - Analysis Details */}
          <div className="bg-sidebar-bg rounded-2xl p-4 border border-sidebar-border">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-muted">
              <div className="flex items-center gap-4 flex-wrap justify-center">
                <span className="flex items-center gap-1">
                  <FaTag className="w-3 h-3" />
                  ID: {result.analysis_id}
                </span>
                <span className="w-1 h-1 rounded-full bg-muted hidden sm:block" />
                <span className="flex items-center gap-1">
                  <FaCalendarAlt className="w-3 h-3" />
                  {new Date(result.timestamp).toLocaleString()}
                </span>
                {result.low_confidence !== undefined && (
                  <>
                    <span className="w-1 h-1 rounded-full bg-muted hidden sm:block" />
                    <span className={`flex items-center gap-1 ${result.low_confidence ? 'text-yellow-500' : 'text-green-500'}`}>
                      {result.low_confidence ? '⚠️' : '✅'} 
                      {result.low_confidence ? 'Low Confidence' : 'High Confidence'}
                    </span>
                  </>
                )}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase tracking-wider text-muted/50">Powered by</span>
                <span className="text-[10px] font-semibold text-primary">WeatherAI CV</span>
              </div>
            </div>

            {/* Debug Info - Collapsible */}
            {result.cv_debug && (
              <details className="mt-3 pt-3 border-t border-sidebar-border">
                <summary className="cursor-pointer hover:text-foreground transition-colors text-xs text-muted flex items-center gap-2">
                  <span>🔧 CV Debug Information</span>
                  <span className="text-[10px] text-muted/50">(click to expand)</span>
                </summary>
                <div className="mt-3 p-4 bg-background/50 rounded-xl border border-sidebar-border grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div>
                    <p className="text-[10px] text-muted uppercase tracking-wider">Resolution</p>
                    <p className="text-xs font-mono">{result.cv_debug.orig_resolution}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-muted uppercase tracking-wider">Work Resolution</p>
                    <p className="text-xs font-mono">{result.cv_debug.work_resolution}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-muted uppercase tracking-wider">Canopy Pixels</p>
                    <p className="text-xs font-mono">{result.cv_debug.canopy_px}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-muted uppercase tracking-wider">Peaks Detected</p>
                    <p className="text-xs font-mono">{result.cv_debug.peaks_detected}</p>
                  </div>
                  <div className="sm:col-span-2">
                    <p className="text-[10px] text-muted uppercase tracking-wider">After Area Filter</p>
                    <p className="text-xs font-mono">{result.cv_debug.after_area_filter}</p>
                  </div>
                </div>
              </details>
            )}
          </div>
        </div>
      )}
    </div>
  );
}