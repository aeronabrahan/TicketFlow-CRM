from fastapi import FastAPI
from app.api.tickets import router as ticket_router

app = FastAPI()

app.include_router(ticket_router)


@app.get("/")
def root():
    return {"message": "Welcome to TicketFlow CRM!"}