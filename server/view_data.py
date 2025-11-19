from config import create_app
from extensions import db
from models import User, Language, Command, Example

app = create_app()

def view_all_data():
    with app.app_context():
        print("\n" + "="*80)
        print("PLAYBOY DATABASE CONTENTS")
        print("="*80)
        
        # Show User
        user = User.query.first()
        if user:
            print(f"\n👤 USER: {user.name} ({user.email})")
        
        # Show Languages
        print(f"\n💬 LANGUAGES ({Language.query.count()}):")
        for lang in Language.query.all():
            print(f"   - {lang.name} ({lang.color_code})")
        
        # Show Commands with their examples
        print(f"\n⚡ COMMANDS & EXAMPLES ({Command.query.count()} commands):")
        for cmd in Command.query.all():
            examples = Example.query.filter_by(command_id=cmd.id).all()
            print(f"\n   📌 {cmd.name}")
            print(f"      {cmd.description}")
            print(f"      Examples: {len(examples)}")
            
            for ex in examples:
                lang = Language.query.get(ex.language_id)
                print(f"\n      [{ex.practice_type.upper()}] {lang.name} - {ex.style_name}")
                print(f"      {ex.notes}")
                if len(ex.code_block) > 100:
                    print(f"      Code: {ex.code_block[:100]}...")
                else:
                    print(f"      Code: {ex.code_block}")
                
                if ex.dethroned_by_id:
                    dethroner = Example.query.get(ex.dethroned_by_id)
                    print(f"      ⚠️  Dethroned by: {dethroner.style_name}")

if __name__ == '__main__':
    view_all_data()