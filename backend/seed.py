from random import choice

from faker import Faker
from sqlmodel import Session

from app.database.database import engine
from app.models.ticket import Ticket

fake = Faker()

statuses = [
    "Open",
    "Pending",
    "Closed",
]

priorities = [
    "Low",
    "Medium",
    "High",
]

ticket_templates = {
    "BILLING": [
        (
            "Incorrect invoice amount",
            "The customer noticed an incorrect charge on the latest invoice and is requesting a review of the billing details."
        ),
        (
            "Duplicate billing detected",
            "The customer was charged twice for the same order and would like the duplicate transaction refunded."
        ),
        (
            "Missing invoice copy",
            "The customer needs a copy of the invoice for accounting and tax documentation."
        ),
    ],

    "REFUND": [
        (
            "Refund request",
            "The customer would like to return the purchased item and receive a full refund according to company policy."
        ),
        (
            "Refund status inquiry",
            "The customer is asking for an update regarding a refund that was requested several business days ago."
        ),
        (
            "Refund not received",
            "The refund has been approved but the customer has not yet received the payment."
        ),
    ],

    "SHIPPING": [
        (
            "Delayed delivery",
            "The shipment has not arrived within the expected delivery window and the customer is requesting an update."
        ),
        (
            "Tracking number not updating",
            "The tracking information has not changed for several days and the customer wants to know the shipment status."
        ),
        (
            "Package delivered to wrong address",
            "The customer reports that the order was delivered to an incorrect location."
        ),
    ],

    "PAYMENT": [
        (
            "Payment declined",
            "The customer's payment method was declined despite sufficient available funds."
        ),
        (
            "Unable to complete payment",
            "The payment page returns an unexpected error during checkout."
        ),
        (
            "Credit card verification failed",
            "The customer is unable to complete the purchase due to card verification issues."
        ),
    ],

    "DAMAGED_ITEM": [
        (
            "Item arrived damaged",
            "The customer received a damaged product and has attached photos for review."
        ),
        (
            "Packaging damaged",
            "The shipping box arrived severely damaged and the contents may have been affected."
        ),
        (
            "Broken product received",
            "The customer reports that the product was not functional immediately after delivery."
        ),
    ],

    "TECHNICAL": [
        (
            "Unable to log in",
            "The customer cannot access their account even after resetting the password."
        ),
        (
            "Application error",
            "The application crashes immediately after launching on the customer's device."
        ),
        (
            "Unexpected system error",
            "The customer receives an unknown error message while attempting to complete an action."
        ),
        (
            "Password reset issue",
            "The password reset email is not being received despite multiple attempts."
        ),
    ],

    "SALES": [
        (
            "Request for quotation",
            "The customer is requesting a formal quotation for multiple products."
        ),
        (
            "Bulk order inquiry",
            "The customer would like pricing information for a large quantity purchase."
        ),
        (
            "Product availability",
            "The customer wants to confirm inventory availability before placing an order."
        ),
    ],

    "OTHER": [
        (
            "General inquiry",
            "The customer has submitted a general question that requires assistance from the support team."
        ),
        (
            "Customer follow-up",
            "The customer is requesting an update regarding a previous support interaction."
        ),
        (
            "Account assistance",
            "The customer needs additional assistance regarding their account."
        ),
    ],
}

with Session(engine) as session:

    for _ in range(150):

        category = choice(list(ticket_templates.keys()))

        subject, description = choice(ticket_templates[category])

        ticket = Ticket(
            customer=fake.company(),
            subject=subject,
            description=description,
            category=category,
            priority=choice(priorities),
            status=choice(statuses),
        )

        session.add(ticket)

    session.commit()

print("✅ 150 realistic tickets created.")