'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function HeroSection() {
  const [hoveredButton, setHoveredButton] = useState(null);

  return (
    <div className="__className_5f0add antialiased text-[#1A1B1C] min-h-screen flex flex-col justify-between">
      
      {/* 1. HEADER NAVBAR */}
      <div className="flex flex-row h-[64px] w-full justify-between py-3 mb-3 relative z-[1000]">
        <div className="flex flex-row pt-1 scale-75 justify-center items-center">
          <Link 
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md transition-colors h-9 px-4 py-2 font-semibold text-sm mr-2 line-clamp-4 leading-[16px] text-[#1A1B1C] z-1000" 
            href="/"
          >
            SKINSTRIC
          </Link>
          <Image 
            alt="left-bracket" 
            width={5} 
            height={19} 
            className="w-[4px] h-[17px]" 
            src="/left-bracket.png"
          />
          <p className="text-[#1A1B1C] text-opacity-70 font-semibold text-sm ml-1.5 mr-1.5">INTRO</p>
          <Image 
            alt="right-bracket" 
            width={5} 
            height={19} 
            className="w-[4px] h-[17px]" 
            src="/right-bracket.png"
          />
        </div>
        <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold transition-colors disabled:pointer-events-none text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2 mx-4 scale-[0.8] text-[#FCFCFC] text-[10px] bg-[#1A1B1C] leading-[16px]">
          ENTER CODE
        </button>
      </div>

      {/* MAIN HERO WRAPPER */}
      <div className="max-sm:scale-[0.75] max-sm:origin-center max-sm:p-6 flex-grow">
        <div className="flex flex-col items-center justify-center h-[71dvh] md:fixed md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2">
          
          {/* Mobile Background Dotted Boxes (Hidden on desktop) */}
          <div className="absolute inset-0 flex items-center justify-center lg:hidden">
            <div className="w-[350px] h-[350px] border border-dotted border-[#A0A4AB] rotate-45 absolute top-1/2 left-1/2 -translate-x-[52%] -translate-y-1/2"></div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center lg:hidden">
            <div className="w-[420px] h-[420px] border border-dotted border-[#A0A4AB] rotate-45 absolute top-1/2 left-1/2 -translate-x-[52%] -translate-y-1/2"></div>
          </div>

          {/* Central Typography Heading */}


<div className="relative z-10 flex justify-center w-full overflow-visible">
            <div 
              id="main-heading" 
              className={`
                relative z-10 text-center
                transition-transform duration-[800ms] ease-[cubic-bezier(0.25,1,0.5,1)]
                ${hoveredButton === 'test' ? 'md:-translate-x-[7vw]' : ''}
                ${hoveredButton === 'discover' ? 'md:translate-x-[7vw]' : ''}
                ${!hoveredButton ? 'translate-x-0' : ''}
              `}
            >
              <h1 className="font-inter text-[60px] font-normal leading-none tracking-tighter text-[#1A1B1C] select-none lg:text-[100px]">
                {/* Line 1: Sophisticated */}
                <span 
                  className={`
                    block transition-transform duration-[800ms] ease-[cubic-bezier(0.25,1,0.5,1)]
                    ${hoveredButton === 'test' ? 'md:-translate-x-[2.2vw] lg:-translate-x-[2.8vw]' : ''}
                    ${hoveredButton === 'discover' ? 'md:translate-x-[2.2vw] lg:translate-x-[2.8vw]' : ''}
                    ${!hoveredButton ? 'translate-x-0' : ''}
                  `}
                >
                  Sophisticated
                </span>
                
                {/* Line 2: skincare */}
                <span 
                  className={`
                    block text-[#1A1B1C] transition-transform duration-[800ms] ease-[cubic-bezier(0.25,1,0.5,1)]
                    ${hoveredButton === 'test' ? 'md:translate-x-[4.8vw] lg:translate-x-[2.8vw]' : ''}
                    ${hoveredButton === 'discover' ? 'md:-translate-x-[4.8vw] lg:-translate-x-[2.8vw]' : ''}
                    ${!hoveredButton ? 'translate-x-0' : ''}
                  `}
                >
                  skincare
                </span>
              </h1>
            </div>
          </div>


          

          {/* Mobile Description & CTA (Hidden on desktop) */}
          <p className="z-10 block lg:hidden w-[30ch] mt-4 text-[16px] font-semibold text-center text-muted-foreground text-[#1a1b1c83]">
            Skinstric developed an A.I. that creates a highly-personalized routine tailored to what your skin needs.
          </p>
          <div className="z-10 mt-4 lg:hidden">
            <Link href="/testing">
              <button className="relative flex items-center gap-4 hover:scale-105 duration-300">
                <span className="text-[12px] font-bold cursor-pointer">ENTER EXPERIENCE</span>
                <div className="w-[24px] h-[24px] border border-solid border-black rotate-45 cursor-pointer"></div>
                <span className="absolute left-[129px] scale-[0.5] hover:scale-60 duration-300">
                  <svg viewBox="0 0 24 24" width="24" height="24" className="fill-current text-black"><path d="M8 5v14l11-7z"></path></svg>
                </span>
              </button>
            </Link>
          </div>

          {/* Desktop Description Footer (Hidden on mobile, layout snaps left) */}
          <div className="hidden lg:block fixed bottom-[calc(-7vh)] left-[calc(-20vw)] xl:left-[calc(-27vw)] 2xl:left-[calc(-31vw)] font-normal text-sm text-[#1A1B1C] space-y-3 uppercase">
            <p>Skinstric developed an A.I. that creates a<br />highly-personalized routine tailored to<br />what your skin needs.</p>
          </div>

          {/* LEFT SECTION - DISCOVER A.I. (Desktop Only) */}
          <div 
            id="left-section" 
            
            className={`
              hidden lg:block fixed left-[calc(-53vw)] xl:left-[calc(-50vw)] top-1/2 -translate-y-1/2 w-[500px] h-[500px] 
              transition-all duration-[500ms] ease-in-out
              ${hoveredButton === 'test' ? 'opacity-0 pointer-events-none scale-95' : 'opacity-100'}
            `}
          >
            <div className="relative w-full h-full">
              <div className="w-full h-full border border-dotted border-[#A0A4AB] rotate-45 fixed inset-0"></div>

              <button 
              id="discover-button" 
              onMouseEnter={() => setHoveredButton('discover')}
              onMouseLeave={() => setHoveredButton(null)}
              className="group inline-flex items-center justify-center gap-4 whitespace-nowrap rounded-md text-sm font-normal text-[#1A1B1C] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring cursor-pointer h-9 absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/5 xl:translate-x-1/6 px-3 py-1">

                <div className="w-[30px] h-[30px] border border-solid border-black rotate-45 cursor-pointer group-hover:scale-110 duration-300"></div>
                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-[0.9] rotate-180 group-hover:scale-105 duration-300 pointer-events-none text-[10px] pl-[117px]">▶</span>
                <span>DISCOVER A.I.</span>
              </button>
            </div>
          </div>

          {/* RIGHT SECTION - TAKE TEST (Desktop Only) */}    
            <div 
              id="right-section" 
              className={`
              hidden lg:block fixed top-1/2 right-[calc(-53vw)] xl:right-[calc(-50vw)] -translate-y-1/2 w-[500px] h-[500px]
              transition-all duration-[500ms] ease-in-out
              ${hoveredButton === 'discover' ? 'opacity-0 pointer-events-none scale-95' : 'opacity-100'}
            `}
            >
            <div className="relative w-full h-full">
              <div className="w-full h-full border border-dotted border-[#A0A4AB] rotate-45 absolute inset-0"></div>
              <Link 
                href="/phase-1"
                onMouseEnter={() => setHoveredButton('test')}
                onMouseLeave={() => setHoveredButton(null)}
                className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/5 xl:-translate-x-1/6 block"
              
              >
                <button id="take-test-button" className="group inline-flex items-center justify-center gap-4 whitespace-nowrap rounded-md text-sm font-normal text-[#1A1B1C] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring cursor-pointer h-9 absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/5 xl:-translate-x-1/6 px-3 py-1">
                  TAKE TEST
                  <div className="w-[30px] h-[30px] border border-solid border-black rotate-45 group-hover:scale-110 duration-300 flex items-center justify-center relative"></div>
                  <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-[0.9] cursor-pointer group-hover:scale-105 duration-300 pointer-events-none text-[10px] pl-[99px]">▶</span>
                </button>
              </Link>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}