const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

sendBtn.addEventListener("click", sendMessage);

userInput.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    sendMessage();
  }
});

function sendMessage() {
  const text = userInput.value.trim();

  if (text === "") return;

  addMessage("user", "You", text);

  let reply = "";

  if (text.toLowerCase().includes("serum")) {
    reply = "A serum targets specific concerns like dryness, dullness, or fine lines.";
  } else if (text.toLowerCase().includes("moisturizer")) {
    reply = "A moisturizer locks in hydration and protects your skin barrier.";
  } else {
    reply = "I can help with L’Oréal skincare, haircare, makeup, and routines.";
  }

  addMessage("assistant", "L’Oréal Advisor", reply);

  userInput.value = "";
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
