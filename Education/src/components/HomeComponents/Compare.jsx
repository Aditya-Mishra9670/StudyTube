import React from "react";
import { CheckCircle, XCircle } from "lucide-react";

const Compare = () => {
  return (
    <>
      <section className="text-center">
        <h1 className="text-4xl font-bold mb-6">
          What Makes Us Better Than Others?
        </h1>
        <p className="text-lg text-base-content">
          At StudyTube, we focus on delivering high-quality education to empower
          individuals worldwide. Here's how we stand out:
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-base-100 p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-error mb-6">
            Other Platforms
          </h2>
          <ul className="space-y-6">
            <li className="flex items-start gap-4">
              <XCircle className="text-error w-8 h-8" />
              <span className="text-lg text-base-content">
                High subscription costs that restrict access.
              </span>
            </li>
            <li className="flex items-start gap-4">
              <XCircle className="text-error w-8 h-8" />
              <span className="text-lg text-base-content">
                No real-time progress tracking to measure achievements.
              </span>
            </li>
            <li className="flex items-start gap-4">
              <XCircle className="text-error w-8 h-8" />
              <span className="text-lg text-base-content">
                Inconsistent moderation leading to unverified content.
              </span>
            </li>
            <li className="flex items-start gap-4">
              <XCircle className="text-error w-8 h-8" />
              <span className="text-lg text-base-content">
                Inactive support, causing delays in resolving issues.
              </span>
            </li>
          </ul>
        </div>
        <div className="bg-base-100 p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-success mb-6">
            Why Choose StudyTube?
          </h2>
          <ul className="space-y-6">
            <li className="flex items-start gap-4">
              <CheckCircle className="text-success w-8 h-8" />
              <span className="text-lg text-base-content">
                Access to high-quality education completely free of cost.
              </span>
            </li>
            <li className="flex items-start gap-4">
              <CheckCircle className="text-success w-8 h-8" />
              <span className="text-lg text-base-content">
                Earn certificates to showcase your achievements.
              </span>
            </li>
            <li className="flex items-start gap-4">
              <CheckCircle className="text-success w-8 h-8" />
              <span className="text-lg text-base-content">
                Track your progress with real-time analytics and tools.
              </span>
            </li>
            <li className="flex items-start gap-4">
              <CheckCircle className="text-success w-8 h-8" />
              <span className="text-lg text-base-content">
                Dedicated team ensuring content quality and prompt support.
              </span>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
};

export default Compare;
