from config import create_app
from extensions import db, bcrypt
from models import User, Language, Command, Example
from datetime import datetime, timedelta

app = create_app()

def seed_data():
    with app.app_context():
        # Clear existing data
        print("🗑️  Clearing existing data...")
        db.drop_all()
        db.create_all()
        
        # Create User
        print("👤 Creating user...")
        user = User(
            name="Dude",
            email="dude@playboy.com",
            password_hash=bcrypt.generate_password_hash("password123").decode('utf-8')
        )
        db.session.add(user)
        db.session.commit()
        
        # Create Languages
        print("💬 Creating languages...")
        javascript = Language(
            name="JavaScript",
            icon_url="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
            color_code="#F7DF1E",
            user_id=user.id
        )
        
        python = Language(
            name="Python",
            icon_url="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
            color_code="#3776AB",
            user_id=user.id
        )
        
        react = Language(
            name="React",
            icon_url="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
            color_code="#61DAFB",
            user_id=user.id
        )
        
        db.session.add_all([javascript, python, react])
        db.session.commit()
        
        # Create Commands
        print("⚡ Creating commands...")
        
        nested_data = Command(
            name="Get Nested Data From API Response",
            description="Safely access deeply nested properties without crashes",
            user_id=user.id
        )
        
        update_array_item = Command(
            name="Update Single Item in Array State",
            description="Immutably update one item in a state array",
            user_id=user.id
        )
        
        destructure_rename = Command(
            name="Destructure But Rename Variable",
            description="Extract properties and give them different names",
            user_id=user.id
        )
        
        flatten_nested = Command(
            name="Flatten Nested API Response",
            description="Convert nested arrays into a flat array",
            user_id=user.id
        )
        
        truthy_check = Command(
            name="Check if Value Exists",
            description="Safely check if a value is truthy/exists",
            user_id=user.id
        )
        
        conditional_render = Command(
            name="Conditional Rendering Pattern",
            description="Render components based on conditions",
            user_id=user.id
        )
        
        db.session.add_all([
            nested_data, 
            update_array_item, 
            destructure_rename, 
            flatten_nested, 
            truthy_check,
            conditional_render
        ])
        db.session.commit()
        
        # ==================== NESTED DATA EXAMPLES ====================
        print("📝 Creating 'Get Nested Data' examples...")
        
        nested_worst = Example(
            command_id=nested_data.id,
            language_id=javascript.id,
            code_block="const songs = response.user.songs;",
            style_name="Direct Access",
            practice_type="worst",
            notes="Crashes if user is null or undefined. No safety checks.",
        )
        
        nested_beginner = Example(
            command_id=nested_data.id,
            language_id=javascript.id,
            code_block="""let songs = [];
if (response && response.user && response.user.songs) {
  songs = response.user.songs;
}""",
            style_name="Defensive Checks",
            practice_type="beginner",
            notes="Verbose but explicit. Easy to understand each check.",
        )
        
        nested_archaic = Example(
            command_id=nested_data.id,
            language_id=javascript.id,
            code_block="const songs = _.get(response, 'user.songs', []);",
            style_name="Lodash Get",
            practice_type="archaic",
            notes="Required lodash library. Was standard before optional chaining.",
            created_at=datetime.utcnow() - timedelta(days=365*3),
            dethroned_at=datetime.utcnow() - timedelta(days=365),
        )
        
        nested_best = Example(
            command_id=nested_data.id,
            language_id=javascript.id,
            code_block="const songs = response?.user?.songs || [];",
            style_name="Optional Chaining",
            practice_type="best",
            notes="Modern ES2020. Clean and safe. Returns undefined if any part is null.",
            created_at=datetime.utcnow() - timedelta(days=365)
        )
        
        db.session.add_all([nested_worst, nested_beginner, nested_archaic, nested_best])
        db.session.commit()
        
        nested_archaic.dethroned_by_id = nested_best.id
        db.session.commit()
        
        # ==================== UPDATE ARRAY ITEM EXAMPLES ====================
        print("📝 Creating 'Update Array Item' examples...")
        
        update_worst = Example(
            command_id=update_array_item.id,
            language_id=react.id,
            code_block="""const song = userSongs.find(s => s.id === id);
song.title = "New Title";  // ☠️ Mutates state directly
setUserSongs(userSongs);   // React won't detect change""",
            style_name="Direct Mutation",
            practice_type="worst",
            notes="Mutates state directly. React won't re-render. Breaks immutability.",
        )
        
        update_beginner = Example(
            command_id=update_array_item.id,
            language_id=react.id,
            code_block="""const withoutOld = userSongs.filter(s => s.id !== id);
const updated = { ...songToUpdate, title: "New Title" };
setUserSongs([...withoutOld, updated]);""",
            style_name="Filter and Add",
            practice_type="beginner",
            notes="Creates new array without old item, then adds updated item. Verbose but clear.",
        )
        
        update_best = Example(
            command_id=update_array_item.id,
            language_id=react.id,
            code_block="""setUserSongs(userSongs.map(s => 
  s.id === id ? { ...s, title: "New Title" } : s
));""",
            style_name="Map with Conditional",
            practice_type="best",
            notes="Immutable update using map. Clean, concise, industry standard.",
        )
        
        db.session.add_all([update_worst, update_beginner, update_best])
        db.session.commit()
        
        # ==================== DESTRUCTURE RENAME EXAMPLES ====================
        print("📝 Creating 'Destructure Rename' examples...")
        
        destructure_worst = Example(
            command_id=destructure_rename.id,
            language_id=javascript.id,
            code_block="""const temp = userData.user;
const userInfo = temp;
const userSongs = temp.songs;""",
            style_name="Temp Variables",
            practice_type="worst",
            notes="Creates unnecessary intermediate variables. Confusing and verbose.",
        )
        
        destructure_beginner = Example(
            command_id=destructure_rename.id,
            language_id=javascript.id,
            code_block="""const user = userData.user;
const info = { id: user.id, name: user.name, email: user.email };
const songs = user.songs;""",
            style_name="Step by Step",
            practice_type="beginner",
            notes="Explicit assignment of each property. Easy to follow.",
        )
        
        destructure_best = Example(
            command_id=destructure_rename.id,
            language_id=javascript.id,
            code_block="const { songs, ...info } = userData.user;",
            style_name="Rest Operator",
            practice_type="best",
            notes="Extracts songs into its own variable, everything else goes into info. Clean and concise.",
        )
        
        db.session.add_all([destructure_worst, destructure_beginner, destructure_best])
        db.session.commit()
        
        # ==================== FLATTEN NESTED EXAMPLES ====================
        print("📝 Creating 'Flatten Nested' examples...")
        
        flatten_worst = Example(
            command_id=flatten_nested.id,
            language_id=javascript.id,
            code_block="""const flat = [];
for (let i = 0; i < languages.length; i++) {
  for (let j = 0; j < languages[i].examples.length; j++) {
    flat.push(languages[i].examples[j]);
  }
}""",
            style_name="Nested For Loops",
            practice_type="worst",
            notes="Index management hell. Hard to read. Error-prone.",
        )
        
        flatten_beginner = Example(
            command_id=flatten_nested.id,
            language_id=javascript.id,
            code_block="""const flat = [];
languages.forEach(lang => {
  lang.examples.forEach(example => {
    flat.push(example);
  });
});""",
            style_name="Nested forEach",
            practice_type="beginner",
            notes="More readable than for loops. Still verbose with nested callbacks.",
        )
        
        flatten_best = Example(
            command_id=flatten_nested.id,
            language_id=javascript.id,
            code_block="const flat = languages.flatMap(lang => lang.examples);",
            style_name="flatMap",
            practice_type="best",
            notes="Modern, concise, purpose-built for this exact use case.",
        )
        
        db.session.add_all([flatten_worst, flatten_beginner, flatten_best])
        db.session.commit()
        
        # ==================== TRUTHY CHECK EXAMPLES ====================
        print("📝 Creating 'Truthy Check' examples...")
        
        truthy_worst = Example(
            command_id=truthy_check.id,
            language_id=javascript.id,
            code_block="if (userInfo) { ... }",
            style_name="Simple If",
            practice_type="worst",
            notes="What if userInfo is an empty object {}? Still truthy but meaningless!",
        )
        
        truthy_beginner = Example(
            command_id=truthy_check.id,
            language_id=javascript.id,
            code_block="if (userInfo !== null && userInfo !== undefined) { ... }",
            style_name="Explicit Null Check",
            practice_type="beginner",
            notes="Checks both null and undefined explicitly. Verbose but clear intent.",
        )
        
        truthy_archaic = Example(
            command_id=truthy_check.id,
            language_id=javascript.id,
            code_block="if (!!userInfo) { ... }",
            style_name="Double Bang",
            practice_type="archaic",
            notes="Forces boolean conversion. Was common before ?? operator.",
            created_at=datetime.utcnow() - timedelta(days=365*2),
            dethroned_at=datetime.utcnow() - timedelta(days=180),
        )
        
        truthy_best = Example(
            command_id=truthy_check.id,
            language_id=javascript.id,
            code_block="if (userInfo ?? false) { ... }",
            style_name="Nullish Coalescing",
            practice_type="best",
            notes="Only checks for null/undefined, not falsy values like 0 or empty string.",
            created_at=datetime.utcnow() - timedelta(days=180)
        )
        
        db.session.add_all([truthy_worst, truthy_beginner, truthy_archaic, truthy_best])
        db.session.commit()
        
        truthy_archaic.dethroned_by_id = truthy_best.id
        db.session.commit()
        
        # ==================== CONDITIONAL RENDERING EXAMPLES ====================
        print("📝 Creating 'Conditional Rendering' examples...")
        
        render_worst = Example(
            command_id=conditional_render.id,
            language_id=react.id,
            code_block="""if (loading) {
  return <div>Loading...</div>;
}
if (error) {
  return <div>Error!</div>;
}
if (!data) {
  return <div>No data</div>;
}
return <div>{data}</div>;""",
            style_name="Multiple Returns",
            practice_type="worst",
            notes="Too many early returns. Hard to track all exit points.",
        )
        
        render_beginner = Example(
            command_id=conditional_render.id,
            language_id=react.id,
            code_block="""let content;
if (loading) {
  content = <div>Loading...</div>;
} else if (error) {
  content = <div>Error!</div>;
} else if (!data) {
  content = <div>No data</div>;
} else {
  content = <div>{data}</div>;
}
return content;""",
            style_name="Variable Assignment",
            practice_type="beginner",
            notes="Single return point. Easy to debug. Explicit flow control.",
        )
        
        render_best = Example(
            command_id=conditional_render.id,
            language_id=react.id,
            code_block="""return (
  <>
    {loading && <div>Loading...</div>}
    {error && <div>Error!</div>}
    {!loading && !error && !data && <div>No data</div>}
    {!loading && !error && data && <div>{data}</div>}
  </>
);""",
            style_name="Inline JSX Conditionals",
            practice_type="best",
            notes="Clean, declarative, all render logic in one place. Easy to see all states.",
        )
        
        db.session.add_all([render_worst, render_beginner, render_best])
        db.session.commit()
        
        # ==================== PYTHON EXAMPLES ====================
        print("📝 Creating Python examples...")
        
        python_nested = Example(
            command_id=nested_data.id,
            language_id=python.id,
            code_block="songs = response.get('user', {}).get('songs', [])",
            style_name="Chained Get",
            practice_type="best",
            notes="Python's dict.get() with default values. Safe and Pythonic.",
        )
        
        python_flatten = Example(
            command_id=flatten_nested.id,
            language_id=python.id,
            code_block="flat = [ex for lang in languages for ex in lang['examples']]",
            style_name="List Comprehension",
            practice_type="best",
            notes="Nested list comprehension. Pythonic and concise.",
        )
        
        python_flatten_beginner = Example(
            command_id=flatten_nested.id,
            language_id=python.id,
            code_block="""flat = []
for lang in languages:
    for example in lang['examples']:
        flat.append(example)""",
            style_name="Nested Loops",
            practice_type="beginner",
            notes="Explicit nested loops. Easier to understand for beginners.",
        )
        
        db.session.add_all([python_nested, python_flatten, python_flatten_beginner])
        db.session.commit()
        
        print("✅ Seed data created successfully!")
        print(f"   User: {user.email} / password123")
        print(f"   Languages: {Language.query.count()}")
        print(f"   Commands: {Command.query.count()}")
        print(f"   Examples: {Example.query.count()}")
        print("\n📚 Commands created:")
        for cmd in Command.query.all():
            count = Example.query.filter_by(command_id=cmd.id).count()
            print(f"   - {cmd.name} ({count} examples)")

if __name__ == '__main__':
    seed_data()