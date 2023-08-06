const toggler = document.querySelector(".chatbot-toggler");
const close_button = document.querySelector(".close-btn");
const chatbot = document.querySelector(".chatbox");
const chat_input = document.querySelector(".chat-input textarea");
const send_button = document.querySelector(".chat-input span");

let user_text = null;
const API_KEY = "";
const inputInitHeight = chat_input.scrollHeight;

const createChatLi = (message, className) => { // function that uses class name to differentiate outgoing and incoming text
   
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", `${className}`);
    let chatContent = className === "outgoing" ? `<p></p>` : `<span class="material-symbols-outlined">smart_toy</span><p></p>`;
    chatLi.innerHTML = chatContent;
    chatLi.querySelector("p").textContent = message;
    return chatLi; 
}

const generateResponse = (chatElement) => {
    const API_URL = "https://api.openai.com/v1/chat/completions";
    const message_element = chatElement.querySelector("p");

    const requestOpt = {
        method: "POST",
        headers:{"Content-Type": "application/json",
        "Authorization": 'Bearer $OPENAI_API_KEY'

        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{role: "user", content: user_text}],
        })
    }
    fetch(API_URL, requestOpt).then(res => res.json()).then(data => {
        message_element.textContent = data.choices[0].message.content.trim();
    }).catch(() => {
        message_element.classList.add("error");
        message_element.textContent = "Oops! Something went wrong. Please try again.";
    }).finally(() => chatbot.scrollTo(0, chatbot.scrollHeight));
        

    }

    const handleChat = () =>{
        user_text = chat_input.value.trim();

        if(!user_text)
        return;
        chat_input.value = "";
        chat_input.scrollHeight = '${inputInitHeight}px';

        chatbot.appendChild(createChatLi(user_text, "outgoing"));
        chatbot.scrollTo(0, chatbot.scrollHeight);

    setTimeout(() => {
        const incomingChatLi = createChatLi("Thinking...", "incoming");
        chatbot.appendChild(incomingChatLi);
        chatbot.scrollTo(0, chatbot.scrollHeight);
        generateResponse(incomingChatLi);
    }, 600);

 }
 chat_input.addEventListener("input", ()  =>{
    chat_input.style.height = `${inputInitHeight}px`;
chatInput.style.height = `${chat_input.scrollHeight}px`;
});
chat_input.addEventListener("keydown", (e) =>{
    if(e.key == "Enter")
    {
        e.preventDefault();
        handleChat();
    }
});

send_button.addEventListener("click", handleChat);
close_button.addEventListener("click", () => document.body.classList.remove("show-chatbot"));
toggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));


 
    


