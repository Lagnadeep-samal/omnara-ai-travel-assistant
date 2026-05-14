from flask import Flask
from flask import render_template
from flask import request
from flask import jsonify

import time

from langchain_core.messages import HumanMessage

from src.graph.builder import graph


app = Flask(__name__)


# ==========================
# HOME PAGE
# ==========================

@app.route("/")
def home():

    return render_template("index.html")


# ==========================
# CHAT API
# ==========================

@app.route("/chat", methods=["POST"])
def chat():

    try:

        data = request.get_json()

        user_message = data["message"]


        try:

            response = graph.invoke(
                {
                    "messages": [
                        HumanMessage(
                            content=user_message
                        )
                    ]
                }
            )

        except Exception as e:

            if "rate_limit_exceeded" in str(e):

                time.sleep(2)

                response = graph.invoke(
                    {
                        "messages": [
                            HumanMessage(
                                content=user_message
                            )
                        ]
                    }
                )

            else:
                raise e


        final_response = response["messages"][-1].content

        return jsonify(
            {
                "response": final_response
            }
        )

    except Exception as e:

        print(e)

        return jsonify(
            {
                "response": str(e)
            }
        )


# ==========================
# RUN APP
# ==========================

if __name__ == "__main__":

    print("Starting Omnara Server...")

    app.run(
        host="0.0.0.0",
        port=5000,
        debug=True
    )