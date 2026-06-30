from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session

from app.database.database import get_session

from app.schemas.ticket import TicketCreate, TicketUpdate
from app.schemas.assignment import TicketAssignment
from app.services.ticket_service import (
    get_all_tickets,
    create_ticket,
    search_tickets,
    update_ticket_status,
    delete_ticket_by_id,
    get_dashboard_stats,
    filter_tickets,
    get_latest_tickets,
    assign_ticket,
    get_ticket_history
)

from app.core.auth import get_current_user
from app.core.permissions import require_admin, require_agent_or_admin
from app.exceptions import ticket_not_found
from app.models.user import User
from app.schemas.ticket_response import TicketResponse

router = APIRouter(
    prefix="/tickets",
    tags=["Tickets"]
)


@router.get("", response_model=list[TicketResponse])
def get_tickets(
    offset: int = 0,
    limit: int = 20,
    session: Session = Depends(get_session),
    current_user: User = Depends(require_agent_or_admin)
):
    return get_all_tickets(
        session,
        offset,
        limit
    )


@router.get("/search")
def search_ticket_endpoint(
    search: str,
    session: Session = Depends(get_session),
    current_user: User = Depends(require_agent_or_admin)
):
    return search_tickets(session, search)


@router.post("", status_code=status.HTTP_201_CREATED)
def create_ticket_endpoint(
    ticket: TicketCreate,
    session: Session = Depends(get_session),
    current_user: User = Depends(require_agent_or_admin)
):
    return create_ticket(session, ticket, current_user.username)


@router.put("/{ticket_id}")
def update_ticket(
    ticket_id: int,
    ticket: TicketUpdate,
    session: Session = Depends(get_session),
    current_user: User = Depends(require_agent_or_admin)
):
    updated_ticket = update_ticket_status(
        session,
        ticket_id,
        ticket,
        current_user.username
    )

    if updated_ticket is None:
        ticket_not_found()

    return {
        "message": "Ticket updated successfully!",
        "ticket": updated_ticket
    }


@router.delete("/{ticket_id}")
def delete_ticket_endpoint(
    ticket_id: int,
    session: Session = Depends(get_session),
    current_user: User = Depends(require_admin)
):
    deleted_ticket = delete_ticket_by_id(
        session,
        ticket_id,
        current_user.username
    )

    if deleted_ticket is None:
         ticket_not_found()

    return {
        "message": "Ticket deleted successfully!",
        "ticket": deleted_ticket
    }


@router.get("/dashboard")
def dashboard(
    session: Session = Depends(get_session),
    current_user: User = Depends(require_admin)
):
    return get_dashboard_stats(session)


@router.get("/filter")
def filter_tickets_endpoint(
    status: str | None = None,
    priority: str | None = None,
    category: str | None = None,
    session: Session = Depends(get_session),
    current_user: User = Depends(require_agent_or_admin)
):
    return filter_tickets(
        session,
        status,
        priority,
        category
    )


@router.get("/latest")
def latest_tickets(
    limit: int = 5,
    session: Session = Depends(get_session),
    current_user: User = Depends(require_agent_or_admin)
):
    return get_latest_tickets(
        session,
        limit
    )

@router.patch("/{ticket_id}/assign")
def assign_ticket_endpoint(
    ticket_id: int,
    assignment: TicketAssignment,
    session: Session = Depends(get_session),
    current_user: User = Depends(require_admin)
):

    ticket = assign_ticket(
        session,
        ticket_id,
        assignment.assigned_to_id,
        current_user.username
    )

    if ticket is None:
        raise HTTPException(
            status_code=404,
            detail="Ticket not found."
        )

    return ticket

@router.get("/{ticket_id}/history")
def ticket_history(
    ticket_id: int,
    session: Session = Depends(get_session),
    current_user: User = Depends(require_agent_or_admin)
):

    return get_ticket_history(
        session,
        ticket_id
    )