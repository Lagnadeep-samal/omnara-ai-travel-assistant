from langchain.tools import tool


@tool
def tourist_places(city: str) -> str:
    """
    Get tourist attractions for a city.
    """

    return f"""
Popular tourist places in {city}:

1. Beaches
2. Museums
3. Historical forts
4. Local markets
5. Famous restaurants
"""