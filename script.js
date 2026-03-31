const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

const workerUrl = "PASTE_YOUR_WORKER_URL_HERE";

let messages = [];

sendBtn.addEventListener("click", sendMessage);

userInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    sendMessage();
  }
});

async function sendMessage() {
  const text = userInput.value.trim();
  if (text === "") return;

  addMessage("user", "You", text);
  messages.push({ role: "user", content: text });

  userInput.value = "";

  try {
    const response = await fetch(workerUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ messages })
    });

    const data = await response.json();

    if (data.reply) {
      addMessage("assistant", "L’Oréal Advisor", data.reply);
      messages.push({ role: "assistant", content: data.reply });
    } else if (data.error) {
      addMessage("assistant", "L’Oréal Advisor", "Sorry, there was an error: " + data.error);
    } else {
      addMessage("assistant", "L’Oréal Advisor", "Sorry, something went wrong.");
    }
  } catch (error) {
    addMessage("assistant", "L’Oréal Advisor", "Sorry, I could not connect right now.");
  }
}

function addMessage(role, labelText, text) {
  const messageDiv = document.createElement("div");
  messageDiv.className = `message ${role}`;

  const labelDiv = document.createElement("div");
  labelDiv.className = "label";

  if (role === "assistant") {
    labelDiv.classList.add("assistant-label");
  }

  labelDiv.textContent = labelText;

  const bubbleDiv = document.createElement("div");
  bubbleDiv.className = "bubble";
  bubbleDiv.textContent = text;

  messageDiv.appendChild(labelDiv);
  messageDiv.appendChild(bubbleDiv);

  chatBox.appendChild(messageDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}
