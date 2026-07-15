/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { FaChartPie, FaCheckCircle, FaExclamationTriangle, FaRegTimesCircle } from 'react-icons/fa';

export const TreeAnalysisHealth = ({ result }: { result: any }) => {
  const healthData = [
    {
      label: 'Healthy',
      count: result.tree_health.healthy,
      color: 'green',
      icon: FaCheckCircle,
    },
    {
      label: 'Needs Care',
      count: result.tree_health.needs_care,
      color: 'yellow',
      icon: FaExclamationTriangle,
    },
    {
      label: 'Needs Replacement',
      count: result.tree_health.needs_replacement,
      color: 'red',
      icon: FaRegTimesCircle,
    },
  ];

  return (
    <div className="lg:col-span-2 bg-sidebar-bg rounded-2xl p-6 border border-sidebar-border">
      <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
        <FaChartPie className="w-4 h-4 text-primary" />
        Tree Health Breakdown
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {healthData.map((item, index) => {
          const Icon = item.icon;
          const percentage = (item.count / result.total_tree_count) * 100;
          return (
            <div
              key={index}
              className={`bg-${item.color}-500/5 border border-${item.color}-500/20 rounded-xl p-4 hover:bg-${item.color}-500/10 transition-colors`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted">{item.label}</p>
                  <p className={`text-3xl font-bold text-${item.color}-500`}>{item.count}</p>
                </div>
                <div className={`w-12 h-12 rounded-full bg-${item.color}-500/20 flex items-center justify-center`}>
                  <Icon className={`w-6 h-6 text-${item.color}-500`} />
                </div>
              </div>
              <div className="mt-2 w-full h-1.5 bg-sidebar-border rounded-full overflow-hidden">
                <div
                  className={`h-full bg-${item.color}-500 rounded-full`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};