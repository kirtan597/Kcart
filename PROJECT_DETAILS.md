# Kcart E-Commerce Project Documentation

## 1. Project Overview
Kcart is a modern, full-stack E-Commerce platform built using the MERN stack (MongoDB, Express, React, Node.js). It features a responsive user interface, a comprehensive admin panel for management, and secure backend services for authentication and payments.

## 2. Technology Stack

### Frontend (Client)
- **Framework**: React (Vite)
- **Styling**: Tailwind CSS, Material-UI (MUI)
- **Animations**: Framer Motion
- **HTTP Client**: Axios
- **Routing**: React Router DOM
- **Icons**: Lucide React, React Icons, MUI Icons
- **Features**: AI Chat interface, Smooth Scrolling (Lenis)

### Backend (Server)
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Authentication**: JWT, Bcrypt
- **Image Storage**: Cloudinary (via Multer)
- **Payments**: Stripe, Razorpay
- **Email**: Nodemailer

### Admin Panel
- **Framework**: React (Vite)
- **Purpose**: Product and Order management

## 3. Directory Structure

### `client/`
The user-facing storefront application.
- **`src/pages/`**:
  - `Home`, `About`, `Contact`: Core static pages.
  - `Product`, `Collection`, `SearchResults`: Shopping & browsing.
  - `Cart`, `PlaceOrder`, `Orders`: Checkout flow.
  - `Login`, `Register`, `Dashboard`, `MyProfile`: User accounts.
  - `AIChat`: specialized AI-powered chat interface.
- **`src/components/`**: Reusable UI components.
- **`src/context/`**: State management (likely AuthContext, ShopContext).

### `server/`
The backend API.
- **`controllers/`**: Logic for handling requests (`cart`, `order`, `product`, `user`).
- **`routes/`**: API endpoints definitions.
- **`models/`**: Database schemas.
- **`middleware/`**: Auth protection, etc.
- **`config/`**: Database and external service configuration.

### `admin/`
The back-office application.
- **`src/pages/`**:
  - `Add`: Interface to upload new products.
  - `List`: View and manage existing inventory.
  - `Orders`: view and process customer orders.

## 4. Key Features

### User Features
- **Authentication**: Secure Login/Register/Forgot Password flows.
- **Shopping**: Product browsing, search, and collection filtering.
- **Cart & Checkout**: Add items, manage cart, place orders with payment integration.
- **User Dashboard**: View profile and order history.
- **AI Integration**: Dedicated AI Chat page for assistance.

### Admin Features
- **Inventory Management**: Add, list, and remove products.
- **Order Management**: View and process customer orders.

## 5. Setup & Installation
(Based on `package.json`)

**Prerequisites**: Node.js, MongoDB URA/Local instance, Cloudinary/Stripe/Razorpay keys.

1. **Install Dependencies**:
   Run the root script to install all parts:
   ```bash
   npm run install-all
   # Or manually cd into each folder and npm install
   ```

2. **Environment Variables**:
   - Create `.env` files in `server/`, `client/`, and `admin/` based on their `.env.example`.

3. **Running the App**:
   - **Frontend**: `cd client && npm run dev`
   - **Backend**: `cd server && npm run dev`
   - **Admin**: `cd admin && npm run dev`

