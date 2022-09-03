from typing import Any, Dict
from pydantic import BaseModel


class Response(BaseModel):
    """Model for responses by the server."""
    success: bool
    message: str | None = None
    data: Dict[str, Any] = {}


class LoginIn(BaseModel):
    """Request model for login requests."""
    email: str
    password: str


class UserIn(BaseModel):
    """Request model for account creation requests."""
    username: str
    password: str
    email: str
