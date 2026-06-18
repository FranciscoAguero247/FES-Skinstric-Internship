"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Phase1Page() {
  const router = useRouter();

  // 1. Core Component States
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  // 2. Read existing saved state if user returns or refreshes
  useEffect(() => {
    const savedInfo = localStorage.getItem("skinstric_user");
    if (savedInfo) {
      try {
        const { name: savedName, location: savedLocation } = JSON.parse(savedInfo);
        setName(savedName || "");
        setLocation(savedLocation || "");
        
        // Match sidebar DOM elements dynamically if mounted
        updateSidebarDOM(savedName, savedLocation);
      } catch (e) {
        console.error("Error reading localStorage key token", e);
      }
    }
  }, []);

  // Sync state values helper straight to the layout sidebar
  const updateSidebarDOM = (n, l) => {
    const sbName = document.getElementById("sb-name");
    const sbLoc = document.getElementById("sb-location");
    if (sbName) sbName.innerText = n || "Not Provided";
    if (sbLoc) sbLoc.innerText = l || "Not Provided";
  };

  // 3. Strict String Validation Logic (No numbers, no special symbols/broken inputs)
  const validateStringFields = (val) => {
    const stringRegex = /^[A-Za-z\s\-',.]{2,50}$/;
    return stringRegex.test(val.trim());
  };

  // 4. Form Submit & API Connection Pipeline
  const handleProceed = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");

    // Step Validation
    if (!validateStringFields(name)) {
      setError("Please enter a valid name string (letters only, minimum 2 characters).");
      return;
    }
    if (!validateStringFields(location)) {
      setError("Please enter a valid location profile string (letters only).");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("https://us-central1-frontend-simplified.cloudfunctions.net/skinstricPhaseOne", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: name.trim(), location: location.trim() }),
      });

      const data = await response.json();

      if (response.ok || data.SUCCUSS) {
        setSuccessMsg(data.SUCCUSS || "Customer profile synchronized successfully!");
        
        // Store strings into local storage for Phase 2/3 persistence
        localStorage.setItem("skinstric_user", JSON.stringify({ name: name.trim(), location: location.trim() }));
        updateSidebarDOM(name.trim(), location.trim());

        // Smooth transition push to Phase 2 dashboard route context
        setTimeout(() => {
          router.push("/phase-2");
        }, 1200);
      } else {
        throw new Error("Failed validation transaction from backend endpoint.");
      }
    } catch (err) {
      setError("Connection to processing API failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md">
          Phase 1 of 3
        </span>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 mt-3">
          Initial Customer Registration
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Complete the field structures below to map the diagnostic telemetry profile.
        </p>
      </div>

      <form onSubmit={handleProceed} className="space-y-4 pt-2">
        {/* Input Name field */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-700">
            Customer Full Name
          </label>
          <input
            type="text"
            placeholder="e.g. John Doe"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              updateSidebarDOM(e.target.value, location);
            }}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-black focus:bg-white transition-all text-slate-900 placeholder:text-slate-400"
            required
          />
        </div>

        {/* Input Location field */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-700">
            Current Location
          </label>
          <input
            type="text"
            placeholder="e.g. New York"
            value={location}
            onChange={(e) => {
              setLocation(e.target.value);
              updateSidebarDOM(name, e.target.value);
            }}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-black focus:bg-white transition-all text-slate-900 placeholder:text-slate-400"
            required
          />
        </div>

        {/* System Messages Alerts */}
        {error && (
          <div className="p-3 bg-rose-50 border border-rose-100 rounded-xl text-xs font-medium text-rose-600">
            {error}
          </div>
        )}

        {successMsg && (
          <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-xl text-xs font-medium text-emerald-600">
            {successMsg}
          </div>
        )}

        {/* Navigation Action Buttons footer */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-6">
          <button
            type="button"
            disabled
            className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-slate-100 text-slate-400 cursor-not-allowed transition-all"
          >
            Back
          </button>
          
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2.5 rounded-xl text-xs font-semibold bg-black text-white hover:bg-slate-800 transition-all shadow-sm active:scale-95 disabled:opacity-50"
          >
            {loading ? "Processing..." : "Proceed"}
          </button>
        </div>
      </form>
    </div>
  );
}