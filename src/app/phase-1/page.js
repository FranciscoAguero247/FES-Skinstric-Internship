'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';

export default function Phase1Page() {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted name:", name);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between antialiased text-[#1A1B1C] bg-white">
      <Navbar />

      {/* CORE ANALYSIS WORKSPACE INTERFACE */}
        
        {/* SUBHEAD SECTION HEADER */}
        <div className="absolute top-16 left-9 text-left">
          <p className="font-semibold text-xs tracking-wider text-[#1A1B1C]">TO START ANALYSIS</p>
        </div>

        {/* INPUT AND DIAMOND RENDERING WRAPPER */}
        <div className="relative flex flex-col items-center justify-center mb-40 w-full h-full min-h-[500px]">
          
          <p className="text-sm text-gray-400 tracking-wider uppercase mb-1 z-10 select-none">
            CLICK TO TYPE
          </p>

          <form className="relative z-10" onSubmit={handleSubmit}>
            <div className="flex flex-col items-center">
              <input 
                className="text-5xl sm:text-6xl font-normal text-center bg-transparent border-b border-black focus:outline-none appearance-none w-[372px] sm:w-[432px] pt-1 tracking-[-0.07em] leading-[64px] text-[#1A1B1C] z-10" 
                placeholder="Introduce Yourself" 
                type="text" 
                autoComplete="off" 
                autoFocus 
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <button type="submit" className="sr-only">Submit</button>
            </div>
          </form>

         {/* ASSET ELEMENT: DIAMOND LARGE */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] md:w-[762px] md:h-[762px] p-20 pointer-events-none select-none">
            <div className="w-full h-full border border-solid border-gray-200/60 rotate-[190deg] animate-[spin_120s_linear_infinite]"></div>
          </div>

          {/* ASSET ELEMENT: DIAMOND MEDIUM */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] md:w-[682px] md:h-[682px] p-20 pointer-events-none select-none">
            <div className="w-full h-full border border-solid border-gray-300/40 rotate-[185deg] animate-[spin_90s_linear_infinite]"></div>
          </div>

          {/* ASSET ELEMENT: DIAMOND SMALL */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] md:w-[602px] md:h-[602px] p-20 pointer-events-none select-none">
            <div className="w-full h-full border border-solid border-gray-400/30 rotate-45 animate-[spin_60s_linear_infinite]"></div>
          </div>

        </div>

        {/* BOTTOM NAVIGATION FOOTER FRAME */}
        <div className="absolute bottom-38.5 md:bottom-8 w-full flex justify-between md:px-9 px-13 z-20">
          <Link className="inset-0 group" aria-label="Back" href="/">
            <div className="flex items-center">
              
              {/* Mobile View Indicator Shape */}
              <div className="relative w-12 h-12 flex items-center justify-center border border-[#1A1B1C] rotate-45 scale-[1] sm:hidden">
                <span className="rotate-[-45deg] text-xs font-semibold">BACK</span>
              </div>

              {/* Desktop Dynamic Hover Interface */}
              <div className="hidden sm:flex flex-row relative justify-center items-center group">
                <div className="w-12 h-12 flex justify-center border border-[#1A1B1C] rotate-45 scale-[0.85] transform transition-transform duration-300 ease-out group-hover:scale-[0.92]"></div>
                <span className="absolute left-[15px] bottom-[13px] scale-[0.9] rotate-180 transform transition-transform duration-300 ease-out group-hover:translate-x-[-2px]">
                  ▶
                </span>
                <span className="text-sm font-semibold ml-6 tracking-wide text-[#1A1B1C]">
                  BACK
                </span>
              </div>

            </div>
          </Link>
        </div>
      </div>
  );
}