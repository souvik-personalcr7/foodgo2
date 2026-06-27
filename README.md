# FoodGo

FoodGo is a full-stack food delivery and restaurant management application. It features role-based access for regular users and shop owners, allowing users to browse food items, manage their cart, and place orders, while shop owners can manage their shops, menu items, and view incoming orders.

## Project Architecture

The project follows a modern client-server architecture with a clear separation of concerns between the frontend and backend.

### Tech Stack

#### Frontend (Client-side)
* **Framework:** React 19 with Vite
* **State Management:** Redux Toolkit (`@reduxjs/toolkit`, `react-redux`)
* **Styling:** Tailwind CSS
* **Routing:** React Router DOM
* **HTTP Client:** Axios
* **Authentication/Other Services:** Firebase, `@react-oauth/google`

#### Backend (Server-side)
* **Runtime/Framework:** Node.js, Express.js
* **Database:** MongoDB with Mongoose ODM
* **Authentication:** JSON Web Tokens (JWT), bcrypt (password hashing), Cookie Parser
* **File Uploads:** Multer, Cloudinary (image hosting)
* **Emails:** Nodemailer

### Directory Structure

```text
foodgo2/
├── backend/                  # Server-side code
│   ├── config/               # Database and environment configurations
│   ├── controllers/          # Request handlers for different routes
│   ├── middleweres/          # Express middlewares (e.g., auth, file upload)
│   ├── models/               # Mongoose schemas (User, Shop, Item)
│   ├── routes/               # Express API routes (auth, user, shop, item)
│   ├── utils/                # Helper functions and utilities
│   └── index.js              # Entry point for the Express server
│
└── frontend/                 # Client-side React application
    ├── public/               # Static assets
    ├── src/
    │   ├── assets/           # Images, icons, etc.
    │   ├── components/       # Reusable React components (Nav, Footer, Dashboards)
    │   ├── Hooks/            # Custom React hooks (e.g., useGetCurrentUser, useGetCity)
    │   ├── pages/            # Page-level components (Home, SignIn, Cart, Orders, etc.)
    │   ├── Redux/            # Redux slices and store configuration
    │   ├── App.jsx           # Main application component and routing logic
    │   └── main.jsx          # Entry point for the React application
    ├── index.html            # HTML template
    └── vite.config.js        # Vite bundler configuration
```

### Key Features & Modules

1. **Authentication & Authorization**
   * Handled via JWT stored in HTTP-only cookies.
   * Role-based access control segregating 'user' (customer) and 'owner' routes.
2. **User Management**
   * Profiles, Google OAuth integration, password recovery.
3. **Shop Management (Owner)**
   * Owners can create and edit their restaurant profiles (`/create-edit-shop`).
   * Dedicated owner dashboard for tracking metrics and orders (`/owner/dashboard`).
4. **Item/Menu Management (Owner)**
   * Owners can add, edit, or remove menu items with image uploads (handled by Multer & Cloudinary).
5. **Customer Experience**
   * Browsing shops and menus.
   * Add to Cart functionality.
   * Placing and tracking orders (`/my-orders`).

### Running the Project Locally

1. **Clone the repository:**
   ```bash
   git clone <repo-url>
   ```

2. **Backend Setup:**
   ```bash
   cd backend
   npm install
   # Configure your .env file with MongoDB URI, Cloudinary keys, JWT Secret, etc.
   npm run dev
   ```

3. **Frontend Setup:**
   ```bash
   cd frontend
   npm install
   # Configure any required Firebase or API keys in .env
   npm run dev
   ```

4. **Access the application:**
   * Frontend runs on: `http://localhost:5173`
   * Backend API runs on: `http://localhost:8000`
