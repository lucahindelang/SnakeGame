        let canvas = document.getElementById('canvas');
        let ctx = canvas.getContext('2d');
        let rows = 15;
        let cols = 15;
        let snake = [{
            x:2, y:3
        }];

        let food;

        let cellWidth = canvas.width / cols;
        let cellHeight = canvas.height / rows;
        let direction = 'RIGHT';
        let foodCollected = false;

        placeFood();

        setInterval(gameLoop, 250);
        document.addEventListener('keydown', keyDown);

        draw();

        function draw(){
            ctx.fillStyle = 'black';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = '#C12872';
            snake.forEach(part => add(part.x, part.y)); //draw snake           

            ctx.fillStyle = 'yellow';
            add(food.x, food.y); //spawn food

            requestAnimationFrame(draw);
        }

        function add(x, y) {
            ctx.fillRect(x*cellWidth, y*cellHeight, cellWidth-1, cellHeight-1);
        }

        function shiftSnake() {
            for (let i = snake.length - 1; i > 0; i--) {
                const part = snake[i];
                const lastPart = snake[i-1];
                part.x = lastPart.x;
                part.y = lastPart.y;
            }
        }

        function testGameOver() {
            let firstPart = snake[0];
            let otherParts = snake.slice(1);

            let duplicatePart = otherParts.find(part => part.x == firstPart.x && part.y == firstPart.y);

            if(snake[0].x < 0 ||
                snake[0].x > cols-1 ||
                snake[0].y < 0 ||
                snake[0].y > rows-1 ||
                duplicatePart) {
                    placeFood();
                    snake = [{
                        x:2, y:3
                    }];
                    direction = 'RIGHT';
                }
        }

        function placeFood() {
            let randomX = Math.floor(Math.random() * cols);
            let randomY = Math.floor(Math.random() * rows);

            food = {x: randomX, y: randomY};
        }

        function keyDown(e) {
            if ((e.keyCode === 37 || e.keyCode === 65) && direction != 'RIGHT') {
                direction = 'LEFT';
            }
            if ((e.keyCode === 38 || e.keyCode === 87) && direction != 'DOWN') {
                direction = 'UP';
            }
            if ((e.keyCode === 39 || e.keyCode === 68) && direction != 'LEFT') {
                direction = 'RIGHT';
            }
            if ((e.keyCode === 40 || e.keyCode === 83) && direction != 'UP') {
                direction = 'DOWN';
            }
        }

        function gameLoop(){
            testGameOver();
            if(foodCollected) {
                snake = [{x:snake[0].x, y:snake[0].y},...snake];
                foodCollected = false;
            }
            shiftSnake();

            if(direction == 'LEFT') {
                snake[0].x--;
            }
            if(direction == 'RIGHT') {
                snake[0].x++;
            }
            if(direction == 'UP') {
                snake[0].y--;
            }
            if(direction == 'DOWN') {
                snake[0].y++;
            }

            if(snake[0].x == food.x && snake[0].y == food.y) {
                foodCollected = true;
                placeFood();
            }
        }