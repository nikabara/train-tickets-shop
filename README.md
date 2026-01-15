# 🚂 RailwayTickets - Frontend User Panel

This is the public-facing frontend application for the **Railway Ticket System**. It allows travellers to search for train routes, view real-time availability, select seats, manage their bookings and check railway news.

## 📖 Table of Contents

* [Overview](https://www.google.com/search?q=%23-overview)
* [Key Features](https://www.google.com/search?q=%23-key-features)
* [Architecture](https://www.google.com/search?q=%23-architecture)
* [Getting Started](https://www.google.com/search?q=%23-getting-started)
* [API Integration](https://www.google.com/search?q=%23-api-integration)
* [Project Structure](https://www.google.com/search?q=%23-project-structure)

---

## 🚀 Overview

The **RailwayTicketsUser** application is a high-performance Single Page Application (SPA) built with **Angular 19**. It is designed to provide a seamless booking experience with a focus on speed, responsiveness, and intuitive UI.

### Technical Stack

* **Framework:** Angular 19 (using Standalone Components & Signals)
* **Language:** TypeScript
* **Styling:** Tailwind CSS / SCSS
* **State Management:** Angular Signals & RxJS
* **Authentication:** JWT (JSON Web Tokens)

---

## ✨ Key Features

* **Smart Search:** Filter trains by origin, destination, and date.
* **Interactive Seat Map:** Visual seat selection with real-time occupancy updates.
* **User Profiles:** Dedicated dashboard for users to view booking history and e-tickets.
* **Responsive Design:** Fully optimized for mobile, tablet, and desktop views.
* **Secure Checkout:** Integrated workflow for finalizing ticket purchases.

---

## 📂 Project Structure

The project follows a modern, scalable Angular folder structure:

```text
src/
├── app/
│   ├── core/               # Singleton services, interceptors, and guards
│   ├── features/           # Feature-based modules (booking, search, auth)
│   ├── shared/             # Reusable UI components and pipes
│   ├── models/             # TypeScript interfaces for API data
│   └── app.routes.ts       # Centralized routing configuration
├── assets/                 # Global images, icons, and fonts
└── environments/           # Configuration for Dev/Prod API URLs

```

---

## 🛠️ Getting Started

### Prerequisites

* **Node.js:** v20.x or higher
* **Angular CLI:** `npm install -g @angular/cli`
* **Backend:** Ensure the [RailwayTicketsAPI](https://github.com/nikabara/RailwayTicketsAPI) is running.

### Installation & Setup

1. **Clone the specific branch:**
```bash
git clone -b FinalProjectVersion https://github.com/nikabara/train-tickets-shop.git
cd train-tickets-shop

```


2. **Install dependencies:**
```bash
npm install

```


3. **Environment Configuration:**
Update `src/environments/environment.ts` with your local API URL:
```typescript
export const environment = {
  production: false,
  apiUrl: 'https://localhost:5001/api'
};

```


4. **Run the application:**
```bash
ng serve --open

```


Navigate to `http://localhost:4200` in your browser.

---

## 🔌 API Integration

This frontend communicates with the .NET 9 API. Key integration points include:

* **Interceptors:** Automatically attaches JWT tokens to headers for authorized requests.
* **Error Handling:** Global error handler to manage API failures and display user-friendly notifications.
* **Signals:** Uses Angular 19 Signals for efficient, reactive data updates across the UI.

---

## 🛠 Development Commands

| Command | Purpose |
| --- | --- |
| `ng serve` | Runs the dev server |
| `ng build` | Compiles the app into the `dist/` directory |
| `ng test` | Runs unit tests via Karma |
| `ng lint` | Runs ESLint to check code quality |

---

## 👤 Author

**Nika Baratashvili** GitHub: [@nikabara](https://github.com/nikabara)
