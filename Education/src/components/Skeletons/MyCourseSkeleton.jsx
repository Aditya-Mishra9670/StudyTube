const CourseSkeleton = () => {
    return (
      <div className="space-y-6 pt-[69px]">
        {[...Array(3)].map((_, index) => (
          <article
            key={index}
            className="card bg-base-200 shadow-lg rounded-lg overflow-hidden flex flex-col sm:flex-row items-center sm:items-start p-4 space-y-4 sm:space-y-0 sm:space-x-4 animate-pulse"
          >
            <div className="w-full sm:w-1/3 h-48 sm:h-full bg-gray-300 rounded-lg"></div>
            <div className="p-4 flex flex-col w-full sm:w-2/3">
              <div className="h-6 w-3/4 bg-gray-300 rounded mb-2"></div>
              <div className="flex flex-wrap gap-2 mb-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-5 w-16 bg-gray-300 rounded"></div>
                ))}
              </div>
              <div className="flex justify-between items-center text-sm mb-3">
                <div className="h-5 w-20 bg-gray-300 rounded"></div>
                <div className="h-5 w-16 bg-gray-300 rounded"></div>
              </div>
              <div className="h-4 w-32 bg-gray-300 rounded mb-3"></div>
              <div className="h-5 w-24 bg-gray-300 rounded mb-4"></div>
              <div className="w-full h-3 bg-gray-300 rounded mb-2"></div>
              <div className="h-5 w-full bg-gray-300 rounded mb-4"></div>
              <div className="flex items-center justify-between gap-2">
                <div className="h-10 w-1/2 bg-gray-300 rounded"></div>
                <div className="h-10 w-1/2 bg-gray-300 rounded"></div>
              </div>
            </div>
          </article>
        ))}
      </div>
    );
  };
  
  export default CourseSkeleton;