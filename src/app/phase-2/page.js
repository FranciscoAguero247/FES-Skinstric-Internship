'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import Navbar from "@/components/Navbar";

const STEPS = {
  NAME: 'NAME',
  LOCATION: 'LOCATION'
};

export default function ResultsPage() {
  const [currentStep, setCurrentStep] = useState(STEPS.LOCATION);
  const [error, setError] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const [isCameraActive, setIsCameraActive] = useState(false);

  const fileInputRef = useRef(null);
  const videoRef = useRef(null);

  const handleBackAction = () => {
    setError('');
    if (currentStep === STEPS.LOCATION) {
      setCurrentStep(STEPS.NAME);
    }
  };

  const handleGalleryClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        stopCamera(); 
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCameraClick = async () => {
    setImagePreview(null);
    setIsCameraActive(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Camera access denied or unavailable:", err);
      setIsCameraActive(false);
      alert("Could not access camera device. Please try uploading via Gallery instead.");
    }
  };

  const capturePhoto = () => {
    if (videoRef.current) {
      const video = videoRef.current;
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth || 640;
      canvas.height = video.videoHeight || 480;
      
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg');
        setImagePreview(dataUrl);
        stopCamera();
      }
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject;
      const tracks = stream.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsCameraActive(false);
  };

  return (
    <div className="relative min-h-screen flex flex-col justify-between antialiased text-[#1A1B1C] bg-white overflow-hidden">
      <Navbar />

      <div className="absolute top-21 left-9 text-left z-20">
        <p className="font-semibold text-xs tracking-wider text-[#1A1B1C]">
          TO START ANALYSIS
        </p>
      </div>
    
      <div className="flex-grow flex flex-col items-center justify-center relative min-h-[700px] md:min-h-[750px] mb-10 mt-10">
        
        {/* REPLICATED SIGWRAPPED CORE CONTENT DOM CELL */}
        <div className="flex-[0.4] md:flex-1 flex flex-col md:flex-row items-center xl:justify-center relative mb-0 md:mb-30 space-y-[-20px] md:space-y-0 w-full max-w-7xl h-full">
          
          {/* LEFT INTERACTIVE ARTIFACT: ALLOW A.I. TO SCAN YOUR FACE */}
          <div className="relative md:absolute md:left-[55%] lg:left-[50%] xl:left-[40%] md:-translate-y-[0%] -translate-y-[1%] md:-translate-x-full flex flex-col items-center justify-center z-20">
            <div className="w-[270px] h-[270px] md:w-[482px] md:h-[482px]"></div>
            
            {/* DIAMOND RINGS */}
            <div className="absolute w-[270px] h-[270px] md:w-[482px] md:h-[482px] border border-solid border-gray-200/80 rotate-[200deg] animate-[spin_120s_linear_infinite] pointer-events-none"></div>
            <div className="absolute w-[230px] h-[230px] md:w-[444.34px] md:h-[444.34px] border border-solid border-gray-300/60 rotate-[190deg] animate-[spin_90s_linear_infinite] pointer-events-none"></div>
            <div className="absolute w-[190px] h-[190px] md:w-[405.18px] md:h-[405.18px] border border-solid border-gray-400/40 rotate-45 animate-[spin_60s_linear_infinite] pointer-events-none"></div>

            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <button 
                onClick={handleCameraClick}
                className="absolute w-[100px] h-[100px] md:w-[136px] md:h-[136px] bg-[#F9FBFD] border border-gray-100 flex items-center justify-center rounded-full hover:scale-108 transition-transform duration-700 ease-in-out cursor-pointer shadow-sm z-30 group"
              >
                <span className="text-2xl group-hover:rotate-12 transition-transform duration-300">📷</span>
              </button>

              <div className="absolute bottom-[1%] right-[90px] md:top-[30.9%] md:right-[-12px] translate-y-[-20px] pointer-events-none text-left">
                <p className="text-xs md:text-sm font-normal mt-1 leading-[24px] tracking-wide text-[#1A1B1C]">
                  ALLOW A.I.<br />TO SCAN YOUR FACE
                </p>
                <div className="absolute hidden md:block md:right-[143px] md:top-[20px] w-16 border-t border-dashed border-gray-300"></div>
              </div>
            </div>
          </div>

          {/* RIGHT INTERACTIVE ARTIFACT: ALLOW A.I. ACCESS GALLERY */}
          <div className="relative md:absolute md:left-[45%] lg:left-[50%] xl:left-[55%] flex flex-col items-center mt-12 md:mt-0 justify-center md:-translate-y-[0%] -translate-y-[10%] transition-opacity duration-300 opacity-100 z-20">
            <div className="w-[270px] h-[270px] md:w-[482px] md:h-[482px]"></div>
            
            {/* DIAMOND RINGS */}
            <div className="absolute w-[270px] h-[270px] md:w-[482px] md:h-[482px] border border-solid border-gray-200/80 rotate-[205deg] animate-[spin_110s_linear_infinite] pointer-events-none"></div>
            <div className="absolute w-[230px] h-[230px] md:w-[444.34px] md:h-[444.34px] border border-solid border-gray-300/60 rotate-[195deg] animate-[spin_85s_linear_infinite] pointer-events-none"></div>
            <div className="absolute w-[190px] h-[190px] md:w-[405.18px] md:h-[405.18px] border border-solid border-gray-400/40 rotate-45 animate-[spin_55s_linear_infinite] pointer-events-none"></div>

            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <button 
                onClick={handleGalleryClick}
                className="absolute w-[100px] h-[100px] md:w-[136px] md:h-[136px] bg-[#F9FBFD] border border-gray-100 flex items-center justify-center rounded-full hover:scale-108 transition-transform duration-700 ease-in-out cursor-pointer shadow-sm z-30 group"
              >
                <span className="text-2xl group-hover:-translate-y-0.5 transition-transform duration-300">📁</span>
              </button>

              <div className="absolute top-[75%] md:top-[70%] md:left-[17px] translate-y-[-10px] pointer-events-none text-right md:text-left w-max">
                <p className="text-[12px] md:text-[14px] font-normal mt-2 leading-[24px] text-right md:text-left tracking-wide text-[#1A1B1C]">
                  ALLOW A.I.<br />ACCESS GALLERY
                </p>
                <div className="absolute hidden md:block md:left-[120px] md:bottom-[39px] w-16 border-t border-dashed border-gray-300"></div>
              </div>
            </div>
          </div>

          {/* PERSISTENT DYNAMIC PREVIEW SUB-LAYOUT HUB */}
          <div className="absolute top-[-75px] right-7 md:top-[-50px] md:right-8 transition-opacity duration-300 opacity-100 flex flex-col items-end z-40">
            <h1 className="text-xs md:text-sm font-normal mb-1 tracking-wider text-gray-400 uppercase">Preview</h1>
            <div className="w-24 h-24 md:w-32 md:h-32 border border-solid border-gray-300 bg-gray-50 flex items-center justify-center overflow-hidden shadow-inner relative group">
              {isCameraActive && (
                <video 
                  ref={videoRef} 
                  autoPlay 
                  playsInline 
                  className="w-full h-full object-cover scale-x-[-1]"
                />
              )}
              {imagePreview && (
                <img 
                  src={imagePreview} 
                  alt="User capture" 
                  className="w-full h-full object-cover"
                />
              )}
              {!isCameraActive && !imagePreview && (
                <span className="text-[9px] font-medium text-gray-300 tracking-tight text-center px-1 select-none">
                  NO LIVE FEED
                </span>
              )}
              {isCameraActive && (
                <button 
                  onClick={capturePhoto}
                  className="absolute bottom-1 left-1/2 -translate-x-1/2 bg-red-500 hover:bg-red-600 active:scale-95 text-white font-bold text-[8px] px-2 py-0.5 tracking-wide uppercase transition-all shadow-md rounded"
                >
                  SNAP
                </button>
              )}
            </div>
          </div>

        </div>

        {/* HIDDEN SYSTEM HOOK COMPONENT ATTRIBUTES */}
        <input 
          ref={fileInputRef}
          type="file" 
          accept="image/*" 
          className="hidden" 
          onChange={handleFileChange}
        />

        {/* DYNAMIC DIRECTION FOOTER CONTROLS */}
        <div className="absolute bottom-0 w-full flex justify-between px-9 z-30 items-center">
          
          {/* Universal Back Button using the custom logic handler */}
          <button 
            onClick={handleBackAction} 
            className="group flex items-center focus:outline-none"
            aria-label="Go Back"
          >
            <div className="flex items-center">
              <div className="relative w-12 h-12 flex items-center justify-center border border-[#1A1B1C] rotate-45 scale-[1] sm:hidden">
                <span className="rotate-[-45deg] text-xs font-semibold">BACK</span>
              </div>

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

          {/* PROCEED ACTION */}
          {imagePreview && (
            <Link 
              href="/phase-3" 
              className="group ml-auto flex items-center focus:outline-none animate-[slideRight_0.4s_ease-out_forwards]"
            >
              <div className="flex items-center">
                <div className="flex flex-row relative justify-center items-center">
                  <span className="text-sm font-semibold mr-6 tracking-wide text-[#1A1B1C]">PROCEED</span>
                  <div className="w-12 h-12 flex justify-center border border-[#1A1B1C] rotate-45 scale-[0.85] transform transition-transform duration-300 ease-out group-hover:scale-[0.92]"></div>
                  <span className="absolute right-[15px] bottom-[13px] scale-[0.9] transform transition-transform duration-300 ease-out group-hover:translate-x-[2px]">▶</span>
                </div>
              </div>
            </Link>
          )}
        </div>

      </div>
    </div>
  );
}