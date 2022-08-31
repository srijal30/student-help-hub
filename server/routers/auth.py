'''
All authentication here plus account creation
'''
from typing import Dict, Any

from fastapi import APIRouter
from pydantic import BaseModel
from uuid import uuid4

auth_router = APIRouter(prefix='/auth')


class Response(BaseModel):
    '''Model for responses by the server'''
    success: bool
    message: str | None = None
    data: Dict[str, Any] = {}

class LoginIn(BaseModel):
    '''Request model for login requests'''
    username: str | None = None
    email: str | None = None
    password: str

class UserIn(BaseModel):
    '''Request model for account creation requests'''
    username: str
    user_id: str = uuid4
    password: str
    email: str


auth_router.post('/create', response_model=Response)
async def create_user(new_user: UserIn) -> Response:
    '''Creates a new user'''
    # check for unique username + email
    # hash password
    # add to the db
    return Response(
        success=True
    )


auth_router.post('/login', response_model=Response)
async def login_user(login_info: LoginIn) -> Response:
    '''Logs a user in if valid credentials'''
    # hash password
    # verify credentials
    # retreive the user_id + create jwt
    # return jwt
    return Response(
        success=True,
        data={'token': token}
    )