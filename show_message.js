var images = [];
var fimages = [];

const websocket = new WebSocket("ws://localhost:5678/");

var wsSend = function(data) {
    if(!websocket.readyState){
        setTimeout(function (){
            wsSend(data);
        },100);
    }else{
        websocket.send(data);
    }
};

wsSend(JSON.stringify({ action: "spawn", exists: fimages}));

window.addEventListener("DOMContentLoaded", () => {
  websocket.onmessage = ({ data }) => {
    var image = document.createElement("img");
    image.setAttribute('src', 'images/' + data);
	
	image.style.position = "absolute";
	image.style.left = "1930px";
	image.style.height = "50%";
	
	
	image.onload = function() {
		this.style.top = 20 + Math.floor(Math.random() * (this.height - 40)) + "px";
	};
	
    document.body.appendChild(image);
	images.push(image);
	fimages.push(data);
	//document.body.appendChild(document.createTextNode(images.toString()));
  };
});

async function moveImages() {
	while (true) {
		await new Promise(r => setTimeout(r, 10));
		for(var i = 0; i < images.length; i++) {
			var image = images[i];
			var oldX = image.style.left.substring("px", image.style.left.length - 2);
			var newX = Number(oldX) - 1;
			image.style.left = newX + "px";
			//image.style.top = image.id + "px";
			if (image.width + newX < -100) {
				var index = images.indexOf(image);
				fimages.splice(index, 1);
				images.splice(index, 1);
				image.remove()
				};
			if (image.width + newX == 1820) {websocket.send(JSON.stringify({ action: "spawn", exists: fimages}))};
		}
	};
};

moveImages();