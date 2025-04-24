



function init(){
	canvas = document.getElementById('mycanvas');
	W = H = canvas.width = canvas.height = 1000;
	pen = canvas.getContext('2d');
	cs = 66;
	game_over = false;
	score = 5;


	//Create a Image Object for food
	food_img = new Image();
	food_img.src = "Assets/apple.png";

	trophy = new Image();
	trophy.src = "Assets/trophy.png";

	food = getRandomFood();

	snake = {
		init_len:5,
		color:"blue",
		cells:[],
		direction:"right",


		createSnake:function(){
			for(var i=this.init_len;i>0;i--){
				this.cells.push({x:i,y:0});
			}
		},
		drawSnake: function () {
            for (let i = 0; i < this.cells.length; i++) {
                let cell = this.cells[i];
                let x = cell.x * cs;
                let y = cell.y * cs;
        
                // Head of the snake
                if (i === 0) {
                    // Draw head with rounded corners
                    pen.fillStyle = '#3498db';
                    pen.beginPath();
                    pen.roundRect(x, y, cs - 3, cs - 3, 8);
                    pen.fill();
        
                    // Eyes
                    pen.fillStyle = "white";
                    pen.beginPath();
                    pen.arc(x + cs / 4, y + cs / 4, 3, 0, 2 * Math.PI);
                    pen.fill();
        
                    pen.beginPath();
                    pen.arc(x + (3 * cs) / 4 - 4, y + cs / 4, 3, 0, 2 * Math.PI);
                    pen.fill();
        
                    // Pupils
                    pen.fillStyle = "black";
                    pen.beginPath();
                    pen.arc(x + cs / 4, y + cs / 4, 1.5, 0, 2 * Math.PI);
                    pen.fill();
        
                    pen.beginPath();
                    pen.arc(x + (3 * cs) / 4 - 4, y + cs / 4, 1.5, 0, 2 * Math.PI);
                    pen.fill();
        
                    // Mouth (a small smile)
                    pen.strokeStyle = "black";
                    pen.lineWidth = 1;
                    pen.beginPath();
                    pen.arc(x + cs / 2 - 1, y + (3 * cs) / 4 - 2, 6, 0.2 * Math.PI, 0.8 * Math.PI);
                    pen.stroke();
                } else {
                    // Draw body normally
                    pen.fillStyle = this.color;
                    pen.fillRect(x, y, cs - 3, cs - 3);
                }
            }
        },
        

		updateSnake:function(){
			//console.log("updating snake according to the direction property");
			//check if the snake has eaten food, increase the length of the snake and 
			//generate new food object
			var headX = this.cells[0].x;
			var headY = this.cells[0].y;

			if(headX==food.x && headY==food.y){
				console.log("Food eaten");
				food = getRandomFood();
				score++;

			}
			else
			{
				this.cells.pop();
			}

			
			var nextX,nextY;

			if(this.direction=="right"){
				nextX = headX + 1;
				nextY = headY;
			}
			else if(this.direction=="left"){
				nextX = headX - 1;
				nextY = headY;
			}
			else if(this.direction=="down"){
				nextX = headX;
				nextY = headY + 1;
			}
			else{
				nextX = headX;
				nextY = headY - 1;
			}

			this.cells.unshift({x: nextX,y:nextY});

			/*Write a Logic that prevents snake from going out*/
			var last_x = Math.round(W/cs);
			var last_y = Math.round(H/cs);

			if(this.cells[0].y<0 || this.cells[0].x < 0 || this.cells[0].x > last_x || this.cells[0].y > last_y){
				game_over = true;
			}

		}

	};

	snake.createSnake();
	//Add a Event Listener on the Document Object
	function keyPressed(e){
		//Conditional Statments
		if(e.key=="ArrowRight"){
			snake.direction = "right";
		}
		else if(e.key=="ArrowLeft"){
			snake.direction = "left";
		}
		else if(e.key=="ArrowDown"){
			snake.direction = "down";
		}
		else{
			snake.direction = "up";
		}
		console.log(snake.direction);
	}


	document.addEventListener('keydown',keyPressed) ;
	
}


function draw(){
	//console.log("In Draw");

	//erase the old frame
	pen.clearRect(0,0,W,H);
	snake.drawSnake();

	pen.fillStyle = food.color;
	pen.drawImage(food_img,food.x*cs,food.y*cs,cs,cs);

	pen.drawImage(trophy,18,20,cs,cs);
	pen.fillStyle = "blue";
	pen.font = "20px Roboto"
	pen.fillText(score,50,50);

	
}

function update(){
	//console.log("In Update");
	snake.updateSnake(); 
}

function getRandomFood(){

	var foodX = Math.round(Math.random()*(W-cs)/cs);
	var foodY = Math.round(Math.random()*(H-cs)/cs);

	var food = {
		x:foodX,
		y:foodY,
		color:"red",
	}
	return food

}

function gameloop(){
	if(game_over==true){
		clearInterval(f);
		alert("Game Over");
		return;
	}
	draw();
	update();
}

if (!CanvasRenderingContext2D.prototype.roundRect) {
    CanvasRenderingContext2D.prototype.roundRect = function (x, y, w, h, r) {
        if (w < 2 * r) r = w / 2;
        if (h < 2 * r) r = h / 2;
        this.beginPath();
        this.moveTo(x + r, y);
        this.arcTo(x + w, y, x + w, y + h, r);
        this.arcTo(x + w, y + h, x, y + h, r);
        this.arcTo(x, y + h, x, y, r);
        this.arcTo(x, y, x + w, y, r);
        this.closePath();
        return this;
    }
}


document.getElementById('startBtn').addEventListener('click', function () {
    init();
    f = setInterval(gameloop, 100);
});










