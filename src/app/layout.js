import "./globals.css";
import { DashboardProvider } from "@/context/DashboardContext";

export const metadata = {
  title: "Skinstric AI",
  description: "Sophisticated skincare powered by artificial intelligence.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-black antialiased">
        <DashboardProvider>
          {children}
        </DashboardProvider>
      </body>
    </html>
  );
}