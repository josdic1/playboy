from config import db
from datetime import datetime

class User(db.Model):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Relationships
    languages = db.relationship('Language', back_populates='user', cascade='all, delete-orphan')
    commands = db.relationship('Command', back_populates='user', cascade='all, delete-orphan')
    
    def __repr__(self):
        return f'<User {self.name}>'


class Language(db.Model):
    __tablename__ = 'languages'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)  # "JavaScript", "Python", etc.
    icon_url = db.Column(db.String(255))
    color_code = db.Column(db.String(7))  # "#F7DF1E"
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Relationships
    user = db.relationship('User', back_populates='languages')
    examples = db.relationship('Example', back_populates='language', cascade='all, delete-orphan')
    
    def __repr__(self):
        return f'<Language {self.name}>'


class Command(db.Model):
    __tablename__ = 'commands'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)  # "filter array", "join tables"
    description = db.Column(db.Text)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Relationships
    user = db.relationship('User', back_populates='commands')
    examples = db.relationship('Example', back_populates='command', cascade='all, delete-orphan')
    
    def __repr__(self):
        return f'<Command {self.name}>'


class Example(db.Model):
    __tablename__ = 'examples'
    
    id = db.Column(db.Integer, primary_key=True)
    command_id = db.Column(db.Integer, db.ForeignKey('commands.id'), nullable=False)
    language_id = db.Column(db.Integer, db.ForeignKey('languages.id'), nullable=False)
    code_block = db.Column(db.Text, nullable=False)
    style_name = db.Column(db.String(100))  # "Functional", "Imperative", etc.
    practice_type = db.Column(db.Enum('best', 'worst', 'beginner', 'archaic'), nullable=False)
    notes = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Dethroning mechanism
    dethroned_at = db.Column(db.DateTime, nullable=True)
    dethroned_by_id = db.Column(db.Integer, db.ForeignKey('examples.id'), nullable=True)
    
    # Relationships
    command = db.relationship('Command', back_populates='examples')
    language = db.relationship('Language', back_populates='examples')
    
    # Self-referential relationship for dethroning
    dethroned_by = db.relationship('Example', remote_side=[id], foreign_keys=[dethroned_by_id])
    
    def __repr__(self):
        return f'<Example {self.practice_type} - {self.style_name}>'
