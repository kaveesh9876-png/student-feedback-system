# 🎓 Student Feedback System

> Full-stack academic feedback platform with role-based access control and analytics dashboard

![Angular](https://img.shields.io/badge/Angular-19-red)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.0-green)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-blue)
![JWT](https://img.shields.io/badge/JWT-Auth-orange)

## 📸 Screenshots

![Landing Page](preview.webp)
![Student Login](preview__1_.webp)
![Admin Login](preview__2_.webp)
![Feedback Form](preview__3_.webp)
![Student Profile](preview__4_.webp)
![Admin Panel](Screenshot_2026-06-04_174139.png)

## ✨ Features
- Role-based access control: Student / Faculty / Admin
- JWT Authentication & Authorization
- Real-time feedback analytics dashboard
- PostgreSQL with 6 normalized tables
- REST API with under 200ms response time with 100 concurrent users
- Secure password handling and session management

## 🛠️ Tech Stack
| Frontend | Backend | Database |
|----------|---------|----------|
| Angular 19 | Spring Boot | PostgreSQL |
| Bootstrap 5 | REST APIs | pgAdmin4 |
| RxJS | JWT Auth | SQL |
| TypeScript | Microservices | |

## 📁 Project Structure
```
src/
├── app/
│   ├── components/
│   │   ├── admin-dashboard/
│   │   ├── feedback-form/
│   │   └── login/
│   ├── guards/
│   ├── profile/
│   ├── signup/
│   └── app-routing-module.ts
└── index.html
```

## 🚀 Run Locally

### Frontend
```bash
npm install
ng serve
```

### Backend
```bash
mvn spring-boot:run
```

Open browser at `http://localhost:4200`

## 👨‍💻 Developer
**Kaveesh Dhiman**
- 🏢 Ex-Intern @ National Informatics Centre (NIC), Government of India
- 🎓 B.Tech CSE — Dronacharya College of Engineering
- 📧 kaveesh9876@gmail.com
