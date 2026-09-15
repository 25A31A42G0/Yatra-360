from backend.database import create_tables, add_destination

create_tables()

add_destination(
    "Andhra Pradesh",
    "Tirupati",
    "Famous pilgrimage destination",
    3000,
    "October to March"
)

add_destination(
    "Andhra Pradesh",
    "Araku Valley",
    "Beautiful hill station and valley",
    4000,
    "October to February"
)

add_destination(
    "Andhra Pradesh",
    "Visakhapatnam",
    "Coastal city with beautiful beaches",
    3500,
    "October to March"
)

print("Destinations added successfully!")