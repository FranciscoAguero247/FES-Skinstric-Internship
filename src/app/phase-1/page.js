import React from 'react';
import Navbar from '@/components/Navbar';

export default function Phase1Page() {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <Navbar />
      
      <div className="flex-grow flex flex-col items-center justify-center p-8">
        <h1 className="text-3xl font-bold mb-4">Phase 1: Skin Assessment</h1>
        <p className="text-[#1A1B1C] text-opacity-70">Welcome to the first step of your personalized routine.</p>
      </div>
    </div>
  );
}