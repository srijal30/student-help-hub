from fastapi import FastAPI
from routers.auth import auth_router
from routers.user import user_router

app = FastAPI()


@app.on_event('startup')
async def on_startup():
    '''Prepares for the startup of the server'''
    print('hello world')

    
@app.on_event('shutdown')
async def on_startup():
    '''Prepares for the shutting down of the server'''
    print('bye world')


app.include_router(auth_router)
app.include_router(user_router)

