const chatbox = document.querySelector('.msger-chat');
const textField = document.querySelector('#textInput');

function updateChatText(chatbox) {
  chatbox.scrollTop = chatbox.scrollHeight;
}

function sendMessage(text1) {
  fetch('http://127.0.0.1:5000/predict', {
    method: 'POST',
    body: JSON.stringify({ message: text1 }),
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
  })
    .then(r => r.json())
    .then(r => {
      let msg2 = { name: "ChatBot", message: r.answer };
      messages.push(msg2);
      let div = document.createElement('div');
      div.classList.add('msg', 'right-msg');
      div.innerHTML = `
        <div class="msg-img" style="background-image: url(https://image.flaticon.com/icons/svg/327/327779.svg)"></div>
        <div class="msg-bubble">
          <div class="msg-info">
            <div class="msg-info-name">ChatBot</div>
            <div class="msg-info-time">${new Date().toLocaleTimeString()}</div>
          </div>
          <div class="msg-text">${r.answer}</div>
        </div>
      `;
      chatbox.appendChild(div);
      updateChatText(chatbox);
      textField.value = ''
    })
    .catch((error) => {
      console.error('Error:', error);
      updateChatText(chatbox);
      textField.value = ''
    });
}

textField.addEventListener('keypress', (e) => {
  if (e.keyCode === 13) {
    e.preventDefault();
    if (textField.value) {
      let msg = { name: "Me", message: textField.value };
      messages.push(msg);
      let div = document.createElement('div');
      div.classList.add('msg', 'left-msg');
      div.innerHTML = `
        <div class="msg-img" style="background-image: url(https://image.flaticon.com/icons/svg/145/145867.svg)"></div>
        <div class="msg-bubble">
          <div class="msg-info">
            <div class="msg-info-name">Me</div>
            <div class="msg-info-time">${new Date().toLocaleTimeString()}</div>
          </div>
          <div class="msg-text">${textField.value}</div>
        </div>
      `;
      chatbox.appendChild(div);
      updateChatText(chatbox);
      sendMessage(textField.value);
    }
  }
});

function myFunction() {
  let x = document.getElementById("myDIV");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

let messages = [];
