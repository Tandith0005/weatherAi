'use client';

import { FaTree } from 'react-icons/fa';

interface TreeAnalysisHeaderProps {
  plan: string;
}

export const TreeAnalysisHeader = ({ plan }: TreeAnalysisHeaderProps) => {
  return (
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
          {plan?.toUpperCase()} Plan
        </span>
      </div>
    </div>
  );
};