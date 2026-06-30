from contextlib import asynccontextmanager
from fastapi import FastAPI

from app.api.tickets import router as ticket_router
from app.database.database import create_db_and_tables
from app.api import auth

@asynccontextmanager
async def lifespan(app: FastAPI):
    create_db_and_tables()
    yield


app = FastAPI(
    title="TicketFlow CRM API",
    description="""
A Customer Support CRM API built using FastAPI.

Features:

- CRUD Tickets
- Search
- Dashboard
- Filtering
- Pagination
""",
    version="1.0.0",
    lifespan=lifespan
)

app.include_router(ticket_router)
app.include_router(auth.router)

@app.get("/")
def root():
    return {"message": "Welcome to TicketFlow CRM!"}

@app.get("/health")
def health():
    return {
        "status": "healthy",
        "application": "TicketFlow CRM",
        "version": "1.0"
    }