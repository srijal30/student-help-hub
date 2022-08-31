from dotenv import load_dotenv
from os import getenv
from hashlib import sha256
from jwt import encode, decode

load_dotenv()

def hash_password(password: str) -> str:
    '''Hashes a password using sha256... Also adds salt'''
    payload = (password + getenv('SALT')).encode()
    hash = sha256(payload)
    return hash.hexdigest()


def create_token(user_id: str) -> str:
    '''Creates a token with user_id as the payload'''
    payload = {
        'user_id': user_id
    }
    token = encode(
        payload=payload,
        key=getenv('JWTSECRET'),
        algorithm='HS256'
    )
    return token


def decode_token(jwt: str) -> str | None:
    '''Returns user_id if jwt is valid, else None.'''
    try:
        payload = decode(
            jwt=jwt,
            key=getenv('JWTSECRET'),
            algorithms='HS256'
        )
        return payload['user_id']
    except Exception:
         return None
