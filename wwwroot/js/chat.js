"use strict";

var connection = new signalR.HubConnectionBuilder().withUrl("/chat").build();

//Disable the send button until connection is established.
document.getElementById("sendButton").disabled = true;

    connection.invoke("OnDisconnectedAsync");
connection.on("ReceiveMessage", function (user, message) {
    var li = document.createElement("li");
    document.getElementById("messagesList").appendChild(li);
    // We can assign user-supplied strings to an element's textContent because it
    // is not interpreted as markup. If you're assigning in any other way, you
    // should be aware of possible script injection concerns.
    li.textContent = `${user} says ${message}`;
});

connection.start()
    .then(() => {
        console.log('Connection established');
        document.getElementById("sendButton").disabled = false;
    })
    .catch((error) => {
        console.error(error.message);
    });

connection.on('ReceiveMessage', (user, message) => {
    const notificationArea = document.getElementById('notificationArea');
    const notificationMessage = document.createElement('p');
    notificationMessage.textContent = `${user}: ${message}`;
    notificationArea.appendChild(notificationMessage)
});
connection.on("getConnectionId", function (id) {
    let p = document.getElementById("conId");
    p.innerText = `your Connection Id: ${id}`;
});


//connection.start().then(function () {
//    document.getElementById("sendButton").disabled = false;
//}).catch(function (err) {
//    return console.error(err.toString());
//});

document.getElementById("sendButton").addEventListener("click", function (event) {
    var user = document.getElementById("userInput").value;
    var message = document.getElementById("messageInput").value;

    //connection.invoke("SendMessageToCaller", user, message);
   connection.invoke("SendMessage", user, message).catch(function (err) {
        return console.error(err.toString());
    });
    event.preventDefault();
});