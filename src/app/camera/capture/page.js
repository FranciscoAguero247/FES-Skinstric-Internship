'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function CameraCapturePage() {
  const router = useRouter();
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const [capturedImage, setCapturedImage] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [streamActive, setStreamActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const activeStreamRef = useRef(null);

  const stopCameraStream = () => {
    if (activeStreamRef.current) {
      activeStreamRef.current.getTracks().forEach((track) => track.stop());
      activeStreamRef.current = null;
    }
    setStreamActive(false);
  };

  useEffect(() => {
    if (!capturedImage && !isAnalyzing) {
      navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'user', width: { ideal: 1920 }, height: { ideal: 1080 } } 
      })
      .then((stream) => {
        activeStreamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setStreamActive(true);
        }
      })
      .catch((err) => {
        console.error("Error connecting to webcam feed: ", err);
      });
    }

    return () => {
      stopCameraStream();
    };
  }, [capturedImage, isAnalyzing]);

  const handleCapture = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      const context = canvas.getContext('2d');
      if (context) {
        context.translate(canvas.width, 0);
        context.scale(-1, 1);
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        const dataUrl = canvas.toDataURL('image/jpeg');
        setCapturedImage(dataUrl);
        stopCameraStream();
      }
    }
  };

  const handleUsePicture = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      router.push('/select');
    }, 3500); 
  };

  if (isAnalyzing) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#1A1B1C] text-[#FCFCFC] px-6">
        <div className="relative w-24 h-24 mb-8 flex items-center justify-center">
          <div className="absolute inset-0 border-2 border-zinc-800 rounded-full"></div>
          <div className="absolute inset-0 border-2 border-t-[#FCFCFC] rounded-full animate-spin"></div>
          <div className="w-12 h-12 border border-zinc-700 rounded-full animate-ping opacity-25"></div>
        </div>
        <h2 className="text-xl font-light tracking-[0.2em] uppercase mb-2">Analyzing Profile</h2>
        <p className="text-zinc-400 text-xs tracking-wider max-w-xs text-center leading-relaxed">
          Evaluating texture, tone values, and hydration mapping elements...
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white text-[#1A1B1C] antialiased min-h-screen flex flex-col">
      <div className="absolute top-0 left-0 w-full flex flex-row h-[64px] justify-between py-3 px-6 z-30 bg-transparent">
        <div className="flex flex-row pt-1 scale-75 justify-center items-center">
          <a className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md transition-colors h-9 px-4 py-2 font-semibold text-sm mr-2 line-clamp-4 leading-[16px] text-[#FCFCFC]" href="/">
            SKINSTRIC
          </a>
          <img 
            alt="left-bracket" 
            src="/left-bracket.png" 
            className="invert brightness-0 img-white" 
          />
          <p className="text-[#FCFCFC] text-opacity-70 font-semibold text-sm ml-1.5 mr-1.5">INTRO</p>
          <img 
            alt="right-bracket" 
            src="/right-bracket.png" 
            className="invert brightness-0 img-white" 
          />
        </div>
      </div>

      {/* FULL SCREEN CAMERA VIEWPORT MAIN BOX */}
      <div className="h-[90vh] w-screen flex-1">
        <div className="relative h-[100vh] w-screen overflow-hidden bg-gray-900">
          <div className="absolute inset-0 z-10">
            
            {/* Viewport Core Feed Stream Rendering Wrapper */}
            {!capturedImage ? (
              <video 
                ref={videoRef} 
                autoPlay 
                playsInline 
                className="absolute inset-0 w-full h-full object-cover" 
              />
            ) : (
              <img 
                src={capturedImage} 
                alt="Capture Preview" 
                className="absolute inset-0 w-full h-full object-cover" 
              />
            )}

            {/* ACTION TRIGGERS: RIGHT ABSOLUTE MIDPOINT ALIGNMENT */}
            <div className="absolute right-8 top-1/2 transform -translate-y-1/2 z-20 flex items-center space-x-3">
              {!capturedImage ? (
                <>
                  <div className="font-semibold text-sm tracking-tight leading-[14px] text-[#FCFCFC] hidden sm:block">
                    TAKE PICTURE
                  </div>
                  <div className="transform hover:scale-105 ease-in-out duration-300">
                    <img 
                      alt="Take Picture" 
                      src="/snap-icon.png" 
                      className="w-16 h-16 cursor-pointer"
                      onClick={handleCapture}
                    />
                  </div>
                </>
              ) : (
                <div className="flex flex-col gap-4 transform translate-y-[-20%]">
                  <button 
                    onClick={() => setCapturedImage(null)}
                    className="py-3 px-6 text-xs font-semibold uppercase tracking-wider text-[#FCFCFC] bg-[#1A1B1C]/80 backdrop-blur border border-zinc-700 hover:bg-[#1A1B1C] transition duration-200"
                  >
                    Retake
                  </button>
                  <button 
                    onClick={handleUsePicture}
                    className="py-3 px-6 text-xs font-bold uppercase tracking-wider text-[#1A1B1C] bg-[#FCFCFC] shadow-2xl hover:bg-zinc-200 transition duration-200"
                  >
                    Use Picture
                  </button>
                </div>
              )}
            </div>

            {/* SYSTEM INSTRUCTIONS PANEL - BOTTOM DEPLOYED LAYER */}
              <div className="absolute bottom-16 sm:bottom-24 left-0 right-0 text-center z-20 pointer-events-none text-[#FCFCFC]">
                {!capturedImage ? (
                  <>
                    <p className="text-[14px] leading-[24px] tracking-normal text-center uppercase font-normal mb-6">
                      TO GET BETTER RESULTS MAKE SURE TO HAVE
                    </p>

                    <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-12 justify-center">
                      {/* Requirement 1 */}
                      <div className="flex items-center gap-2 font-medium text-sm">
                        <div className="relative w-4 h-4">
                          <Image 
                            src="/bullet-rectangle-icon.png" 
                            alt="Bullet Icon"
                            fill
                            priority
                            className="object-contain invert brightness-0 img-white"
                          />
                        </div>
                        <span>NEUTRAL EXPRESSION</span>
                      </div>

                      {/* Requirement 2 */}
                      <div className="flex items-center gap-2 font-medium text-sm">
                        <div className="relative w-4 h-4">
                          <Image 
                            src="/bullet-rectangle-icon.png" 
                            alt="Bullet Icon"
                            fill
                            priority
                            className="object-contain invert brightness-0 img-white"
                          />
                        </div>
                        <span>FRONTAL POSE</span>
                      </div>

                      {/* Requirement 3 */}
                      <div className="flex items-center gap-2 font-medium text-sm">
                        <div className="relative w-4 h-4">
                          <Image 
                            src="/bullet-rectangle-icon.png" 
                            alt="Bullet Icon"
                            fill
                            priority
                            className="object-contain invert brightness-0 img-white"
                          />
                        </div>
                        <span>ADEQUATE LIGHTING</span>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="max-w-xs mx-auto bg-[#1A1B1C]/80 backdrop-blur-md px-6 py-3 border border-zinc-700 rounded shadow-xl pointer-events-auto">
                    <p className="text-xs text-[#FCFCFC] tracking-wide leading-relaxed">
                      Review image. Ensure facial regions are evenly illuminated.
                    </p>
                  </div>
                )}
              </div>
          </div>

          {/* BACK GRAPHIC NAVIGATION CONTROL - BOTTOM LEFT LAYER */}
          <div className="absolute md:bottom-8 bottom-60 left-8 z-20">
            <button 
              onClick={() => {
                stopCameraStream();
                router.push('/testing');
              }}
              className="block focus:outline-none"
            >
              <div>
                {/* Mobile Variant */}
                <div className="relative w-12 h-12 flex items-center justify-center border border-[#FCFCFC] rotate-45 scale-[1] sm:hidden">
                  <span className="rotate-[-45deg] text-xs font-semibold sm:hidden text-[#FCFCFC]">BACK</span>
                </div>
                
                {/* Desktop Variant */}
                <div className="group hidden sm:flex flex-row relative justify-center items-center">
                  <div className="w-12 h-12 hidden sm:flex justify-center border border-[#FCFCFC] rotate-45 scale-[0.85] group-hover:scale-[0.92] ease duration-300"></div>
                  <span className="absolute left-[15px] bottom-[13px] scale-[0.9] rotate-180 hidden sm:block text-[#FCFCFC] group-hover:scale-[0.92] ease duration-300">
                    ▶
                  </span>
                  <span className="text-sm font-semibold hidden sm:block ml-6 text-[#FCFCFC]">
                    BACK
                  </span>
                </div>
              </div>
            </button>
          </div>

          <canvas ref={canvasRef} className="hidden"></canvas>
        </div>
      </div>

    </div>
  );
}