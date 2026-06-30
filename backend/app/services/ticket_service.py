from datetime import datetime

from sqlmodel import or_
from sqlmodel import desc
from sqlmodel import Session, select

from app.models.ticket import Ticket
from app.schemas.ticket import TicketCreate, TicketUpdate


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


def create_ticket(
    session: Session,
    ticket: TicketCreate
):

    db_ticket = Ticket(
        customer=ticket.customer,
        subject=ticket.subject,
        category=ticket.category.value,
        priority=ticket.priority.value,
        status=ticket.status.value
    )

    session.add(db_ticket)
    session.commit()
    session.refresh(db_ticket)

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
    ticket_update: TicketUpdate
):

    ticket = session.get(
        Ticket,
        ticket_id
    )

    if not ticket:
        return None

    if ticket_update.status:
        ticket.status = ticket_update.status.value

    if ticket_update.priority:
        ticket.priority = ticket_update.priority.value

    if ticket_update.category:
        ticket.category = ticket_update.category.value

    ticket.updated_at = datetime.utcnow()

    session.add(ticket)
    session.commit()
    session.refresh(ticket)

    return ticket

def delete_ticket_by_id(
    session: Session,
    ticket_id: int
):
    ticket = session.get(Ticket, ticket_id)

    if not ticket:
        return None

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