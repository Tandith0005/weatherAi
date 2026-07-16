'use client';

import { 
  FaCloudUploadAlt, 
  FaSpinner, 
  FaSeedling 
} from 'react-icons/fa';

interface TreeAnalysisFormProps {
  file: File | null;
  filePreview: string | null;
  loading: boolean;
  formData: {
    farmerId: string;
    county: string;
    landAcres: string;
    location: string;
    notes: string;
  };
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onReset: () => void;
  onLoadDemo: () => void;
}

export const TreeAnalysisForm = ({
  file,
  filePreview,
  loading,
  formData,
  onFileChange,
  onInputChange,
  onSubmit,
  onReset,
  onLoadDemo,
}: TreeAnalysisFormProps) => {
  return (
    <div className="bg-sidebar-bg rounded-2xl p-6 sm:p-8 border border-sidebar-border shadow-xl">
      <form onSubmit={onSubmit} className="space-y-6">
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
              onChange={onFileChange}
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
                      onReset();
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
              onChange={onInputChange}
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
              onChange={onInputChange}
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
              onChange={onInputChange}
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
              onChange={onInputChange}
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
            onChange={onInputChange}
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
          {/* <button
            type="button"
            onClick={onLoadDemo}
            className="px-6 py-3.5 rounded-xl border border-dashed border-green-500/50 hover:bg-green-500/10 text-green-500 font-medium transition-colors"
          >
            Load Demo Analysis
          </button> */}
          {file && (
            <button
              type="button"
              onClick={onReset}
              className="px-6 py-3.5 rounded-xl border border-sidebar-border hover:bg-sidebar-border transition-colors text-sm font-medium"
            >
              Clear
            </button>
          )}
        </div>
      </form>
    </div>
  );
};