// Renders a message to a container
export default function renderMessage(message, type, container) {
    const messageEl = document.createElement("p");
    const parent = document.querySelector(container);
    messageEl.classList.add("message", type);
    messageEl.innerHTML = message;
    parent.appendChild(messageEl);
}
