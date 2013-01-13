(function() {
	
	// debug stuff
	var logon = 0;	

	function log(e){
		if (logon == 1){
			console.log(e);
		}
	}


	// lets go!
	function letsGo(){

		//setup
		
		var canvas = document.querySelector('#paint');
		var ctx = canvas.getContext('2d');
		var sketch = document.querySelector('#sketch');
		var sketch_style = getComputedStyle(sketch);
		canvas.width = parseInt(sketch_style.getPropertyValue('width'));
		canvas.height = parseInt(sketch_style.getPropertyValue('height'));

		// reset/colour pallete
		var reset = document.querySelector('.clear');
		var colors = document.querySelectorAll('.color');		

		var pickedColor = 'random';

		var mouse = {x: 0, y: 0};

		// end of setup

		// reset button
		reset.addEventListener('touchend', function(e){
			ctx.clearRect(0,0,canvas.width, canvas.height);
			tmp_ctx.clearRect(0,0,canvas.width, canvas.height);
		}, false);

		// colors setup
		for (var i=0; i<colors.length; i++){

	   		colors[i].addEventListener('touchend', function(e){
				pickedColor = e.target.id;
				selectedItem = document.getElementsByClassName('selected')[0];
				if (undefined !== selectedItem){
					selectedItem.classList.remove('selected');
				}
				e.srcElement.classList.add('selected');
			});
		}

		// default drawing options setup
		ctx.lineWidth = 5;
		ctx.lineJoin = 'round';
		ctx.lineCap = 'round';
		ctx.strokeStyle = 'blue';
		ctx.fillStyle = 'blue';
	
		// touch canvas...
		canvas.addEventListener('touchstart', function(e) {
			e.preventDefault();

			if (pickedColor == 'random'){
						// thanks for this John Resig!
				color = '#'+Math.floor(Math.random()*16777215).toString(16);
			} else {
				color = pickedColor;
			}

			ctx.strokeStyle = color;
			ctx.fillStyle = color;
			ctx.beginPath();
			canvas.addEventListener('touchmove', onPaint, false);
			
		}, false);

		// drag on canvas
		canvas.addEventListener('touchmove', function(e) {
			e.preventDefault();
			item = e.touches.item(0);
			mouse.x = item.pageX - this.offsetLeft;
			mouse.y = item.pageY - this.offsetLeft;
		}, false);
	
		// paint it bro!
		var onPaint = function() {
			ctx.lineTo(mouse.x, mouse.y);
			ctx.stroke();
		};

	}
	
	// after load, GO!
	window.onload = letsGo;
	
}());
