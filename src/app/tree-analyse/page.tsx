'use client';

import { useTreeAnalysis } from '@/src/hooks/useTreeAnalysis';
import { TreeAnalysisHeader } from '@/src/components/tree-analysis/TreeAnalysisHeader';
import { TreeAnalysisForm } from '@/src/components/tree-analysis/TreeAnalysisForm';
import { TreeAnalysisResults } from '@/src/components/tree-analysis/TreeAnalysisResults';
import { TreeAnalysisPremiumLock } from '@/src/components/tree-analysis/TreeAnalysisPremiumLock';

export default function TreeAnalyse() {
  const {
    file,
    filePreview,
    loading,
    result,
    usage,
    isCheckingPlan,
    isPlanAllowed,
    formData,
    resultsRef,
    handleFileChange,
    handleInputChange,
    handleSubmit,
    handleReset,
    loadDemo,
  } = useTreeAnalysis();

  if (isCheckingPlan) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500" />
      </div>
    );
  }

  if (!isPlanAllowed) {
    return <TreeAnalysisPremiumLock plan={usage?.plan || 'Free'} />;
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12 px-4 sm:px-0">
      <TreeAnalysisHeader plan={usage?.plan || ''} />

      <TreeAnalysisForm
        file={file}
        filePreview={filePreview}
        loading={loading}
        formData={formData}
        onFileChange={handleFileChange}
        onInputChange={handleInputChange}
        onSubmit={handleSubmit}
        onReset={handleReset}
        onLoadDemo={loadDemo}
      />

      {result && <TreeAnalysisResults ref={resultsRef} result={result} />}
    </div>
  );
}