const socket = io();
const username = prompt("Enter your name") || "Anonymous";

document.querySelector("form").addEventListener("submit", function (e) {
  e.preventDefault();
  const msgInput = document.querySelector("#m");
  const message = msgInput.value;
  if (message.trim() !== "") {
    socket.emit("chat message", { name: username, message });
    msgInput.value = "";
  }
});

socket.on("chat message", function (data) {
  const item = document.createElement("li");
  item.textContent = `${data.name}: ${data.message}`;
  document.querySelector("#messages").appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
});
