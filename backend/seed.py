from random import choice

from faker import Faker
from sqlmodel import Session

from app.database.database import engine
from app.models.ticket import Ticket

fake = Faker()

statuses = [
    "Open",
    "Pending",
    "Closed"
]

priorities = [
    "Low",
    "Medium",
    "High"
]

categories = [
    "TECHNICAL",
    "BILLING",
    "PAYMENT",
    "DAMAGED_ITEM",
    "OTHER"
]

subjects = [
    "Unable to login",
    "Password reset",
    "Valve leak reported",
    "Invoice inquiry",
    "Software installation",
    "Warranty claim",
    "Account locked",
    "Purchase request",
    "Maintenance schedule",
    "Pressure alarm triggered",
    "Temperature sensor issue",
    "Calibration request",
    "Need quotation",
    "Delivery delayed",
    "Network connection issue"
]

with Session(engine) as session:

    for _ in range(150):

        ticket = Ticket(

            customer=fake.company(),

            subject=choice(subjects),

            category=choice(categories),

            priority=choice(priorities),

            status=choice(statuses),

        )

        session.add(ticket)

    session.commit()

print("150 tickets created.")