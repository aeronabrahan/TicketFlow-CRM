from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer

from jose import jwt, JWTError

from sqlmodel import Session, select

from app.database.database import get_session
from app.models.user import User


SECRET_KEY = "ticketflow-secret-key-change-later"
ALGORITHM = "HS256"


oauth2_scheme = OAuth2PasswordBearer(
    tokenUrl="/auth/login"
)


def get_current_user(
    token: str = Depends(oauth2_scheme),
    session: Session = Depends(get_session)
):

    try:

        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM]
        )


        email = payload.get("sub")


        if email is None:
            raise HTTPException(
                status_code=401,
                detail="Invalid token"
            )


    except JWTError:

        raise HTTPException(
            status_code=401,
            detail="Invalid token"
        )


    user = session.exec(
        select(User)
        .where(User.email == email)
    ).first()


    if user is None:

        raise HTTPException(
            status_code=401,
            detail="User not found"
        )


    return user