from datetime import datetime, timedelta

from jose import jwt
from passlib.context import CryptContext


SECRET_KEY = "ticketflow-secret-key-change-later"

ALGORITHM = "HS256"


pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto"
)



def hash_password(password):

    return pwd_context.hash(password)



def verify_password(
    plain,
    hashed
):

    return pwd_context.verify(
        plain,
        hashed
    )



def create_token(data):

    payload = data.copy()

    payload["exp"] = (
        datetime.utcnow()
        +
        timedelta(hours=24)
    )

    return jwt.encode(
        payload,
        SECRET_KEY,
        algorithm=ALGORITHM
    )