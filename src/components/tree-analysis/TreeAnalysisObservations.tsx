/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { FaInfoCircle, FaSeedling } from 'react-icons/fa';

export const TreeAnalysisObservations = ({ result }: { result: any }) => {
  return (
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
  );
};