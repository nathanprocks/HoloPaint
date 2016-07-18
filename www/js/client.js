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
		var img = new Image();
		img.src = offscreenCanvas.toDataURL();
		var dx = -offscreenCanvas.width/2;
		var dy = -offscreenCanvas.height*1.5;

		// Top side
		ctx.translate(canvas.width/2, canvas.height/2);
		ctx.scale(-1, 1);
		ctx.drawImage(img, dx, dy);

		// Left side
		ctx.rotate(90 * Math.PI / 180);
		ctx.drawImage(img, dx, dy);

		// Bottom side
		ctx.rotate(90 * Math.PI / 180);
		ctx.drawImage(img, dx, dy);

		// Right side
		ctx.rotate(90 * Math.PI / 180);
		ctx.drawImage(img, dx, dy);

		ctx.setTransform(1, 0, 0, 1, 0, 0);

		// Left side
	}

	socket.on("draw", draw);
};