/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { FaImage, FaExternalLinkAlt } from 'react-icons/fa';

export const TreeAnalysisGallery = ({ result }: { result: any }) => {
  if (!result.original_image_url && !result.overlay_image_url) return null;

  return (
    <div className="bg-sidebar-bg rounded-2xl p-6 border border-sidebar-border mb-6">
      <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
        <FaImage className="w-4 h-4 text-primary" />
        Image Gallery
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {result.original_image_url && (
          <a 
            href={result.original_image_url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="group relative overflow-hidden rounded-xl border border-sidebar-border hover:border-primary/50 transition-all duration-300"
          >
            <div className="aspect-video bg-background/50 flex items-center justify-center">
              <div className="text-center p-6">
                <FaImage className="w-8 h-8 text-primary mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <p className="text-sm font-medium">Original Image</p>
                <p className="text-xs text-muted mt-1">Click to view full size</p>
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center p-4">
              <span className="text-white text-sm font-medium flex items-center gap-2">
                <FaExternalLinkAlt className="w-3 h-3" />
                View Original
              </span>
            </div>
          </a>
        )}
        {result.overlay_image_url && (
          <a 
            href={result.overlay_image_url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="group relative overflow-hidden rounded-xl border border-sidebar-border hover:border-purple-500/50 transition-all duration-300"
          >
            <div className="aspect-video bg-background/50 flex items-center justify-center">
              <div className="text-center p-6">
                <FaImage className="w-8 h-8 text-purple-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <p className="text-sm font-medium">Overlay Image</p>
                <p className="text-xs text-muted mt-1">Annotated with detections</p>
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center p-4">
              <span className="text-white text-sm font-medium flex items-center gap-2">
                <FaExternalLinkAlt className="w-3 h-3" />
                View Overlay
              </span>
            </div>
          </a>
        )}
      </div>
    </div>
  );
};