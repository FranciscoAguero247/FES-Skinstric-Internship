'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useImage } from '@/context/ImageContext';

export default function CameraCapturePage() {
  const router = useRouter();
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const { saveImage } = useImage();

  const [capturedImage, setCapturedImage] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [, setStreamActive] = useState(false);
  const [error, setError] = useState('');

  const activeStreamRef = useRef(null);

  const stopCameraStream = () => {
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    if (activeStreamRef.current) {
      activeStreamRef.current.getTracks().forEach((track) => {
        track.stop();
      });
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
        setError("Could not connect to webcam. Verify system camera access.");
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

      if (video.videoWidth === 0 || video.videoHeight === 0) return;
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      const context = canvas.getContext('2d');
      if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        const dataUrl = canvas.toDataURL('image/jpeg', 0.95);
        setCapturedImage(dataUrl);

        if(saveImage){
          saveImage(dataUrl)
        }

        stopCameraStream();
      }
    }
  };

  const handleUsePicture = async () => {
    stopCameraStream();
    setIsAnalyzing(true);
    setError('');

    try {
      const response = await fetch('https://us-central1-frontend-simplified.cloudfunctions.net/skinstricPhaseTwo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image: capturedImage })
      });

      if (!response.ok) {
        throw new Error('Failed to analyze image payload through the backend pipeline.');
      }

      const data = await response.json();

      const queryParams = new URLSearchParams({
        status: data.status || 'success',
        details: JSON.stringify(data.analysis || data)
      }).toString();

      router.push(`/select?${queryParams}`);

    } catch (err) {
      console.error("Pipeline Transmission Error:", err);
      setError(err.message || 'Something went wrong during analysis pipeline processing.');
      setIsAnalyzing(false);
    }
  };

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


      <div className="h-[100vh] w-screen flex-1">
        <div className="relative h-[100vh] w-screen overflow-hidden bg-gray-900">
          
          <div className={`absolute inset-0 z-10 ${capturedImage ? 'flex flex-col items-center' : ''}`}>
            
            {!capturedImage ? (
              <>
                <video 
                  ref={videoRef} 
                  autoPlay 
                  playsInline 
                  muted
                  className="absolute inset-0 w-full h-full object-cover" 
                />

                <div className="absolute right-8 top-1/2 transform -translate-y-1/2 z-20 flex items-center space-x-3">
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
                </div>

                <div className="absolute bottom-16 sm:bottom-24 left-0 right-0 text-center z-20 pointer-events-none text-[#FCFCFC]">
                  <p className="text-[14px] leading-[24px] tracking-normal text-center uppercase font-normal mb-6">
                    TO GET BETTER RESULTS MAKE SURE TO HAVE
                  </p>

                  <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-12 justify-center">
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
                </div>
              </>
            ) : (
              <>
                <img 
                  alt="Captured selfie" 
                  className="absolute inset-0 w-full h-full object-cover" 
                  src={capturedImage} 
                />
                  {isAnalyzing ? (
                    <div className="absolute inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-30">
                      <div className="bg-gray border border-zinc-500/30 backdrop-blur-md px-8 py-6 rounded-2xl flex flex-col items-center shadow-2xl max-w-xs w-full mx-4 animate-pulse transition-all duration-300">
                        <div className="flex flex-col items-center gap-2 text-[#FCFCFC] font-light tracking-[0.15em] uppercase text-xs text-center">
                        <span>Analyzing Image</span>
                        <span className="flex gap-0.5">
                          <span className="animate-bounce delay-0 font-bold">.</span>
                          <span className="animate-bounce delay-150 font-bold">.</span>
                          <span className="animate-bounce delay-300 font-bold">.</span>
                        </span>
                      </div>
                      </div>
                    </div>
                  ) : (
                    <>
                    <div className="absolute text-sm leading-6 uppercase text-[#FCFCFC] top-40">
                      GREAT SHOT!
                    </div>
                    
                    <div className="absolute bottom-40 sm:bottom-16 left-0 right-0 flex flex-col items-center z-20">
                      <h2 className="text-lg font-semibold mb-5 md:mb-7 text-[#FCFCFC] drop-shadow-md">
                        Preview
                      </h2>

                      {error && (
                        <p className="bg-red-600/90 text-[#FCFCFC] px-4 py-2 text-xs mb-4 rounded shadow-md max-w-sm text-center">
                          {error}
                        </p>
                      )}

                      <div className="flex justify-center space-x-6">
                        <button 
                          onClick={() => {
                            setCapturedImage(null);
                            setError('');
                          }}
                          className="px-4 py-1 bg-gray-200 text-gray-800 cursor-pointer hover:bg-gray-300 shadow-md text-sm"
                        >
                          Retake
                        </button>
                        <button 
                          onClick={handleUsePicture }
                          className="px-6 py-2 bg-[#1A1B1C] text-[#FCFCFC] cursor-pointer hover:bg-gray-800 shadow-md text-sm"
                        >
                          Use This Photo
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </>
            )}

          </div>
          <div className="absolute md:bottom-8 bottom-60 left-8 z-20">
            <button 
              onClick={() => {
                stopCameraStream();
                setTimeout(() => {
                  router.push('/testing');
                }, 100);
              }}
              disabled={isAnalyzing}
              className="block focus:outline-none disabled:opacity-30 disabled:pointer-events-none"
            >
              <div>
                <div className="relative w-12 h-12 flex items-center justify-center border border-[#FCFCFC] rotate-45 scale-[1] sm:hidden">
                  <span className="rotate-[-45deg] text-xs font-semibold sm:hidden text-[#FCFCFC]">BACK</span>
                </div>
                
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