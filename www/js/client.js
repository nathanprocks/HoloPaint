var socket = io();

window.onload = function(){
	var canvas = document.querySelector("canvas");
	var ctx = canvas.getContext("2d");

	var offscreenCanvas = document.createElement("canvas");
	var offscreenCtx = offscreenCanvas.getContext("2d");

	reset();
	socket.emit("setWidth", offscreenCanvas.width);

	window.addEventListener("resize", function(e){
		reset();
	});

	function reset() {
		// Set canvas size and draw guide in centre
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;

		offscreenCanvas.width = window.innerHeight / 3;
		offscreenCanvas.height = window.innerHeight / 3

		var centreX = window.innerWidth / 2;
		var centreY = window.innerHeight / 2;

		ctx.strokeStyle = "#fff";
		ctx.beginPath();
		ctx.moveTo(centreX - 25, centreY - 25);
		ctx.lineTo(centreX + 25, centreY + 25);
		ctx.moveTo(centreX - 25, centreY + 25);
		ctx.lineTo(centreX + 25, centreY - 25);
		ctx.stroke();
	}

	function draw(line) {
		// Draw to offscreen canvas
		offscreenCtx.strokeStyle = line.colour;
		offscreenCtx.beginPath();
		offscreenCtx.moveTo(line.startX, line.startY);
		offscreenCtx.lineTo(line.endX, line.endY);
		offscreenCtx.closePath();
		offscreenCtx.stroke();

		// Copy offscreen to visible canvas
		var img = offscreenCtx.getImageData(0, 0, offscreenCanvas.width, offscreenCanvas.height);
		var dx = window.innerWidth/2 - offscreenCanvas.width/2;
		ctx.putImageData(img, dx, 0);
	}

	socket.on("draw", draw);
};