"""All user utilities here."""
from fastapi import APIRouter

from ..database import db
from ..utils import decode_token
from ..models import Response, Auth, UserOut, CommentIn

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


# comment on an essay
@user_router.post('/comment', response_model=Response)
async def comment_on_essay(new_comment: CommentIn) -> Response:
    # check credentials
    user_id = decode_token(new_comment.token)
    if not user_id:
        return Response(
            success=False,
            message='Invalid credentials'
        )
    # add comment to database
    await db.comment.create(
        data={
            'content': new_comment.content,
            'rating': new_comment.rating,
            'creator': {
                'connect': {
                    'id': user_id
                }
            },
            'essay': {
                'connect': {
                    'id': new_comment.essay_id
                }
            }
        }
    )
    # give money to commentor if not creator of essay
    essay = await db.essay.find_unique(where={'id':new_comment.essay_id})
    if essay.creator_id != user_id:
        await db.user.update(
            where={
                'id': user_id
            },
            data={
                'coins': {
                    'increment': 20
                }
            }
        )
    return Response(
        success=True
    )