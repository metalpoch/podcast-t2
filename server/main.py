from dotenv import load_dotenv

from api import app

load_dotenv()

if __name__ == "__main__":
    app.run(debug=True)
