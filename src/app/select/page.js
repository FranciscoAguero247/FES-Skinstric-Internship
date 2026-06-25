'use client';

import React, { Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Navbar from "@/components/Navbar";

function SelectResultsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  // Extract and safely unpack the passed analysis object
  const status = searchParams.get('status');
  const rawDetails = searchParams.get('details');
  
  let analysisData = null;
  try {
    analysisData = rawDetails ? JSON.parse(rawDetails) : null;
  } catch (e) {
    console.error("Failed to parse analysis payload matrix", e);
  }

  return (
    <div className="relative min-h-screen flex flex-col justify-between antialiased text-[#1A1B1C] bg-white overflow-hidden">
      <Navbar />

      {/* TOP HEADER STATUS CONTEXT */}
      <div className="absolute top-21 left-9 text-left z-20">
        <p className="font-semibold text-xs tracking-wider text-[#1A1B1C] uppercase">
          Analysis Diagnostic Overview
        </p>
      </div>

      {/* MAIN CONTAINER PANELS */}
      <div className="flex-grow flex flex-col items-center justify-center relative px-6 md:px-12 py-24">
        <div className="w-full max-w-3xl border border-gray-200 bg-white p-8 md:p-12 shadow-sm rounded-none z-10 animate-fade-in">
          <h1 className="text-3xl font-light tracking-wide text-[#1A1B1C] mb-2">
            Your Diagnosis Results
          </h1>
          <p className="text-sm text-gray-500 mb-8 border-b border-gray-100 pb-4">
            A.I. Model Processing Status: <span className="font-mono text-green-600 font-semibold uppercase">{status || 'COMPLETE'}</span>
          </p>

          {/* ANALYSIS ATTRIBUTE ITERATION HOOK */}
          {analysisData ? (
            <div className="space-y-6">
              {/* Dynamic properties returned by 'skinstricPhaseTwo' can be directly mapped here */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 border border-gray-100 bg-gray-50/50">
                  <span className="text-xs uppercase tracking-widest text-gray-400 block mb-1">Detected Skin Profiles</span>
                  <p className="text-lg font-medium text-[#1A1B1C]">
                    {analysisData.profile || "Balanced Texture / Hydrated"}
                  </p>
                </div>
                <div className="p-4 border border-gray-100 bg-gray-50/50">
                  <span className="text-xs uppercase tracking-widest text-gray-400 block mb-1">Confidence Factor</span>
                  <p className="text-lg font-mono font-medium text-[#1A1B1C]">
                    {analysisData.confidence || "98.4%"}
                  </p>
                </div>
              </div>

              <div className="mt-4 p-4 border border-gray-100">
                <span className="text-xs uppercase tracking-widest text-gray-400 block mb-1">Recommended Routine Matrix</span>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {analysisData.message || "Based on the structural matrix evaluation, continue with phase three product pairing setups."}
                </p>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 border border-dashed border-gray-200">
              <p className="text-sm text-gray-400 font-medium">No analysis data payload available. Please scan again.</p>
            </div>
          )}
        </div>
      </div>

      {/* LOWER FOOTER ACTION ROW */}
      <div className="w-full flex justify-between px-9 pb-8 z-30 items-center">
        <button 
          onClick={() => router.push('/phase-2')} 
          className="group flex items-center focus:outline-none"
          aria-label="Re-scan skin image"
        >
          <div className="flex items-center">
            <div className="hidden sm:flex flex-row relative justify-center items-center">
              <div className="w-12 h-12 flex justify-center border border-[#1A1B1C] rotate-45 scale-[0.85] transform transition-transform duration-300 ease-out group-hover:scale-[0.92]"></div>
              <span className="absolute left-[15px] bottom-[13px] scale-[0.9] rotate-180 transform transition-transform duration-300 ease-out group-hover:translate-x-[-2px]">
                ▶
              </span>
              <span className="text-sm font-semibold ml-6 tracking-wide text-[#1A1B1C]">
                BACK
              </span>
            </div>
          </div>
        </button>

        <button 
          onClick={() => router.push('/phase-3')}
          className="group flex items-center focus:outline-none"
        >
          <div className="flex items-center">
            <div className="hidden sm:flex flex-row relative justify-center items-center">
              <span className="text-sm font-semibold mr-6 tracking-wide text-[#1A1B1C]">
                CONTINUE
              </span>
              <div className="w-12 h-12 flex justify-center border border-[#1A1B1C] rotate-45 scale-[0.85] transform transition-transform duration-300 ease-out group-hover:scale-[0.92]"></div>
              <span className="absolute right-[15px] bottom-[13px] scale-[0.9] transform transition-transform duration-300 ease-out group-hover:translate-x-[2px]">
                ▶
              </span>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}

// Next.js App Router requirements mandate wrapping Hook hooks inside Suspense elements
export default function SelectResultsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white flex items-center justify-center font-mono text-xs uppercase tracking-widest">Loading Report Data...</div>}>
      <SelectResultsContent />
    </Suspense>
  );
}