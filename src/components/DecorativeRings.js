// src/components/DecorativeRings.js
'use client';

import React from 'react';
import Image from 'next/image';

export default function DecorativeRings({ 
  speed = 'slow', 
  isLoading = false,
  hoveredNode = null,
  outerClass = '', 
  middleClass = '', 
  innerClass = '', 
  children 
}) {
  
  // 1. Interactive Dashboard Hover State
  // Triggers if a node is actively hovered, showing specific scaling rings
  if (!isLoading && hoveredNode !== null) {
    return (
      <div className="relative flex flex-col items-center justify-center">
        {/* Inner Ring (Demographics) */}
        <div className={`absolute w-[460px] h-[460px] transition-all duration-500 ease-out ${innerClass} ${
          hoveredNode === 'demo' ? 'opacity-100 scale-130' : 'opacity-0 scale-95'
        }`}>
          <Image alt="Diamond Small" src="/small-square.png" fill priority sizes="460px" className="object-contain" />
        </div>

        {/* Middle Ring (Cosmetic Concerns) */}
        <div className={`absolute w-[490px] h-[490px] transition-all duration-500 ease-out ${middleClass} ${
          hoveredNode === 'cosmetic' ? 'opacity-100 scale-140' : 'opacity-0 scale-95'
        }`}>
          <Image alt="Diamond Medium - Cosmetic" src="/medium-square.png" fill priority sizes="490px" className="object-contain" />
        </div>

        {/* Middle Ring Duplicate (Skin Type Details) */}
        <div className={`absolute w-[490px] h-[490px] transition-all duration-500 ease-out ${middleClass} ${
          hoveredNode === 'skintype' ? 'opacity-100 scale-140' : 'opacity-0 scale-95'
        }`}>
          <Image alt="Diamond Medium - Skin" src="/medium-square.png" fill priority sizes="490px" className="object-contain" />
        </div>

        {/* Outer Ring (Weather) */}
        <div className={`absolute w-[520px] h-[520px] transition-all duration-500 ease-out ${outerClass} ${
          hoveredNode === 'weather' ? 'opacity-100 scale-160' : 'opacity-0 scale-95'
        }`}>
          <Image alt="Diamond Large" src="/large-square.png" fill priority sizes="520px" className="object-contain" />
        </div>

        {children}
      </div>
    );
  }

  // 2. Spinning / Loading State
  // Determines speed presets based on the `speed` prop or `isLoading` flag
  const isFast = speed === 'fast' || isLoading;
  const animSpeeds = isFast 
    ? { outer: 'animate-[spin_20s_linear_infinite]', middle: 'animate-[spin_15s_linear_infinite]', inner: 'animate-[spin_10s_linear_infinite]' }
    : { outer: 'animate-[spin_120s_linear_infinite]', middle: 'animate-[spin_90s_linear_infinite]', inner: 'animate-[spin_60s_linear_infinite]' };

  return (
    <div className="relative flex flex-col items-center justify-center">
      {/* Outer Decorative Ring */}
      <div className={`relative w-[270px] h-[270px] md:w-[482px] md:h-[482px] ${outerClass || animSpeeds.outer}`}>
        <Image
          src="/large-square.png"
          alt="Outer Decorative Ring"
          fill
          priority
          sizes="(max-width: 768px) 270px, 482px"
          className="object-contain"
        />
      </div>

      {/* Middle Decorative Ring */}
      <div className={`absolute w-[230px] h-[230px] md:w-[444.34px] md:h-[444.34px] rotate-[190deg] pointer-events-none ${middleClass || animSpeeds.middle}`}>
        <Image 
          src="/medium-square.png"
          alt="Middle Decorative Ring"
          fill
          priority
          sizes="(max-width: 768px) 230px, 444.34px"
          className="object-contain"
        />
      </div>

      {/* Inner Decorative Ring */}
      <div className={`absolute w-[190px] h-[190px] md:w-[405.18px] md:h-[405.18px] rotate-45 pointer-events-none ${innerClass || animSpeeds.inner}`}>
        <Image 
          src="/small-square.png" 
          alt="Inner Decorative Ring"
          fill
          priority
          sizes="(max-width: 768px) 190px, 405.18px"
          className="object-contain"
        />
      </div>

      {children}
    </div>
  );
}