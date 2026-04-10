# Employee Management System (EMS)

A modern full-stack application for managing employees with clean architecture and professional features.

## 🌟 Features

### Backend
- Full CRUD Operations (Create, Read, Update, Delete)
- Advanced Pagination with Sorting
- Powerful Search (by name, email, or department)
- DTO Pattern using MapStruct
- Global Exception Handling
- Input Validation with Jakarta Bean Validation
- Custom API Response Structure
- Comprehensive Logging (SLF4J)
- MySQL Database Integration

### Frontend
- Responsive Design with Bootstrap 5
- Add, Update, View, and Delete Employees
- Real-time Search with Pagination
- Toast Notifications
- Loading States
- SweetAlert2 for Critical Actions (Delete)
- Form Validation Feedback

## 🛠️ Technologies Used

### Backend
- **Java 21**
- **Spring Boot 3.3.4**
- **Spring Data JPA**
- **MapStruct**
- **Lombok**
- **MySQL**
- **Maven**

### Frontend
- **React.js**
- **React Router DOM**
- **Axios**
- **Bootstrap 5**
- **React Toastify**
- **SweetAlert2**

## 📋 Prerequisites

- Java 21 or higher
- Node.js (v18+)
- MySQL Server
- Maven 3.8+

## 🚀 How to Run the Project

### 1. Backend (Spring Boot)

```bash
# Clone the repository
git clone https://github.com/yourusername/ems-project.git

# Navigate to backend
cd ems-project/ems-spring-boot

# Create database in MySQL
# CREATE DATABASE ems_db;

# Update src/main/resources/application.properties with your MySQL username and password

# Build and run
mvn clean install
mvn spring-boot:run
```
##### Backend URL: http://localhost:8080

### 2. Frontend
```bash
# Navigate to frontend
cd ../ems-frontend

# Install dependencies
npm install

# Start development server
npm run dev
```
##### Frontend URL: http://localhost:3000

## 📁 Project Structure
```plaintext
ems-project/
├── ems-spring-boot/          # Spring Boot Backend
├── ems-frontend/             # React Frontend
├── screenshots/              # Project screenshots
├── README.md
└── .gitignore
```

## ✨ Key Highlights
- Clean Layered Architecture (Controller → Service → Repository)
- Proper use of DTOs and Mappers
- Pagination + Sorting + Search combined
- Professional Error Handling
- Modern React best practices

## 📸 Screenshots
- Employee List Page
- Add New Employee Form
- Update Employee
- Delete Employee
- Search Functionality

## 👨‍💻 Author
<b><i>Ahmed Ayman</i></b>
<br>
Full Stack Java Developer
