from langchain.tools import tool


@tool
def cheap_hotels(city: str) -> str:
    """
    Find cheap hotels in a city.
    """

    return f"""
Cheap hotels in {city}:

1. Budget Inn
2. Hotel Blue
3. City Stay Hotel
4. Comfort Residency
"""