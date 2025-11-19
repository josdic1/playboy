from config import create_app
from extensions import db
from routes import register_routes

app = create_app()

# Import models to register them
from models import User, Language, Command, Example

# Register routes
register_routes(app)

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    
    app.run(debug=True, port=5555)