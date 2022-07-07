var images = [];
var fimages = [];

function callback(files) {
        alert(files);
     }

function getImage() {
	var notExist = filesList.filter(x => !fimages.includes(x));
	if (notExist < 1) {
		var index = Math.floor(Math.random() * filesList.length);
		return filesList[index]
	};
	var index = Math.floor(Math.random() * notExist.length);
	return notExist[index]
}

function spawn() {
    var image = document.createElement("img");
	var fileName = getImage();
	if (typeof fileName == 'undefined') {console.log("There are no images."); return};
    image.setAttribute('src', 'images/' + fileName);
	image.setAttribute('alt', fileName);
	
	image.style.position = "absolute";
	image.style.left = window.screen.width + 10 + "px";
	image.style.height = "90%";
	
	
	image.onload = function() {
		this.style.top = 20 + Math.floor(Math.random() * (window.screen.height - this.height)) + "px";
	};
	
    document.body.appendChild(image);
	images.push(image);
	fimages.push(fileName);
};

async function moveImages() {
	while (true) {
		await new Promise(r => setTimeout(r, 10));
		for(var i = 0; i < images.length; i++) {
			var image = images[i];
			var oldX = image.style.left.substring("px", image.style.left.length - 2);
			var newX = Number(oldX) - 1;
			image.style.left = newX + "px";
			if (image.width + newX < -10) {
				var index = images.indexOf(image);
				fimages.splice(index, 1);
				images.splice(index, 1);
				image.remove()
				};
			if (image.width + newX == window.screen.width - 100) {spawn()};
		}
	};
};

moveImages();
//=== VVV ===//
var filesList = ['1.jpg', '2.jpg', '3.jpg'];
spawn();