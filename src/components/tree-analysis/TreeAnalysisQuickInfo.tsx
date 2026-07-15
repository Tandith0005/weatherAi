/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { FaInfoCircle, FaLeaf, FaUser, FaMapMarkerAlt, FaChartBar } from 'react-icons/fa';

export const TreeAnalysisQuickInfo = ({ result }: { result: any }) => {
  const infoItems = [
    { key: 'tree_species_guess', label: 'Species Guess', icon: FaLeaf, color: 'green' },
    { key: 'farmer_id', label: 'Farmer ID', icon: FaUser, color: 'blue' },
    { key: 'county', label: 'County', icon: FaMapMarkerAlt, color: 'red' },
    { key: 'land_acres', label: 'Land Area', icon: FaChartBar, color: 'purple', suffix: ' acres' },
  ];

  return (
    <div className="bg-sidebar-bg rounded-2xl p-6 border border-sidebar-border">
      <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
        <FaInfoCircle className="w-4 h-4 text-primary" />
        Quick Info
      </h3>
      <div className="space-y-3">
        {infoItems.map((item) => {
          const value = result[item.key];
          if (!value) return null;
          const Icon = item.icon;
          return (
            <div key={item.key} className="flex items-start gap-3 p-2 bg-background/50 rounded-lg">
              <Icon className={`w-4 h-4 text-${item.color}-400 mt-0.5`} />
              <div>
                <p className="text-xs text-muted">{item.label}</p>
                <p className="text-sm font-medium">{value}{item.suffix || ''}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};