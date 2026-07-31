# Employee Management Dashboard

Simple MERN app with JWT auth and employee CRUD.

## Structure

```
employee-management-dashboard/
├── frontend/
│   └── src/
│       ├── components/
│       │     EmployeeForm.jsx
│       │     EmployeeTable.jsx
│       │     Navbar.jsx
│       ├── pages/
│       │     Login.jsx
│       │     Dashboard.jsx
│       ├── services/
│       │     api.js
│       ├── App.jsx
│       └── main.jsx
├── backend/
│   ├── models/
│   │     User.js
│   │     Employee.js
│   ├── routes/
│   │     authRoutes.js
│   │     employeeRoutes.js
│   ├── middleware/
│   │     auth.js
│   ├── server.js
│   └── .env
└── README.md
```

## Features

- Register / Login (JWT)
- Add, edit, delete employees
- Search by name
- Filter by department
- Phone max 11 digits
- Strong password rules

## Setup

### Backend

```bash
cd backend
npm install
# create .env from .env.example and set MONGO_URI
npm run dev
```

Runs on `http://localhost:5001`

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Open the URL shown in terminal (usually `http://localhost:5174`)

### Backend `.env`

```
PORT=5001
MONGO_URI=your_mongodb_atlas_or_local_connection_string
JWT_SECRET=yourSecretKey123
```

### Frontend `.env`

```
VITE_API_URL=http://localhost:5001/api
```

## API

| Method | Endpoint | Auth |
|--------|----------|------|
| POST | `/api/auth/register` | No |
| POST | `/api/auth/login` | No |
| GET | `/api/employees` | Yes |
| GET | `/api/employees?search=Ali` | Yes |
| GET | `/api/employees?department=IT` | Yes |
| POST | `/api/employees` | Yes |
| PUT | `/api/employees/:id` | Yes |
| DELETE | `/api/employees/:id` | Yes |
