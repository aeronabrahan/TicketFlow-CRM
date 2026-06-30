from sqlmodel import Session, select

from app.database.database import engine
from app.models.user import User

with Session(engine) as session:
    user = session.exec(
        select(User).where(User.email == "aeron@test.com")
    ).first()

    if user:
        print("Current role:", user.role)

        user.role = "Admin"

        session.add(user)
        session.commit()
        session.refresh(user)

        print("New role:", user.role)
    else:
        print("User not found.")