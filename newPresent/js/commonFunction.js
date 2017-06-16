var music;
var buttonSound;
var isMusicMute = false;
var phone;
var t = new time();
var timeText;
var dialog;
var message;
var player;
var playerX = 2000;
var playerY = 200;

function loadBasicElements(){
	game.load.spritesheet('player', 'image/man.png', 30, 55);
	game.load.spritesheet('phone', 'image/phone.png');
	game.load.spritesheet('dialog', 'image/dialog.png', 640, 45);
	game.load.spritesheet('note', 'image/note.png');
	game.load.spritesheet('note_close', 'image/note_close.png');
	game.load.spritesheet('menuButton', 'image/menuButton.png', 130, 35);
	game.load.spritesheet('goButton', 'image/去看看.png', 130, 35);
	game.load.spritesheet('noButton', 'image/不要.png', 130, 35);
	game.load.spritesheet('flash', 'image/flash.png', 25, 25);
	game.load.spritesheet('flashSelect', 'image/flashSelect.png', 50, 10);
	game.load.spritesheet('minigame', 'image/minigame.png', 25, 25);
	game.load.spritesheet('phoneButton', 'image/phoneButton.png', 47, 47);
	game.load.spritesheet('volumeButton', 'image/volumeButton.png', 47, 47);	
	game.load.audio('bgMusic', 'audio/bgMusic/WhistlingDowntheRoad.mp3');
	game.load.audio('walkSound', 'audio/walk.mp3');
	game.load.audio('buttonSound', 'audio/button.mp3');
}

function createBasicElements(){
	buttonSound = game.add.audio('buttonSound');
	buttonSound.volume = 0.7;
	
	phone = game.add.sprite(0, 550, 'phone');
	phone.fixedToCamera = true;
	phone.anchor.set(0, 1); //以左下角對齊
	flash = game.add.button(15, 465, 'flash', function(){
		minigameSelectText.visible = false;
		minigameSelect.visible = false;
		flashSelectText.visible = !flashSelectText.visible;
		flashSelect.visible = !flashSelect.visible;
	}, this, 1, 0, 1);
	flash.fixedToCamera = true;
	flashSelect0 = game.add.button(45, 450, 'flashSelect', function(){
		game.state.start('CSE_building'); }, this, 1, 0, 0);
	flashSelect1 = game.add.button(45, 470, 'flashSelect', function(){
		game.state.start('Bei_ning'); }, this, 1, 0, 0);
	flashSelect2 = game.add.button(45, 490, 'flashSelect', function(){
		game.state.start('Zhong_zheng'); }, this, 1, 0, 0);
	flashSelect3 = game.add.button(45, 510, 'flashSelect', function(){
		game.state.start('Xiang_feng'); }, this, 1, 0, 0);
	flashSelect = game.add.group();
	flashSelect.addChild(flashSelect0);
	flashSelect.addChild(flashSelect1);
	flashSelect.addChild(flashSelect2);
	flashSelect.addChild(flashSelect3);
	flashSelect.fixedToCamera = true;
	flashSelectText = game.add.text(60, 445, "系館\n北寧路\n中正路\n祥豐街", {font: "8px 微軟正黑體", fill: "#000000"});
	flashSelectText.fixedToCamera = true;
	
	minigame = game.add.button(15, 495, 'minigame', function(){
		flashSelectText.visible = false;
		flashSelect.visible = false;
		minigameSelectText.visible = !minigameSelectText.visible
		minigameSelect.visible = !minigameSelect.visible;
	}, this, 1, 0, 0);
	minigame.fixedToCamera = true;
	minigameSelect0 = game.add.button(45, 450, 'flashSelect', function(){
		game.state.start('car'); }, this, 1, 0, 0);
	minigameSelect1 = game.add.button(45, 470, 'flashSelect', function(){
		game.state.start('hitbrick'); }, this, 1, 0, 0);
	minigameSelect2 = game.add.button(45, 490, 'flashSelect', function(){
		game.state.start('swim'); }, this, 1, 0, 0);
	minigameSelect = game.add.group();
	minigameSelect.addChild(minigameSelect0);
	minigameSelect.addChild(minigameSelect1);
	minigameSelect.addChild(minigameSelect2);
	minigameSelect.fixedToCamera = true;
	minigameSelectText = game.add.text(60, 445, "躲車子\n打磚塊\n游泳", {font: "8px 微軟正黑體", fill: "#000000"});
	minigameSelectText.fixedToCamera = true;
	
	player = game.add.sprite(playerX, playerY, 'player');
	player.anchor.set(0.5);
	player.animations.add('left', [0, 1, 2, 3], 6, true);
	player.animations.add('right', [5, 6, 7, 8], 6, true);
	player.animations.add('down', [9, 10, 11, 12], 6, true);
	player.animations.add('up', [14, 15, 16, 17], 6, true);
	dialog = game.add.sprite(130, 595, 'dialog');
	dialog.animations.add('load', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 0], 20, false);
	dialog.anchor.set(0, 1); //以左下角對齊
	dialog.fixedToCamera = true;
	
	note = game.add.sprite(400, 300, 'note');
	note.anchor.set(0.5);
	note.fixedToCamera = true;
	note_name = game.add.text(400, 300 - 100, "", {font: "28px 微軟正黑體", fill: "#000000"});
	note_name.anchor.set(0.5);
	note_name.fixedToCamera = true;
	note_phone = game.add.text(370, 244, "", {font: "14px 微軟正黑體", fill: "#000000"});
	note_phone.fixedToCamera = true;
	note_time = game.add.text(400, 272, "", {font: "14px 微軟正黑體", fill: "#000000"});
	note_time.fixedToCamera = true;
	note_close = game.add.button(480, 135, 'note_close', function(){ displayNote(false); }, this, 0);
	note_close.fixedToCamera = true;
	menuButton = game.add.button(400 - 55, 350, 'menuButton', null, this, 1, 0, 0);
	menuButton.fixedToCamera = true;
	
	goButton = game.add.button(470, 555, 'goButton', null, this, 1, 0, 0);
	goButton.fixedToCamera = true;
	noButton = game.add.button(630, 555, 'noButton', null, this, 1, 0, 0);
	noButton.fixedToCamera = true;
	message = game.add.text(205, 550 + 4, "", {font: "32px 微軟正黑體", fill: "#000000"});
	message.fixedToCamera = true;
	timeText = game.add.text(13, 380 + 25, "", {font: "14px 微軟正黑體", fill: "#000000"});
	timeText.fixedToCamera = true;
	displayDialogBlock(false);
	displayPhone(false);
	displayNote(false);
	phoneButton = game.add.button(0, 550, 'phoneButton', clickOnPButton, this, 2, 1, 0);
	phoneButton.fixedToCamera = true;
	volumeButton = game.add.button(50, 550, 'volumeButton', clickOnVButton, this, 2, 1, 0);
	volumeButton.fixedToCamera = true;
	game.physics.startSystem(Phaser.Physics.ARCADE); //啟用Arcade物理引擎
	game.physics.enable(player, Phaser.Physics.ARCADE); //角色套用物理引擎
	player.body.collideWorldBounds = true; //開啟腳色與遊戲邊界的碰撞偵測
	this.cursors = game.input.keyboard.createCursorKeys();
}

