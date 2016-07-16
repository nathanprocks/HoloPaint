var socket = io();

window.onload = function(){
	var penColour = "white";

	window.setColour = function(colour){
		penColour = colour;
	}

	var canvas = document.getElementById("canvas");
	ctx = canvas.getContext("2d");

	socket.on("setWidth", function(width){
		canvas.height = canvas.width = width;
	});

	socket.emit("getWidth");

	var startX, startY;
	var mouseDown = false;
	canvas.addEventListener("touchstart", function(e){
		startX = e.touches[0].clientX;
		startY = e.touches[0].clientY;
	})

	canvas.addEventListener("touchmove", function(e){
		socket.emit("draw", {
			startX: startX,
			startY: startY,
			endX: e.touches[0].clientX,
			endY: e.touches[0].clientY,
			colour: penColour
		})

		ctx.strokeStyle = penColour;
		ctx.beginPath();
		ctx.moveTo(startX, startY);
		ctx.lineTo(e.touches[0].clientX, e.touches[0].clientY);
		ctx.closePath();
		ctx.stroke();
		startX = e.touches[0].clientX;
		startY = e.touches[0].clientY;

		// Prevent scrolling
		e.preventDefault();
	}, false);

	canvas.addEventListener("mousedown", function(e){
		mouseDown = true;
		startX = e.clientX;
		startY = e.clientY;
	})

	canvas.addEventListener("mouseup", function(e){
		mouseDown = false;
	})

	canvas.addEventListener("mouseleave", function(e){
		mouseDown = false;
	})

	canvas.addEventListener("mousemove", function(e){
		if (mouseDown) {
			socket.emit("draw", {
				startX: startX,
				startY: startY,
				endX: e.clientX,
				endY: e.clientY,
				colour: penColour
			})

			ctx.strokeStyle = penColour;
			ctx.beginPath();
			ctx.moveTo(startX, startY);
			ctx.lineTo(e.clientX, e.clientY);
			ctx.closePath();
			ctx.stroke();
			startX = e.clientX;
			startY = e.clientY;
		}
	}, false);
}