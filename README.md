# 🚀 NASA Mission Control

NASA Mission Control is a full-stack web application focused on simulating space mission planning and control. Built with a **Node.js Express backend** and a **React frontend**, it allows users to schedule space launches to habitable exoplanets, view upcoming missions, and review past launches.

> 🔧 **Project is under development** – security, data persistence, and a frontend redesign are in progress.

---

## 🌐 Live Demo

<!-- Replace with actual GIF or hosted link -->
![Working Demo](images/demo.gif)

---

## 📁 Project Structure

### 🔻 Backend (Express.js)

The backend is built with **Node.js** and **Express**, focusing on RESTful APIs for managing planetary data and launch scheduling.

#### Key Backend Routes:

| Endpoint           | Method | Description                          |
|--------------------|--------|--------------------------------------|
| `/planets`         | GET    | Returns all habitable planets        |
| `/launches`        | GET    | Lists all scheduled launches         |
| `/launches`        | POST   | Schedule a new launch                |
| `/launches/:id`    | DELETE | Abort a launch by ID                 |

- Uses `kepler_data.csv` from NASA’s [Kepler Exoplanet Archive](https://exoplanetarchive.ipac.caltech.edu/) to filter **habitable planets**.

- Backend tested using **Insomnia**:
  - ✅ `GET` for planets and launches
  - ✅ `POST` to schedule new launches
  - ✅ `DELETE` to abort launches

#### 📸 Insomnia API Testing

| Test Type | Screenshot |
|----------|------------|
| GET /planets | ![GET Planets](images/Insomnia-get-planets.png) |
| POST /launches | ![POST Launch](images/Insomnia-post-launch.png) |
| Get /planets/ | ![DELETE Launch](images/Insomnia-get-planets.png) |

---

### 🔺 Frontend (React)

The frontend is built with **React** and **react-router-dom** for navigation between mission control views.

#### Frontend Routes:

| Path           | View Description                          |
|----------------|-------------------------------------------|
| `/launch`      | Schedule a new mission launch             |
| `/upcoming`    | View all scheduled and pending launches   |
| `/history`     | View history of successful and aborted launches |

> ⚠️ Note: The current frontend is temporary and inspired by other projects. A complete redesign is planned.

#### 📸 UI Preview

![Frontend View](images/Launch.png)

---

## 🔍 Features

- Filter habitable planets based on scientific data from NASA.
- Schedule new space launches to those planets.
- View upcoming and historical launches.
- Abort missions before launch if needed.
- API tested and developed using **Insomnia**.

---

## 🛠️ Technologies Used

| Stack      | Tools & Libraries                     |
|------------|----------------------------------------|
| **Backend** | Node.js, Express, CSV Parser          |
| **Frontend** | React, React Router DOM               |
| **Testing** | Insomnia (API Testing)                |
| **Data**    | NASA Kepler Exoplanet Archive (CSV)   |

---

## 🚧 Work in Progress

- [ ] Implement database for **data persistence**
- [ ] Add authentication and **security features**
- [ ] Redesign frontend UI/UX from scratch
- [ ] Add unit and integration tests

---

## 🧠 Inspiration & Focus

This project is inspired by existing projects, real-world space mission control systems and is mainly focused on backend-focused engineering practices.

---

## This project is currently under development.

---


