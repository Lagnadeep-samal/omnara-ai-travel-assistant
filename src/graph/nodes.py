from langchain_core.messages import SystemMessage

from src.prompts.system_prompt import system_prompt
from src.llm.groq_llm import llm
from src.tools.tool_registry import tools


llm_with_tools = llm.bind_tools(tools)


def assistant(state):

    messages = [
        SystemMessage(content=system_prompt)
    ] + state["messages"]

    response = llm_with_tools.invoke(messages)

    return {
        "messages": [response]
    }