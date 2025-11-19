from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_bcrypt import Bcrypt

# Create extension objects WITHOUT binding to app yet
db = SQLAlchemy()
migrate = Migrate()
bcrypt = Bcrypt()