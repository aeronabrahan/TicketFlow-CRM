from enum import Enum

class TicketStatus(str, Enum):
    OPEN = "Open"
    PENDING = "Pending"
    CLOSED = "Closed"