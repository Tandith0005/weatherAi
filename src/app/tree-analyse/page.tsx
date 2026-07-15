'use client';

import { weatherApi } from '@/src/lib/weatherApi';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { FaCloudUploadAlt, FaSpinner, FaTree, FaLeaf, FaSeedling } from 'react-icons/fa';

export default function TreeAnalyse() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [formData, setFormData] = useState({
    farmerId: '',
    county: '',
    landAcres: '',
    location: '',
    notes: ''
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
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
      toast.success('Analysis completed successfully!');
    } catch (error) {
      toast.error('Failed to analyze tree image');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <FaTree className="w-8 h-8 text-green-500" />
        <h1 className="text-3xl font-bold">Tree Analysis</h1>
      </div>

      <div className="bg-sidebar-bg rounded-xl p-6 border border-sidebar-border mb-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Upload Farm Image
            </label>
            <div className="border-2 border-dashed border-sidebar-border rounded-lg p-8 text-center hover:border-green-500 transition-colors">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                id="image-upload"
              />
              <label htmlFor="image-upload" className="cursor-pointer block">
                {file ? (
                  <div>
                    <FaLeaf className="w-12 h-12 text-green-500 mx-auto mb-3" />
                    <p className="text-sm font-medium">{file.name}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                ) : (
                  <div>
                    <FaCloudUploadAlt className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      JPEG, PNG, WEBP (Max 20MB)
                    </p>
                  </div>
                )}
              </label>
            </div>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Farmer ID
              </label>
              <input
                type="text"
                name="farmerId"
                value={formData.farmerId}
                onChange={handleInputChange}
                placeholder="e.g., F-001"
                className="w-full px-4 py-2 rounded-lg border border-sidebar-border bg-background focus:outline-none focus:ring-2 focus:ring-green-500 transition"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                County/Region
              </label>
              <input
                type="text"
                name="county"
                value={formData.county}
                onChange={handleInputChange}
                placeholder="e.g., Bomet"
                className="w-full px-4 py-2 rounded-lg border border-sidebar-border bg-background focus:outline-none focus:ring-2 focus:ring-green-500 transition"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Land Area (Acres)
              </label>
              <input
                type="number"
                name="landAcres"
                value={formData.landAcres}
                onChange={handleInputChange}
                placeholder="e.g., 2.5"
                step="0.1"
                className="w-full px-4 py-2 rounded-lg border border-sidebar-border bg-background focus:outline-none focus:ring-2 focus:ring-green-500 transition"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="Farm name or GPS"
                className="w-full px-4 py-2 rounded-lg border border-sidebar-border bg-background focus:outline-none focus:ring-2 focus:ring-green-500 transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Notes
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              placeholder="Additional context (e.g., 'Tea plantation, recently pruned')"
              rows={3}
              className="w-full px-4 py-2 rounded-lg border border-sidebar-border bg-background focus:outline-none focus:ring-2 focus:ring-green-500 transition resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading || !file}
            className="w-full py-3 rounded-lg bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600 text-white font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
        </form>
      </div>

      {/* Results */}
      {result && (
        <div className="bg-sidebar-bg rounded-xl p-6 border border-sidebar-border">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <FaTree className="text-green-500" />
            Analysis Results
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-background rounded-lg p-4 text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Trees</p>
              <p className="text-2xl font-bold text-green-500">{result.total_tree_count}</p>
            </div>
            <div className="bg-background rounded-lg p-4 text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">Density/Acre</p>
              <p className="text-2xl font-bold text-blue-500">{result.tree_density_per_acre}</p>
            </div>
            <div className="bg-background rounded-lg p-4 text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">Canopy Cover</p>
              <p className="text-2xl font-bold text-cyan-500">{result.canopy_coverage_pct}%</p>
            </div>
            <div className="bg-background rounded-lg p-4 text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">Confidence</p>
              <p className="text-2xl font-bold text-purple-500">{(result.confidence_score * 100).toFixed(0)}%</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">Healthy</p>
              <p className="text-2xl font-bold text-green-500">{result.tree_health.healthy}</p>
            </div>
            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">Needs Care</p>
              <p className="text-2xl font-bold text-yellow-500">{result.tree_health.needs_care}</p>
            </div>
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">Needs Replacement</p>
              <p className="text-2xl font-bold text-red-500">{result.tree_health.needs_replacement}</p>
            </div>
          </div>

          {result.observations && result.observations.length > 0 && (
            <div className="mb-4">
              <h3 className="font-semibold mb-2">Observations</h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 dark:text-gray-300">
                {result.observations.map((obs: string, i: number) => (
                  <li key={i}>{obs}</li>
                ))}
              </ul>
            </div>
          )}

          {result.recommendations && result.recommendations.length > 0 && (
            <div>
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <FaSeedling className="text-green-500" />
                Recommendations
              </h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-blue-600 dark:text-blue-400">
                {result.recommendations.map((rec: string, i: number) => (
                  <li key={i}>{rec}</li>
                ))}
              </ul>
            </div>
          )}

          {result.original_image_url && (
            <div className="mt-4 p-4 bg-background rounded-lg">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                📷 Original Image: <a href={result.original_image_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">View</a>
              </p>
              {result.overlay_image_url && (
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  🎯 Overlay Image: <a href={result.overlay_image_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">View</a>
                </p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}