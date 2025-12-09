# 💰 Expense Tracker Application

A comprehensive full-stack Expense Tracker built using the **MERN** stack (MongoDB, Express.js, React, Node.js). This application allows users to manage their personal finances by tracking income and expenses, visualizing spending habits through dynamic charts, and filtering transaction history.

## 👥 Team Composition & Contributions

| Member | Role | Key Contributions |
| :--- | :--- | :--- |
| **OUALI Youssef** | **Tech Lead & Full Stack** | • Project Infrastructure & DevOps (GitHub Actions, Deployment).<br>• Frontend Architecture (React, Context API, State Management).<br>• Implemented Authentication Frontend & Integration.<br>• Built the core UI (Home, Dashboard, Modals).<br>• Resolved critical Merge Conflicts & Dependency issues. |
| **YERRO Olivier** | **Backend Developer (Transactions)** | • Designed the `Transaction` Database Model (Schema).<br>• Implemented CRUD API Controllers (Add, Get, Delete, Update Transaction).<br>• Created Backend Routes for transaction management.<br>• Ensured database validation logic. |
| **BOTHORELMaxence** | **Backend Logic & Analytics** | • Implemented "Smart Filtering" logic (Date Ranges, Frequency, & Type).<br>• Optimized MongoDB queries for performance.<br>• Integrated `Moment.js` for precise server-side date handling.<br>• Wrote Backend Integration Tests for filtering logic. |
| **PAHLAWAN Léonard** | **Security & Authentication** | • Implemented JWT (JSON Web Token) authentication strategy.<br>• Built User Registration & Login Controllers.<br>• Handled Password Hashing (Bcrypt) and Security Best Practices.<br>• Managed User Session & Logout functionality. |

---

## 🚀 Features

* **User Authentication**: Secure Login and Registration system with JWT.
* **Transaction Management**: Add, Edit, and Delete income and expense transactions.
* **Analytics Dashboard**: Visual breakdown of your finances including:
    * Total Turnover (Income vs. Expense)
    * Category-wise spending analysis (Progress bars)
    * Circular progress indicators for easy visualization.
* **Advanced Filtering**: Filter transactions by:
    * **Frequency**: Last Week, Last Month, Last Year, or Custom Date Range.
    * **Type**: Income, Expense, or All.
* **Responsive UI**: Built with React Bootstrap and Material UI for a clean, mobile-friendly interface.
* **Avatar Selection**: Users can select personalized profile avatars.

## 🛠️ Tech Stack

### **Frontend**
* **React.js**: Component-based UI library.
* **React Bootstrap**: Responsive layout and components.
* **Material UI (MUI)**: Modern icons and UI elements.
* **Axios**: For making HTTP requests to the backend.
* **Moment.js**: For date formatting and manipulation.
* **React Datepicker**: Custom date range selection.

### **Backend**
* **Node.js & Express.js**: Server-side runtime and framework.
* **MongoDB & Mongoose**: NoSQL database and object modeling.
* **Moment.js**: For server-side date filtering logic.
* **Cors**: To handle Cross-Origin Resource Sharing.

---

## ⚙️ Installation & Setup

Follow these steps to run the project locally.

### **1. Prerequisites**
* **Node.js** (v14 or higher)
* **MongoDB Atlas** account (or local MongoDB installed)

### **2. Clone the Repository**
```bash
git clone https://github.com/your-username/expense-tracker.git
cd expense-tracker
```

### **3. Backend Setup**
Navigate to the backend folder and install dependencies:

```bash
cd backend
npm install
```

Configure Environment Variables: Create a `.env` file inside the backend folder and add the following:

```env
PORT=5000
MONGO_URL=mongodb+srv://<your_username>:<your_password>@<your_cluster>.mongodb.net/expense-tracker
```

### **4. Frontend Setup**
Navigate to the frontend folder and install dependencies:

```bash
cd ../frontend
npm install
```

## 🏃‍♂️ Running the Application
To run the full application, you need to start both the backend and frontend servers.

Open Terminal 1 (Backend):

```bash
cd backend
npm run dev
```
Expected Output: Server listening on http://localhost:5000 & Connected to MongoDB

Open Terminal 2 (Frontend):

```bash
cd frontend
npm start
```
The application should automatically open at http://localhost:3000

## 📡 API Endpoints

### Transactions
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| POST | /api/v1/addTransaction | Create a new transaction |
| POST | /api/v1/getTransactions | Fetch filtered transactions |
| POST | /api/v1/deleteTransaction/:id | Delete a specific transaction |
| PUT | /api/v1/updateTransaction/:id | Update transaction details |

### Authentication
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| POST | /api/auth/register | Register a new user |
| POST | /api/auth/login | User login |
| POST | /api/auth/setAvatar | Set user profile picture |

## 🧪 Running Tests
To run the backend unit and integration tests (using Jest/Supertest):

```bash
cd backend
npm test
```
