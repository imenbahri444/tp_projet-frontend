# Student Management Frontend

## Project Description

This project is a **web frontend application** developed as part of the **Service-Oriented Architecture** course.

The objective of the project is to design a frontend interface that **consumes a RESTful backend** developed in Java using JAX-RS and JPA during practical lab work.  
The application allows users to manage students through a simple and intuitive interface, following a **Client / Server architecture**.

The frontend communicates with the backend **exclusively via REST services** using HTTP requests and JSON format, without any direct access to the database.

---

## Technologies Used

### Frontend
- HTML5
- CSS3
- JavaScript
- Fetch API

### Backend (developed in previous practical lab work)
- Java
- JAX-RS (Jersey)
- JPA (Hibernate)
- MySQL
- Apache Tomcat

---

## Instructions to Run the Project

1. Start the backend REST application on **Apache Tomcat**.
2. Make sure the backend is accessible at the following base URL:
http://localhost:8081/tp_projet
3. Open the frontend:
- Open the `index.html` file in a web browser  
**or**
- Deploy the frontend inside the backend `WebContent` directory and access it via Tomcat.
4. Use the interface to:
- Display the list of students
- Add a student
- Search for a student by ID
- Update student information
- Delete a student

---

## Demo Video

Link to the demonstration video:  
👉 https://drive.google.com/file/d/1tlzd2qRJJiKPai3c4gXleByQjuLb6O9s/view?usp=sharing