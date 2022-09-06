"""All Essay utilities here."""
from fastapi import APIRouter
from ..models import EssayIn, EssayOut, Response, Auth
from ..database import db
from ..utils import decode_token
from random import sample

essay_router = APIRouter(prefix='/essay')


@essay_router.post('/create', response_model=Response)
async def create_essay(new_essay: EssayIn) -> Response:
    """Endpoint to create an essay."""
    # validate token + retreive the user id
    user_id = decode_token(new_essay.token)
    if not user_id:
        return Response(
            success=False,
            message="Invalid credentials"
        )
    # check if enough coins
    user = await db.user.find_unique(where={'id':user_id})
    if user.coins < 20:
        return Response(
            success=False,
            message="Not enough coins"
        )
    await db.user.update(
        where={'id':user_id},
        data={
            'coins': user.coins-20
        }
    )    
    # add the essay to the db
    await db.essay.create(
        data={
            'anonymous': new_essay.anonymous,
            'title': new_essay.title,
            'content': new_essay.content,
            'message': new_essay.message,
            'creator': {
                'connect': {
                    'id': user_id
                }
            }
        }
    )
    return Response(
        success=True
    )


@essay_router.post('/yours', response_model=Response)
async def get_your_essays(auth: Auth) -> Response:
    """Endpoint to get your essays."""
    # check for valid token
    user_id = decode_token(auth.token)
    if not user_id:
        return Response(
            success=False,
            message="Invalid Credentials"
        )
    # find all essays
    essays = await db.essay.find_many(
        where={
            'creator_id': user_id
        },
        include={
            'comments': True
        }
    )
    # convert and send
    return Response(
        success=True,
        data={
            'essays':[(essay.dict()) for essay in essays]
        }
    )


@essay_router.post('/others', response_model=Response)
async def get_random_essays(auth: Auth) -> Response:
    """Endpoint to get random essays that are not yours."""
    # check if valid token
    user_id = decode_token(auth.token)
    if not user_id:
        return Response(
            success=False,
            message="Invalid Credentials"
        )
    # get random essay list
    essays = await db.essay.find_many(
        where={
            'creator_id': {
                'not': user_id
            }
        },
        include={
            'comments': True
        }
    )
    essays = sample(essays, min(10, len(essays)))
    # convert and send
    return Response(
        success=True,
        data={
            'essays':[(essay.dict()) for essay in essays]
        }
    )