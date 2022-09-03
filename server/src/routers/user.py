"""All user utilities here."""
from fastapi import APIRouter

from ..database import db
from ..utils import decode_token
from ..models import Response, Auth, UserOut

user_router = APIRouter(prefix='/user')


# get user info
@user_router.post('/info', response_model=Response)
async def get_user_info(auth: Auth) -> Response:
    # check credentials
    user_id = decode_token(auth.token)
    if not user_id:
        return Response(
            success=False,
            message='Invalid credentials'
        )
    # query databasae
    user = await db.user.find_unique(
        where={
            'id':user_id
        }
    )
    return Response(
        success=True,
        data=UserOut(**user.dict())
    )


# create essay


# request/stop essay comments (toggles Essay visibility)


# comment on an essay