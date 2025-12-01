const InsightSkeleton = () => {
  return (
    <div className="space-y-4 p-4 bg-gray-800 rounded-lg animate-pulse border border-gray-700">
      
      {/* AI Insight Header/Title */}
      <div className="h-6 bg-gray-700 rounded w-2/3 mb-4"></div>
      
      {/* Main Summary Block */}
      <div className="space-y-2">
        <div className="h-3 bg-gray-600 rounded"></div>
        <div className="h-3 bg-gray-600 rounded w-11/12"></div>
        <div className="h-3 bg-gray-600 rounded w-10/12"></div>
      </div>

      {/* List of Insights/Anomalies (Mapping simulation) */}
      <div className="pt-2 space-y-3">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex items-center space-x-3">
            <div className="h-4 w-4 bg-blue-600 rounded-full"></div>
            <div className="h-3 bg-gray-600 rounded w-5/6"></div>
          </div>
        ))}
      </div>
      
      {/* Footer/Confidence Badge Placeholder */}
      <div className="h-4 bg-gray-700 rounded w-1/4 mt-4"></div>
      
    </div>
  );
};

export default InsightSkeleton;