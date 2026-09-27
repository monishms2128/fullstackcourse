# Full-Stack Analytics App

Sales analytics dashboard with revenue trends, category breakdown, and regional breakdown — built to be deployed live.

## Tech Stack
MongoDB, Express, React (Vite), Recharts

## Setup

### Backend
```bash
cd server
npm install
cp .env.example .env   # set MONGO_URI
npm run seed            # populates sample sales data
npm run dev
```

### Frontend
```bash
cd client
npm install
cp .env.example .env
npm run dev
```

## Deploying (free tiers)

**Backend → Render or Railway**
1. Push this repo to GitHub.
2. On Render: New → Web Service → connect repo → root directory `server` → build command `npm install` → start command `npm start`.
3. Add env vars (`MONGO_URI`) in the dashboard.
4. After deploy, run the seed script once (Render Shell tab: `npm run seed`) or run it locally against the same MONGO_URI.

**Frontend → Vercel**
1. Import the same repo on vercel.com → set root directory to `client`.
2. Add env var `VITE_API_URL` = your deployed backend URL + `/api`.
3. Deploy. Vercel gives you the live link.

## API Endpoints
| Route                              | Description                    |
|-------------------------------------|--------------------------------|
| GET /api/analytics/summary          | Total revenue, units, records  |
| GET /api/analytics/revenue-over-time| Daily revenue series           |
| GET /api/analytics/by-category      | Revenue grouped by category    |
| GET /api/analytics/by-region        | Revenue grouped by region      |

All accept optional `?from=&to=&category=` query filters.
