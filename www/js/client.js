var socket = io();

window.onload = function(){
	var guide = document.getElementById("guide");
	var canvas0 = document.getElementById("top");
	var canvas90 = document.getElementById("right");
	var canvas180 = document.getElementById("bottom");
	var canvas270 = document.getElementById("left");

	var ctxGuide = guide.getContext("2d");
	var ctx1 = canvas0.getContext("2d");
	var ctx2 = canvas90.getContext("2d");
	var ctx3 = canvas180.getContext("2d");
	var ctx4 = canvas270.getContext("2d");

	guide.height = guide.width = 50;
	guide.style.top = (window.innerHeight / 2) - (guide.height / 2) + "px";
	guide.style.left = (window.innerWidth / 2) - (guide.width / 2) + "px";
	ctxGuide.strokeStyle = "#fff";
	ctxGuide.beginPath();
	ctxGuide.moveTo(0, 0);
	ctxGuide.lineTo(50, 50);
	ctxGuide.moveTo(0, 50);
	ctxGuide.lineTo(50, 0);
	ctxGuide.stroke();

	var canvasWidth = canvas0.width = window.innerHeight / 3;
	socket.emit("setWidth", canvasWidth);

	canvas0.height = canvas0.width = canvasWidth;
	canvas90.height = canvas90.width = canvasWidth;
	canvas180.height = canvas180.width = canvasWidth;
	canvas270.height = canvas270.width = canvasWidth;

	canvas0.style.left = (window.innerWidth / 2) - (canvas0.width / 2) + "px";

	canvas90.style.top = canvas90.height + "px";
	canvas90.style.left = (window.innerWidth / 2) + (canvas90.width / 2) + "px";

	canvas180.style.bottom = 0;
	canvas180.style.left = (window.innerWidth / 2) - (canvas180.width / 2) + "px";

	canvas270.style.top = canvas270.height + "px";
	canvas270.style.left = (window.innerWidth / 2) - (canvas270.width * 1.5) + "px";

	socket.on("draw", function(line){
		ctx1.strokeStyle = line.colour;
		ctx1.beginPath();
		ctx1.moveTo(line.startX, line.startY);
		ctx1.lineTo(line.endX, line.endY);
		ctx1.closePath();
		ctx1.stroke();
		ctx2.strokeStyle = line.colour;
		ctx2.beginPath();
		ctx2.moveTo(line.startX, line.startY);
		ctx2.lineTo(line.endX, line.endY);
		ctx2.closePath();
		ctx2.stroke();
		ctx3.strokeStyle = line.colour;
		ctx3.beginPath();
		ctx3.moveTo(line.startX, line.startY);
		ctx3.lineTo(line.endX, line.endY);
		ctx3.closePath();
		ctx3.stroke();
		ctx4.strokeStyle = line.colour;
		ctx4.beginPath();
		ctx4.moveTo(line.startX, line.startY);
		ctx4.lineTo(line.endX, line.endY);
		ctx4.closePath();
		ctx4.stroke();
	});
};