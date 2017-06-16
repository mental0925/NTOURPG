//BEI NING//

var Bei_ning = {
	preload: function(){
		game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		game.scale.pageAlignHorizontally = true;
		game.scale.pageAlignVertically = true;
		game.stage.backgroundColor = '#eee';
		
		loadBasicElements();
		game.load.image('map1_bg', 'image/map1_bg.png');
		game.load.image('map1', 'image/map1.png');
		game.load.image('burgerMenu', 'image/photo/Bei_ning/Mr.burger/menu.jpg');
		game.load.image('juiceMenu', 'image/photo/Bei_ning/北寧果汁/menu.jpg');
		game.load.image('pizzaMenu', 'image/photo/Bei_ning/美滋客披薩/menu.jpg');
	},
	create: function(){
		game.world.setBounds(0, 0, 4000, 549);
		map1_bg = game.add.sprite(0, 0, 'map1_bg');
		map1 = game.add.sprite(0, 0, 'map1');
		
		createBasicElements(/*3980*/400, /*105*/300);
		burgerMenu = game.add.sprite(400, 0, 'burgerMenu');	burgerMenu.visible = false;
		burgerMenu.width = 400; burgerMenu.height = 300; burgerMenu.fixToCamera = true;
		juiceMenu = game.add.sprite(400, 0, 'juiceMenu');	juiceMenu.visible = false;
		juiceMenu.width = 400; juiceMenu.height = 300; juiceMenu.fixToCamera = true;
		pizzaMenu = game.add.sprite(400, 0, 'pizzaMenu');	pizzaMenu.visible = false;
		pizzaMenu.width = 400; pizzaMenu.height = 300; pizzaMenu.fixToCamera = true;
	},
	update: function(){
		game.camera.focusOn(player);
		
		if(phone.visible)
			t.updateTime();
		
		nearBurger();
		nearJuice();
		nearDoubleA();
		nearPizza();
		
		movement();
	}
}

function nearBurger(){
	if(distance(220, 395) < 50){
		displayDialogBlock(true);
		message.text = "Mr.burger";
		dialog.animations.stop();
		dialog.frame = 0;
		goButton.events.onInputDown.add(
			function(){
				displayNote(true);
				note_name.text = "Mr.Burger";
				note_phone.text = "0911 956 120";
				note_time.text = "暫時沒有資料~";
				menuButton.events.onInputDown.add(
					function(){ burgerMenu.visible = !burgerMenu.visible; }, this);
		}, this);
		noButton.events.onInputDown.add(
			function(){
				displayDialogBlock(false);
		}, this);
	}
}

function nearJuice(){
	if(distance(605, 395) < 50){
		displayDialogBlock(true);
		message.text = "C飲";
		dialog.animations.stop();
		dialog.frame = 0;
		goButton.events.onInputDown.add(
			function(){
				displayNote(true);
				note_name.text = "C飲";
				note_phone.text = "暫時沒有資料~";
				note_time.text = "暫時沒有資料~";
				menuButton.events.onInputDown.add(
					function(){ juiceMenu.visible = !juiceMenu.visible;	}, this);
		}, this);
		noButton.events.onInputDown.add(
			function(){
				displayDialogBlock(false);
		}, this);
	}
}

function nearDoubleA(){
	if(distance(800, 395) < 50){
		displayDialogBlock(true);
		message.text = "Double A";
		dialog.animations.stop();
		dialog.frame = 0;
		goButton.events.onInputDown.add(
			function(){
				displayNote(true);
				note_name.text = "Double A";
				note_phone.text = "暫時沒有資料~";
				note_time.text = "星期日休息\nAM9:00 ~ PM9:00";
				menuButton.events.onInputDown.add(
					function(){ }, this);
		}, this);
		noButton.events.onInputDown.add(
			function(){
				displayDialogBlock(false);
		}, this);
	}
}

function nearPizza(){
	if(distance(1205, 395) < 50){
		displayDialogBlock(true);
		message.text = "美滋客窯烤披薩";
		dialog.animations.stop();
		dialog.frame = 0;
		goButton.events.onInputDown.add(
			function(){
				displayNote(true);
				note_name.text = "美茲客窯烤披薩";
				note_phone.text = "(02)2462 2123";
				note_time.text = "星期一休息\nAM11:30 ~ PM9:00";
				menuButton.events.onInputDown.add(
					function(){ pizzaMenu.visible = !pizzaMenu.visible;	}, this);
		}, this);
		noButton.events.onInputDown.add(
			function(){
				displayDialogBlock(false);
		}, this);
	}
}


