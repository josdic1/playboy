from flask import Flask
from flask_cors import CORS
from extensions import db, migrate, bcrypt
import os

def create_app():
    app = Flask(__name__)
    
    # Get the absolute path to the server directory
    basedir = os.path.abspath(os.path.dirname(__file__))
    
    # Create database in the server directory
    app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{os.path.join(basedir, "playboy.db")}'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.secret_key = 'dev-secret-key-change-in-production'
    
    # Initialize extensions with app
    db.init_app(app)
    migrate.init_app(app, db)
    bcrypt.init_app(app)
    CORS(app, supports_credentials=True)
    
    return app