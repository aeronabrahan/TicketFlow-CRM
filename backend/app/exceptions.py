from fastapi import HTTPException


def ticket_not_found():
    raise HTTPException(
        status_code=404,
        detail="Ticket not found."
    )