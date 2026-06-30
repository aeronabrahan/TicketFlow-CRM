from sqlmodel import SQLModel, Session, create_engine

from app.models.ticket_history import TicketHistory

DATABASE_URL = "sqlite:///ticketflow.db"

engine = create_engine(
    DATABASE_URL,
    echo=True
)


def create_db_and_tables():
    SQLModel.metadata.create_all(engine)


def get_session():
    with Session(engine) as session:
        yield session