> **Deploying with Supabase?** Start with [`START_HERE_SUPABASE.md`](START_HERE_SUPABASE.md). This current build supports temporary, publicly editable cross-device demo data.

# EcoVerse AI — Intelligent Sustainability Solutions
> **AI-Powered Sustainable Campus & Green Technology Platform**  
> *Developed for University Sustainability Exhibitions, Hackathons, and Innovation Competitions.*

---

## 🌿 1. Project Overview

**EcoVerse AI** is an enterprise-grade sustainability intelligence platform engineered to turn passive university campus environmental observations into accountable, measurable decarbonization action. 

The platform tackles campus resource wastage through six specialized tracks, unified by three core technologies:
1. **Computer Vision (Perception):** Detects fluid leaks, unmanaged lux levels in vacant rooms, contamination in compost streams, and classifies recyclable vs. hazardous materials.
2. **Digital Twins (Spatial Context):** 2D geospatial blueprints reflecting live simulated facility telemetry, sub-meter electrical loads (kW), ventilation airflow (CFM), and waste receptacle fill levels (0–100%).
3. **Generative AI (Action & Reasoning):** Automated department routing, what-if decarbonization modeling, and the global **EcoVerse Copilot** assistant providing contextual sustainability answers.

---

## 🏆 2. The Six Sustainability Tracks

| # | Track Name | Focus Resource | Primary Innovation | Route |
|---|---|---|---|---|
| **01** | **Smart Waste Management Digital Twin** | Solid & Organic Waste | Optical level sensing, 2D bin map, dynamic collection route dispatch. | `/tracks/smart-waste-management` |
| **02** | **AI-Powered Sustainable Campus (Flagship)** | Multi-Resource Incidents | Complete student-to-maintenance lifecycle, CV verification, auto-routing rules, and audit history. | `/tracks/sustainable-campus` |
| **03** | **Sustainable Energy Monitoring & Optimization** | Electrical Grid & HVAC | Sub-meter load curves, vacancy illumination vision audit, what-if efficiency simulator. | `/tracks/energy-optimization` |
| **04** | **Green Building Digital Twin** | Indoor Environmental Quality | 2D room floorplan, dynamic CFM airflow balancing based on headcount, thermal comfort. | `/tracks/green-building` |
| **05** | **Carbon Footprint Intelligence Platform** | Scope 1, 2, 3 GHG | ISO 14064 accounting, documented IPCC/EPA emission factors, net-zero pathway modeling. | `/tracks/carbon-intelligence` |
| **06** | **Smart Recycling Assistant** | Circular Materials & E-Waste | Optical classifier, step-by-step cleaning guides, upcycling tips, hazardous battery safety warnings. | `/tracks/smart-recycling` |

---

## 👥 3. Multi-Role Personas (Judge Evaluation Guide)

The platform features a **Demo Role Switcher** located in the top navigation bar. Evaluators can switch between personas with one click:

1. **Student / Faculty Reporter (`Aria Sharma`):**
   - Submit sustainability complaints with photo evidence.
   - View AI classification and confidence scores.
   - Track report status on a chronological timeline.
   - **Confirm Resolution:** Student verifies if the repair was successful or reopens the ticket.

2. **Maintenance & Facilities Team (`Marcus Vance` / `Tom Harris`):**
   - Inspect assigned work orders filtered to their department.
   - Acknowledge tickets and transition to `In Progress`.
   - Record operational repair notes.
   - Upload resolution evidence and request student/admin verification.

3. **Campus Sustainability Administrator (`Dr. Sophia Vance`):**
   - Access cross-campus executive analytics and SLA tracking.
   - Configure department routing rules matrix.
   - Reassign tickets and monitor recurring facility hotspots.

---

## 🚀 4. Step-by-Step Demonstration Walkthrough

To experience the flagship workflow during a live demo:

1. **Submit an Incident:**
   - Navigate to `/tracks/sustainable-campus` or click **"Report Issue"**.
   - Click one of the **Quick Demonstration Evidence** buttons (e.g., *"Water Leakage"*).
   - Click **"Submit Report & Run AI Routing"**.
   - Notice the unique tracking ID generated (e.g., `ECO-2026-8492`), Computer Vision confidence score (94%), and automated assignment to *Plumbing & Water Resources*.

2. **Simulate Maintenance Action:**
   - Switch role to **"Maintenance"** using the top pill.
   - Click **"Acknowledge Ticket"**, then **"Mark In Progress"**.
   - Add a technician comment: *"Replaced solenoid diaphragm assembly"*.

3. **Verify and Close:**
   - Switch back to **"Student"** role.
   - Click **"Confirm Fixed & Close Ticket"**.
   - Watch the status badge transition to `RESOLVED` and event history update.

4. **Test the Interactive 2D Digital Twin:**
   - Navigate to `/digital-twin`.
   - Toggle layers: *Issues*, *Smart Bins*, *Energy Heatmap*, *Solar Sensors*.
   - Click on **Science Tower** to inspect sub-meter kW draw and active sector tickets.

5. **Engage with EcoVerse Copilot:**
   - Click the glowing **"EcoVerse Copilot"** widget in the bottom-right corner.
   - Ask: *"What are the most common issues on campus?"* or *"What is the status of ECO-2026-0104?"*.

---

## 🛠️ 5. Technology Stack

### Frontend
- **Framework:** React 18 with TypeScript
- **Bundler:** Vite
- **Styling:** Vanilla Tailwind CSS with custom glassmorphism design system
- **Icons:** Lucide React
- **Visualizations:** Recharts (Area, Bar, Pie charts)
- **Routing:** React Router v6
- **State & Persistence:** React Context with `localStorage` state retention across refreshes

### Backend-Ready Architecture
- **API Framework:** Python FastAPI (`backend/main.py`)
- **Data Validation:** Pydantic models (`backend/models.py`)
- **Database Schema:** PostgreSQL 15+ DDL (`backend/schema.sql`) featuring 15 relational tables:
  - `users`, `roles`, `departments`, `campus_buildings`, `campus_locations`
  - `sustainability_reports`, `evidence_files`, `assignments`, `report_status_history`
  - `comments`, `notifications`, `sensor_readings`, `digital_twin_objects`
  - `ai_analysis_logs`, `sustainability_metrics`

---

## 💻 6. Running Locally

### Prerequisites
- Node.js LTS (v18+) and npm

### 1. Launch the Frontend Application
```bash
# Clone or open workspace
cd "ANTIGRAVIty"

# Start the Vite development server
npm run dev
```
Open your browser at `http://localhost:5173`.

### 2. (Optional) Run the FastAPI Backend
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```
Interactive API documentation will be available at `http://localhost:8000/api/docs`.

---

## 🔒 7. Academic Integrity & Data Transparency Disclosure

In accordance with competition guidelines:
- All telemetry readings (energy kW, bin fullness %, carbon savings) are **realistic simulated demonstration data**.
- Computer Vision classifications are generated by transparent demo inference algorithms matching campus facility training archetypes.
- No real-world cameras or physical sensors are falsely claimed to be live without actual hardware tethering.
