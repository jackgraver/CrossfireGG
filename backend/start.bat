@echo off
call .venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload --host :: --port 8000
pause