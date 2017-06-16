var car;
var car1;
var car2;
var car3;
var car4;
var rand;
var man;
var road;
var scoretext;
var score = 0;
var updateDelay = 0;
var speed = 100;
var s = 0;
play = false;

var car = {
	preload: function(){
		game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		game.scale.pageAlignHorizontally = true;
		game.scale.pageAlignVertically = true;
		game.stage.backgroundColor = '#eee';
		game.load.image('man', 'minigame/img/man.png');
		game.load.image('car1','minigame/img/car_down.png');
		game.load.image('car2','minigame/img/car_up.png');
		game.load.image('road','minigame/img/road.png');
		game.load.image('start','minigame/img/start.png');
	},
	create: function(){
		game.world.setBounds(0, 0, 360, 320);
		game.physics.startSystem(Phaser.Physics.ARCADE);
		game.physics.arcade.checkCollision.down = false;
		game.physics.arcade.checkCollision.up = false;
		//路
		road = game.add.image(0, 0, 'road');
		road.width = 360;
		road.height = 320;
		//人
		/*man = game.add.sprite(180, 160, 'man');
		man.anchor.set(0.5,0.5);
		man.width = 20;
		man.height = 40;*/
		player = game.add.sprite(180, 160, 'player');
		player.anchor.set(0.5);
		player.animations.add('left', [0, 1, 2, 3], 6, true);
		player.animations.add('right', [5, 6, 7, 8], 6, true);
		player.animations.add('down', [9, 10, 11, 12], 6, true);
		player.animations.add('up', [14, 15, 16, 17], 6, true);
		game.physics.enable(player, Phaser.Physics.ARCADE); //角色套用物理引擎
		player.body.collideWorldBounds = true; //開啟腳色與遊戲邊界的碰撞偵測
		//分數
		scoreText = game.add.text(5, 5, 'Points: 0', { font: '18px Arial', fill: '#0095DD' });
		//車
		
					
		//開始鈕
		startButton = game.add.button(180, 160, 'start', startGame0, this);
		startButton.anchor.set(0.5);
		startButton.width = 320;
		startButton.height = 125;

	},
	update: function(){
		game.physics.arcade.collide(car, player, bomb);
		if(play){
			//man.x = game.input.x || 180; 
			//man.y = game.input.y || 160;
			movement();
			rand = Math.floor(Math.random() * 8);
			rand = rand * 1;
			updateDelay++;
			speed = speed * 1;
			 
			if (updateDelay % (101-s) == 0) {
				if(speed == 250){
					s += 5;
					s=Math.min(100,s);
				}
				speed = Math.min(250, (Math.floor(score/1)+100));
				score += 10;
				scoreText.setText('Points: '+score);
				
				if(rand >= 0 && rand <= 7){
					var carX;
					var carY;
					var cars;
					
					if(rand == 0){
						carX = 10;
						carY = 0;
						cars = 'car1';
					}else if(rand == 1){
						carX = 50;
						carY = 0;
						cars = 'car1';
					}else if(rand == 2){
						carX = 95;
						carY = 0;
						
						cars = 'car1';
					}else if(rand == 3){
						carX = 135;
						carY = 0;
						
						cars = 'car1';
					}else if(rand == 4){
						carX = 185;
						carY = 260;
						speed = speed * -1;
						cars = 'car2';
					}else if(rand == 5){
						carX = 225;
						carY = 260;
						speed = speed * -1;
						cars = 'car2';
					}else if(rand == 6){
						carX = 270;
						carY = 260;
						speed = speed * -1;
						cars = 'car2';
					}else {
						carX = 310;
						carY = 260;
						speed = speed * -1;
						cars = 'car2';
					}
					car = game.add.sprite(carX, carY, cars);
					car.anchor.set(0,0);
					game.physics.enable(car, Phaser.Physics.ARCADE);
					car.body.collideWorldBounds = true;  //啟用碰撞引擎
					car.width = 40;
					car.height = 51;
					car.body.velocity.set(0, speed);
				}
			}
		}
	}			
}
function startGame0() {
	startButton.destroy();
	play = true;
}
function bomb(){
	alert('You lost, game over!');
	location.reload();
	game.state.start('CSE_building');
}
