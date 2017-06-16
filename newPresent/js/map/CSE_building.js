//CSE BUILDING//

var CSE_building = {
	preload: function(){
		game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		game.scale.pageAlignHorizontally = true;
		game.scale.pageAlignVertically = true;
		game.stage.backgroundColor = '#eee';
		
		loadBasicElements();
		game.load.image('map0_bg', 'image/map0_bg.png');
		game.load.image('map0', 'image/map0.png');
		game.load.spritesheet('fishman', 'image/fishman.png', 40, 60);
	},
	create: function(){
		game.world.setBounds(0, 0, 2400, 750);
		map0_bg = game.add.sprite(0, 0, 'map0_bg');
		map0 = game.add.sprite(0, 0, 'map0');
		
		fishman = game.add.sprite(1732, 150, 'fishman');
		fishman.animations.add('act', [0, 1, 2, 3], 4, true);
		fishman.inputEnabled = true;
		fishman.events.onInputDown.add(showFishmanDialog, this);
		
		music = game.sound.play('bgMusic');
		music.loopFull(0.3);
		walkSound = game.sound.play('walkSound');
		walkSound.loopFull(0.0);
		createBasicElements(2130, 245);
	},
	update: function(){
		map0_bg.x = game.camera.x * 0.75;

		game.camera.focusOn(player); //每秒鏡頭都重新導向角色
		
		if(phone.visible)
			t.updateTime();
		
		nearFishman();
		nearBeiNing();
		
		movement();
	}
}

function nearBeiNing(){
	if(distance(0, 500) < 100){
		displayDialogBlock(true);
		message.text = "過去就是北寧路";
		dialog.animations.stop();
		dialog.frame = 0;
		goButton.events.onInputDown.add(
			function(){
				game.state.start('Bei_ning');
		}, this);
		noButton.events.onInputDown.add(
			function(){
				displayDialogBlock(false);
		}, this);
	}
}

function nearFishman(){
	if(distance(1752, 180) < 100)
		fishman.animations.play('act');
	else {
		fishman.animations.stop();
		fishman.frame = 0;
		return false;
	}
	return true;
}
function showFishmanDialog(){
	if(nearFishman()){
		displayDialogBlock(true);
		message.text = "有人在海堤釣魚...";
		goButton.events.onInputDown.add(
			function(){
				//go to fishing game
				game.state.start('fish');
		}, this);
		noButton.events.onInputDown.add(
			function(){
				displayDialogBlock(false);
		}, this);
	}
}