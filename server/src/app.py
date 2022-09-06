"""This file contains all the config for the app."""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .routers.auth import auth_router
from .routers.user import user_router
from .routers.essay import essay_router

from  .database import db


app = FastAPI()


app.include_router(essay_router)
app.include_router(auth_router)
app.include_router(user_router)


app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_methods=['POST', 'OPTIONS']
)


@app.on_event('startup')
async def on_startup():
    """Prepares for the startup of the server."""
    print('hello world')
    await db.connect()


@app.on_event('shutdown')
async def on_shutdown():
    """Prepares for the shutting down of the server."""
    print('bye world')
    await db.disconnect()
