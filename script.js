// hledám, kam se připojím
client = new Paho.MQTT.Client("d57a0d1c39d54550b147b58411d86743.s2.eu.hivemq.cloud", 8884, "mqttANSDFJNAs");


// připojuju se 
client.connect({
            onSuccess: onConnect,
            userName: "robot",
            password: "P@ssW0rd!",
            useSSL: true
});

// co se stane po připojení
function onConnect() {
    // Once a connection has been made, make a subscription and send a message.
    console.log("onConnect");
    
    client.subscribe("/row/#");
    client.onMessageArrived = onMessageArrived;
}

function onMessageArrived(message){
            console.log("onMessageArrived:" + message.destinationName);
            console.log("onMessageArrived:" + message.payloadString);
            let chat = document.querySelector(".chat")
            chat.innerHTML += '<p class="radka">' + message.payloadString + "</p>"
            let zprava = document.createElement("p");
            zprava.classList.add("novaZprava");
            zprava.textContent = message.payloadString;
            chat.insertAdjacentElement('afterbegin',zprava);
            
}


let input = document.querySelector("#policko")

function poslatZpravu(){
    console.log("posílám");
    message = new Paho.MQTT.Message(input.value);
    message.destinationName = "/row/12/message";
    client.send(message);
    input.value = ""

}



let button = document.querySelector("#tlacitko")
button.addEventListener("click", poslatZpravu)

