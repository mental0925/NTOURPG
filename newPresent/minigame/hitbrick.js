var ball;
var paddle;
var bricks;
var newBrick;
var brickInfo;
var scoreText;
var score = 0;
var lives = 3;
var livesText;
var lifeLostText;
var playing = false;
var startButton;

var hitbrick = {	
    preload: function(){
		//控制比例
		game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		game.scale.pageAlignHorizontally = true;
		game.scale.pageAlignVertically = true;
		game.stage.backgroundColor = '#eee';
		
		game.load.image('paddle', 'minigame/img/paddle.png');
		game.load.image('brick','minigame/img/brick.png');
		game.load.spritesheet('ball', 'minigame/img/wobble.png', 20, 20);
		game.load.spritesheet('button', 'minigame/img/start.png');
	},
	
    create: function(){
		game.world.setBounds(0, 0, 480, 320);
	//物裡引擎
	game.physics.startSystem(Phaser.Physics.ARCADE);
	game.physics.arcade.checkCollision.down = false;
	//球
	ball = game.add.sprite(240, 320-25, 'ball');
	ball.animations.add('wobble', [0,1,0,2,0,1,0,2,0], 24); //動畫
	ball.anchor.set(0.5);
	game.physics.enable(ball, Phaser.Physics.ARCADE);
	
	ball.body.collideWorldBounds = true;  //啟用碰撞引擎
	ball.body.bounce.set(1); //球可以反彈
	ball.checkWorldBounds = true;
	ball.events.onOutOfBounds.add(ballLeaveScreen, this);
	ball.body.collideWorldBounds = true;
	//板子
	paddle = game.add.sprite(240, 320-5, 'paddle');
	paddle.anchor.set(0.5,1);
	game.physics.enable(paddle, Phaser.Physics.ARCADE);
	paddle.body.immovable = true;
	paddle.body.collideWorldBounds = true;
	//磚塊
	initBricks();
	//分數
	scoreText = game.add.text(5, 5, 'Points: 0', { font: '18px Arial', fill: '#0095DD' });
	//生命
	livesText = game.add.text(480-5, 5, 'Lives: '+lives, { font: '18px Arial', fill: '#0095DD' });
	livesText.anchor.set(1,0);
	lifeLostText = game.add.text(240, 320*0.5, 'Life lost, click to continue', { font: '18px Arial', fill: '#0095DD' });
	lifeLostText.anchor.set(0.5);
	lifeLostText.visible = false;
	//開始鈕
	startButton = game.add.button(240, 160, 'button', startGame2, this);
	startButton.width=100;
	startButton.height=50;
	startButton.anchor.set(0.5);
	
	this.cursors = game.input.keyboard.createCursorKeys();
	},
	
	 update: function () {
	game.physics.arcade.collide(ball, paddle,ballHitPaddle);
	game.physics.arcade.collide(ball, bricks,ballHitBrick);
	 if(playing) {
		//paddle.x = game.input.x/* || 240*/;
		if(this.cursors.left.isDown)
		paddle.x -= 4;
		if(this.cursors.right.isDown)
			paddle.x += 4;
		}
    }
	
	
}
//按下開始鈕
	function startGame2() {
    startButton.destroy();
    ball.body.velocity.set(150, -150);
    playing = true;
	}
	
	//球擊中板子
	function ballHitPaddle(ball, paddle) {
    ball.animations.play('wobble');
	 ball.body.velocity.x = -1*5*(paddle.x-ball.x);
	}
	
	//球擊中磚塊
	function ballHitBrick(ball, brick) {
		//磚塊動畫
	var killTween = game.add.tween(brick.scale);
killTween.to({x:0,y:0}, 200, Phaser.Easing.Linear.None);
killTween.onComplete.addOnce(function(){
    brick.kill();
}, this);
killTween.start();
	score += 10;
    scoreText.setText('Points: '+score);
	
     if(score === brickInfo.count.row*brickInfo.count.col*10) {
       setInterval(win,100);
    }
	}
	
	function win(){
	
	 alert('You won the game, congratulations!');
        location.reload();
		}
	//磚塊設定
	function initBricks() {
    brickInfo = {
        width: 50,
        height: 20,
        count: {
            row: 7,
            col: 3
        },
        offset: {
            top: 50,
            left: 60
        },
        padding: 10
    };
	bricks = game.add.group();
	for(c=0; c<brickInfo.count.col; c++) {
    for(r=0; r<brickInfo.count.row; r++) {
        var brickX = (r*(brickInfo.width+brickInfo.padding))+brickInfo.offset.left;
		var brickY = (c*(brickInfo.height+brickInfo.padding))+brickInfo.offset.top;
        newBrick = game.add.sprite(brickX, brickY, 'brick');
        game.physics.enable(newBrick, Phaser.Physics.ARCADE);
        newBrick.body.immovable = true;
        newBrick.anchor.set(0.5);
        bricks.add(newBrick);
    }
	}
	}
	//當球離開邊界
	function ballLeaveScreen() {
    lives--;
    if(lives) {
        livesText.setText('Lives: '+lives);
        lifeLostText.visible = true;
        ball.reset(240, 320-25);
        paddle.reset(240, 320-5);
        game.input.onDown.addOnce(function(){
            lifeLostText.visible = false;
            ball.body.velocity.set(150, -150);
        }, this);
    }
    else {
        alert('You lost, game over!');
        location.reload();
		game.state.start('CSE_building');
    }
	}
