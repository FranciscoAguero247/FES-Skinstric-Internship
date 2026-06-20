"use client";

import { useDashboard } from "@/context/DashboardContext";

export default function DashboardLayout({ children }) {
  const { profile } = useDashboard(); // Cleanly consume the existing root state

  return (
    <div className="min-h-screen w-full bg-slate-50 flex flex-col md:flex-row antialiased">
      
      {/* PERSISTENT SIDEBAR PANEL */}
      <aside className="w-full md:w-80 bg-white border-b md:border-b-0 md:border-r border-slate-200 p-6 flex flex-col justify-between shrink-0 md:max-h-screen md:sticky md:top-0">
        <div>
          <div className="flex items-center gap-2 mb-8">
            <div className="h-6 w-6 bg-black rounded flex items-center justify-center text-white font-black text-xs">S</div>
            <span className="font-bold tracking-widest text-sm text-slate-900">SKINSTRIC</span>
          </div>
          
          <nav className="space-y-6">
            <div>
              <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Customer Info</h3>
              <div className="space-y-2 text-xs font-medium">
                <div className="p-3 bg-slate-50 text-slate-500 rounded-xl border border-slate-100">
                  Name: <span className="text-slate-900 font-semibold block mt-0.5">{profile.name}</span>
                </div>
                <div className="p-3 bg-slate-50 text-slate-500 rounded-xl border border-slate-100">
                  Location: <span className="text-slate-900 font-semibold block mt-0.5">{profile.location}</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">AI Diagnostics</h3>
              <div className="space-y-2 text-xs font-medium">
                <div className="p-3 bg-slate-50 text-slate-500 rounded-xl border border-slate-100">
                  Race: <span className="text-slate-900 block font-semibold mt-0.5">{profile.race}</span>
                </div>
                <div className="p-3 bg-slate-50 text-slate-500 rounded-xl border border-slate-100">
                  Age Bracket: <span className="text-slate-900 block font-semibold mt-0.5">{profile.age}</span>
                </div>
                <div className="p-3 bg-slate-50 text-slate-500 rounded-xl border border-slate-100">
                  Gender: <span className="text-slate-900 block font-semibold mt-0.5">{profile.gender}</span>
                </div>
              </div>
            </div>
          </nav>
        </div>

        <div className="pt-4 border-t border-slate-100 text-[10px] text-slate-400 font-semibold tracking-wider uppercase">
          System: Environment Active
        </div>
      </aside>

      {/* WORKSPACE */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-8 md:p-12 lg:p-16 min-h-[calc(100vh-200px)] md:min-h-screen">
        <div className="w-full max-w-lg bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 sm:p-8 transition-all">
          {children}
        </div>
      </main>

    </div>
  );
}