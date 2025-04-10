import React from "react";

const CourseSkeleton = () => {
  return (
    <div className="pt-[70px] m-5 bg-base-100">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array(6)
          .fill("")
          .map((_, index) => (
            <div
              key={index}
              className="bg-base-200 rounded-lg shadow-lg overflow-hidden flex flex-col animate-pulse"
            >
              <div className="w-full h-48 bg-gray-300"></div>
              <div className="p-4 flex-grow flex flex-col justify-between">
                <div>
                  <div className="h-6 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded mb-4"></div>
                  <div className="flex items-center justify-between text-sm mb-3">
                    <div className="h-6 w-20 bg-gray-300 rounded"></div>
                    <div className="h-6 w-10 bg-gray-300 rounded"></div>
                  </div>
                  <div className="h-4 bg-gray-300 rounded mb-3"></div>
                  <div className="h-4 bg-gray-300 rounded mb-3"></div>
                  <div className="h-4 bg-gray-300 rounded"></div>
                </div>
                <div className="mt-4 w-full h-10 bg-gray-300 rounded"></div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default CourseSkeleton;
