# 🎮 GamerGrave - A Modern Game Discovery Platform

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white) ![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white) ![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white) ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

GamerGrave is a full-stack web application designed to help users discover, search, and filter through a vast library of video games. It features a clean, modern interface and is built with a focus on performance and user experience.

---

### [🚀 View the Live Demo](https://gg.sajjadhaq.com)

---

<!--
  IMPORTANT: A high-quality GIF or screenshot of the app is essential.
  Showcase the infinite scroll, the filters working, and the responsive design.
-->
<p align="center">
  <img src="https://i.imgur.com/jTZBOsb.gif" alt="GamerGrave App Demo" width="800"/>
</p>

## ✨ Core Features

-   **🔍 Intelligent Search & Filtering:** A powerful and intuitive filtering system that allows users to sort games by genre, platform, release date, and more.
-   **♾️ Performant Infinite Scrolling:** Seamlessly load more games as the user scrolls, providing a smooth and endless discovery experience.
-   **🔐 User Authentication:** Secure user sign-up and login functionality powered by Supabase Auth.
-   **🎨 Custom Component Library:** Built with a focus on accessibility and reusability, ensuring a consistent and high-quality UI.
-   **📱 Fully Responsive Design:** A pixel-perfect, mobile-first design that works flawlessly on any device, from phones to desktops.

## 🛠️ Tech Stack & Architecture

This project was built from the ground up to showcase a modern, full-stack development workflow.

-   **Frontend:**
    -   **Framework:** React (with Vite for a fast development experience)
    -   **Language:** TypeScript for type safety and scalability
    -   **Styling:** Tailwind CSS for a utility-first, responsive design
    -   **State Management:** React Hooks (`useState`, `useEffect`, `useContext`)
-   **Backend (BaaS):**
    -   **Platform:** Supabase
    -   **Database:** PostgreSQL for storing game and user data
    -   **Authentication:** Supabase Auth for managing user accounts and sessions
-   **Deployment:** Vercel

## 🧠 Key Technical Decisions & Highlights

-   **Optimistic UI for Filtering:** To create a snappy user experience, filters are applied to the currently displayed data on the client-side first, while a new request is sent to the backend. This makes the UI feel instantaneous.
-   **Efficient Data Fetching:** Implemented debouncing on the search input to prevent excessive API calls while the user is typing, improving performance and reducing backend load.
-   **Custom Hooks for Reusability:** Abstracted complex logic (like data fetching and authentication status) into custom React hooks (`useGames`, `useAuth`) to keep components clean and maintainable.

## 🚀 How to Run Locally

To get a local copy up and running, follow these steps.

### Prerequisites

You will need to have Node.js and npm installed on your machine. You will also need a free Supabase account to connect to your own backend instance.

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/your-username/gamergrave.git
    ```

2.  **Navigate to the project directory:**
    ```sh
    cd gamergrave
    ```

3.  **Install NPM packages:**
    ```sh
    npm install
    ```

4.  **Set up environment variables:**
    -   Create a `.env.local` file in the root of the project.
    -   Add your Supabase Project URL and Anon Key to this file. You can find these in your Supabase project settings.
        ```
        VITE_SUPABASE_URL=your_supabase_project_url
        VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
        ```

5.  **Start the development server:**
    ```sh
    npm run dev
    ```

The application will be running on `http://localhost:5173`.

## ✍️ Author

**Sajjad Haq**

-   **GitHub:** [@sagehawk](https://github.com/sagehawk)
-   **LinkedIn:** [Sajjad Haq](https://www.linkedin.com/in/sajjadhaq/)
