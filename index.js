const client = new Paho.MQTT.Client(
	'd57a0d1c39d54550b147b58411d86743.s2.eu.hivemq.cloud',
	8884,
	'1c3d9ff0-1887-45ad-a0b4-e8fbe1860a0a',
)

client.onConnectionLost = onConnectionLost
client.onMessageArrived = onMessageArrived

const connect = document.querySelector('#connect')
connect.querySelector('button').addEventListener('click', () => {
	connect.remove()
	playPing()
	client.connect({
		onSuccess: onConnect,
		userName: 'robot',
		password: 'P@ssW0rd!',
		useSSL: true,
	})
})

function onConnect() {
	client.subscribe('/row/#')
}

function onConnectionLost(responseObject) {
	if (responseObject.errorCode !== 0) {
		console.log('onConnectionLost:' + responseObject.errorMessage)
	}
}

function onMessageArrived(message) {
	try {
		console.log('onMessageArrived:' + message.destinationName)
		console.log('onMessageArrived:' + message.payloadString)

		const parts = message.destinationName.split('/')

		if (parts.length === 4 && parts[1] === 'row' && parts[3] === 'message') {
			const id = parts[2]
			showMessage(id, message.payloadString)
		}
	} catch (error) {
		console.error(error)
	}
}

function getAvatarUrl(id) {
	return `../avatars/${id}.jpg`
}

function showMessage(fromId, text) {
	const messages = document.querySelector('#messages')

	const message = document.createElement('div')
	message.innerHTML = `
		<div class="card mb-3">
			<div class="card-body">
				<div class="avatar">
					<img alt="" />
				</div>
				<div>
					<h5 class="card-title"></h5>
					<p class="card-text"></p>
					<p class="card-text text-end"><small class="text-muted"></small></p>
				</div>
			</div>
		</div>
	`

	message.querySelector('.avatar img').src = getAvatarUrl(fromId)
	message.querySelector('.card-title').textContent = fromId
	const textElement = message.querySelector('.card-text')
	text.split('\n').forEach((line) => {
		const lineElement = document.createElement('div')
		lineElement.textContent = line
		textElement.appendChild(lineElement)
	})
	message.querySelector('.card-text + .card-text .text-muted').textContent =
		new Date().toLocaleTimeString()

	setUserActive(fromId)

	playPing()
	messages.prepend(message.querySelector('div'))
}

function playPing() {
	new Audio('../ping.wav').play()
}

const activeIds = []

function setUserActive(id) {
	const avatars = document.querySelector('.avatars')
	avatars.innerHTML = ''

	if (!activeIds.includes(id)) {
		activeIds.push(id)
	}
	const largestId = Math.min(
		100,
		activeIds.reduce((max, current) => Math.max(max, parseInt(current)), 0),
	)

	for (let i = 1; i <= largestId; i++) {
		const id = i.toString()
		const isOffline = !activeIds.includes(id)
		const avatar = document.createElement('div')
		avatar.innerHTML = `
			<div class="avatar">
				<img src="https://picsum.photos/id/1/200/200" alt="" />
			</div>
		`

		avatar.querySelector('img').src = getAvatarUrl(id)
		avatar.querySelector('.avatar').classList.toggle('is-offline', isOffline)

		avatars.appendChild(avatar.querySelector('div'))
	}
}
