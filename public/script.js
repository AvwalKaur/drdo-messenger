const socket = io();
let username = "";

function submitUsername() {
  const input = document.getElementById("usernameInput");
  if (input.value.trim()) {
    username = input.value.trim();
    socket.emit("setUsername", username);
    document.getElementById("overlay").style.display = "none";
  }
}

const form = document.getElementById("message-form");
const input = document.getElementById("message-input");
const messages = document.getElementById("messages");
const userList = document.getElementById("user-list");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (input.value && username) {
    socket.emit("chat message", input.value);
    input.value = "";
  }
});

socket.on("chat message", (data) => {
  const msgDiv = document.createElement("div");
  msgDiv.textContent = `${data.name}: ${data.msg}`;
  messages.appendChild(msgDiv);
  messages.scrollTop = messages.scrollHeight;
});

socket.on("updateUserList", (users) => {
  userList.innerHTML = "";
  users.forEach((name) => {
    const li = document.createElement("li");
    li.textContent = name;
    userList.appendChild(li);
  });
});
