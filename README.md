# Student Management Frontend – tp_projet

This project is a web frontend developed to consume a RESTful backend created in previous TPs using Java (JAX-RS) and JPA (Hibernate).

The frontend follows a **Client / Server architecture** and communicates with the backend exclusively through HTTP requests.  
The frontend does not access the database directly.

---

## Project Context

In previous TPs, a RESTful backend was developed using:
- JAX-RS (Jersey)
- JPA (Hibernate)
- Apache Tomcat
- MySQL

The objective of this project is to design a frontend interface that consumes these REST services and allows managing students.

---

## Features

- **List students**  
  Displays all students retrieved from the backend in a table view

- **Add a student**

- **Search a student by ID**

- **Update a student**

- **Delete a student**

- **Backend status check (Ping)**

---

## Technologies Used

### Frontend
- HTML5
- CSS3
- JavaScript
- Fetch API

### Backend (developed in previous TPs)
- Java
- JAX-RS (Jersey)
- JPA (Hibernate)
- Apache Tomcat
- MySQL

---

## REST Services Used

The frontend consumes the following REST endpoints:

- `GET    /persons`
- `GET    /persons/{id}`
- `POST   /persons`
- `PUT    /persons/{id}`
- `DELETE /persons/{id}`
- `GET    /ping`

Base URL:
http://localhost:8081/tp_projet
3. Open `index.html` in a web browser
4. Use the interface to manage students



## GitHub Repository

Frontend source code:  
👉 https://github.com/imenbahri444/tp_projet-frontend
