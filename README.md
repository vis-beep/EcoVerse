<p align="center">
  <img src="docs/banner.svg" alt=" EcoVerse AI banner " width="100%">
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React">
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite">
  <img src="https://img.shields.io/badge/Tailwind-3-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind">
  <img src="https://img.shields.io/badge/Supabase-Realtime-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white" alt="Supabase">
</p>

---

## 🌍 What is EcoVerse AI?

Think of a college campus: a tap is leaking, lights are on in an empty room, a bin is overflowing. Someone reports it, but then **nobody knows if it was really fixed**.

**EcoVerse AI fixes that.** It is one app where a problem is reported, assigned, repaired, proven with a photo, and checked by an admin. A ticket **cannot be closed without proof**.

<p align="center">
  <img src="public/campus_aerial.jpg" alt="EcoVerse campus view" width="85%">
</p>

---

## 🔄 How It Works

<p align="center">
  <img src="docs/workflow.svg" alt="Issue workflow: Report, AI Triage, Fix, Proof, Verify" width="100%">
</p>

1. 📸 A **student** uploads a photo of the problem.
2. 🤖 The app **sorts it** into a category and sends it to the right department.
3. 🔧 A **technician** takes the job and fixes it.
4. ✅ The technician uploads a **photo as proof**.
5. 🏛️ An **admin** checks the photo and approves it. If it is not good enough, it goes back for rework.

---



## ✨ Main Features

| | Feature | In simple words |
|:-:|---|---|
| 📸 | **Photo reporting** | Upload a picture, and the app fills in the category and a confidence score |
| 🛠️ | **Work orders** | Technicians move a job through Acknowledge → Start → Finish |
| 🧾 | **Proof of repair** | A repair photo is required before an admin can approve |
| 🗺️ | **Digital Twin map** | A 2D campus map showing energy use, bins and problem areas |
| 💬 | **Copilot chat** | Ask about incidents, bins, energy or carbon and get quick answers |
| 📊 | **Admin dashboard** | See how work flows, then print or export a report |
| ☁️ | **Live sync** | Open it on two devices and updates show up on both |
| 🌗 | **Light & dark mode** | Works on laptop and phone |

### 🏆 6 Sustainability Tracks

| # | Track | Page |
|:-:|---|---|
| 1 | ♻️ Smart Waste Management | `/tracks/smart-waste-management` |
| 2 | 🏫 AI-Powered Sustainable Campus *(main one)* | `/tracks/sustainable-campus` |
| 3 | ⚡ Energy Monitoring & Optimisation | `/tracks/energy-optimization` |
| 4 | 🏢 Green Building Digital Twin | `/tracks/green-building` |
| 5 | 🌫️ Carbon Footprint Intelligence | `/tracks/carbon-intelligence` |
| 6 | 🔋 Smart Recycling Assistant | `/tracks/smart-recycling` |

---

## 🚀 Try It in 3 Steps

You need **Node.js 18 or newer**. No accounts or keys are required.

```bash
git clone https://github.com/vis-beep/EcoVerse.git
cd EcoVerse
npm install && npm run dev
```

Open **http://localhost:5173** in your browser. 🎉

### 🎬 Suggested walkthrough for judges

| Step | Log in as | Do this | You will see |
|:-:|---|---|---|
| 1 | 🎓 Student | **Report** → upload a photo → submit | Auto category + confidence, sent to a department |
| 2 | 🔧 Technician | **Order of Working** → Acknowledge → Start → Finish, add a repair photo | Ticket waits for admin check |
| 3 | 🏛️ Admin | **Work Inspection** → view the photo → Approve or Rework | Approved tickets become *Resolved* |
| 4 | Anyone | **Digital Mapping** | Campus map with live data layers |
| 5 | Anyone | Click the 💬 Copilot button | Answers using the app's data |

---

## 🧱 How It Is Built

<p align="center">
  <img src="docs/architecture.svg" alt="Architecture: React app, Supabase cloud, simulated layer" width="100%">
</p>

| Part | Technology |
|---|---|
| App | React 18, TypeScript, Vite |
| Look & feel | Tailwind CSS, Lucide icons |
| Charts | Recharts |
| Pages / routing | React Router |
| Cloud data (optional) | Supabase: PostgreSQL, Realtime, Storage |
| Hosting | Vercel |
| Extra API (optional) | Python FastAPI in `backend/` |

<details>
<summary><b>☁️ Optional: turn on cloud sync (click to open)</b></summary>

<br>

Without this step the app still works. Data is just saved in your own browser.

1. Create a free project at [supabase.com](https://supabase.com).
2. In **SQL Editor**, run everything in [`supabase/01_demo_sync.sql`](supabase/01_demo_sync.sql).
3. Copy the example env file and add your Project URL and **publishable** key:

   ```bash
   cp .env.example .env
   ```

   ```env
   VITE_SUPABASE_URL=https://YOUR-PROJECT.supabase.co
   VITE_SUPABASE_PUBLISHABLE_KEY=sb_publishable_YOUR_KEY
   ```

4. Restart `npm run dev`.

More detail: [`START_HERE_SUPABASE.md`](START_HERE_SUPABASE.md)

</details>

<details>
<summary><b>📂 Project folders (click to open)</b></summary>

```text
EcoVerse/
├── src/
│   ├── pages/        # Login, Home, Dashboard, Reports, Work Orders,
│   │                 # Digital Twin, Admin Reporting, About, Tracks 1-6
│   ├── components/   # Sidebar, TopBar, Copilot, modals, Footer
│   ├── context/      # App state, theme, Supabase sync
│   ├── data/         # Demo campus, departments, telemetry
│   ├── lib/          # Supabase client
│   └── types/        # TypeScript models
├── supabase/         # SQL for tables, realtime, photo storage
├── backend/          # Optional FastAPI reference service
├── public/           # Images
└── docs/             # README images
```

</details>

---

## 🔍 What Is Real and What Is Simulated?

We want to be fully open with judges.

| ✅ Real and working | 🔶 Simulated for the demo |
|---|---|
| Reports, work-order status, bin updates | Sensor values (kW, bin %, air quality) |
| Photo upload and storage | Carbon savings and forecasts |
| Role-based screens and approval flow | "AI vision": a demo classifier, no trained model yet |
| Live sync across devices (with Supabase) | Copilot: keyword rules, not an external LLM |
| | Login: demo personas, not real authentication |

The simulated parts are designed to be swapped for real IoT sensors, a vision model, an LLM and proper login later.

> ⚠️ **Demo note:** the shared database is open on purpose so judges can try it quickly. Please do not enter real personal data or private photos.

---

## 🛣️ What's Next

- 🧠 Train a real image-classification model
- 📡 Connect real sensors (smart meters, bin-level sensors)
- 🔐 Add secure login with verified roles
- 🤖 Connect the Copilot to an LLM
- 🔔 Send push notifications on status changes

---


<p align="center">Made with 💚 for greener campuses</p>
