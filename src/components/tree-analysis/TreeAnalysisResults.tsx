/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { forwardRef } from 'react';
import { FaCheckCircle, FaTag, FaCalendarAlt } from 'react-icons/fa';
import { TreeAnalysisStats } from './TreeAnalysisStats';
import { TreeAnalysisHealth } from './TreeAnalysisHealth';
import { TreeAnalysisQuickInfo } from './TreeAnalysisQuickInfo';
import { TreeAnalysisObservations } from './TreeAnalysisObservations';
import { TreeAnalysisGallery } from './TreeAnalysisGallery';
import { TreeAnalysisFooter } from './TreeAnalysisFooter';

interface TreeAnalysisResultsProps {
  result: any;
}

export const TreeAnalysisResults = forwardRef<HTMLDivElement, TreeAnalysisResultsProps>(
  ({ result }, ref) => {
    return (
      <div ref={ref} className="animate-fadeIn scroll-mt-4">
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

        {/* Stats Grid */}
        <TreeAnalysisStats result={result} />

        {/* Health and Quick Info */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <TreeAnalysisHealth result={result} />
          <TreeAnalysisQuickInfo result={result} />
        </div>

        {/* Observations & Recommendations */}
        <TreeAnalysisObservations result={result} />

        {/* Image Gallery */}
        <TreeAnalysisGallery result={result} />

        {/* Footer */}
        <TreeAnalysisFooter result={result} />
      </div>
    );
  }
);

TreeAnalysisResults.displayName = 'TreeAnalysisResults';