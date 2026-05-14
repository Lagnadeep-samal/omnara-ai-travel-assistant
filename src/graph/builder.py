from langgraph.graph import StateGraph
from langgraph.graph import START
from langgraph.graph import END

from langgraph.prebuilt import ToolNode
from langgraph.prebuilt import tools_condition

from src.graph.state import State
from src.graph.nodes import assistant

from src.tools.tool_registry import tools


builder = StateGraph(State)

# Assistant Node
builder.add_node(
    "assistant",
    assistant
)

# Tools Node
builder.add_node(
    "tools",
    ToolNode(tools)
)

# Start Edge
builder.add_edge(
    START,
    "assistant"
)

# Conditional Edge
builder.add_conditional_edges(
    "assistant",
    tools_condition,
    {
        "tools": "tools",
        "__end__": END
    }
)

# Return back after tool execution
builder.add_edge(
    "tools",
    "assistant"
)

# Compile graph
graph = builder.compile()