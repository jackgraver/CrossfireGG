import os
from fastapi import Cookie, Depends, HTTPException, Header, status
from fastapi.security import OAuth2PasswordBearer
from jose import jwt, JWTError

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

SECRET_KEY = os.getenv("JWT_SECRET_KEY")
ALGORITHM = "HS256"

EXPECTED_API_KEY = "f5742404-28aa-435c-b6c8-333809cfac46"

async def verify_api_key(x_api_key: str = Header(...)):
    if x_api_key != EXPECTED_API_KEY:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Invalid or missing API key",
        )

async def get_current_user(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        if payload is None:
            raise HTTPException(status_code=401, detail="User ID not found in token")
        return payload
    except JWTError as e:
        raise HTTPException(status_code=401, detail="Invalid token")

async def get_auth_user(access_token: str = Cookie(None)):
    if not access_token:
        raise HTTPException(status_code=401, detail="Missing access token")

    try:
        payload = jwt.decode(access_token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: str = payload.get("user_id")
        if user_id is None:
            raise HTTPException(status_code=401, detail="User ID not found in token")
        return user_id
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")

async def has_token(access_token: str = Cookie(None)):
    if not access_token or access_token == "bad":
        raise HTTPException(status_code=401, detail="Invalid token")
    
    # Optionally decode and verify the JWT here
    return access_token  # or user info from decoded token