console.log("WEBSITE SCRIPT LOADED");

const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");
const factText = document.getElementById("fact-text");

const workerUrl = "https://loreal-worker.loreal-chatbot-nick.workers.dev";

let messages = [];

/* ROTATING BEAUTY FACTS */
const lorealFacts = [
  "Healthy skincare routines usually follow this order: cleanser, treatment or serum, moisturizer, and sunscreen during the day.",
  "Daily sunscreen is one of the most important steps in protecting skin from premature aging caused by UV exposure.",
  "A moisturizer helps lock in hydration and supports the skin barrier after cleansing and treatment products.",
  "Serums are usually lightweight formulas designed to target specific concerns such as dryness, dullness, or fine lines.",
  "Haircare routines work best when matched to your needs, such as hydration for dry hair, repair for damaged hair, or volume for fine hair.",
  "Conditioner helps smooth the hair cuticle, improve softness, and reduce tangling after shampooing.",
  "Overwashing hair can strip away natural oils, so many people benefit from choosing a wash routine that fits their hair type.",
  "Makeup usually applies more smoothly when skin is prepped first with hydration and a primer-friendly skincare routine.",
  "Removing makeup before bed is one of the simplest habits that helps keep skin cleaner and more balanced.",
  "Beauty routines are usually most effective when they stay consistent instead of constantly changing products too quickly.",
  "Hydration matters in both skincare and haircare because dryness can affect comfort, texture, and overall appearance.",
  "Layering products from thinner textures to thicker textures often helps skincare absorb more effectively.",
  "A simple routine done consistently often works better than an overly complicated routine that is hard to maintain.",
  "Heat styling can stress hair over time, so heat protectant products are often an important step before styling.",
  "The best beauty routine is usually the one that matches your skin type, hair type, and daily lifestyle."
];

let factIndex = 0;

function rotateFacts() {
  if (!factText) return;
  factText.textContent = lorealFacts[factIndex];
  factIndex = (factIndex + 1) % lorealFacts.length;
}

rotateFacts();
setInterval(rotateFacts, 5000);

/* CHATBOT */
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

  const loadingBubble = addMessage("assistant", "L’Oréal Advisor", "Thinking...");

  try {
    const response = await fetch(workerUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ messages })
    });

    const data = await response.json();

    if (!response.ok) {
      loadingBubble.textContent = "Error: " + (data.error || "Request failed.");
      return;
    }

    if (data.reply) {
      loadingBubble.textContent = data.reply;
      messages.push({ role: "assistant", content: data.reply });
    } else if (data.error) {
      loadingBubble.textContent = "Error: " + data.error;
    } else {
      loadingBubble.textContent = "Error: Worker returned an unexpected response.";
    }
  } catch (error) {
    loadingBubble.textContent = "Error: " + error.message;
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

  return bubbleDiv;
}
