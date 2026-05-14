from langchain.tools import tool


@tool
def budget_estimator(place: str) -> str:
    """
    Estimate travel budget for a destination.
    """

    return f"""
Estimated budget for visiting {place}:

Budget Trip: ₹15,000
Mid Range Trip: ₹40,000
Luxury Trip: ₹1,00,000
"""