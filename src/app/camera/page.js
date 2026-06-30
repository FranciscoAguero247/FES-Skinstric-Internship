// src/app/camera/page.js
'useinit'
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CameraPermissionPage() {
  const router = useRouter();
  const [status, setStatus] = useState('Requesting camera access...');

  useEffect(() => {
    async function verifyAndRedirect() {
      try {
        // Request webcam access
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        
        // Stop the temporary stream tracks immediately so the camera light turns off
        stream.getTracks().forEach(track => track.stop());
        
        setStatus('Access granted. Initializing camera...');
        
        // Simulating the Figma loading time duration
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0B0C10] text-white p-6">
      <div className="relative flex items-center justify-center mb-6">
        {/* Sleek Minimalist Spinner */}
        <div className="w-16 h-16 border-[3px] border-zinc-800 border-t-white rounded-full animate-spin"></div>
      </div>
      <p className="text-sm tracking-widest text-zinc-400 uppercase font-medium animate-pulse">
        {status}
      </p>
    </div>
  );
}