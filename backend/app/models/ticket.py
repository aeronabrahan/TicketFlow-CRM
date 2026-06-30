from typing import Optional

from sqlmodel import Field, SQLModel


class Ticket(SQLModel, table=True):

    id: Optional[int] = Field(default=None, primary_key=True)

    customer: str

    subject: str

    status: str