from typing import Any, Dict, List
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
    email: str
    password: str
    coins: int = 100


class UserOut(BaseModel):
    """Response model for user object."""
    username: str
    email: str
    coins: float
    rating: float = 0  # will this default to null? 
    # to be added: Essays + Comments + Karma


class Auth(BaseModel):
    """Takes in token from user."""
    token: str


# add edit essay in the future
# the creator_id will be in the token
class EssayIn(Auth):
    """Request model for creating an essay."""
    anonymous: bool = True
    title: str
    content: str
    message: str


# request model for comment creation
# the creator_id will be in the token
class CommentIn(Auth):
    """Request model for comment creation."""
    essay_id: str
    content: str
    rating: float = 0


# do we need to send out comment id as well?
class CommentOut(BaseModel):
    """Response model for comment object."""
    id: str
    creator: UserOut
    content: str
    rating: float

    class Config:
        orm_mode = True


# TO DO... add a way to hide the sender if anonymous requested
class EssayOut(BaseModel):
    """Response model for essay object."""
    id: str
    title: str
    content: str
    message: str
    anonymous: bool
    comments: List[CommentOut]

    class Config:
        orm_mode = True
