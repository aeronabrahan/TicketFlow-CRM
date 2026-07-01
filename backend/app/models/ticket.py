from datetime import datetime
from typing import Optional

from sqlmodel import Relationship
from sqlmodel import Field, SQLModel

from app.enums.status import TicketStatus
from app.enums.priority import Priority
from app.enums.category import Category
from app.models.user import User


class Ticket(SQLModel, table=True):
    id: Optional[int] = Field(
        default=None,
        primary_key=True
    )
    customer: str
    subject: str
    description: str = ""
    category: Category = Category.OTHER
    priority: Priority = Priority.MEDIUM
    status: TicketStatus = TicketStatus.OPEN
    created_at: datetime = Field(
        default_factory=datetime.utcnow
    )
    updated_at: datetime = Field(
        default_factory=datetime.utcnow
    )

    assigned_to_id: int | None = Field(
        default=None,
        foreign_key="user.id"
    )
    
    assigned_to: User | None = Relationship()