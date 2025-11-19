from flask import jsonify, request, session
from extensions import db, bcrypt
from models import User, Language, Command, Example

def register_routes(app):
    
    @app.route('/')
    def home():
        return jsonify({
            "message": "Welcome to Playboy API",
            "endpoints": {
                "/check_session": "Check if user is logged in",
                "/login": "Login (POST)",
                "/logout": "Logout (POST)",
                "/languages": "Get all languages",
                "/commands": "Get all commands",
                "/commands/<id>": "Get specific command with examples",
                "/examples": "Get all examples",
                "/examples/<id>": "Get specific example"
            }
        })

    # ==================== AUTH ROUTES ====================
    
    @app.route('/check_session')
    def check_session():
        user_id = session.get('user_id')
        
        if user_id:
            user = User.query.get(user_id)
            if user:
                return jsonify({
                    "logged_in": True,
                    "user": {
                        "id": user.id,
                        "name": user.name,
                        "email": user.email
                    }
                }), 200
        
        return jsonify({"logged_in": False}), 200

    @app.route('/login', methods=['POST'])
    def login():
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')
        
        user = User.query.filter_by(email=email).first()
        
        if user and bcrypt.check_password_hash(user.password_hash, password):
            session['user_id'] = user.id
            return jsonify({
                "id": user.id,
                "name": user.name,
                "email": user.email
            }), 200
        
        return jsonify({"error": "Invalid credentials"}), 401

    @app.route('/logout', methods=['POST'])
    def logout():
        session.pop('user_id', None)
        return jsonify({"message": "Logged out"}), 200

    # ==================== DATA ROUTES ====================
    
    @app.route('/languages')
    def get_languages():
        # TODO: Filter by logged-in user
        languages = Language.query.all()
        return jsonify([{
            "id": lang.id,
            "name": lang.name,
            "color_code": lang.color_code,
            "icon_url": lang.icon_url
        } for lang in languages])

    @app.route('/commands')
    def get_commands():
        # TODO: Filter by logged-in user
        commands = Command.query.all()
        return jsonify([{
            "id": cmd.id,
            "name": cmd.name,
            "description": cmd.description,
            "example_count": Example.query.filter_by(command_id=cmd.id).count()
        } for cmd in commands])

    @app.route('/commands/<int:id>')
    def get_command_with_examples(id):
        command = Command.query.get_or_404(id)
        examples = Example.query.filter_by(command_id=id).all()
        
        return jsonify({
            "command": {
                "id": command.id,
                "name": command.name,
                "description": command.description
            },
            "examples": [{
                "id": ex.id,
                "language_id": ex.language_id,
                "language_name": Language.query.get(ex.language_id).name,
                "style_name": ex.style_name,
                "practice_type": ex.practice_type,
                "code_block": ex.code_block,
                "notes": ex.notes,
                "created_at": ex.created_at.isoformat() if ex.created_at else None,
                "dethroned_at": ex.dethroned_at.isoformat() if ex.dethroned_at else None,
                "dethroned_by_id": ex.dethroned_by_id
            } for ex in examples]
        })

    @app.route('/examples')
    def get_all_examples():
        # TODO: Filter by logged-in user
        examples = Example.query.all()
        return jsonify([{
            "id": ex.id,
            "command_id": ex.command_id,
            "command_name": Command.query.get(ex.command_id).name,
            "language_id": ex.language_id,
            "language_name": Language.query.get(ex.language_id).name,
            "practice_type": ex.practice_type,
            "style_name": ex.style_name,
            "code_block": ex.code_block[:100] + "..." if len(ex.code_block) > 100 else ex.code_block,
            "notes": ex.notes
        } for ex in examples])

    @app.route('/examples/<int:id>')
    def get_example(id):
        example = Example.query.get_or_404(id)
        command = Command.query.get(example.command_id)
        language = Language.query.get(example.language_id)
        
        result = {
            "id": example.id,
            "command": {
                "id": command.id,
                "name": command.name,
                "description": command.description
            },
            "language": {
                "id": language.id,
                "name": language.name,
                "color_code": language.color_code
            },
            "style_name": example.style_name,
            "practice_type": example.practice_type,
            "code_block": example.code_block,
            "notes": example.notes,
            "created_at": example.created_at.isoformat() if example.created_at else None,
            "dethroned_at": example.dethroned_at.isoformat() if example.dethroned_at else None
        }
        
        # If this was dethroned, show what replaced it
        if example.dethroned_by_id:
            dethroner = Example.query.get(example.dethroned_by_id)
            result["dethroned_by"] = {
                "id": dethroner.id,
                "style_name": dethroner.style_name,
                "practice_type": dethroner.practice_type
            }
        
        return jsonify(result)