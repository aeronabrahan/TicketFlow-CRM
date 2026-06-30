from datetime import datetime

from pydantic import BaseModel

from app.enums.category import Category
from app.enums.priority import Priority
from app.enums.status import TicketStatus


class TicketResponse(BaseModel):
    id: int
    customer: str
    subject: str
    category: Category
    priority: Priority
    status: TicketStatus
    created_at: datetime
    updated_at: datetime