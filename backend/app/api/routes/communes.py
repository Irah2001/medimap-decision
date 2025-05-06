import uuid
from typing import Any

from fastapi import APIRouter, HTTPException
from sqlmodel import func, select

from app.api.deps import SessionDep
from app.models import Commune, CommunePublic, CommunesPublic

router = APIRouter(prefix="/communes", tags=["communes"])


@router.get("/", response_model=CommunesPublic)
def read_communes(session: SessionDep) -> Any:
    """
    Retrieve all communes.
    """
    count_statement = select(func.count()).select_from(Commune)
    count = session.exec(count_statement).one()
    statement = select(Commune)
    communes = session.exec(statement).all()

    return CommunesPublic(data=communes, count=count)


@router.get("/{id}", response_model=CommunePublic)
def read_commune(session: SessionDep, id: uuid.UUID) -> Any:
    """
    Get commune by ID.
    """
    commune = session.get(Commune, id)
    if not commune:
        raise HTTPException(status_code=404, detail="Commune not found")
    return commune
