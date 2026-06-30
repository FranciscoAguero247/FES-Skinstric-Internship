// src/app/camera/capture/page.js
'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';

export default function CameraCapturePage() {
  const router = useRouter();
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const [capturedImage, setCapturedImage] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [streamActive, setStreamActive] = useState(false);

  // Initialize and tear down the webcam stream reactively
  useEffect(() => {
    let currentStream = null;

    if (!capturedImage && !isAnalyzing) {
      navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'user', width: { ideal: 1280 }, height: { ideal: 720 } } 
      })
      .then((stream) => {
        currentStream = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setStreamActive(true);
        }
      })
      .catch((err) => {
        console.error("Error connecting to webcam feed: ", err);
      });
    }

    // Clean up streams when moving away or shifting states
    return () => {
      if (currentStream) {
        currentStream.getTracks().forEach(track => track.stop());
      }
    };
  }, [capturedImage, isAnalyzing]);

  // Capture image handler
  const handleCapture = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      const context = canvas.getContext('2d');
      if (context) {
        // Mirroring execution text matching typical front-facing user camera behaviors
        context.translate(canvas.width, 0);
        context.scale(-1, 1);
        
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg');
        setCapturedImage(dataUrl);
      }
    }
  };

  // Triggers Figma Analyzing Phase before routing to /select
  const handleUsePicture = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      router.push('/select');
    }, 3500); // 3.5s analyzing state simulation
  };

  // --- STATE 3: ANALYZING PICTURE LOADING STATE ---
  if (isAnalyzing) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#0B0C10] text-white px-6">
        <div className="relative w-24 h-24 mb-8 flex items-center justify-center">
          {/* Diagnostic Scanning Rings Effect */}
          <div className="absolute inset-0 border-2 border-zinc-800 rounded-full"></div>
          <div className="absolute inset-0 border-2 border-t-white rounded-full animate-spin"></div>
          <div className="w-12 h-12 border border-zinc-700 rounded-full animate-ping opacity-25"></div>
        </div>
        <h2 className="text-xl font-light tracking-[0.2em] uppercase mb-2">Analyzing Profile</h2>
        <p className="text-zinc-500 text-xs tracking-wider max-w-xs text-center leading-relaxed">
          Evaluating texture, tone values, and hydration mapping elements...
        </p>
      </div>
    );
  }

  return (
    <div className="relative flex flex-col min-h-screen bg-black text-white select-none overflow-hidden">
      
      {/* NAVBAR (Top) */}
      <div className="w-full z-20">
        <Navbar />
      </div>

      {/* WEBCAM SCREEN & MAIN VIEWER */}
      <div className="relative flex-1 w-full flex items-center justify-center bg-zinc-950">
        {!capturedImage ? (
          <video 
            ref={videoRef} 
            autoPlay 
            playsInline 
            className="w-full h-full object-cover max-h-[70vh] scale-x-[-1]" 
          />
        ) : (
          <img 
            src={capturedImage} 
            alt="Skin Assessment Capture Preview" 
            className="w-full h-full object-cover max-h-[70vh]" 
          />
        )}
        <canvas ref={canvasRef} className="hidden" />

        {/* CONTROLS OVERLAID ON VIEW SCREEN */}
        {!capturedImage ? (
          <>
            {/* Guidance Text: Mid Bottom of Webcam Screen */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-md px-6 py-3 rounded-full border border-white/5 shadow-2xl">
              <p className="text-xs tracking-[0.15em] uppercase font-medium text-zinc-300 whitespace-nowrap">
                Position face inside the frame center
              </p>
            </div>

            {/* Take Picture Button: Mid Right */}
            <div className="absolute right-8 top-1/2 -translate-y-1/2 z-10">
              <button 
                onClick={handleCapture}
                disabled={!streamActive}
                className="w-16 h-16 rounded-full bg-white hover:bg-zinc-200 active:scale-95 transition flex items-center justify-center p-1 shadow-2xl disabled:opacity-40 disabled:scale-100"
                aria-label="Capture Photo"
              >
                <div className="w-full h-full rounded-full border-[2px] border-black bg-transparent" />
              </button>
            </div>
          </>
        ) : (
          <>
            {/* Preview State: Text at Top and Bottom of Mirror Screen */}
            <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-white text-black text-[10px] font-bold uppercase tracking-[0.25em] px-4 py-1.5 rounded shadow-xl">
              Capture Completed
            </div>
            
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-md px-6 py-3 rounded-md border border-white/5 text-center max-w-xs shadow-2xl">
              <p className="text-xs text-zinc-400 tracking-wide leading-relaxed">
                Review image. Ensure facial regions are evenly illuminated.
              </p>
            </div>
          </>
        )}
      </div>

      {/* FOOTER ACTION CONTROLS */}
      <footer className="w-full bg-[#0B0C10] border-t border-zinc-900 py-6 px-10 flex items-center justify-between min-h-[100px] z-10">
        {!capturedImage ? (
          <>
            {/* Back Button: Bottom Left */}
            <Link 
              href="/result" 
              className="text-xs font-semibold tracking-[0.2em] uppercase text-zinc-500 hover:text-white transition-colors duration-200"
            >
              ← Return to Results
            </Link>
            {/* Balancing Layout Spacer Node */}
            <div className="w-6" />
          </>
        ) : (
          /* Preview Choice Layout options: Mid Bottom Options Layout */
          <div className="w-full max-w-md mx-auto flex items-center justify-center gap-6">
            <button 
              onClick={() => setCapturedImage(null)}
              className="flex-1 py-3.5 px-6 rounded border border-zinc-800 text-xs font-semibold tracking-[0.15em] uppercase hover:bg-white/5 hover:border-zinc-500 transition duration-200"
            >
              Retake
            </button>
            <button 
              onClick={handleUsePicture}
              className="flex-1 py-3.5 px-6 rounded bg-white text-black text-xs font-bold tracking-[0.15em] uppercase hover:bg-zinc-200 transition duration-200 shadow-lg"
            >
              Use This Picture
            </button>
          </div>
        )}
      </footer>
    </div>
  );
}