function movement(){
	var moveX = 0;
	var moveY = 0;
	if(this.cursors.up.isDown) 	moveY = moveY - 4;
	if(this.cursors.down.isDown)	moveY = moveY + 4;
	if(this.cursors.left.isDown)	moveX = moveX - 4;
	if(this.cursors.right.isDown)	moveX = moveX + 4;
	if(moveX != 0 || moveY != 0){
		displayPhone(false);
		displayDialogBlock(false);
		player.x += moveX;
		player.y += moveY;
		walkSound.volume = 0.7;
		if(moveX == 0){
			if(moveY > 0)
				player.animations.play('down');
			if(moveY < 0)
				player.animations.play('up');
		}
		if(moveY == 0 || (moveX != 0 && moveY != 0)){
			if(moveX > 0)
				player.animations.play('right');
			if(moveX < 0)
				player.animations.play('left');
		}
	}
	else {
		player.animations.stop();
		if(phone.visible)
			player.frame = 13;
		else
			player.frame = 4;
		walkSound.volume = 0.0;
	}
}

function displayPhone(bool){
	phone.visible = bool;
	timeText.visible = bool;
	flash.visible = bool;
	flash.inputEnabled = bool;
	flashSelectText.visible = false;
	flashSelect.visible = false;
	flashSelect.inputEnabled = false;
	minigame.visible = bool;
	minigame.inputEnabled = bool;
	minigameSelectText.visible = false;
	minigameSelect.visible = false;
	minigameSelect.inputEnabled = false;
}

function displayDialogBlock(bool){
	if(bool)
		dialog.animations.play('load');
	else if(!bool){
		dialog.animations.stop();
		dialog.frame = 0;
	}
	dialog.visible = bool;

	goButton.visible = bool;
	goButton.inputEnabled = bool;
	noButton.visible = bool;
	noButton.inputEnabled = bool;
	message.visible = bool;
}

function displayNote(bool){
	note.visible = bool;
	note_name.visible = bool;
	note_phone.visible = bool;
	note_time.visible = bool;
	note_close.visible = bool;
	menuButton.visible = bool;
}

function time(){
	var now;
	var year;
	var month;
	var day;
	var hour;
	var min;
	var sec;
	var AMorPM;
	
	this.getTime = function(){
		now = new Date();
		year = now.getFullYear();
		month = now.getMonth() + 1;
		day = now.getDate();
		hour = now.getHours();
		min = now.getMinutes();
		sec = now.getSeconds();
		if(hour > 12){
			hour = hour - 12;
			AMorPM = "PM ";
		}
		else
			AMorPM = "AM "
		if(month < 10)
			month = "0" + month;
		if(day < 10)
			day = "0" + day;
		if(hour < 10)
			hour = "0" + hour;
		if(min < 10)
			min = "0" + min;
		if(sec < 10)
			sec = "0" + sec;
	}
	this.updateTime = function(){
		this.getTime();
		timeText.text = year + "/" + month + "/" + day + "\n" + AMorPM + hour + ":" + min + ":" + sec;
	}
}

function distance(xi, yi){
	var dis = Math.sqrt(Math.pow(Math.abs(player.x - xi), 2) + Math.pow(Math.abs(player.y - yi), 2));
	return dis;
}

function clickOnPButton() {
	displayPhone(!phone.visible);
	buttonSound.play();
	
	if(phone.visible)
		player.frame = 9;
	else
		player.frame = 4;
}

function clickOnVButton(){
	if(isMusicMute){
		volumeButton.setFrames(2, 1, 0);
		music.volume = 0.4;
		isMusicMute = false;
	}
	else {
		volumeButton.setFrames(5, 4, 3);
		music.volume = 0;
		isMusicMute = true;
	}
}
