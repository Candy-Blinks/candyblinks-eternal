"use client";

import React from "react";

export default function ProgressStepper({
  currentPage,
}: {
  currentPage: number;
}) {
  const steps = [
    { title: "Store Details", number: 0 },
    { title: "Royalties and Splits", number: 1 },
    { title: "Upload Assets", number: 2 },
  ];
  const getProgressWidth = (currentStep: number) => {
    if (currentStep === 0) return "0%";
    if (currentStep === 1) return "40%";
    return "85%";
  };

  return (
    <div className="w-full flex items-center justify-between py-4">
      <div className="w-full max-w-[600px] mx-auto flex items-center justify-between relative">
        <div className="absolute h-[2px] bg-neutral-800 top-[20px] left-[50px] right-[50px]" />

        <div
          className="absolute h-[2px] bg-red-400 top-[20px] left-[50px] transition-all duration-300 ease-in-out"
          style={{
            width: getProgressWidth(currentPage),
          }}
        />

        {/* Steps */}
        {steps.map((step) => (
          <div
            key={step.number}
            className="flex flex-col items-center gap-2 relative z-10"
          >
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center
                ${
                  currentPage >= step.number
                    ? "bg-red-400 text-white border-2 border-red-400"
                    : "bg-neutral-900 text-neutral-400 border-2 border-neutral-800"
                }
                transition-colors duration-300`}
            >
              {step.number + 1}
            </div>
            <span
              className={`text-sm font-medium
                ${
                  currentPage >= step.number ? "text-white" : "text-neutral-400"
                }
                transition-colors duration-300`}
            >
              {step.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
