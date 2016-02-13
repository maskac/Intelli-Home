$(document).ready( function () {
	// Set the status message to test javascript functionality
	console.log("javascript on");

	// Set default temperature and humidity values
	updateTemperature(23);
	updateHumidity(90);
	updateLampState("ON");
	updateIntrusionState("NOT GOOD");

	// Establish connection via socket io
	var socket = io.connect('http://localhost:3000');
	
	// Get sensor updates periodically
	setInterval(function() {  
	  	socket.emit('timer');
	}, 2000);
	
	socket.on('connect', function(data) {
	        socket.emit('join', 'Hello World from client');
	});

	socket.on('welcomeUpdate', function() {
		console.log("Received welcome event");
	});

	socket.on('tempUpdate', function(data) {
		console.log("Inside temp update");
		var tempValue = data;
		console.log(tempValue);
		updateTemperature(tempValue);
	});

	socket.on('humUpdate', function(data) {
		var humValue = data.value;
		updateHumidity(humValue);
	});

	socket.on('lampUpdate', function(data) {
		var lampValue = data.value;
		updateLampState(lampValue);
	});

	socket.on('intrusionUpdate', function(data) {
		var intrusionValue = data.value;
		updateIntrusionState(intrusionValue);
	});

});



function updateTemperature(newValue) {
	document.getElementById("temperatureValue").innerHTML = newValue;
}

function updateHumidity(newValue) {
	document.getElementById("humidityValue").innerHTML = newValue;
}

function updateLampState(state) {
	document.getElementById("lampState").innerHTML = state;
}

function updateIntrusionState(state) {
	document.getElementById("intrusionState").innerHTML = state;
}
