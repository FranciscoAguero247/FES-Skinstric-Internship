import React from 'react';

export default function HeroSection() {
  return (
    <div className="min-h-screen bg-[#f4f7f6] overflow-x-hidden flex flex-col justify-between select-none">
      
      {/* HEADER */}
      <header className="relative w-full h-16 flex items-center px-8">
        <div className="font-['Roobert_TRIAL',_sans-serif] font-semibold text-sm leading-4 tracking-[-0.02em] uppercase text-[#1A1B1C]">
          Skinstric
        </div>
        <div className="ml-4 opacity-60 font-['Roobert_TRIAL',_sans-serif] text-sm leading-[17px] text-[#1A1B1C]">
          [ Intro ]
        </div>
        <button className="absolute top-[15px] right-8 w-[92px] h-8 bg-[#1A1B1C] border-none px-4 py-2 flex items-center justify-center text-center cursor-pointer font-['Roobert_TRIAL',_sans-serif] font-semibold text-[10px] leading-4 tracking-[-0.02em] uppercase text-[#FCFCFC] transition-opacity duration-200 hover:opacity-90">
          Enter Code
        </button>
      </header>

      {/* HERO CONTAINER */}
      <main className="flex-grow w-full px-8 flex justify-between items-center relative">
        
        {/* LEFT SIDE BUTTON & DOTTED DIAMOND */}
        <div className="relative flex items-center justify-start w-[220px] h-[400px] z-10 before:content-[''] before:absolute before:top-0 before:left-[-200px] before:w-[400px] before:h-[400px] before:border-2 before:border-dotted before:border-[#A0A4AB] before:rotate-45 before:-z-10 before:pointer-events-none">
          <button className="inline-flex items-center gap-4 bg-transparent border-none cursor-pointer z-10 transition-all active:scale-[0.98] hover:opacity-80 group">
            <div className="w-11 h-11 flex items-center justify-center">
              <div className="w-6 h-6 border border-[#1A1B1C] rotate-45 flex items-center justify-center relative">
                <div className="w-2 h-2 bg-[#1A1B1C] [clip-path:polygon(100%_0%,_0%_50%,_100%_100%)] -rotate-45 mr-[2px]" />
              </div>
            </div>
            <span className="font-['Roobert_TRIAL',_sans-serif] font-semibold text-sm leading-4 uppercase tracking-[0.5px] whitespace-nowrap text-[#1A1B1C]">
              Discover A.I.
            </span>
          </button>
        </div>

        {/* HERO TITLE */}
        <h2 className="z-20 flex-grow text-center font-['Roobert_TRIAL',_sans-serif] font-light text-[128px] leading-[120px] tracking-[-0.07em] text-[#1A1B1C] max-w-[680px] min-h-[240px]">
          Sophisticated<br />skincare
        </h2>

        {/* RIGHT SIDE BUTTON & DOTTED DIAMOND */}
        <div className="relative flex items-center justify-end w-[220px] h-[400px] z-10 before:content-[''] before:absolute before:top-0 before:right-[-200px] before:w-[400px] before:h-[400px] before:border-2 before:border-dotted before:border-[#A0A4AB] before:rotate-45 before:-z-10 before:pointer-events-none">
          <button className="inline-flex items-center gap-4 flex-row-reverse bg-transparent border-none cursor-pointer z-10 transition-all active:scale-[0.98] hover:opacity-80 group">
            <div className="w-11 h-11 flex items-center justify-center">
              <div className="w-6 h-6 border border-[#1A1B1C] rotate-45 flex items-center justify-center relative">
                <div className="w-2 h-2 bg-[#1A1B1C] [clip-path:polygon(100%_0%,_0%_50%,_100%_100%)] rotate-[135deg] ml-[2px]" />
              </div>
            </div>
            <span className="font-['Roobert_TRIAL',_sans-serif] font-semibold text-sm leading-4 uppercase tracking-[0.5px] whitespace-nowrap text-[#1A1B1C]">
              Take Test
            </span>
          </button>
        </div>

      </main>

      {/* FOOTER */}
      <footer className="relative py-10 px-8 flex items-center justify-start min-w-[316px]">
        <p className="text-left font-['Roobert_TRIAL',_sans-serif] font-normal text-sm leading-6 uppercase text-[#1A1B1C]">
          Skinstric developed an A.I. that creates <br />
          a highly-personalised routine tailored to <br />
          what your skin needs.
        </p>
      </footer>

    </div>
  );
}