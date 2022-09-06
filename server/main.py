from src.app import app
from uvicorn import run

if __name__ == "__main__":
    run(app, use_colors=False, debug=True, host='0.0.0.0')
