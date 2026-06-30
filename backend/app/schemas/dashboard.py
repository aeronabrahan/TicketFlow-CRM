from pydantic import BaseModel


class DashboardStats(BaseModel):
    total_tickets: int
    open_tickets: int
    pending_tickets: int
    closed_tickets: int