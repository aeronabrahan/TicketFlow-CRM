from enum import Enum

class Category(str, Enum):
    REFUND = "Refund"
    SHIPPING = "Shipping"
    PAYMENT = "Payment"
    DAMAGED_ITEM = "Damaged Item"
    TECHNICAL = "Technical"
    OTHER = "Other"