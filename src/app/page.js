import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function HeroSection() {
  return (
    <div className="min-h-screen bg-[#f4f7f6] overflow-x-hidden flex flex-col justify-between select-none">
      
      {/* HEADER */}

      {/* 1. Logo Text (Figma Spec Absolute) */}
      <Link 
      href="/" 
      className="
        absolute 
        top-[23px] 
        left-[32px] 
        w-[69px] 
        h-[16px] 
        opacity-100 
        rotate-0
        no-underline
        font-['Roobert_TRIAL',sans-serif] 
        font-semibold 
        text-[14px] 
        leading-[16px] 
        tracking-[-0.02em] 
        uppercase 
        text-[#1A1B1C]
      "
    >
      Skinstric
    </Link>
      
      {/* 2. Intro Wrapper (Figma Spec Absolute) */}
      <div 
        className="
          absolute 
          top-[23px] 
          left-[117px] 
          w-[61px] 
          h-[17px] 
          opacity-60 
          rotate-0
          flex 
          items-center 
          justify-start
          gap-[6px]
        "
      >
        {/* Left Bracket Image (Served directly from the public folder) */}
        <Image 
          src="/Rectangle2710.webp"
          alt="left-bracket" 
          width={5} 
          height={19} 
          priority
          className="w-[4px] h-[17px] shrink-0 object-contain" 
        />

        {/* Inner "Intro" Text Element */}
        <span 
          className="
            w-[41px] 
            h-[16px] 
            opacity-100
            font-['Roobert_TRIAL',sans-serif] 
            font-semibold 
            text-[14px] 
            leading-[16px] 
            tracking-[-0.02em] 
            uppercase 
            text-[#1A1B1C]
          "
        >
          Intro
        </span>
        
        {/* Right Bracket Image (Served directly from the public folder) */}
        <Image 
          src="/Rectangle2711.webp"
          alt="right-bracket" 
          width={5} 
          height={19} 
          priority
          className="w-[4px] h-[17px] shrink-0 object-contain" 
        />
      </div>

      {/* 3. Right side: Action Button */}
      <button 
  className="
    absolute 
    top-[15px] 
    right-[32px] 
    w-[92px] 
    h-[32px] 
    bg-[#1A1B1C] 
    border-none 
    p-[8px_16px] 
    flex 
    items-center 
    justify-center 
    text-center 
    cursor-pointer 
    
    font-['Roobert_TRIAL','Segoe_UI',sans-serif] 
    font-semibold 
    text-[10px] 
    leading-[16px] 
    tracking-[-0.02em] 
    uppercase 
    text-[#FCFCFC] 
    
    transition-opacity 
    duration-200 
    ease-in-out 
    hover:opacity-90
  "
>
  Enter Code
</button>

    
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