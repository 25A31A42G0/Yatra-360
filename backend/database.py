import sqlite3


def get_connection():
    connection = sqlite3.connect("yatra360.db")
    connection.row_factory = sqlite3.Row
    return connection


def create_tables():
    connection = get_connection()

    connection.execute("""
        CREATE TABLE IF NOT EXISTS destinations (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            state TEXT NOT NULL,
            name TEXT NOT NULL,
            description TEXT,
            budget REAL,
            best_time TEXT
        )
    """)

    connection.commit()
    connection.close()


def add_destination(state, name, description, budget, best_time):
    connection = get_connection()

    connection.execute("""
        INSERT INTO destinations
        (state, name, description, budget, best_time)
        VALUES (?, ?, ?, ?, ?)
    """, (state, name, description, budget, best_time))

    connection.commit()
    connection.close()


def get_all_destinations():
    connection = get_connection()

    destinations = connection.execute(
        "SELECT * FROM destinations"
    ).fetchall()

    connection.close()

    return [dict(destination) for destination in destinations]