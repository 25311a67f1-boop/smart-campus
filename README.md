# Smart Campus Intelligence

## Real data backend

The dashboard is connected to a persistent local JSON datastore in `data/db.json`.
There is **no seeded student attendance, grades, assignments, events, or participation data**.
New accounts start with only an account-created activity.

### Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

### Staff roles

The app supports three roles: **student**, **faculty**, and **admin**. Public signup always creates students. In local development, the first Admin/Faculty accounts can be created at `/staff-setup`; once a staff account exists, that bootstrap endpoint is disabled. Admin/Faculty logins are routed to `/admin`, while student logins are routed to `/dashboard`.

### Authentication

- `POST /api/auth/signup`
- `POST /api/auth/login`
- `POST /api/auth/logout`
- `GET /api/auth/me`

Sessions use an HttpOnly cookie. Passwords are hashed with Node `scrypt`.

### Campus data APIs

Faculty/admin accounts can write records for students:

- `GET/POST /api/attendance`
- `GET/POST /api/performance`
- `GET/POST /api/assignments`
- `PATCH /api/assignments/:id`
- `GET/POST /api/participation`
- `GET/POST /api/events`
- `GET /api/users`
- `POST/DELETE /api/events/:id/register` (student registration)

Student GET endpoints only return that student's records.

### Important

The current datastore is intended for local development and testing. Before production deployment, replace `lib/db.ts` with a hosted database such as PostgreSQL/Supabase and add proper campus identity/role provisioning. Do not allow public users to self-select `admin` in production.
