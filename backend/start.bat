@echo off
call .venv\Scripts\activate
@REM uvicorn main:app --reload --host 0.0.0.0 --port 8000
uvicorn main:app --reload --host :: --port 8000
pause