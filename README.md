# StudyTube

StudyTube is a full-stack edtech platform where students can discover and enroll in courses, watch lectures, review and report content, track learning progress, and generate completion certificates. Teachers can create courses, upload lectures, manage course content, and update their profile. Admin users can inspect platform reports and manage users.

The project is split into two applications:

- `Education`: React + Vite frontend.
- `EducationServer`: Express + MongoDB backend API.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Frontend Architecture](#frontend-architecture)
- [Backend Architecture](#backend-architecture)
- [Core Workflows](#core-workflows)
- [Data Models](#data-models)
- [API Overview](#api-overview)
- [Environment Variables](#environment-variables)
- [Local Setup](#local-setup)
- [Available Scripts](#available-scripts)
- [Implementation Notes](#implementation-notes)

## Features

### Authentication and Roles

- Signup and login with role selection: `student`, `teacher`, or `admin`.
- JWT based authentication stored in a cookie named `token`.
- Protected backend route groups for student, teacher, and admin access.
- Forgot password and reset password flow using email delivery.
- Shared authenticated profile and password update flow for all roles.

### Student Experience

- Browse all available courses.
- View course details, teacher information, lectures, ratings, and reviews.
- Enroll in and abandon courses.
- Resume learning from enrolled courses.
- Watch lecture videos.
- Add reviews and comments.
- Report courses, videos, comments, reviews, or users.
- Track reports.
- Receive notifications when a teacher uploads a new lecture to an enrolled course.
- Generate course completion certificates.

### Teacher Experience

- Create new courses with title, description, language, level, category, syllabus, tags, and thumbnail.
- Upload lecture videos in common formats such as `mp4`, `mov`, `webm`, `mkv`, `avi`, `wmv`, `mpeg`, `3gp`, and `ogv`.
- Edit course details.
- Add and edit lecture metadata.
- View enrolled students per course.
- Update teacher profile details and profile picture.

### Admin Experience

- View users.
- View submitted reports.
- Review reported content.
- Create notifications.
- Manage user records.

## Tech Stack

### Frontend

- React 18: component based UI.
- Vite: fast development server and production bundling.
- React Router DOM: client side routing and protected route rendering.
- Zustand: global state stores for auth, students, teachers, learning, and themes.
- Axios: API client with `withCredentials` enabled for cookie based auth.
- Tailwind CSS: utility-first styling.
- DaisyUI: prebuilt Tailwind component classes and theme support.
- Lucide React: icon system used across buttons, navigation, and dashboards.
- React Hot Toast: success and error notifications.
- Plyr React: video playback support.

### Backend

- Node.js with Express: REST API server.
- MongoDB with Mongoose: database connection, schemas, and document relations.
- JWT: authentication token generation and verification.
- Cookie Parser: reading auth cookies from requests.
- CORS: controlled frontend-backend communication with credentials.
- Bcrypt/BcryptJS: password hashing and password comparison.
- Validator: email and strong password validation.
- Cloudinary: course thumbnails, profile pictures, lecture thumbnails, and video storage.
- Multer: multipart video upload handling before sending videos to Cloudinary.
- Nodemailer: password reset and notification email utilities.
- PDF Lib: certificate generation.
- Dotenv: environment variable loading.

## Project Structure

```text
StudyTube/
├── README.md
├── Education/                  # Frontend app
│   ├── public/                 # Static assets such as logo and hero images
│   ├── src/
│   │   ├── components/         # Shared UI components
│   │   │   ├── Main/           # Header, footer, menu, search
│   │   │   ├── HomeComponents/ # Home page sections
│   │   │   └── Skeletons/      # Loading skeleton components
│   │   ├── lib/                # Axios instance
│   │   ├── pages/              # Route level pages
│   │   │   ├── adminPages/     # Admin dashboard/report pages
│   │   │   └── teacherPages/   # Teacher course/video pages
│   │   ├── store/              # Zustand stores
│   │   ├── App.jsx             # Client routes and guards
│   │   ├── main.jsx            # React entry point
│   │   └── index.css           # Tailwind/global styles
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
│
└── EducationServer/            # Backend API
    ├── public/
    │   ├── pdfTemplate.pdf     # Certificate template
    │   └── uploads/            # Temporary video upload directory
    ├── src/
    │   ├── controllers/        # Route handlers and business logic
    │   ├── lib/                # DB, Cloudinary, mail, report helpers
    │   ├── middleware/         # Auth and role authorization middleware
    │   ├── models/             # Mongoose schemas
    │   ├── routes/             # Express routers
    │   └── index.js            # Server entry point
    ├── package.json
    └── package-lock.json
```

## Frontend Architecture

### Routing

`Education/src/App.jsx` defines the application routes and guards pages by checking `user.role` from the auth store.

Important frontend routes include:

- `/`: home page.
- `/login`, `/signup`: auth pages.
- `/forgot-password`, `/reset-password/:token`: password recovery.
- `/courses`: student course listing.
- `/courses/:courseId`: student course details.
- `/course/video/:id`: lecture streaming page.
- `/course/resume/:courseId`: resume learning page.
- `/my-courses`: student enrolled courses.
- `/notifications`: student notifications.
- `/profile`: shared profile page for all authenticated roles.
- `/settings`: password, theme, and report tracking settings.
- `/create-course`: teacher course creation page.
- `/:courseId/addVideo`: teacher lecture upload page.
- `/myCourses`: teacher course list.
- `/teacher/course/:courseId`: teacher course detail page.
- `/teacher/course/edit/:courseId`: teacher course edit page.
- `/editVideo/:videoId`: teacher video edit page.

### State Management

Zustand stores live in `Education/src/store`.

- `useAuthStore`: logged-in user, auth verification, login, signup, logout.
- `useUserStore`: student course APIs, reviews, reports, notifications, profile update, password update.
- `useTeacherStore`: teacher courses, course creation/editing, video upload/editing.
- `useLearnStore`: selected course/video state for learning pages.
- `useThemeStore`: DaisyUI theme selection.

### API Client

`Education/src/lib/axios.js` creates one Axios instance:

```js
baseURL: import.meta.env.VITE_API_URL || "/api"
withCredentials: true
timeout: 10000
```

Because `withCredentials` is enabled, the frontend sends the auth cookie with API requests.

### Styling

The UI uses Tailwind CSS with DaisyUI. DaisyUI themes are configured in `tailwind.config.js`, and the active theme is applied on the root app wrapper through `data-theme={theme}`.

## Backend Architecture

### Server Entry

`EducationServer/src/index.js` configures:

- Express app.
- CORS with allowed local origins and optional `CLIENT_URL`.
- JSON and URL-encoded body limits.
- Cookie parsing.
- Route mounting.
- MongoDB connection on server start.

Route groups:

- `/auth`: public auth plus shared authenticated profile/password routes.
- `/about`: public platform stats.
- `/user`: student-only routes.
- `/teacher`: teacher-only routes.
- `/admin`: admin-only routes.

### Authentication Middleware

`EducationServer/src/middleware/auth.middleware.js` contains:

- `checkAuth`: verifies JWT from `req.cookies.token`, loads the user, and attaches it as `req.user`.
- `checkStudentAuth`: allows only users with role `student`.
- `checkTeacherAuth`: allows only users with role `teacher`.
- `checkAdminAuth`: allows only users with role `admin`.

### Cloudinary Integration

`EducationServer/src/lib/cloud.js` supports two Cloudinary configuration styles:

- Preferred: `CLOUDINARY_URL=cloudinary://<api_key>:<api_secret>@<cloud_name>`
- Fallback: `CLOUD_NAME`, `CLOUD_API_KEY`, `CLOUD_API_SECRET`

The backend uploads:

- Course thumbnails.
- Lecture thumbnails.
- Profile pictures.
- Lecture videos.

### Video Upload Pipeline

Teacher video upload is split into two API steps:

1. `POST /teacher/uploadVideoFile`
   - Receives a multipart video file from the frontend.
   - Uses Multer to store the file temporarily under `EducationServer/public/uploads`.
   - Allows common video formats.
   - Uploads the file to Cloudinary using `resource_type: "video"`.
   - Returns the Cloudinary URL and video duration.
   - Deletes the temporary local file.

2. `POST /teacher/uploadVideo`
   - Receives lecture metadata, Cloudinary video URL, duration, thumbnail, and course ID.
   - Uploads lecture thumbnail to Cloudinary.
   - Creates the `Video` document.
   - Pushes the video ID into the course `lectures` array.
   - Creates notifications for all enrolled students.

## Core Workflows

### Signup/Login

1. User submits credentials and role from the frontend.
2. Backend validates email, strong password, and role.
3. Password is hashed with bcrypt.
4. JWT is generated and stored in the `token` cookie.
5. Frontend stores the returned user in `useAuthStore`.

### Course Creation

1. Teacher fills the create course form.
2. Frontend sends course data to `POST /teacher/createCourse`.
3. Backend validates required fields.
4. Syllabus text is normalized into an array.
5. Course thumbnail is uploaded to Cloudinary.
6. Course is saved with the authenticated teacher ID.
7. Frontend updates teacher course state and selected course state.

### Student Enrollment

1. Student opens a course and clicks enroll.
2. Backend creates an `Enrollment` document.
3. Course `enrolledStudents` is updated.
4. Student can access the course through `My Courses` and resume learning.

### Lecture Upload and Student Notification

1. Teacher selects a video file on the add video page.
2. Frontend uploads the raw file to `/teacher/uploadVideoFile`.
3. Backend uploads the video to Cloudinary and returns URL/duration.
4. Teacher submits title, description, thumbnail, and metadata.
5. Backend creates the lecture and connects it to the course.
6. Backend creates one notification per enrolled student.
7. Student sees an unread count in the header and can open `/notifications`.

### Profile Update

1. Any authenticated user can open `/profile`.
2. User edits name and/or profile picture.
3. Frontend sends the update to `/auth/update-profile`.
4. Backend uploads a changed profile picture to Cloudinary.
5. Frontend updates the current auth user immediately.

### Reports

1. Student reports content with a type, reason, and details.
2. Backend stores a `Report` document using dynamic references.
3. Admin can inspect and review reports.
4. Report utility functions can notify content owners and reporters.

### Certificates

1. Student completes course requirements.
2. Backend uses `pdf-lib` and `public/pdfTemplate.pdf`.
3. A certificate PDF is generated and associated with the enrollment.

## Data Models

### User

Stores account identity and role.

Important fields:

- `name`
- `email`
- `password`
- `profilePic`
- `interests`
- `role`
- `resetPassToken`

### Course

Stores teacher-created course metadata.

Important fields:

- `title`
- `thumbnail`
- `description`
- `language`
- `category`
- `syllabus`
- `level`
- `lectures`
- `rating`
- `enrolledStudents`
- `teacherId`

### Video

Stores lecture metadata.

Important fields:

- `title`
- `url`
- `thumbnail`
- `duration`
- `description`
- `courseId`

### Enrollment

Connects students to courses.

Important fields:

- `courseId`
- `studentId`
- `completed`
- `completedAt`
- `certificateUrl`
- `progress`

### Notification

Stores user notifications.

Important fields:

- `userId`
- `message`
- `reference`
- `read`

### Report

Stores reports against courses, videos, comments, reviews, or users.

Important fields:

- `type`
- `entityReported`
- `reporterId`
- `reasonToReport`
- `details`
- `resolved`

## API Overview

### Auth Routes

Base path: `/auth`

- `POST /signup`: create a user.
- `POST /login`: login and set auth cookie.
- `POST /forget-password`: send reset password email.
- `POST /reset-password/:token`: reset password.
- `GET /verify`: verify current auth cookie.
- `POST /update-profile`: update profile for any authenticated role.
- `POST /update-pass`: update password for any authenticated role.
- `POST /logout`: clear auth cookie.

### Student/User Routes

Base path: `/user`

All `/user` routes require authentication and student role.

- `GET /video/:videoId`: get lecture details.
- `GET /course/:courseId`: get course details.
- `GET /specificEnrollment/:courseId`: get enrollment data.
- `GET /similarVideos/:videoId`: get related lectures.
- `GET /getComments/:videoId`: get video comments.
- `GET /getReviews/:courseId`: get course reviews.
- `POST /enroll/:courseId`: enroll in a course.
- `POST /abandon/:courseId`: abandon a course.
- `GET /myCourses`: get enrolled courses.
- `GET /allCourses`: get all courses.
- `POST /add-comment`: add a lecture comment.
- `POST /add-review`: add a course review.
- `POST /report-content`: submit a report.
- `GET /myReports`: get reports submitted by the student.
- `GET /report/:reportId`: get report details.
- `GET /notifications`: get student notifications.
- `PUT /notifications/mark-as-read`: mark one notification as read.
- `PUT /notifications/mark-all-as-read`: mark all notifications as read.
- `POST /generate-certificate`: generate a completion certificate.

### Teacher Routes

Base path: `/teacher`

All `/teacher` routes require authentication and teacher role.

- `POST /createCourse`: create a course.
- `POST /uploadVideoFile`: upload a raw lecture video file.
- `POST /uploadVideo`: save lecture metadata after file upload.
- `GET /getMyCourses`: get courses owned by the teacher.
- `PATCH /updateCourse/:courseId`: edit a course.
- `PATCH /updateVideo/:videoId`: edit video metadata.
- `GET /course/:courseId`: get teacher course detail.
- `GET /getVideo/:videoId`: get teacher video detail.

### Admin Routes

Base path: `/admin`

All `/admin` routes require authentication and admin role.

- `GET /allUsers`: list users.
- `GET /:userId`: get user by ID.
- `POST /createNotification`: create a notification.
- `DELETE /removeUser`: remove a user.
- `GET /reports`: list reports.
- `GET /specificReport`: get reported content.
- `POST /reviewReport`: review a report.

## Environment Variables

Create `EducationServer/.env`:

```env
PORT=8000
CLIENT_URL=http://localhost:5173
DB_KEY=<mongodb_connection_string>
JWT_KEY=<jwt_secret>

EMAIL_USER=<gmail_or_smtp_user>
EMAIL_PASS=<gmail_app_password_or_smtp_password>

CLOUDINARY_URL=cloudinary://<api_key>:<api_secret>@<cloud_name>
```

Cloudinary fallback variables are also supported:

```env
CLOUD_NAME=<cloud_name>
CLOUD_API_KEY=<api_key>
CLOUD_API_SECRET=<api_secret>
```

Create `Education/.env` if the frontend should call the backend directly:

```env
VITE_API_URL=http://localhost:8000
```

If `VITE_API_URL` is not provided, the frontend falls back to `/api`, which is useful when deploying behind a reverse proxy.

## Local Setup

### Prerequisites

- Node.js
- npm
- MongoDB Atlas or a local MongoDB instance
- Cloudinary account
- Gmail app password or SMTP credentials for email features

### Install Dependencies

```bash
cd Education
npm install

cd ../EducationServer
npm install
```

### Run Backend

```bash
cd EducationServer
npm run dev
```

Backend default URL:

```text
http://localhost:8000
```

Health check:

```text
GET /ping
```

### Run Frontend

```bash
cd Education
npm run dev
```

Frontend default Vite URL:

```text
http://localhost:5173
```

## Available Scripts

### Frontend

Inside `Education`:

```bash
npm run dev      # Start Vite dev server
npm run build    # Build production frontend
npm run lint     # Run ESLint
npm run preview  # Preview production build
```

### Backend

Inside `EducationServer`:

```bash
npm run dev      # Start backend with nodemon
npm start        # Start backend with node
```

## Implementation Notes

- Authentication is cookie based. The Axios client uses `withCredentials: true`, and backend CORS enables credentials.
- Backend role protection is applied at route group level in `src/index.js`.
- Course and profile images are sent as base64 data URLs from the frontend and uploaded to Cloudinary by the backend.
- Teacher lecture videos are uploaded through multipart form data to the backend, then uploaded to Cloudinary from the server.
- Course syllabus is stored as an array in MongoDB. Textarea input is normalized on the backend.
- Notifications are created when a teacher uploads a lecture for a course that has enrolled students.
- Student notification links navigate back to the related course.
- Temporary uploaded video files are stored under `EducationServer/public/uploads` and removed after Cloudinary upload.
- Theme selection is handled on the frontend through DaisyUI themes and Zustand.
- Reports use dynamic references through Mongoose `refPath`, allowing one report model to handle multiple content types.
- Certificates use `pdf-lib` and the template file in `EducationServer/public/pdfTemplate.pdf`.

## Suggested Git Commit Message

```text
docs: add complete project README
```
