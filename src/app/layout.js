import "./globals.css";

export const metadata = {
  title: "Skinstric AI Dashboard",
  description: "FES Internship Phase Evaluation Tracker",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
        
        {/* Persistent Left Sidebar Layout */}
        <aside className="w-full md:w-80 bg-white border-b md:border-b-0 md:border-r border-slate-200 p-6 flex flex-col justify-between shrink-0">
          <div>
            <div className="flex items-center gap-2 mb-8">
              <div className="h-6 w-6 bg-black rounded-md flex items-center justify-center text-white font-bold text-xs">S</div>
              <span className="font-bold tracking-tight text-lg">SKINSTRIC</span>
            </div>
            
            <nav className="space-y-6">
              <div>
                <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Customer Info</h3>
                <div className="space-y-2 text-sm font-medium">
                  <div className="p-3 bg-slate-50 text-slate-700 rounded-lg">Name: <span id="sb-name" className="text-slate-900 font-semibold block mt-0.5">Not Provided</span></div>
                  <div className="p-3 bg-slate-50 text-slate-700 rounded-lg">Location: <span id="sb-location" className="text-slate-900 font-semibold block mt-0.5">Not Provided</span></div>
                </div>
              </div>

              <div>
                <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">AI Diagnostics</h3>
                <div className="space-y-2 text-sm font-medium">
                  <div className="p-3 bg-slate-50 text-slate-600 rounded-lg">Race: <span id="sb-race" className="text-slate-900 block font-semibold mt-0.5">-</span></div>
                  <div className="p-3 bg-slate-50 text-slate-600 rounded-lg">Age Bracket: <span id="sb-age" className="text-slate-900 block font-semibold mt-0.5">-</span></div>
                  <div className="p-3 bg-slate-50 text-slate-600 rounded-lg">Gender: <span id="sb-gender" className="text-slate-900 block font-semibold mt-0.5">-</span></div>
                </div>
              </div>
            </nav>
          </div>
          
          <div className="pt-4 border-t border-slate-100 text-xs text-slate-400 font-medium">
            Status: Evaluation Environment Active
          </div>
        </aside>

        {/* Dynamic Interactive Phase Section */}
        <main className="flex-1 flex flex-col justify-center items-center p-4 sm:p-8 md:p-12 lg:p-16">
          <div className="w-full max-w-xl bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 sm:p-8">
            {children}
          </div>
        </main>

      </body>
    </html>
  );
}