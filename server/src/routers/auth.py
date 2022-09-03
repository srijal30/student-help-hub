"""All authentication here plus account creation."""
from fastapi import APIRouter

from ..models import LoginIn, Response, UserIn
from ..database import db
from ..utils import hash_password, create_token

auth_router = APIRouter(prefix='/auth')


@auth_router.post('/create', response_model=Response)
async def create_user(new_user: UserIn) -> Response:
    """Creates a new user"""
    # check for unique (username) + email
    existing_user = await db.user.find_unique(
        where={
            'email': new_user.email
        }
    )
    if existing_user:
        return Response(
            success=False,
            message='There is already a user with that email'
        )
    # hash password
    new_user.password = hash_password(new_user.password)
    # add to the db
    await db.user.create(
        data=new_user.dict()
    )
    return Response(
        success=True
    )


@auth_router.post('/login', response_model=Response)
async def login_user(login_info: LoginIn) -> Response:
    """Logs a user in if valid credentials"""
    # hash password
    login_info.password = hash_password(login_info.password)
    # check if user exists
    user = await db.user.find_unique(
        where={
            'email': login_info.email
        }
    )
    if not user:
        return Response(
            success=False,
            message='Invalid email or password'
        )
    # verify password
    if user.password != login_info.password:
        return Response(
            success=False,
            message='Invalid email or password'
        )
    # retreive the user_id + create jwt
    token = create_token(user.id)
    # return jwt
    return Response(
        success=True,
        data={'token': token}
    )
