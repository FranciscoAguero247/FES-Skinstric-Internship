'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';

// Dynamic datasets for various views
const dynamicData = {
  RACE: [
    { name: 'Middle eastern', percentage: 56 },
    { name: 'South asian', percentage: 17 },
    { name: 'White', percentage: 14 },
    { name: 'Black', percentage: 5 },
    { name: 'Latino hispanic', percentage: 4 },
    { name: 'Southeast asian', percentage: 2 },
    { name: 'East asian', percentage: 0 },
  ],
  AGE: [
    { name: '18-29', percentage: 12 },
    { name: '30-39', percentage: 22 },
    { name: '40-49', percentage: 15 },
    { name: '50-59', percentage: 43 },
    { name: '60+', percentage: 8 },
  ],
  SEX: [
    { name: 'MALE', percentage: 88 },
    { name: 'FEMALE', percentage: 12 },
  ],
};

export default function DemographicsAnalysis() {
  // 1. Core navigation category tracking ('RACE' | 'AGE' | 'SEX')
  const [activeTab, setActiveTab] = useState('RACE');

  // 2. Active selection states per analysis category
  const [selections, setSelections] = useState({
    RACE: 'Middle eastern',
    AGE: '50-59',
    SEX: 'MALE',
  });

  const currentDataset = dynamicData[activeTab];
  const activeSelectionName = selections[activeTab];
  
  // Find current confidence level to map directly to the circular dashboard graphic
  const currentMetric = currentDataset.find(item => item.name === activeSelectionName) || currentDataset[0];
  const activePercentage = currentMetric.percentage;

  // Formula to calculate SVG circle fill progress offset: Total circumference is ~308.819px
  const maxStrokeOffset = 308.819;
  const computedStrokeOffset = maxStrokeOffset - (maxStrokeOffset * activePercentage) / 100;

  const handleListItemClick = (name) => {
    setSelections(prev => ({ ...prev, [activeTab]: name }));
  };

  return (
    <main className="flex-1 w-full bg-white md:overflow-hidden overflow-auto">
      <div className="md:h-full max-w-full mx-5 px-4 md:px-auto flex flex-col">
        <Navbar />
        
        {/* Header Block */}
        <div className="text-start ml-4 mb-4 md:mb-10 md:ml-0">
          <h2 className="text-base font-semibold mb-1 leading-[24px]">A.I. ANALYSIS</h2>
          <h3 className="text-4xl md:text-[72px] font-normal leading-[64px] tracking-tighter">DEMOGRAPHICS</h3>
          <h4 className="text-sm mt-2 leading-[24px]">PREDICTED RACE &amp; AGE</h4>
        </div>

        {/* Dashboard Grid Split */}
        <div className="grid md:grid-cols-[1.5fr_8.5fr_3.15fr] gap-4 mt-10 mb-40 md:gap-4 pb-0 md:pb-0 md:mb-0">
          
          {/* Left Navigation: Metric Categories */}
          <div className="bg-white space-y-3 md:flex md:flex-col h-[62%]">
            <button 
              onClick={() => setActiveTab('RACE')}
              className={`p-3 flex-1 flex flex-col justify-between border-t text-left transition-colors cursor-pointer ${
                activeTab === 'RACE' ? 'bg-[#1A1B1C] text-white' : 'bg-[#F3F3F4] text-[#1A1B1C] hover:bg-[#E1E1E2]'
              }`}
            >
              <p className="text-base font-semibold">{selections.RACE}</p>
              <h4 className={`text-base font-semibold mb-1 ${activeTab === 'RACE' ? 'text-slate-400' : 'text-slate-500'}`}>RACE</h4>
            </button>
            <button 
              onClick={() => setActiveTab('AGE')}
              className={`p-3 flex-1 flex flex-col justify-between border-t text-left transition-colors cursor-pointer ${
                activeTab === 'AGE' ? 'bg-[#1A1B1C] text-white' : 'bg-[#F3F3F4] text-[#1A1B1C] hover:bg-[#E1E1E2]'
              }`}
            >
              <p className="text-base font-semibold">{selections.AGE}</p>
              <h4 className={`text-base font-semibold mb-1 ${activeTab === 'AGE' ? 'text-slate-400' : 'text-slate-500'}`}>AGE</h4>
            </button>
            <button 
              onClick={() => setActiveTab('SEX')}
              className={`p-3 flex-1 flex flex-col justify-between border-t text-left transition-colors cursor-pointer ${
                activeTab === 'SEX' ? 'bg-[#1A1B1C] text-white' : 'bg-[#F3F3F4] text-[#1A1B1C] hover:bg-[#E1E1E2]'
              }`}
            >
              <p className="text-base font-semibold">{selections.SEX}</p>
              <h4 className={`text-base font-semibold mb-1 ${activeTab === 'SEX' ? 'text-slate-400' : 'text-slate-500'}`}>SEX</h4>
            </button>
          </div>

          {/* Center Column: Interactive Circular Progress Ring */}
          <div className="relative bg-gray-100 p-4 flex flex-col items-center justify-center md:h-[57vh] md:border-t">
            <p className="hidden md:block md:absolute text-[40px] mb-2 left-5 top-2 font-normal">
              {activeSelectionName}
            </p>
            
            <div className="relative md:absolute w-full max-w-[384px] aspect-square mb-4 md:right-5 md:bottom-2">
              <div className="w-full h-full max-h-[384px] relative origin-center">
                <svg className="w-full h-full text-[#1A1B1C]" viewBox="0 0 100 100">
                  <path 
                    className="stroke-slate-200" 
                    d="M 50,50 m 0,-49.15 a 49.15,49.15 0 1 1 0,98.3 a 49.15,49.15 0 1 1 0,-98.3" 
                    strokeWidth="1.7" 
                    fillOpacity="0"
                  />
                  <path 
                    className="stroke-[#1A1B1C] transition-all duration-500 ease-out" 
                    d="M 50,50 m 0,-49.15 a 49.15,49.15 0 1 1 0,98.3 a 49.15,49.15 0 1 1 0,-98.3" 
                    strokeWidth="1.7" 
                    fillOpacity="0"
                    style={{
                      strokeDasharray: '308.819px, 308.819px',
                      strokeDashoffset: `${computedStrokeOffset}px`
                    }}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-3xl md:text-[40px] font-normal relative">
                    {activePercentage}<span className="absolute text-xl md:text-3xl top-0 -right-7">%</span>
                  </p>
                </div>
              </div>
            </div>
            <p className="md:absolute text-xs text-[#A0A4AB] md:text-sm lg:text-base font-normal mb-1 leading-[24px] md:bottom-[-15%] md:left-[22%] lg:left-[30%] xl:left-[40%] 2xl:left-[45%]">
              If A.I. estimate is wrong, select the correct one.
            </p>
          </div>

          {/* Right Column: Complete breakdown selection list */}
          <div className="bg-gray-100 pt-4 pb-4 md:border-t">
            <div className="flex justify-between px-4 border-b border-gray-200/50 pb-2">
              <h4 className="text-xs uppercase tracking-wider leading-[24px] font-semibold text-slate-500">{activeTab}</h4>
              <h4 className="text-xs uppercase tracking-wider leading-[24px] font-semibold text-slate-500">A.I. CONFIDENCE</h4>
            </div>

            <div className="space-y-0.5 mt-2">
              {currentDataset.map((item) => {
                const isActive = item.name === activeSelectionName;
                return (
                  <div 
                    key={item.name} 
                    onClick={() => handleListItemClick(item.name)}
                    className={`flex items-center justify-between h-[48px] px-4 cursor-pointer transition-colors ${
                      isActive 
                        ? 'bg-[#1A1B1C] text-white' 
                        : 'text-[#1A1B1C] hover:bg-[#E1E1E2]'
                    }`}
                  >
                    <div className="flex items-center gap-1">
                      {isActive ? (
                        <img
                          alt="radio button"
                          loading="lazy"
                          width="12"
                          height="12"
                          className="w-[12px] h-[12px] mr-2"
                          src="/selected-button.png"
                          style={{ color: 'transparent' }}
                        />
                      ) : (
                        <img
                          alt="radio button"
                          loading="lazy"
                          width="12"
                          height="12"
                          className="w-[12px] h-[12px] mr-2"
                          src="/unselected-button.png"
                          style={{ color: 'transparent' }}
                        />
                      )}
                      <span className="font-normal text-base leading-6 tracking-tight">{item.name}</span>
                    </div>
                    <span className="font-normal text-base leading-6 tracking-tight">{item.percentage}%</span>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Global Footer Direction Anchors */}
        <div className="pt-4 md:pt-[37px] pb-6 bg-white sticky bottom-40 md:static md:bottom-0 mb-8 md:mb-16">
          <div className="flex justify-between max-w-full mx-auto px-4 md:px-0">
            
            <Link href="/select" className="focus:outline-none">
              <div className="relative w-12 h-12 flex items-center justify-center border border-[#1A1B1C] rotate-45 scale-100 sm:hidden">
                <span className="rotate-[-45deg] text-xs font-semibold">BACK</span>
              </div>
              <div className="group hidden sm:flex flex-row relative justify-center items-center">
                <div className="w-12 h-12 hidden sm:flex justify-center border border-[#1A1B1C] rotate-45 scale-[0.85] group-hover:scale-[0.92] transition-transform ease duration-300"></div>
                <span className="absolute left-[15px] bottom-[13px] scale-[0.9] rotate-180 hidden sm:block group-hover:translate-x-[-2px] transition-transform ease duration-300">▶</span>
                <span className="text-sm font-semibold hidden sm:block ml-6">BACK</span>
              </div>
            </Link>

            <Link href="/" className="focus:outline-none">
              <div className="w-12 h-12 flex items-center justify-center border border-[#1A1B1C] rotate-45 scale-100 sm:hidden">
                <span className="rotate-[-45deg] text-xs font-semibold">HOME</span>
              </div>
              <div className="group hidden sm:flex flex-row relative justify-center items-center">
                <span className="text-sm font-semibold hidden sm:block mr-5">HOME</span>
                <div className="w-12 h-12 hidden sm:flex justify-center border border-[#1A1B1C] rotate-45 scale-[0.85] group-hover:scale-[0.92] transition-transform ease duration-300"></div>
                <span className="absolute right-[15px] bottom-[13px] scale-[0.9] hidden sm:block group-hover:translate-x-[2px] transition-transform ease duration-300">▶</span>
              </div>
            </Link>

          </div>
        </div>

      </div>
    </main>
  );
}