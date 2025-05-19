# Backend API Documentation

## Overview

The backend is a [NestJS](https://nestjs.com/) application, organized into modules for teachers, students, classes, content levels, tasks, and PDF generation. It uses RESTful endpoints, with each module exposing a set of endpoints for CRUD operations and specialized actions.

---

## Table of Contents

- Teacher Endpoints
- Student Endpoints
- Class Endpoints
- Content Level Endpoints
- Task Endpoints
- PDF Endpoints
- App Endpoint

---

## Teacher Endpoints

Base path: `/teacher`

| Method | Endpoint              | Description                  | Request Body / Query | Response         |
|--------|----------------------|------------------------------|---------------------|------------------|
| GET    | `/teacher/getall`    | Get all teachers             | -                   | `Teacher[]`      |
| GET    | `/teacher/findone`   | Get a teacher by ID          | `?id=string`        | `Teacher \| null`|
| POST   | `/teacher`           | Create a new teacher         | `{ teacher: {...} }`| `Teacher[]`      |
| DELETE | `/teacher/:id`       | Delete a teacher by ID       | -                   | `void`           |

See: `TeacherController`, `TEACHER_ENDPOINTS`

---

## Student Endpoints

Base path: `/student`

| Method | Endpoint              | Description                  | Request Body / Query | Response         |
|--------|----------------------|------------------------------|---------------------|------------------|
| GET    | `/student/getall`    | Get all students             | -                   | `Student[]`      |
| GET    | `/student/findone`   | Get a student by ID          | `?id=string`        | `Student \| null`|
| POST   | `/student`           | Create a new student         | `{ student: {...} }`| `Student[]`      |
| DELETE | `/student/:id`       | Delete a student by ID       | -                   | `void`           |

See: `StudentController`, `STUDENT_ENDPOINTS`

---

## Class Endpoints

Base path: `/class`

| Method | Endpoint                | Description                                | Request Body / Query | Response         |
|--------|------------------------|--------------------------------------------|---------------------|------------------|
| GET    | `/class/getall`        | Get all classes                            | -                   | `Class[]`        |
| GET    | `/class/findone`       | Get a class by ID                          | `?id=string`        | `Class \| null`  |
| GET    | `/class/getclassinfo`  | Get class info with relations              | `?id=string`        | `Class \| null`  |
| POST   | `/class`               | Create a new class                         | `{ class: {...} }`  | `Class[]`        |
| DELETE | `/class/:id`           | Delete a class by ID                       | -                   | `void`           |
| POST   | `/class/advance/`      | Advance class to the next level            | `{ classId: string }`| `Class`         |

See: `ClassController`, `CLASS_ENDPOINTS`

---

## Content Level Endpoints

Base path: `/content-level`

| Method | Endpoint                  | Description                  | Request Body / Query | Response             |
|--------|--------------------------|------------------------------|---------------------|----------------------|
| GET    | `/content-level/getall`  | Get all content levels       | -                   | `ContentLevel[]`     |
| GET    | `/content-level/findone` | Get a content level by ID    | `?id=string`        | `ContentLevel \| null`|
| POST   | `/content-level`         | Create a new content level   | `{ ... }`           | `ContentLevel`       |
| DELETE | `/content-level/:id`     | Delete a content level by ID | -                   | `void`               |

See: `ContentLevelController`, `CONTENT_LEVEL_ENDPOINTS`

---

## Task Endpoints

Base path: `/task`

| Method | Endpoint      | Description           | Request Body / Query | Response |
|--------|--------------|-----------------------|---------------------|----------|
| ...    | ...          | ...                   | ...                 | ...      |

_Note: The specific task endpoints are not fully detailed in the provided code, but the base path is `/task`._

See: `TaskController`, `TASK_ENDPOINTS`

---

## PDF Endpoints

Base path: `/pdf`

| Method | Endpoint | Description         | Request Body / Query | Response |
|--------|----------|---------------------|---------------------|----------|
| POST   | `/pdf`   | Generate a PDF file | (Takes data)        | PDF file |

See: `PdfController`

---

## App Endpoint

| Method | Endpoint | Description         | Response      |
|--------|----------|---------------------|---------------|
| GET    | `/`      | Health check/root   | `"Hello World!"` |

See: `AppController`

---

## Notes

- All endpoints are prefixed by their respective base paths.
- The backend uses TypeORM for database operations.
- The PDF generation endpoint uses Puppeteer to render PDFs from frontend templates.
- For authentication (there is no auth), error handling, and validation, refer to the respective controller and service files.

---

## References

- AppController
- TeacherController
- StudentController
- ClassController
- ContentLevelController
- TaskController
- PdfController

---

For more details on request/response payloads and advanced usage, see the corresponding service and entity files in each module.