from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm

from sqlmodel import Session

from app.database.database import get_session

from app.schemas.user import UserCreate

from app.services.auth_service import (
    create_user,
    authenticate_user
)

from app.core.security import create_token


router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)



@router.post("/register")
def register(
    user: UserCreate,
    session: Session = Depends(get_session)
):

    return create_user(
        session,
        user
    )


@router.post("/login")
def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    session: Session = Depends(get_session)
):

    db_user = authenticate_user(
        session,
        form_data.username,   # This will contain the email
        form_data.password
    )

    if not db_user:
        raise HTTPException(
            status_code=401,
            detail="Invalid credentials"
        )

    token = create_token(
        {
            "sub": db_user.email
        }
    )

    return {
        "access_token": token,
        "token_type": "bearer"
    }