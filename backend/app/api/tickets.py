from fastapi import APIRouter, HTTPException, status
from app.schemas.ticket import TicketCreate, TicketUpdate

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


@router.post("/tickets", status_code=status.HTTP_201_CREATED)
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

@router.put("/tickets/{ticket_id}")
def update_ticket(ticket_id: int, ticket: TicketUpdate):

    for existing_ticket in tickets:

        if existing_ticket["id"] == ticket_id:

            existing_ticket["status"] = ticket.status

            return {
                "message": "Ticket updated successfully!",
                "ticket": existing_ticket
            }

    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail="Ticket not found."
)

@router.delete("/tickets/{ticket_id}")
def delete_ticket(ticket_id: int):

    for index, existing_ticket in enumerate(tickets):

        if existing_ticket["id"] == ticket_id:

            deleted_ticket = tickets.pop(index)

            return {
                "message": "Ticket deleted successfully!",
                "ticket": deleted_ticket
            }

    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail="Ticket not found."
    )