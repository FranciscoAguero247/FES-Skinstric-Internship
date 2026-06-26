'use client';

import React, { Suspense } from 'react';
import { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from "@/components/Navbar";

function SelectResultsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [hoveredNode, setHoveredNode] = useState(null);
  
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
      <div className="absolute top-10 left-8 text-left mt-5 z-20">
        <h1 className="text-base font-semibold leading-[24px] tracking-tight">
          A.I. ANALYSIS
        </h1>
        <p className="mt-1 text-xs tracking-wider text-[#1A1B1C] uppercase leading-[24px]">
          A.I. has estimated the following.<br />
          Fix estimated information if needed.
        </p>
      </div>

      {/* DIAMOND INTERFACE CONTAINER */}
      <div className="flex-grow flex items-center justify-center z-10 my-24">
        {analysisData ? (
    <div className="relative w-[550px] h-[550px] flex items-center justify-center">
      
      {/* =========================================================================
          BACKGROUND DIAMONDS (ISOLATED LAYERS CONTROLLED BY STATE)
          ========================================================================= */}
      <div className="absolute inset-0 pointer-events-none z-0 flex items-center justify-center overflow-visible">
        
        {/* 1. SMALL DIAMOND -> Exclusively for Demographics */}
        <div 
          className={`absolute w-[460px] h-[460px] transition-all duration-500 ease-out ${
            hoveredNode === 'demo' ? 'opacity-100 scale-135' : 'opacity-0 scale-95'
          }`}
        >
          <Image 
            alt="Diamond Small" 
            src="/small-square.png" 
            fill
            priority
            sizes="460px"
            style={{ objectFit: 'contain' }}
          />
        </div>

        {/* 2. MEDIUM DIAMOND (Instance A) -> Exclusively for Cosmetic Concerns */}
        <div 
          className={`absolute w-[490px] h-[490px] transition-all duration-500 ease-out ${
            hoveredNode === 'cosmetic' ? 'opacity-100 scale-145' : 'opacity-0 scale-95'
          }`}
        >
          <Image 
            alt="Diamond Medium - Cosmetic" 
            src="/medium-square.png" 
            fill
            priority
            sizes="490px"
            style={{ objectFit: 'contain' }}
          />
        </div>

        {/* 3. MEDIUM DIAMOND (Instance B) -> Exclusively for Skin Type Details */}
        <div 
          className={`absolute w-[490px] h-[490px] transition-all duration-500 ease-out ${
            hoveredNode === 'skintype' ? 'opacity-100 scale-145' : 'opacity-0 scale-95'
          }`}
        >
          <Image 
            alt="Diamond Medium - Skin" 
            src="/medium-square.png" 
            fill
            priority
            sizes="490px"
            style={{ objectFit: 'contain' }}
          />
        </div>

        {/* 4. LARGE DIAMOND -> Exclusively for Weather */}
        <div 
          className={`absolute w-[520px] h-[520px] transition-all duration-500 ease-out ${
            hoveredNode === 'weather' ? 'opacity-100 scale-150' : 'opacity-0 scale-95'
          }`}
        >
          <Image 
            alt="Diamond Large" 
            src="/large-square.png" 
            fill
            priority
            sizes="520px"
            style={{ objectFit: 'contain' }}
          />
        </div>

      </div>

      {/* =========================================================================
          INTERACTIVE GRID LAYER
          ========================================================================= */}
      <div className="relative z-10 grid grid-cols-3 grid-rows-3 gap-0">
        
        {/* Demographics Node */}
        <div 
          className="flex items-center justify-center col-start-2"
          onMouseEnter={() => setHoveredNode('demo')}
          onMouseLeave={() => setHoveredNode(null)}
        >
          <Link href="/summary" passHref legacyBehavior>
            <button className="w-[153.88px] h-[153.88px] bg-gray-200 hover:bg-gray-300 transform rotate-45 flex items-center justify-center -m-5 cursor-pointer font-semibold leading-[24px] tracking-tight uppercase hover:scale-[1.05] transition-transform duration-300">
              <span className="transform -rotate-45">Demographics</span>
            </button>
          </Link>
        </div>

        {/* Cosmetic Concerns Node */}
        <div 
          className="flex items-center justify-center row-start-2 col-start-1"
          onMouseEnter={() => setHoveredNode('cosmetic')}
          onMouseLeave={() => setHoveredNode(null)}
        >
          {/* Note: changed 'cursor-not-allowed' to 'cursor-pointer hover:scale-[1.05]' to animate button size too */}
          <button disabled className="w-[153.88px] h-[153.88px] bg-gray-100 hover:bg-gray-300 transform rotate-45 flex items-center justify-center -m-5 font-semibold leading-[24px] tracking-tight uppercase cursor-pointer hover:scale-[1.05] transition-transform duration-300">
            <span className="transform -rotate-45">Cosmetic Concerns</span>
          </button>
        </div>

        {/* Skin Type Details Node */}
        <div 
          className="flex items-center justify-center row-start-2 col-start-3"
          onMouseEnter={() => setHoveredNode('skintype')}
          onMouseLeave={() => setHoveredNode(null)}
        >
          <button disabled className="w-[153.88px] h-[153.88px] bg-gray-100 hover:bg-gray-300 transform rotate-45 flex items-center justify-center -m-5 font-semibold leading-[24px] tracking-tight uppercase cursor-pointer hover:scale-[1.05] transition-transform duration-300">
            <span className="transform -rotate-45">Skin Type Details</span>
          </button>
        </div>

        {/* Weather Node */}
        <div 
          className="flex items-center justify-center row-start-3 col-start-2"
          onMouseEnter={() => setHoveredNode('weather')}
          onMouseLeave={() => setHoveredNode(null)}
        >
          <button disabled className="w-[153.88px] h-[153.88px] bg-gray-100 hover:bg-gray-300 transform rotate-45 flex items-center justify-center -m-5 font-semibold leading-[24px] tracking-tight uppercase cursor-pointer hover:scale-[1.05] transition-transform duration-300">
            <span className="transform -rotate-45">Weather</span>
          </button>
        </div>

      </div>
    </div>
  ) : (
    <div className="text-center py-12 border border-dashed border-gray-200 px-6 max-w-sm rounded-lg">
      <p className="text-sm text-gray-400 font-medium">No analysis data payload available. Please try again.</p>
    </div>
  )}
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
          onClick={() => router.push('/summary')}
          className="group flex items-center focus:outline-none"
        >
          <div className="flex items-center">
            <div className="hidden sm:flex flex-row relative justify-center items-center">
              <span className="text-sm font-semibold mr-6 tracking-wide text-[#1A1B1C]">
                GET SUMMARY
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

export default function SelectResultsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white flex items-center justify-center font-mono text-xs uppercase tracking-widest">Loading Report Data...</div>}>
      <SelectResultsContent />
    </Suspense>
  );
}