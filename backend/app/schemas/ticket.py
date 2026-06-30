from pydantic import BaseModel


class TicketCreate(BaseModel):
    customer: str
    subject: str
    status: str