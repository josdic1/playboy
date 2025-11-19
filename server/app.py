from config import create_app
from extensions import db

app = create_app()

# Import models to register them with SQLAlchemy
from models import User, Language, Command, Example

if __name__ == '__main__':
    with app.app_context():
        db.create_all()  # Create tables if they don't exist
    
    app.run(debug=True, port=5555)
