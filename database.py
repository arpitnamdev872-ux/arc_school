import sqlite3

conn = sqlite3.connect('database/school.db')

cursor = conn.cursor()

cursor.execute('''

CREATE TABLE IF NOT EXISTS complaints (

    id INTEGER PRIMARY KEY AUTOINCREMENT,

    name TEXT,

    mobile TEXT,

    category TEXT,

    subject TEXT,

    complaint TEXT,

    status TEXT DEFAULT 'Pending'

)

''')

cursor.execute("""

CREATE TABLE IF NOT EXISTS news(

    id INTEGER PRIMARY KEY AUTOINCREMENT,

    title TEXT,

    description TEXT,

    image TEXT

)

""")

conn.commit()

conn.close()

print("Database Created Successfully")