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

  if (text === "") {
    return;
  }

  addMessage("user", "You", text);

  let fakeReply = "";

  if (text.toLowerCase().includes("serum")) {
    fakeReply = "A serum is usually lightweight and made to target specific skin concerns like dryness, dullness, or fine lines.";
  } else if (text.toLowerCase().includes("moisturizer")) {
    fakeReply = "A moisturizer helps lock in hydration and protect the skin barrier. It is usually used after serum.";
  } else if (text.toLowerCase().includes("routine")) {
    fakeReply = "A simple beauty routine often goes in this order: cleanser, serum, moisturizer, and sunscreen during the day.";
  } else {
    fakeReply = "I’m here to help with L’Oréal products, skincare, haircare, makeup, and beauty routines.";
  }

  addMessage("assistant", "L’Oréal Advisor", fakeReply);

  userInput.value = "";
}

function addMessage(role, labelText, messageText) {
  const messageDiv = document.createElement("div");
  messageDiv.className = `message ${role}`;

  const labelDiv = document.createElement("div");
  labelDiv.className = "label";
  labelDiv.textContent = labelText;

  const bubbleDiv = document.createElement("div");
  bubbleDiv.className = "bubble";
  bubbleDiv.textContent = messageText;

  messageDiv.appendChild(labelDiv);
  messageDiv.appendChild(bubbleDiv);

  chatBox.appendChild(messageDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}
