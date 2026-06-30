from pydantic import BaseModel


class TicketAssignment(BaseModel):
    assigned_to_id: int