var swimbg;
var swimer1;
var swimer2;
var keyleft;
var keyright;
var leftcheck="left";
var rightcheck="right";
var counttext;
var count=3;
var moverange=10;
var keya;
var keyd;
var p1text;
var p2text;
var ruletext1;
var ruletext2;
var run;
var t1="a";
var t2="d";
var play=0;
var delay=0;

var swim = {
			preload: function (){
			game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
				game.scale.pageAlignHorizontally = true;
				game.scale.pageAlignVertically = true;
				game.stage.backgroundColor = '#eee';
				game.load.image('swimbg', 'minigame/img/swimming.png');
				game.load.spritesheet('swimer', 'minigame/img/swimer.png', 200, 100);
				game.load.image('start','minigame/img/start.png');
			},
			
			
			create: function (){
				game.world.setBounds(0, 0, 540, 320);
			  
			  
			swimbg = game.add.image(0, 0, 'swimbg');
			swimbg.width=540;
			swimbg.height=320;
			swimer1 = game.add.sprite(500, 120, 'swimer');
			swimer1.animations.add('act', [1, 2, 3, 4], 4, true);
			swimer1.inputEnabled = true;
			swimer1.width=50;
			swimer1.height=50;
			swimer1.animations.play('act');
			swimer2 = game.add.sprite(500, 190, 'swimer');
			swimer2.animations.add('act', [1, 2, 3, 4], 4, true);
			swimer2.inputEnabled = true;
			swimer2.width=50;
			swimer2.height=50;
			swimer2.animations.play('act');
			keya=game.input.keyboard.addKey(Phaser.Keyboard.A);
			keyd=game.input.keyboard.addKey(Phaser.Keyboard.D);
			keyleft=game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
			keyright=game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
			 p1text = game.add.text(430, 100, 'Player1', { font: '25px Arial', fill: 'red' });
			 p2text = game.add.text(430, 170, 'Player2', { font: '25px Arial', fill: 'red' });
			ruletext1 = game.add.text(170, 10, 'Player1 use ← + →', { font: '25px Arial', fill: 'red' });
			ruletext2 = game.add.text(170, 50, 'Player2 use A + D', { font: '25px Arial', fill: 'red' });
			startButton = game.add.button(270, 160, 'start', startGame3, this);
				startButton.anchor.set(0.5);
				startButton.width = 320;
				startButton.height = 125;
			},
			update: function (){
			if(run){
			delay++;
			if(delay % 80 == 0&& count>0){
			            count--;
						counttext.setText(count);
						}
			if(count==0){
			play=1;
			counttext.setText('');
			count=-1;
			}
			if(play==1){
			if(swimer1.x<40){
			alert('player1 win, game over!');
				location.reload();
				game.state.start('CSE_building');
			}
			if(swimer2.x<40){
			alert('player2 win, game over!');
				location.reload();
				game.state.start('CSE_building');
			}
		
			if(leftcheck=="left"){
			keyleft.onDown.add(movel,this);
			}
			if(rightcheck=="right"){
			keyright.onDown.add(mover,this);
			}
			
		
			if(t1=="a"){
			keya.onDown.add(movea,this);
			}
			if(t2=="d"){
			keyd.onDown.add(moved,this);
			}
			}
			}
			}
}
function startGame3() {
 counttext = game.add.text(260, 50, '3', { font: '50px Arial', fill: 'red' });
 p1text.setText("");
 p2text.setText("");
 ruletext1.setText("");
 ruletext2.setText("");
	startButton.destroy();
	run = true;
}
			
			
function movel(){
leftcheck="";
rightcheck="right";
swimer1.x-=moverange;
}
function mover(){
leftcheck="left";
rightcheck="";
swimer1.x-=moverange;
}
function movea(){
t1="";
t2="d";
swimer2.x-=moverange;
}
function moved(){
swimer2.x-=moverange;
t1="a";
t2="";
}