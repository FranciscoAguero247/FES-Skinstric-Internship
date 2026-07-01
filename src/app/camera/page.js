'useinit'
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import DecorativeRings from "@/components/DecorativeRings";
import Image from 'next/image';

export default function CameraPermissionPage() {
  const router = useRouter();
  const [, setStatus] = useState('Requesting camera access...');

  useEffect(() => {
    async function verifyAndRedirect() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        
        stream.getTracks().forEach(track => track.stop());
        
        setStatus('Access granted. Initializing camera...');
  
        setTimeout(() => {
          router.push('/camera/capture');
        }, 1500);
      } catch (err) {
        console.error(err);
        setStatus('Camera access denied. Please enable permission in your browser settings.');
      }
    }

    verifyAndRedirect();
  }, [router]);

  return (
      <div className="flex flex-col items-center justify-center text-center">
        <div className="flex flex-col items-center justify-center relative w-full h-full min-h-[900px]">      
          <DecorativeRings speed='slow'>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center">
              <div className="relative w-[100px] h-[100px] md:w-[136px] md:h-[136px]">
                <Image 
                  src="/camera.svg" 
                  alt="Camera Icon"
                  fill
                  priority
                  className="object-contain animate-pulse"
                />
              </div>
              <p className="text-xs md:text-sm font-semibold tracking-widest text-[#1A1B1C] text-center uppercase mt-2">
                SETTING UP CAMERA...
              </p>

            </div>
          </DecorativeRings>
        </div>
        <p 
          className="text-[14px] leading-[24px] tracking-normal text-center uppercase font-normal mb-6 -mt-54"
        >
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
                className="object-contain"
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
                className="object-contain"
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
                className="object-contain"
              />
            </div>
            <span>ADEQUATE LIGHTING</span>
          </div>
        </div>
    </div>
  );
}