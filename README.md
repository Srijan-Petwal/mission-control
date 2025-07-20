# 🚀 NASA Mission Control

NASA Mission Control is a full-stack web application focused on simulating space mission planning and control. Built with a **Node.js Express backend** and a **React frontend**, it allows users to schedule space launches to habitable exoplanets, view upcoming missions, and review past launches.

> 🔧 **Project is under development** – frontend redesign and full DB integration are ongoing.

---

### 🌐 Live Demo

<!-- Replace with actual GIF or hosted link -->
![Working Demo](images/demo.gif)

---

### 📸 UI Preview

![Frontend View](images/Launch.png)

---

## 📁 Project Structure

### 🔻 Backend (Express.js + MongoDB)

The backend is built with **Node.js**, **Express**, and now includes **MongoDB persistence using Mongoose**. RESTful APIs are used for managing planetary data and launch scheduling.

#### Key Backend Routes:

| Endpoint           | Method | Description                          |
|--------------------|--------|--------------------------------------|
| `/planets`         | GET    | Returns all habitable planets        |
| `/launches`        | GET    | Lists all scheduled launches         |
| `/launches`        | POST   | Schedule a new launch                |
| `/launches/:id`    | DELETE | Abort a launch by ID                 |

- Planetary data sourced from NASA’s [Kepler Exoplanet Archive](https://exoplanetarchive.ipac.caltech.edu/).
- All launch and planet data now persist in **MongoDB Atlas** via **Mongoose** ODM.

> ⚙️ **To connect to the database** after forking the project:
> 1. Create a `.env` file inside the `server/` folder.
> 2. Add the following line:
>    ```env
>    MONGO_URL="your-mongodb-connection-uri"
>    ```
> 3. If you need access to the MongoDB cluster or API keys, feel free to reach out to me via [LinkedIn](https://linkedin.com/in/srijan-petwal), [X (Twitter)](https://x.com/srijancs), or by raising an issue in the repo.

---

#### 📸 Insomnia API Testing

| Test Type        | Screenshot                                       |
|------------------|--------------------------------------------------|
| GET /planets     | ![GET Planets](images/Insomnia-get-planets.png) |
| POST /launches   | ![POST Launch](images/Insomnia-post-launch.png) |
| DELETE /launches | ![DELETE Launch](images/Insomnia-get-planets.png) |

---

#### 🚀 Performance Optimization with PM2

To simulate multi-core performance and handle load efficiently, the backend supports **PM2 Clustering**.

- PM2 forks multiple instances based on CPU cores.
- Helps simulate concurrent requests in a production-like setup.

📸 PM2 Cluster Mode in Action:

![PM2 Cluster](images/pm2_clustering.png)

> 🔧 **Note:** Current concurrency issues with in-memory state (`Map`) will be resolved as persistence is now being integrated.

---

### 🔺 Frontend (React)

The frontend is built using **React** and **react-router-dom** for routing between mission control views.

#### Frontend Routes:

| Path           | View Description                          |
|----------------|-------------------------------------------|
| `/launch`      | Schedule a new mission launch             |
| `/upcoming`    | View all scheduled and pending launches   |
| `/history`     | View history of successful and aborted launches |

> ⚠️ A complete **UI/UX redesign** is planned in the next phase.

---

## 🔍 Features

- Filter habitable planets based on real NASA scientific data.
- Schedule new space launches with validated input.
- View upcoming and historical launches.
- Abort missions pre-launch.
- Persistent backend storage using **MongoDB + Mongoose**.
- Performance optimization via **PM2 clustering**.
- API tested using **Insomnia**.

---

## 🛠️ Technologies Used

| Layer         | Tools & Libraries                                   |
|---------------|------------------------------------------------------|
| **Backend**   | Node.js, Express, Mongoose, MongoDB Atlas, PM2       |
| **Frontend**  | React, React Router DOM                              |
| **Testing**   | Insomnia (API Testing)                               |
| **Data**      | NASA Kepler Exoplanet Archive (CSV)                  |

---

## 🧠 Inspiration & Focus

Inspired by real-world space control systems and modern backend architecture. Emphasis is on **clean architecture**, **API design**, and **full-stack production-readiness**.

---

## 🚧 Work in Progress

- [x] Add MongoDB data persistence with Mongoose
- [ ] Add authentication and security
- [ ] Redesign frontend UI from scratch
- [ ] Add comprehensive tests (unit & integration)

---

## 🚀 Project Status

This project is currently **under development** with a focus on backend scalability and frontend revamp.

---
