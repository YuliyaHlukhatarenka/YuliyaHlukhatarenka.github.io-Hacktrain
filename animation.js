	let train;
	let trainImage;
	let canvas;					

	function gameLoop () {
	
	  window.requestAnimationFrame(gameLoop);

	  train.update();
	  train.render();
	}
	
	function sprite (options) {
	
		let that = {};
		let frameIndex = 0;
		let	tickCount = 0;
		let	ticksPerFrame = options.ticksPerFrame || 0;
		let numberOfFrames = options.numberOfFrames || 1;
		
		that.context = options.context;
		that.width = options.width;
		that.height = options.height;
		that.image = options.image;
		
		that.update = function () {

            tickCount += 1;

            if (tickCount > ticksPerFrame) {

				tickCount = 0;
				
                if (frameIndex < numberOfFrames - 1) {	
                    frameIndex += 1;
                } else {
                    frameIndex = 0;
                }
            }
        };
		
		that.render = function () {
		
		  that.context.clearRect(0, 0, that.width, that.height);
		  that.context.drawImage(
		    that.image,
		    frameIndex * that.width / numberOfFrames,
		    0,
		    that.width / numberOfFrames,
		    that.height,
		    0,
		    0,
		    that.width / numberOfFrames,
		    that.height);
		};
		
		return that;
	}
	
	canvas = document.getElementById("trainAnimation");
	canvas.width = 1200;
	canvas.height = 900;
	
	trainImage = new Image();	
	
	train = sprite({
		context: canvas.getContext("2d"),
		width: 12000,
		height: 900,
		image: trainImage,
		numberOfFrames: 10,
		ticksPerFrame: 10
	});
	
	trainImage.addEventListener("load", gameLoop);
	trainImage.src = "images/sprite.png";

