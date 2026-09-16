from fastapi import FastAPI
from backend.database import create_tables, get_all_destinations
from backend.models import ItineraryRequest

app = FastAPI()

create_tables()


@app.get("/")
def home():
    return {"message": "Yatra 360 Backend is Running!"}


@app.get("/api/destinations")
def get_destinations():
    return get_all_destinations()


@app.get("/api/destinations/{state}")
def get_destinations_by_state(state: str):
    destinations = get_all_destinations()

    return [
        destination
        for destination in destinations
        if destination["state"].lower() == state.lower()
    ]


@app.get("/api/destination/{name}")
def get_destination(name: str):
    destinations = get_all_destinations()

    for destination in destinations:
        if destination["name"].lower() == name.lower():
            return destination

    return {"error": "Destination not found"}


@app.get("/api/budget/{name}")
def get_budget(name: str):
    destinations = get_all_destinations()

    for destination in destinations:
        if destination["name"].lower() == name.lower():

            total = destination["budget"]

            return {
                "destination": destination["name"],
                "total_budget": total,
                "travel": total * 0.35,
                "stay": total * 0.40,
                "food": total * 0.15,
                "activities": total * 0.10
            }

    return {"error": "Destination not found"}


@app.post("/api/itinerary")
def create_itinerary(request: ItineraryRequest):

    destinations = get_all_destinations()

    destination = None

    for item in destinations:
        if item["name"].lower() == request.destination.lower():
            destination = item
            break

    if destination is None:
        return {"error": "Destination not found"}

    itinerary = []

    activities = [
        "Explore local attractions",
        "Visit famous places",
        "Enjoy local food",
        "Relax and explore nearby areas",
        "Shopping and sightseeing"
    ]

    for day in range(1, request.days + 1):
        activity = activities[(day - 1) % len(activities)]

        itinerary.append({
            "day": day,
            "destination": destination["name"],
            "activity": activity
        })

    return {
        "destination": destination["name"],
        "days": request.days,
        "itinerary": itinerary
    }





