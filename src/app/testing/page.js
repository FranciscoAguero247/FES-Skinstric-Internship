'use client';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';

const STEPS = {
  NAME: 'NAME',
  LOCATION: 'LOCATION',
  LOADING: 'LOADING',
  SUCCESS: 'SUCCESS'
};

export default function TestingPage() {
  const [currentStep, setCurrentStep] = useState(STEPS.NAME);
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');
  
  const [userData, setUserData] = useState({ name: '', location: '' });

  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, [currentStep]);

  useEffect(() => {
    if (currentStep === STEPS.NAME) setInputValue(userData.name);
    if (currentStep === STEPS.LOCATION) setInputValue(userData.location);
  }, [currentStep, userData]);

  const validateInput = (text) => {
    if (!text.trim()) return 'Field cannot be empty.';
    const validStringRegex = /^[a-zA-ZÀ-ÿ\s\-]+$/;
    if (!validStringRegex.test(text)) return 'Please use letters only. Numbers or special characters are not allowed.';
    return '';
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleNextAction();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleNextAction();
    }
  };

  // Load saved values on initial render
  useEffect(() => {
    const savedName = localStorage.getItem('skinstric_name') || '';
    const savedLocation = localStorage.getItem('skinstric_location') || '';
    
    setUserData({ name: savedName, location: savedLocation });
    
    // Start the user on the step they actually need to fill out
    if (savedName && !savedLocation) {
      setCurrentStep(STEPS.LOCATION);
    } else if (savedName && savedLocation) {
      // If they already finished both but refreshed, you could either 
      // keep them at LOCATION or jump them to SUCCESS depending on preference.
      setCurrentStep(STEPS.LOCATION); 
    }
  }, []);

  const handleNextAction = async () => {
    const validationError = validateInput(inputValue);
    if (validationError) {
      setError(validationError);
      return;
    }
    setError('');

    if (currentStep === STEPS.NAME) {
      const updatedData = { ...userData, name: inputValue.trim() };
      setUserData(updatedData);
      localStorage.setItem('skinstric_name', updatedData.name);
      setInputValue('');
      setCurrentStep(STEPS.LOCATION);
    } 
    else if (currentStep === STEPS.LOCATION) {
      const finalData = { ...userData, location: inputValue.trim() };
      setUserData(finalData);
      localStorage.setItem('skinstric_location', finalData.location);
      
      setCurrentStep(STEPS.LOADING);
      setInputValue('');

     try {
        const response = await fetch('https://us-central1-frontend-simplified.cloudfunctions.net/skinstricPhaseOne', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(finalData)
        });
        
        const result = await response.json();

        if (result && result.success === true) {
          localStorage.removeItem('skinstric_name');
          localStorage.removeItem('skinstric_location');
          setCurrentStep(STEPS.SUCCESS);
        } else {
          setError('Backend registration failed. Please try again.');
          setCurrentStep(STEPS.LOCATION);
        }
      } catch (err) {
        setError('Network connectivity error. Re-submitting data...');
        setCurrentStep(STEPS.LOCATION);
      }

    }
  };

  const handleBackAction = () => {
    setError('');
    if (currentStep === STEPS.LOCATION) {
      setCurrentStep(STEPS.NAME);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col justify-between antialiased text-[#1A1B1C] bg-white overflow-hidden">
      <Navbar />

      <div className="absolute top-16 left-9 text-left z-20">
        <p className="font-semibold text-xs tracking-wider text-[#1A1B1C]">
          {currentStep === STEPS.SUCCESS ? 'ANALYSIS COMPLETE' : 'TO START ANALYSIS'}
        </p>
      </div>

      <div className="relative flex flex-col items-center justify-center flex-1 w-full h-full min-h-[500px]">
        {(currentStep === STEPS.NAME || currentStep === STEPS.LOCATION) && (
          <>
            <p className="text-sm text-gray-400 tracking-wider uppercase mb-1 z-10 select-none">
              {currentStep === STEPS.NAME ? "Click to type" : "Where are you located?"}
            </p>

            <form className="relative z-10" onSubmit={handleFormSubmit}>
              <div className="flex flex-col items-center">
                <input 
                  ref={inputRef}
                  className="text-4xl sm:text-6xl font-normal text-center bg-transparent border-b border-black focus:outline-none appearance-none w-[340px] sm:w-[500px] pt-1 tracking-[-0.07em] leading-[64px] text-[#1A1B1C]" 
                  placeholder={currentStep === STEPS.NAME ? "Introduce Yourself" : "your city name"}
                  type="text" 
                  autoComplete="off" 
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
              </div>
            </form>
            {error && (
              <p className="text-red-500 font-medium text-xs mt-3 tracking-wide max-w-[340px] sm:max-w-md z-10">
                {error}
              </p>
            )}
          </>
        )}

        {currentStep === STEPS.LOADING && (
          <div className="flex flex-col items-center justify-center space-y-4 z-10">
            <p className="text-sm text-gray-400 tracking-wider uppercase select-none font-medium">
              PROCESSING SUBMISSION
            </p>
            <div className="flex items-center space-x-2 h-6">
              <div className="w-2.5 h-2.5 bg-[#1A1B1C] rounded-full animate-bounce [animation-delay:-0.3s]"></div>
              <div className="w-2.5 h-2.5 bg-[#1A1B1C] rounded-full animate-bounce [animation-delay:-0.15s]"></div>
              <div className="w-2.5 h-2.5 bg-[#1A1B1C] rounded-full animate-bounce"></div>
            </div>
          </div>
        )}

        {currentStep === STEPS.SUCCESS && (
          <div className="flex flex-col items-center gap-4 z-10 animate-fade-in">
            <p className="text-2xl font-normal text-[#1A1B1C] tracking-wide">
              Thank you!
            </p>
            <p className="text-lg text-gray-600">
              Proceed for the next step
            </p>
          </div>
        )}

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] md:w-[762px] md:h-[762px] p-20 pointer-events-none select-none z-0">
          <div className="w-full h-full border border-dashed border-gray-400/60 rotate-[190deg] animate-[spin_120s_linear_infinite]"></div>
        </div>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] md:w-[682px] md:h-[682px] p-20 pointer-events-none select-none z-0">
          <div className="w-full h-full border border-dashed border-gray-400/40 rotate-[185deg] animate-[spin_90s_linear_infinite]"></div>
        </div>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] md:w-[602px] md:h-[602px] p-20 pointer-events-none select-none z-0">
          <div className="w-full h-full border border-dashed border-gray-400/30 rotate-45 animate-[spin_60s_linear_infinite]"></div>
        </div>
      </div>

     <div className="absolute bottom-4 w-full flex justify-between px-9 z-30 min-h-[48px] items-center">
  
      {currentStep !== STEPS.SUCCESS ? (
        <button 
          onClick={() => {
            if (currentStep === STEPS.LOCATION) {
              handleBackAction();
            } else {
              window.location.href = "/";
            }
          }}
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
      ) : (
        <div className="w-10"></div> // Layout balance spacer once success renders
      )}

        {currentStep === STEPS.SUCCESS && (
          <Link 
            href="/result" 
            className="group ml-auto flex items-center focus:outline-none animate-slide-right"
          >
            <div className="flex items-center">
              <div className="flex flex-row relative justify-center items-center">
                <span className="text-sm font-semibold mr-6 tracking-wide text-[#1A1B1C]">
                  PROCEED
                </span>
                <div className="w-12 h-12 flex justify-center border border-[#1A1B1C] rotate-45 scale-[0.85] transform transition-transform duration-300 ease-out group-hover:scale-[0.92]"></div>
                <span className="absolute right-[15px] bottom-[13px] scale-[0.9] transform transition-transform duration-300 ease-out group-hover:translate-x-[2px]">
                  ▶
                </span>
              </div>
            </div>
          </Link>
        )}
      </div>
    </div>
  );
}