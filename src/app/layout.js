// src/app/layout.js
import { ImageProvider } from '@/context/ImageContext';
import './globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ImageProvider>
          {children}
        </ImageProvider>
      </body>
    </html>
  );
}