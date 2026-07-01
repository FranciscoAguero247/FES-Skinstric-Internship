'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

const ImageContext = createContext(null);

export function ImageProvider({ children }) {
  const [imageBase64, setImageBase64] = useState(null);

  useEffect(() => {
    try {
      const savedImage = sessionStorage.getItem('skinstric_captured_image');
      if (savedImage) {
        setImageBase64(savedImage);
      }
    } catch (e) {
      console.warn("Failed to read from sessionStorage on mount:", e);
    }
  }, []);

  const saveImage = (base64String) => {
    setImageBase64(base64String);

    try {
      if (base64String) {
        sessionStorage.setItem('skinstric_captured_image', base64String);
      } else {
        sessionStorage.removeItem('skinstric_captured_image');
      }
    } catch (error) {
      console.info(
        "Image saved to context memory. Note: SessionStorage quota exceeded due to high resolution."
      );
    }
  };

  return (
    <ImageContext.Provider value={{ imageBase64, saveImage }}>
      {children}
    </ImageContext.Provider>
  );
}

export function useImage() {
  const context = useContext(ImageContext);
  if (!context) {
    throw new Error('useImage must be used within an ImageProvider');
  }
  return context;
}