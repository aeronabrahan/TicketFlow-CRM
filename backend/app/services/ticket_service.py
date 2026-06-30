from datetime import datetime

from sqlmodel import or_
from sqlmodel import desc
from sqlmodel import Session, select

from app.models.ticket import Ticket
from app.schemas.ticket import TicketCreate, TicketUpdate
from app.models.ticket_history import TicketHistory
from app.exceptions import ticket_not_found
from app.models.user import User


def get_all_tickets(
    session: Session,
    offset: int = 0,
    limit: int = 20
):
    statement = (
        select(Ticket)
        .offset(offset)
        .limit(limit)
    )

    return session.exec(statement).all()

def log_ticket_action(
    session: Session,
    ticket_id: int,
    action: str,
    performed_by: str
):
    history = TicketHistory(
        ticket_id=ticket_id,
        action=action,
        performed_by=performed_by
    )

    session.add(history)
    session.commit()

def create_ticket(
    session: Session,
    ticket: TicketCreate,
    performed_by: str
):

    db_ticket = Ticket(
        customer=ticket.customer,
        subject=ticket.subject,
        category=ticket.category.value,
        priority=ticket.priority.value,
        status=ticket.status.value,
        assigned_to_id=ticket.assigned_to_id
    )

    session.add(db_ticket)
    session.commit()
    session.refresh(db_ticket)

    log_ticket_action(
        session,
        db_ticket.id,
        "Ticket Created",
        performed_by
    )

    return db_ticket

def search_tickets(session: Session, search: str):

    statement = select(Ticket).where(
        or_(
            Ticket.customer.contains(search),
            Ticket.subject.contains(search)
        )
    )

    return session.exec(statement).all()

def update_ticket_status(
    session: Session,
    ticket_id: int,
    ticket_update: TicketUpdate,
    performed_by: str
):

    ticket = session.get(
        Ticket,
        ticket_id
    )

    if not ticket:
        raise ticket_not_found()

    if ticket_update.status:
        
        old_status = ticket.status
        
        ticket.status = ticket_update.status.value
        
        log_ticket_action(
            session,
            ticket.id,
            f"Status changed: {old_status} → {ticket.status}",
            performed_by
        )

    if ticket_update.priority:
        
        old_priority = ticket.priority

        ticket.priority = ticket_update.priority.value

        log_ticket_action(
            session,
            ticket.id,
            f"Priority changed: {old_priority} → {ticket.priority}",
            performed_by
        )

    if ticket_update.category:
        
        old_category = ticket.category

        ticket.category = ticket_update.category.value

        log_ticket_action(
            session,
            ticket.id,
            f"Category changed: {old_category} → {ticket.category}",
            performed_by
        )

    if ticket_update.assigned_to_id is not None:

        old_assigned_to = ticket.assigned_to_id

        ticket.assigned_to_id = ticket_update.assigned_to_id

        log_ticket_action(
            session,
            ticket.id,
            f"Assigned ticket: {old_assigned_to} → {ticket.assigned_to_id}",
            performed_by
        )

    ticket.updated_at = datetime.utcnow()


    session.add(ticket)
    session.commit()
    session.refresh(ticket)

    return ticket

def delete_ticket_by_id(
    session: Session,
    ticket_id: int,
    performed_by: str
):
    ticket = session.get(Ticket, ticket_id)

    if not ticket:
        raise ticket_not_found()

    log_ticket_action(
        session,
        ticket.id,
        "Ticket Deleted",
        performed_by
    )

    session.delete(ticket)
    session.commit()

    return ticket

def get_dashboard_stats(session: Session):

    tickets = session.exec(select(Ticket)).all()

    return {
        "total_tickets": len(tickets),
        "open_tickets": len(
            [ticket for ticket in tickets if ticket.status == "Open"]
        ),
        "pending_tickets": len(
            [ticket for ticket in tickets if ticket.status == "Pending"]
        ),
        "closed_tickets": len(
            [ticket for ticket in tickets if ticket.status == "Closed"]
        ),
    }

def filter_tickets(
    session: Session,
    status: str | None = None,
    priority: str | None = None,
    category: str | None = None,
):
    statement = select(Ticket)

    if status:
        statement = statement.where(
            Ticket.status == status
        )

    if priority:
        statement = statement.where(
            Ticket.priority == priority
        )

    if category:
        statement = statement.where(
            Ticket.category == category
        )

    return session.exec(statement).all()

def get_latest_tickets(
    session: Session,
    limit: int = 5
):

    statement = (
        select(Ticket)
        .order_by(desc(Ticket.created_at))
        .limit(limit)
    )

    return session.exec(statement).all()

def assign_ticket(
    session: Session,
    ticket_id: int,
    assigned_to_id: int,
    performed_by: str
):
    ticket = session.get(Ticket, ticket_id)

    if not ticket:
        raise ticket_not_found()

    old_assigned_to = ticket.assigned_to_id

    ticket.assigned_to_id = assigned_to_id

    ticket.updated_at = datetime.utcnow()

    session.add(ticket)
    session.commit()
    session.refresh(ticket)

    log_ticket_action(
        session,
        ticket.id,
        f"Assignment changed: {old_assigned_to} → {assigned_to_id}",
        performed_by
    )

    return ticket

def get_ticket_history(
    session: Session,
    ticket_id: int
):

    statement = (
        select(TicketHistory)
        .where(TicketHistory.ticket_id == ticket_id)
        .order_by(TicketHistory.created_at)
    )

    return session.exec(statement).all()