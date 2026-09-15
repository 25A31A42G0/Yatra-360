from pydantic import BaseModel


class Destination(BaseModel):
    state: str
    name: str
    description: str
    budget: float
    best_time: str
class ItineraryRequest(BaseModel):
    destination: str
    days: int    