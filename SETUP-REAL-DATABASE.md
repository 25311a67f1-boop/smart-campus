# Smart Campus — Real Database + Student Profiles + Faculty/Admin Console

This version bundles the backend, student profile, and faculty/admin data-entry workflow together so you only need to download/install once.

## 1. Install

```bash
npm install
```

## 2. Connect PostgreSQL

Copy `.env.example` to `.env.local` and set:

```env
DATABASE_URL=YOUR_POSTGRES_CONNECTION_STRING
DATABASE_SSL=true
```

Supabase/Neon/Postgres connection strings are supported. The application automatically creates its tables on first server request.

> Until `DATABASE_URL` is configured, the app uses `data/db.json` only as a local development fallback. For the real deployed system, configure PostgreSQL.

## 3. Run

```bash
npm run dev
```

Open http://localhost:3000

## 4. Workflow

1. Student signs up with the real academic profile.
2. Faculty/Admin opens `/admin`.
3. Faculty/Admin enters attendance, performance, assignments, participation, and events.
4. Student dashboard calculates metrics from those records.
5. Student can edit their profile at `/profile`.

## 5. Roles

- Public signup creates **student** accounts only.
- Faculty/Admin can access the Faculty/Admin Console.
- Only Admin can create additional staff accounts through the API.

No demo academic records are seeded.
