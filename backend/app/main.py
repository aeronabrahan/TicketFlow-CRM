from contextlib import asynccontextmanager
from fastapi import FastAPI

from app.api.tickets import router as ticket_router
from app.database.database import create_db_and_tables

@asynccontextmanager
async def lifespan(app: FastAPI):
    create_db_and_tables()
    yield


app = FastAPI(lifespan=lifespan)

app.include_router(ticket_router)


@app.get("/")
def root():
    return {"message": "Welcome to TicketFlow CRM!"}