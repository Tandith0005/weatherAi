'use client';

import { FaLock, FaCrown, FaArrowRight, FaTree, FaChartPie, FaImage } from 'react-icons/fa';
import { WiDaySunny } from 'react-icons/wi';
import Link from 'next/link';

interface TreeAnalysisPremiumLockProps {
  plan: string;
}

export const TreeAnalysisPremiumLock = ({ plan }: TreeAnalysisPremiumLockProps) => {
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
          href="https://weather-ai.co/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white font-medium rounded-lg hover:opacity-90 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-primary/25"
        >
          <FaCrown className="w-4 h-4" />
          Upgrade Now
          <FaArrowRight className="w-4 h-4" />
        </Link>
        <p className="text-xs text-muted mt-4">
          Current plan: <span className="font-medium capitalize">{plan || 'Free'}</span>
        </p>
      </div>
    </div>
  );
};