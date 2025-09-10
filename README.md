# ✒️ PixelPen - A Full-Stack MERN Blogging Platform

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

PixelPen is a modern and feature-rich blogging application built using the MERN stack (MongoDB, Express.js, React.js, Node.js). This platform allows users to share their thoughts, stories, and knowledge with the world through an intuitive and responsive interface.

**[➡️ View Live Demo](https://pixel-pen-ecru.vercel.app/)**

---

## ✨ Key Features

- **User Authentication:** Secure JWT (JSON Web Tokens) based authentication with password hashing (bcryptjs).
- **Google OAuth 2.0:** Allows users to sign up and log in effortlessly using their Google accounts.
- **Post Management (CRUD):** Users can create, read, update, and delete their own blog posts.
- **Rich Text Editor:** A user-friendly WYSIWYG editor (React Quill) for crafting beautiful and formatted posts.
- **Commenting System:** Enables interactive discussions by allowing users to comment on posts.
- **Admin Dashboard:** Admins have special privileges to manage and moderate all user posts and comments.
- **AI Integration:** Utilizes the Gemini API for potential content-related features.
- **Image Handling:** Uses ImageKit for reliable and fast image uploads and delivery.
- **Responsive Design:** A beautiful and fully responsive user interface built with Tailwind CSS and Flowbite-React.

---
## 🛠️ Technology Stack

| Component | Technology |
| :--- | :--- |
| **Frontend** | React.js, Redux Toolkit, React Router, Tailwind CSS, Flowbite-React |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB (with Mongoose) |
| **Authentication** | JSON Web Tokens (JWT), Google OAuth 2.0, bcryptjs |
| **Image Hosting**| ImageKit.io |
| **AI Services** | Google Gemini API |

---

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites
- Node.js (v18 or higher)
- npm
- MongoDB (A local instance or a connection string from Atlas)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/shivanshjoshi08/PixelPen.git](https://github.com/shivanshjoshi08/PixelPen.git)
    cd PixelPen
    ```

2.  **Set up the Backend:**
    ```bash
    cd backend
    npm install
    ```
    Create a `.env` file in the `backend` directory and add the following variables. **Do NOT use the keys you shared publicly; generate new ones.**
    ```env
    # MongoDB Connection
    MONGODB_URI="your_new_mongodb_connection_string"

    # JWT Secret for Authentication
    JWT_SECRET="your_new_super_secret_key"

    # Default Admin Credentials
    ADMIN_EMAIL="your_admin_email@example.com"
    ADMIN_PASSWORD="your_strong_admin_password"

    # ImageKit Credentials for Image Uploads
    IMAGEKIT_PUBLIC_KEY="your_new_imagekit_public_key"
    IMAGEKIT_PRIVATE_KEY="your_new_imagekit_private_key"
    IMAGEKIT_URL_ENDPOINT="your_imagekit_url_endpoint"

    # Google Gemini API Key
    GEMINI_API_KEY="your_new_gemini_api_key"
    ```
    Start the backend server:
    ```bash
    npm start
    ```
    The backend will run on `http://localhost:3000`.

3.  **Set up the Frontend:**
    Open a new terminal and navigate to the project's root folder.
    ```bash
    cd frontend
    npm install
    ```
    Create a `.env` file in the `frontend` directory and add the following variable. This tells your frontend where the backend API is located.
    ```env
    VITE_BASE_URL=http://localhost:3000
    ```
    Start the frontend development server:
    ```bash
    npm run dev
    ```

Your application should now be running on `http://localhost:5173` (or another available port)!

---



*Created with ❤️ by Shivansh Joshi*