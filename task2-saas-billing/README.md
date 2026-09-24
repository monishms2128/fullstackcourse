# Role-Based SaaS Billing Portal

Full-stack SaaS portal with role-based access control (Admin / Manager / User) and Stripe subscription billing (test mode).

## Tech Stack
MongoDB, Express, React (Vite), JWT auth, Stripe

## Setup

### Backend
```bash
cd server
npm install
cp .env.example .env   # MONGO_URI, JWT_SECRET, STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET
npm run dev
```
Get free Stripe test keys at https://dashboard.stripe.com/test/apikeys (no real card needed).
Create products/prices in Stripe test mode and put the Price IDs in your `Plan` documents (seed manually via admin routes or MongoDB Compass).

For local webhook testing, use the Stripe CLI:
```bash
stripe listen --forward-to localhost:5000/api/billing/webhook
```

### Frontend
```bash
cd client
npm install
cp .env.example .env
npm run dev
```

## Roles
- **Admin**: first registered user automatically becomes Admin. Can manage users' roles and plans via `/admin`.
- **Manager / User**: regular access, can view and subscribe to plans at `/billing`.

## Test Payments
Use Stripe test card `4242 4242 4242 4242`, any future expiry, any CVC.

## API Endpoints
| Method | Route                          | Access        |
|--------|--------------------------------|---------------|
| POST   | /api/auth/register             | Public        |
| POST   | /api/auth/login                | Public        |
| GET    | /api/billing/plans             | Any logged-in |
| POST   | /api/billing/checkout          | Any logged-in |
| GET    | /api/billing/history           | Any logged-in |
| POST   | /api/billing/webhook           | Stripe only   |
| GET    | /api/admin/users               | Admin only    |
| PUT    | /api/admin/users/:id/role      | Admin only    |
| POST   | /api/admin/plans               | Admin only    |
