from sqlmodel import Session
from sqlmodel import select

from app.database.database import engine, create_db_and_tables
from app.models.user import User
from app.models.ticket import Ticket

from app.core.security import hash_password

from app.enums.status import TicketStatus
from app.enums.priority import Priority
from app.enums.category import Category


def seed_database():

    create_db_and_tables()

    with Session(engine) as session:

        # Prevent duplicate seeding
        if session.exec(select(User)).first():
            print("Database already contains data.")
            return

        # -----------------------
        # Users
        # -----------------------

        admin = User(
            username="admin",
            email="admin@test.com",
            hashed_password=hash_password("admin123"),
            role="Admin"
        )

        agent = User(
            username="agent",
            email="agent@test.com",
            hashed_password=hash_password("agent123"),
            role="Agent"
        )

        manager = User(
            username="manager",
            email="manager@test.com",
            hashed_password=hash_password("manager123"),
            role="Manager"
        )

        session.add(admin)
        session.add(agent)
        session.add(manager)

        # -----------------------
        # Tickets
        # -----------------------

        tickets = [

            Ticket(
                customer="John Doe",
                subject="Refund Request",
                category=Category.BILLING,
                priority=Priority.HIGH,
                status=TicketStatus.OPEN
            ),

            Ticket(
                customer="Maria Santos",
                subject="Package Lost",
                category=Category.SHIPPING,
                priority=Priority.HIGH,
                status=TicketStatus.PENDING
            ),

            Ticket(
                customer="Kevin Cruz",
                subject="Cannot Login",
                category=Category.TECHNICAL,
                priority=Priority.MEDIUM,
                status=TicketStatus.OPEN
            ),

            Ticket(
                customer="Anna Reyes",
                subject="Wrong Item Delivered",
                category=Category.SHIPPING,
                priority=Priority.MEDIUM,
                status=TicketStatus.CLOSED
            ),

            Ticket(
                customer="Paul Garcia",
                subject="Duplicate Payment",
                category=Category.BILLING,
                priority=Priority.HIGH,
                status=TicketStatus.OPEN
            ),

            Ticket(
                customer="Jessica Lim",
                subject="Need Invoice",
                category=Category.BILLING,
                priority=Priority.LOW,
                status=TicketStatus.CLOSED
            ),

            Ticket(
                customer="Michael Tan",
                subject="Website Error",
                category=Category.TECHNICAL,
                priority=Priority.HIGH,
                status=TicketStatus.OPEN
            ),

            Ticket(
                customer="Sophia Lee",
                subject="Late Delivery",
                category=Category.SHIPPING,
                priority=Priority.MEDIUM,
                status=TicketStatus.PENDING
            ),

            Ticket(
                customer="James Wong",
                subject="Account Locked",
                category=Category.TECHNICAL,
                priority=Priority.HIGH,
                status=TicketStatus.OPEN
            ),

            Ticket(
                customer="Nicole Perez",
                subject="Refund Approved",
                category=Category.BILLING,
                priority=Priority.LOW,
                status=TicketStatus.CLOSED
            )

        ]

        session.add_all(tickets)

        session.commit()

        print("Database seeded successfully!")


if __name__ == "__main__":
    seed_database()