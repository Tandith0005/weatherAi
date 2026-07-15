/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { FaTree, FaChartBar, FaCheckCircle } from 'react-icons/fa';
import { WiDaySunny } from 'react-icons/wi';

export const TreeAnalysisStats = ({ result }: { result: any }) => {
  const stats = [
    {
      label: 'Total Trees',
      value: result.total_tree_count,
      icon: FaTree,
      color: 'green',
      bgColor: 'green-500',
    },
    {
      label: 'Density/Acre',
      value: result.tree_density_per_acre,
      icon: FaChartBar,
      color: 'blue',
      bgColor: 'blue-500',
    },
    {
      label: 'Canopy Cover',
      value: `${result.canopy_coverage_pct}%`,
      icon: WiDaySunny,
      color: 'cyan',
      bgColor: 'cyan-500',
    },
    {
      label: 'Confidence',
      value: `${(result.confidence_score * 100).toFixed(0)}%`,
      icon: FaCheckCircle,
      color: 'purple',
      bgColor: 'purple-500',
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div
            key={index}
            className={`bg-sidebar-bg rounded-2xl p-5 border border-sidebar-border hover:border-${stat.bgColor}/30 transition-all duration-300 hover:shadow-lg hover:shadow-${stat.bgColor}/5 group`}
          >
            <div className="flex items-center gap-3 mb-2">
              <div className={`p-2 bg-${stat.bgColor}/10 rounded-lg group-hover:bg-${stat.bgColor}/20 transition-colors`}>
                <Icon className={`w-4 h-4 text-${stat.bgColor}`} />
              </div>
              <span className="text-xs text-muted uppercase tracking-wider font-medium">
                {stat.label}
              </span>
            </div>
            <p className={`text-3xl font-bold text-${stat.bgColor}`}>{stat.value}</p>
          </div>
        );
      })}
    </div>
  );
};