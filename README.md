# School System Backend

## Overview
Backend for the School System, built with NestJS, MySQL (TypeORM), and local file storage. Supports JWT authentication, role-based access, document uploads, payments, assessments, and notifications.

## Setup
1. Install dependencies: `npm install`
2. Configure `.env` (see `.env` example)
3. Start MySQL: `docker-compose up -d`
4. Run the app: `npm run start:dev`
5. Access API at `http://localhost:3000`

## Endpoints
- **Auth**: `/api/auth/register`, `/api/auth/login`, `/api/auth/me`, `/api/auth/logout`
- **Admin**: `/api/admin/school`, `/api/admin/teacher`, `/api/admin/student`, `/api/admin/documents`, `/api/admin/documents/:id/visibility`
- **Teacher**: `/api/teacher/assessment`, `/api/teacher/assessment/:student_id`, `/api/teacher/documents`
- **Student**: `/api/student/profile`, `/api/student/documents`, `/api/student/assessments`
- **Documents**: `/api/documents/upload`, `/api/documents/student/:id`, `/api/documents/class/:id`
- **Payments**: `/api/payments/initiate`, `/api/payments/status/:reference`, `/api/payments/webhook`
- **Assessments**: `/api/assessments`, `/api/assessments/student/:id`, `/api/assessments/class/:id`

## Environment Variables
- `DATABASE_HOST`, `DATABASE_PORT`, `DATABASE_USER`, `DATABASE_PASSWORD`, `DATABASE_NAME`
- `JWT_SECRET`
- `PAYMENT_API_KEY`
- `EMAIL_SERVICE_USER`, `EMAIL_SERVICE_PASS`

## Security
- JWT authentication
- Role-based access
- Passwords hashed with bcrypt
- File type validation