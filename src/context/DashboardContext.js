"use client";

import { createContext, useContext, useState, useEffect } from "react";

const DashboardContext = createContext();

export function DashboardProvider({ children }) {
  const [profile, setProfile] = useState({
    name: "Not Provided",
    location: "Not Provided",
    race: "-",
    age: "-",
    gender: "-",
  });

  // Automatically hydrate initial data from local storage safely on client mount
  useEffect(() => {
    const savedUser = localStorage.getItem("skinstric_user");
    if (savedUser) {
      try {
        const parsed = JSON.parse(savedUser);
        setProfile((prev) => ({
          ...prev,
          name: parsed.name || "Not Provided",
          location: parsed.location || "Not Provided",
        }));
      } catch (e) {
        console.error("Failed to parse saved user credentials", e);
      }
    }
  }, []);

  const updateProfile = (fields) => {
    setProfile((prev) => ({ ...prev, ...fields }));
  };

  return (
    <DashboardContext.Provider value={{ profile, updateProfile }}>
      {children}
    </DashboardContext.Provider>
  );
}

export const useDashboard = () => useContext(DashboardContext);