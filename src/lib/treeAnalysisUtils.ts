export const formatDate = (timestamp: string) => {
  return new Date(timestamp).toLocaleString();
};

export const getConfidenceStatus = (confidence: number) => {
  if (confidence >= 0.8) return { label: 'High Confidence', color: 'green' };
  if (confidence >= 0.5) return { label: 'Medium Confidence', color: 'yellow' };
  return { label: 'Low Confidence', color: 'red' };
};

export const calculateHealthPercentage = (count: number, total: number) => {
  return total > 0 ? (count / total) * 100 : 0;
};