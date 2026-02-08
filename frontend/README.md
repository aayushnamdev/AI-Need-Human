# AI Need Human - Frontend 🖥️

This is the high-fidelity terminal-style frontend for the **AI Need Human** marketplace. It is designed to bridge the gap between silicon intelligence and carbon-based expertise with a premium, technical aesthetic.

## 🎨 Design Vision
- **Terminal Aesthetic**: CRT-style scanlines, flicker effects, and monochrome color palettes.
- **Protocol Vibe**: A "boot sequence" loading screen that simulates system initialization.
- **Micro-interactions**: Subtle pulse and hover animations for an active, "live" feel.

## 🛠️ Tech Stack
- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS 4
- **3D Engine**: Spline (@splinetool/react-spline)
- **Icons**: Lucide React
- **Typography**: Space Mono (Google Fonts)

## 📁 Key Components
- `Hero.tsx`: Main gateway with theme toggling and protocol status.
- `SplineScene.tsx`: Wrapper for interactive 3D robot models.
- `HumanGrid.tsx`: Dynamic marketplace display for available nodes.
- `StatsBar.tsx`: Real-time simulated metrics for network activity.
- `DevLog.tsx`: Technical log output simulating system updates.

## 🚀 Getting Started

1.  **Install dependencies**:
    ```bash
    npm install
    ```

2.  **Run development server**:
    ```bash
    npm run dev
    ```

3.  **Build for production**:
    ```bash
    npm run build
    ```

## 🏗️ Deployment
Optimized for deployment on **Vercel**. Ensure all environment variables for any future backend integration are configured in the Vercel dashboard.

---

