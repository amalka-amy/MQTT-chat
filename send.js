const client = new Paho.MQTT.Client(
	'd57a0d1c39d54550b147b58411d86743.s2.eu.hivemq.cloud',
	8884,
	'e3c1aa46-56d5-4131-bff2-13d9f20a8161',
)

client.onConnectionLost = onConnectionLost
client.onMessageArrived = onMessageArrived

const connect = document.querySelector('#connect')
client.connect({
	onSuccess: onConnect,
	userName: 'robot',
	password: 'P@ssW0rd!',
	useSSL: true,
})

function onConnect() {
	//
}

function onConnectionLost(responseObject) {
	if (responseObject.errorCode !== 0) {
		console.log('onConnectionLost:' + responseObject.errorMessage)
	}
}

function onMessageArrived(message) {
	//
}

const form = document.querySelector('form')
const input = form.querySelector('input')
form.addEventListener('submit', (event) => {
	event.preventDefault()

	const message = new Paho.MQTT.Message(input.value)
	message.destinationName = '/row/25/message'
	client.send(message)

	input.value = ''
})
