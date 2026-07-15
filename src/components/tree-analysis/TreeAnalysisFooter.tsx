/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { FaTag, FaCalendarAlt } from 'react-icons/fa';

export const TreeAnalysisFooter = ({ result }: { result: any }) => {
  return (
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
  );
};