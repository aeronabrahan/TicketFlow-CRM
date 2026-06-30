from pydantic import BaseModel

from app.enums.priority import Priority
from app.enums.category import Category
from app.enums.status import TicketStatus

class TicketCreate(BaseModel):
    customer: str
    subject: str
    category: Category = Category.OTHER
    priority: Priority = Priority.MEDIUM
    status: TicketStatus = TicketStatus.OPEN


class TicketUpdate(BaseModel):
    status: TicketStatus | None = None
    priority: Priority | None = None
    category: Category | None = None