const chatBox = document.getElementById("chat-box");


// ==========================
// SEND MESSAGE FUNCTION
// ==========================

async function sendMessage(customMessage = null) {

    const input = document.getElementById("user-input");

    let message = customMessage || input.value;

    if(message.trim() === ""){
        return;
    }


    // USER MESSAGE UI

    chatBox.innerHTML += `

    <div class="bot-message" style="justify-content:flex-end;">

        <div class="message-content" style="max-width:70%;">

            <div class="message-header" style="justify-content:flex-end;">

                <span class="time">
                    Just now
                </span>

                <span class="agent-name">
                    You
                </span>

            </div>

            <div
                class="message-bubble"
                style="
                    background:
                    linear-gradient(
                        135deg,
                        #a445ff,
                        #ff4fd8
                    );
                "
            >
                ${message}
            </div>

        </div>

    </div>

    `;


    input.value = "";

    chatBox.scrollTop = chatBox.scrollHeight;


    // LOADING MESSAGE

    const loadingId = "loading-" + Date.now();

    chatBox.innerHTML += `

    <div
        class="bot-message"
        id="${loadingId}"
    >

        <div class="avatar">
            🤖
        </div>

        <div class="message-content">

            <div class="message-header">

                <span class="agent-name">
                    Omnara
                </span>

                <span class="time">
                    Typing...
                </span>

            </div>

            <div class="message-bubble">

                Thinking ✨

            </div>

        </div>

    </div>

    `;

    chatBox.scrollTop = chatBox.scrollHeight;


    // FETCH API

    try {

        const response = await fetch("/chat", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                message: message
            })
        });

        const data = await response.json();


        // REMOVE LOADING

        document.getElementById(loadingId).remove();


        // BOT RESPONSE

        chatBox.innerHTML += `

        <div class="bot-message">

            <div class="avatar">
                🤖
            </div>

            <div class="message-content">

                <div class="message-header">

                    <span class="agent-name">
                        Omnara
                    </span>

                    <span class="time">
                        Just now
                    </span>

                </div>

                <div class="message-bubble">

                    ${data.response}

                </div>

            </div>

        </div>

        `;

        chatBox.scrollTop = chatBox.scrollHeight;

    }

    catch(error){

        document.getElementById(loadingId).remove();

        chatBox.innerHTML += `

        <div class="bot-message">

            <div class="avatar">
                ⚠
            </div>

            <div class="message-content">

                <div class="message-header">

                    <span class="agent-name">
                        Omnara
                    </span>

                </div>

                <div class="message-bubble">

                    Something went wrong.
                    Please try again.

                </div>

            </div>

        </div>

        `;
    }
}


// ==========================
// ENTER KEY SUPPORT
// ==========================

document
.getElementById("user-input")
.addEventListener("keypress", function(event){

    if(event.key === "Enter"){
        sendMessage();
    }
});


// ==========================
// MENU BUTTON FEATURES
// ==========================

const menuItems =
document.querySelectorAll(".menu-item");

menuItems.forEach(item => {

    item.addEventListener("click", () => {

        // REMOVE ACTIVE
        menuItems.forEach(el =>
            el.classList.remove("active")
        );

        // ADD ACTIVE
        item.classList.add("active");

        const text =
        item.innerText.trim();


        // ==========================
        // CHAT
        // ==========================

        if(text === "Chat"){

            sendMessage(
                "Hello Omnara"
            );
        }


        // ==========================
        // DESTINATIONS
        // ==========================

        if(text === "Destinations"){

            sendMessage(
                "Suggest top travel destinations for 2026"
            );
        }


        // ==========================
        // BUDGET PLANNER
        // ==========================

        if(text === "Budget Planner"){

            sendMessage(
                "Create a budget-friendly travel plan"
            );
        }


        // ==========================
        // TRAVEL TIPS
        // ==========================

        if(text === "Travel Tips"){

            sendMessage(
                "Give me smart travel tips for saving money"
            );
        }


        // ==========================
        // MY TRIPS
        // ==========================

        if(text === "My Trips"){

            sendMessage(
                "Show me sample trip itineraries"
            );
        }


        // ==========================
        // SETTINGS
        // ==========================

        if(text === "Settings"){

            sendMessage(
                "What settings and travel preferences can I customize?"
            );
        }

    });

});