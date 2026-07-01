# Skinstric Internship Project — Frontend Evaluation

A responsive web application built with **Next.js (App Router)** during my frontend evaluation/internship for Skinstric. This application implements a multi-step user flow featuring camera access, photo capture, image selection, and dynamic results visualization.

## 🚀 Live Demo
You can view the live deployment here:  
👉 [https://fes-skinstric-internship.vercel.app/](https://fes-skinstric-internship.vercel.app/)

---

## 🛠️ Tech Stack
* **Framework:** Next.js 14+ (App Router)
* **Language:** JavaScript (ES6+)
* **Styling:** Tailwind CSS / PostCSS
* **State Management:** React Context API (`ImageContext`)
* **Deployment:** Vercel

---

## 📂 Core Architecture & Features

The app is broken down into modular routes and shared global state:

### 📱 User Flow Routes (`src/app/`)
* **Landing Page (`/`)**: The entry point introducing the platform.
* **Camera Selection (`/camera`)**: Initial step for setting up or guiding the user to image input.
* **Photo Capture (`/camera/capture`)**: Directly interfaces with the device camera to snap a real-time photo.
* **Image Selection (`/select`)**: Allows users to pick or adjust their captured/uploaded images.
* **Analysis Result (`/result`)**: Displays visual feedback (e.g., scan lines, overlay indicators) simulating skin analysis.
* **Summary (`/summary`)**: A final breakdown or dashboard summarizing the assessment data.

### 🧠 Shared Logic & UI (`src/components/` & `src/context/`)
* **Global State (`ImageContext.js`)**: Seamlessly shares captured images and analytical steps between the camera, selection, and results pages without prop-drilling.
* **Modular Components**: Uses standalone components like `Navbar.js` and `DecorativeRings.js` to keep layouts dry and maintainable.
* **Analytics (`analytics.js`)**: Utility built in to track user progression and drop-offs through the multi-step assessment flow.

---

## 📦 Getting Started

To get a local copy up and running, follow these simple steps:

### Prerequisites
Make sure you have **Node.js** (v18.x or higher recommended) installed.

### Installation
1. Clone the repository:
   ```bash
   git clone [https://github.com/FranciscoAguero247/FES-Skinstric-Internship.git](https://github.com/FranciscoAguero247/FES-Skinstric-Internship.git)
2. Navigate into the project directory:
    ```bash
    cd FES-Skinstric-Internship
3. Install the dependencies:
    ```bash
    npm install
4. Run the development server:
    ```bash
    npm run dev
Open http://localhost:3000 with your browser to see the result.