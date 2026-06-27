'use client';

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from "@/components/Navbar";
import Image from 'next/image';

const STEPS = {
  NAME: 'NAME',
  LOCATION: 'LOCATION'
};

export default function ResultsPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(STEPS.LOCATION);
  const [error, setError] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fileInputRef = useRef(null);
  const videoRef = useRef(null);

  const processImageAndAnalyze = async (imageDataUrl) => {
    setImagePreview(imageDataUrl);
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('https://us-central1-frontend-simplified.cloudfunctions.net/skinstricPhaseTwo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image: imageDataUrl })
      });

      if (!response.ok) {
        throw new Error('Failed to analyze image. Please try again.');
      }

      const data = await response.json();

      const queryParams = new URLSearchParams({
        status: data.status || 'success',
        details: JSON.stringify(data.analysis || data)
      }).toString();

      alert("Image analyzed successfully.");
      router.push(`/select?${queryParams}`);

    } catch (err) {
      console.error(err);
      setError(err.message || 'Something went wrong during analysis.');
      alert(err.message || 'Something went wrong during analysis.');
    } finally {
      setIsLoading(false);
    }
  };

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
        stopCamera(); 
        processImageAndAnalyze(reader.result);
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
        stopCamera();
        processImageAndAnalyze(dataUrl);
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

      <div className="absolute top-24 right-9 md:top-24 md:right-24 flex flex-col items-start z-50">
        <h1 className="text-xs md:text-sm font-normal mb-1 text-left">Preview</h1>
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
          {isCameraActive && !isLoading && (
            <button 
              onClick={capturePhoto}
              className="absolute bottom-1 left-1/2 -translate-x-1/2 bg-red-500 hover:bg-red-600 active:scale-95 text-white font-bold text-[8px] px-2 py-0.5 tracking-wide uppercase transition-all shadow-md rounded"
            >
              SNAP
            </button>
          )}
        </div>
        {error && <p className="text-[10px] text-red-500 mt-1 max-w-[120px]">{error}</p>}
      </div>
    
      <div className="flex-grow flex flex-col items-center justify-center relative min-h-[700px] md:min-h-[750px] mb-10 mt-10">
        
        {isLoading ? (
          <div className="flex flex-col items-center justify-center relative w-full h-full min-h-[500px]">
            <div className="relative flex flex-col items-center justify-center">
              
              <div className="w-[270px] h-[270px] md:w-[482px] md:h-[482px] animate-[spin_20s_linear_infinite]">
                <Image 
                  src="/large-square.png"
                  alt="Outer Decorative Ring"
                  fill
                  className="object-contain"
                />
              </div>

              <div className="absolute w-[230px] h-[230px] md:w-[444.34px] md:h-[444.34px] rotate-[190deg] animate-[spin_15s_linear_infinite] pointer-events-none">
                <Image 
                  src="/medium-square.png"
                  alt="Middle Decorative Ring"
                  fill
                  className="object-contain"
                />
              </div>

              <div className="absolute w-[190px] h-[190px] md:w-[405.18px] md:h-[405.18px] rotate-45 animate-[spin_10s_linear_infinite] pointer-events-none">
                <Image 
                  src="/small-square.png" 
                  alt="Inner Decorative Ring"
                  fill
                  className="object-contain"
                />
              </div>

              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <p className="text-xs md:text-sm font-semibold tracking-widest text-[#1A1B1C] text-center uppercase">
                  PREPARING YOUR ANALYSIS
                </p>

                <div className="flex space-x-1 mt-2.5">
                  <span className="w-1.5 h-1.5 bg-[#1A1B1C] rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                  <span className="w-1.5 h-1.5 bg-[#1A1B1C] rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                  <span className="w-1.5 h-1.5 bg-[#1A1B1C] rounded-full animate-bounce"></span>
                </div>
              </div>

            </div>
          </div>
        ) : (
          <div className="flex-[0.4] md:flex-1 flex flex-col md:flex-row items-center xl:justify-center relative mb-0 md:mb-[120px] space-y-[-20px] md:space-y-0 w-full max-w-7xl h-full">
            
            <div className="relative md:absolute md:left-[55%] lg:left-[50%] xl:left-[40%] md:-translate-y-0 -translate-y-[1%] md:-translate-x-full flex flex-col items-center justify-center z-20">
              <div className="w-[270px] h-[270px] md:w-[482px] md:h-[482px] animate-[spin_120s_linear_infinite]">
                <Image 
                  src="/large-square.png"
                  alt="Outer Decorative Ring"
                  fill
                  className="object-contain"
                />
              </div>

              <div className="absolute w-[230px] h-[230px] md:w-[444.34px] md:h-[444.34px] rotate-[190deg] animate-[spin_90s_linear_infinite] pointer-events-none">
                <Image 
                  src="/medium-square.png"
                  alt="Middle Decorative Ring"
                  fill
                  className="object-contain"
                />
              </div>

              <div className="absolute w-[190px] h-[190px] md:w-[405.18px] md:h-[405.18px] rotate-45 animate-[spin_60s_linear_infinite] pointer-events-none">
                <Image 
                  src="/small-square.png" 
                  alt="Inner Decorative Ring"
                  fill
                  className="object-contain"
                />
              </div>

              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <button 
                  onClick={handleCameraClick}
                  className="absolute w-[100px] h-[100px] md:w-[136px] md:h-[136px] flex items-center justify-center hover:scale-105 transition-transform duration-700 ease-in-out cursor-pointer z-30 group"
                >
                  <div className="relative w-full h-full group-hover:-translate-y-0.5 transition-transform duration-300">
                    <Image 
                      src="/camera.svg" 
                      alt="Camera Icon"
                      fill
                      className="object-contain"
                    />
                  </div>
                </button>

                <div className="absolute bottom-[1%] right-[90px] md:top-[30.9%] md:right-[-12px] -translate-y-5 pointer-events-none text-left">
                  <p className="text-xs md:text-sm font-normal mt-1 leading-[24px] tracking-wide text-[#1A1B1C]">
                    ALLOW A.I.<br />TO SCAN YOUR FACE
                  </p>
                  <div className="absolute hidden md:block md:right-[160px] md:top-[5px] w-16 h-16">
                    <Image 
                      src="/ResScanLine.svg" 
                      alt="Face Scan UI"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="relative md:absolute md:left-[45%] lg:left-[50%] xl:left-[55%] flex flex-col items-center mt-12 md:mt-0 justify-center md:-translate-y-0 -translate-y-[10%] transition-opacity duration-300 opacity-100 z-20">
              <div className="w-[270px] h-[270px] md:w-[482px] md:h-[482px] animate-[spin_120s_linear_infinite]">
                <Image 
                  src="/large-square.png"
                  alt="Outer Decorative Ring"
                  fill
                  className="object-contain"
                />
              </div>

              <div className="absolute w-[230px] h-[230px] md:w-[444.34px] md:h-[444.34px] rotate-[190deg] animate-[spin_90s_linear_infinite] pointer-events-none">
                <Image 
                  src="/medium-square.png"
                  alt="Middle Decorative Ring"
                  fill
                  className="object-contain"
                />
              </div>

              <div className="absolute w-[190px] h-[190px] md:w-[405.18px] md:h-[405.18px] rotate-45 animate-[spin_60s_linear_infinite] pointer-events-none">
                <Image 
                  src="/small-square.png" 
                  alt="Inner Decorative Ring"
                  fill
                  className="object-contain"
                />
              </div>

              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <button 
                  onClick={handleGalleryClick}
                  className="absolute w-[100px] h-[100px] md:w-[136px] md:h-[136px] flex items-center justify-center hover:scale-105 transition-transform duration-700 ease-in-out cursor-pointer z-30 group"
                >
                  <div className="relative w-full h-full group-hover:-translate-y-0.5 transition-transform duration-300">
                    <Image 
                      src="/gallery-icon.svg" 
                      alt="Gallery Icon" 
                      fill
                      className="object-contain"
                    />
                  </div>
                </button>

                <div className="absolute top-[75%] md:top-[70%] md:left-[17px] -translate-y-2 pointer-events-none text-right flex items-center gap-3">
                  <p className="text-[12px] md:text-[14px] font-normal mt-2 leading-[24px] text-right text-[#1A1B1C]">
                    ALLOW A.I.<br />ACCESS GALLERY
                  </p>
                  <div className="absolute hidden md:block md:left-[130px] md:bottom-[32px] rotate-180 w-[66px] h-[59px]">
                    <Image 
                      src="/ResScanLine.svg" 
                      alt="Gallery Line"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>

          </div>
        )}

        <input 
          ref={fileInputRef}
          type="file" 
          accept="image/*" 
          className="hidden" 
          onChange={handleFileChange}
        />

        <div className="absolute bottom-0 w-full flex justify-between px-9 z-30 items-center">
          <button 
            onClick={handleBackAction} 
            disabled={isLoading}
            className={`group flex items-center focus:outline-none ${isLoading ? 'opacity-30 pointer-events-none' : ''}`}
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
        </div>

      </div>
    </div>
  );
}