from langchain.tools import tool


@tool
def weather(city: str) -> str:
    """
    Get weather information for a city.
    """

    return f"The weather in {city} is currently pleasant with moderate temperature."