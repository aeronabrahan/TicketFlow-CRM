# 🚀 TicketFlow CRM

A backend Customer Relationship Management (CRM) REST API built with **FastAPI**.

TicketFlow CRM simulates a customer support system where agents can manage customer support tickets, search records, filter results, view dashboard analytics, and perform complete CRUD operations.

---

## ✨ Features

- ✅ Create Tickets
- ✅ View All Tickets
- ✅ Update Ticket Status
- ✅ Delete Tickets
- ✅ Search Tickets
- ✅ Filter Tickets by Status
- ✅ Pagination
- ✅ Dashboard Statistics
- ✅ Health Check Endpoint
- ✅ Interactive Swagger Documentation

---

## 🛠️ Tech Stack

- Python 3.13
- FastAPI
- SQLModel
- SQLite
- Pydantic
- Uvicorn
- Git & GitHub

---

## 📁 Project Structure

```text
backend/
│
├── app/
│   ├── api/
│   │   └── tickets.py
│   │
│   ├── database/
│   │   └── database.py
│   │
│   ├── models/
│   │   └── ticket.py
│   │
│   ├── schemas/
│   │   └── ticket.py
│   │
│   ├── services/
│   │   └── ticket_service.py
│   │
│   └── main.py
│
├── requirements.txt
├── ticketflow.db
└── README.md
```

---

## ▶️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/aeronabrahan/TicketFlow-CRM.git
cd TicketFlow-CRM/backend
```

### 2. Create a virtual environment

```bash
python -m venv .venv
```

### 3. Activate the virtual environment

**Windows**

```bash
.venv\Scripts\activate
```

### 4. Install dependencies

```bash
pip install -r requirements.txt
```

### 5. Run the application

```bash
uvicorn app.main:app --reload
```

---

## 📚 API Documentation

Once the server is running, open:

Swagger UI

```text
http://127.0.0.1:8000/docs
```

ReDoc

```text
http://127.0.0.1:8000/redoc
```

---

## 📌 Available Endpoints

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/` | Welcome message |
| GET | `/health` | API health check |
| GET | `/tickets` | Retrieve all tickets |
| POST | `/tickets` | Create a new ticket |
| PUT | `/tickets/{ticket_id}` | Update a ticket |
| DELETE | `/tickets/{ticket_id}` | Delete a ticket |
| GET | `/tickets/search` | Search tickets |
| GET | `/tickets/filter` | Filter tickets by status |
| GET | `/dashboard` | Dashboard statistics |

---

## 🏗️ Architecture

The project follows a layered architecture to keep responsibilities separate and the codebase maintainable.

```text
Client
   │
   ▼
FastAPI Router (HTTP Endpoints)
   │
   ▼
Service Layer (Business Logic)
   │
   ▼
Database Layer (SQLModel / SQLite)
```

This separation makes the application easier to maintain, test, and extend.

---

## 🚀 Future Improvements

- JWT Authentication
- User Roles (Admin / Support Agent)
- PostgreSQL Database
- Docker Support
- React Frontend
- Ticket Priority
- Ticket Categories
- Email Notifications
- AI Ticket Summaries
- AI Suggested Replies

---

## 👨‍💻 Author

**Jan Aeron Abrahan**

Mechanical Engineer transitioning into Backend Development, Data Engineering, and AI-powered applications.

- GitHub: https://github.com/aeronabrahan
- LinkedIn: https://www.linkedin.com/in/jagabrahan/

---

## 📄 License

This project is intended for learning, portfolio, and demonstration purposes.
