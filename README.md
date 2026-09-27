# Full-Stack Internship Submission — Monish

Three full-stack projects built as part of the internship tasks.

---

## 1. MERN Task Management Dashboard
A task manager with JWT authentication, CRUD tasks, status columns, priority levels, due dates, and filtering.

- **Tech:** MongoDB, Express, React (Vite), JWT
- **Repo:** _add your GitHub link here_
- **Setup:** see `task1-mern-dashboard/README.md`

## 2. Role-Based SaaS Billing Portal
A SaaS portal with role-based access control (Admin / Manager / User) and Stripe subscription billing (test mode), including billing history and an admin panel for managing users and plans.

- **Tech:** MongoDB, Express, React (Vite), JWT, Stripe
- **Repo:** _add your GitHub link here_
- **Setup:** see `task2-saas-billing/README.md`

## 3. Full-Stack Analytics App
A sales analytics dashboard with revenue trends, category breakdown, and regional breakdown, deployed live.

- **Tech:** MongoDB, Express, React (Vite), Recharts
- **Repo:** _add your GitHub link here_
- **Live URL:** _add your deployed link here_
- **Setup:** see `task3-analytics-app/README.md`

---

## How to run any project locally
```bash
cd <project-folder>/server
npm install
cp .env.example .env   # fill in MongoDB URI (+ Stripe keys for task 2)
npm run dev

# in a second terminal
cd <project-folder>/client
npm install
cp .env.example .env
npm run dev
```

## Submission checklist
- [ ] Task 1 pushed to GitHub, repo link added above
- [ ] Task 2 pushed to GitHub, repo link added above
- [ ] Task 3 pushed to GitHub + deployed, both links added above
- [ ] All three tested locally and working before submitting
