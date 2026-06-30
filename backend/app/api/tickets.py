from fastapi import APIRouter
from app.schemas.ticket import TicketCreate

router = APIRouter()

tickets = [
    {
        "id": 1,
        "customer": "John Doe",
        "subject": "Refund Request",
        "status": "Open"
    },
    {
        "id": 2,
        "customer": "Jane Smith",
        "subject": "Where is my order?",
        "status": "Pending"
    }
]


@router.get("/tickets")
def get_tickets():
    return tickets


@router.post("/tickets")
def create_ticket(ticket: TicketCreate):

    new_ticket = {
        "id": len(tickets) + 1,
        "customer": ticket.customer,
        "subject": ticket.subject,
        "status": ticket.status
    }

    tickets.append(new_ticket)

    return {
        "message": "Ticket created successfully!",
        "ticket": new_ticket
    }