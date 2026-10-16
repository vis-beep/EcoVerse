# EcoVerse AI — GitHub + Vercel + Supabase (hackathon demo)

This is the updated version of your React/Vite EcoVerse project. It is designed to **share sustainability reports, work-order statuses and waste-bin updates across devices** using Supabase. Evidence photos are uploaded to a public demo Supabase Storage bucket.

**IMPORTANT:** This is an **open-edit demonstration**, not secure production software. Anyone who opens your public URL can use the role switcher and change all shared demo records. Do NOT use real students' names, private photos, or live campus data. Real access control requires Supabase Auth + role-based RLS. The modelled AI classification, sensors and forecasts remain simulations.

## A. Create the database (in Supabase)

1. Visit https://supabase.com/dashboard and create the free project **EcoVerse**.
2. Wait for the project to finish provisioning.
3. Open **SQL Editor → New query**.
4. Open the included file `supabase/01_demo_sync.sql`, copy **all** the SQL into the editor and click **Run**.
5. Confirm in **Table Editor** that these two tables exist:
   - `ecoverse_demo_reports`
   - `ecoverse_demo_bins`
6. Confirm in **Storage** that the `ecoverse-demo-evidence` public bucket exists.
7. Go to **Connect** or **Project Settings → API Keys** and collect your **Project URL** and **publishable key**. Do not share secrets, service-role keys, or database passwords.

**Do not run `backend/schema.sql` for this integration.** That is a separate, legacy 15-table SQL design; the current browser frontend does not use it. The FastAPI backend is optional and is not required for this Supabase demo.

## B. Update the existing GitHub repository

Your repository is `https://github.com/vis-beep/EcoVerse`. Do not create a second repository or Vercel project.

**Reliable method: GitHub Desktop**

1. Install GitHub Desktop (https://desktop.github.com/) and log in.
2. Select **File → Clone repository** and select `vis-beep/EcoVerse`.
3. Open its cloned local directory in File Explorer.
4. Extract this new ZIP and **copy its contents** (`src`, `public`, `backend`, `package.json`, `vercel.json`, `supabase`, etc.) into the cloned repository directory. Choose **Replace** when Windows asks to replace matching files.
5. If the cloned repository still has an old `package-lock.json`, remove it **before committing**, because the new project adds `@supabase/supabase-js` and needs a refreshed lockfile.
6. If Node.js is installed, open a terminal in the repository directory and run:
   ```bash
   npm install
   npm run build
   ```
   This generates a fresh `package-lock.json`. A fresh lockfile is recommended. If Node.js is not installed, you can still commit without one: `vercel.json` tells Vercel to run `npm install` during deployment.
7. In GitHub Desktop, enter a commit message such as `Add Supabase shared demo sync`, select **Commit to main**, then **Push origin**.

Do not upload `node_modules`, `dist`, `.env`, `.env.local`, or any secret key. These are excluded from the new ZIP and from `.gitignore`.

## C. Tell Vercel which Supabase project to use

1. Open your **existing EcoVerse project** in https://vercel.com/dashboard.
2. Go to **Settings → Environment Variables**.
3. Add these **two** variables to the **Production** environment:

   | Name | Value |
   | --- | --- |
   | `VITE_SUPABASE_URL` | Your Supabase Project URL, e.g. `https://abc.supabase.co` |
   | `VITE_SUPABASE_PUBLISHABLE_KEY` | Your project's `sb_publishable_...` key |

4. Save the environment variables.
5. Go to **Deployments** and ensure a **new deployment from GitHub** uses these variables. If your latest build was made before you saved the variables, click its options menu and **Redeploy**, then wait for **Ready**.
6. Open your **production domain** from **Domains**, not a protected preview URL.

Variables starting with `VITE_` are embedded in the public frontend bundle, so **only use the publishable key** (never `sb_secret_...`, a service-role key, or the database password).

## D. Verify cross-device synchronization

1. Open the production site on a laptop and on a phone (use Incognito if helpful).
2. On the laptop, enter as **Student**, create a new sustainability report using a sample evidence photo.
3. On the phone, enter as **Maintenance**, view **Work Orders** or **Reports**; it should appear without refreshing after a short delay.
4. Update the report to **In Progress** on the phone; the laptop should reflect the new status.
5. Change a smart bin's fullness on one device; check the change on the other.
6. Refresh both pages. Shared records should still be there.
7. Upload a **JPG, PNG, WebP or GIF, up to 5 MB**, and verify it is visible from both devices.

On the dashboard, **no yellow or red cloud-sync warning** means initial data loaded and the Realtime channel connected. A yellow banner stating *Local-only demo* means the Vercel environment variables were not included in that deployment. A red banner shows a Supabase connection, permissions, or database issue.

## Scope and known limitations

- Shared: sustainability reports, work-order statuses and histories (they share `reports`), assignments, waste-bin readings and collection changes, new image evidence URL files.
- Still per-device: session role choice, notifications/read state, dark mode, view filters and other UI preferences. Some charts, KPI simulations, environmental telemetry and AI/copilot rules are static demos.
- Concurrency: rapid edits from **one** client to the same record are serialized; **two devices editing the same record simultaneously still use last-write-wins**. This is not a conflict-free collaborative document editor.
- On the first cloud-enabled visit, the app initializes Supabase with the ZIP's built-in sample reports and bins. Existing browser `localStorage` reports are **not automatically migrated**. Save anything important before activating the cloud version.
- Public open-edit Row Level Security is deliberate **for this temporary demo**. It also means strangers with the URL can overwrite the sample records and upload public images. Disable/restrict it before publishing real data.
- This package is prepared and TypeScript-checked, but cannot be tested against your personal Supabase instance until you create it and complete Vercel configuration. You should verify Vercel's production build and two-device workflow before final submission.

### Troubleshooting

- **`relation public.ecoverse_demo_reports does not exist`** → run the correct SQL in Supabase.
- **`permission denied` / RLS error** → ensure the SQL completed without errors and you are using a publishable key from the same project.
- **No updates between devices** → check browser console, Supabase **Realtime** enabled for both tables, production URL and correct Vercel variables; redeploy after saving variables.
- **Photo upload error** → check the public Storage bucket and `storage.objects` insert policy; photo must be a supported image under 5 MB.
- **Vercel build failed** → ensure the updated `package.json` was committed and Vercel runs `npm install`, not a stale lockfile's `npm ci`.

---

Security upgrades for deployment beyond a judge demo: Supabase Auth, verified role membership, restrictive RLS for each operation, rate limiting, private evidence buckets with signed URLs, size/content validation, server-side business rules and conflict-aware updates.
