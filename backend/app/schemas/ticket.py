from pydantic import BaseModel

from app.enums.priority import Priority
from app.enums.category import Category
from app.enums.status import TicketStatus


class TicketCreate(BaseModel):
    customer: str
    subject: str
    description: str = ""

    category: Category = Category.OTHER
    priority: Priority = Priority.MEDIUM
    status: TicketStatus = TicketStatus.OPEN

    assigned_to_id: int | None = None


class TicketUpdate(BaseModel):
    customer: str | None = None
    subject: str | None = None
    description: str | None = None

    category: Category | None = None
    priority: Priority | None = None
    status: TicketStatus | None = None

    assigned_to_id: int | None = None