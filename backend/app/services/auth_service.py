from sqlmodel import Session, select

from app.models.user import User
from app.schemas.user import UserCreate

from app.core.security import hash_password



def create_user(
    session: Session,
    user: UserCreate
):

    db_user = User(
        username=user.username,
        email=user.email,
        hashed_password=hash_password(
            user.password
        )
    )


    session.add(db_user)
    session.commit()
    session.refresh(db_user)


    return db_user



def authenticate_user(
    session,
    email,
    password
):

    user = session.exec(
        select(User)
        .where(User.email == email)
    ).first()


    if not user:
        return None


    from app.core.security import verify_password


    if not verify_password(
        password,
        user.hashed_password
    ):
        return None


    return user