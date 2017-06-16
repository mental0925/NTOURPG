var fishbg;
var fish1,fish2,fish3,fish4,fish5;
var fisher;
var fish;
var seagull=[];
var scoretext;
var score=0;
var time=0;
var startButton;
var got;
var gottext;
var restart;
var finish;
var play=false;
var fishdiv;
var div=[];
var fishnum=0;
var seagull2,seagull3,seagull4,seagull5,seagull6,seagull7;
var delay=0;
var time=0;
var speed=3;
			
var fish = {
	preload: function (){
		game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		game.scale.pageAlignHorizontally = true;
		game.scale.pageAlignVertically = true;
		game.stage.backgroundColor = '#eee';
		game.load.image('fishbg', 'minigame/img/fishingbg.png');
		game.load.spritesheet('fisher', 'minigame/img/fisher.png', 640, 283);
		game.load.image('fish1','minigame/img/fish1.png');
		game.load.image('fish2','minigame/img/fish2.png');
		game.load.image('fish3','minigame/img/fish3.png');
		game.load.image('fish4','minigame/img/fish4.png');
		game.load.image('fish5','minigame/img/fish5.png');
		game.load.spritesheet('seagull', 'minigame/img/seagull.png', 222, 100);
		game.load.image('start','minigame/img/start.png');
		game.load.image('got','minigame/img/got.png');
		game.load.image('restart','minigame/img/restart.png');
		game.load.image('finish','minigame/img/finish.png');
		game.load.image('fishdiv','minigame/img/div.png');
	},		
	create: function (){
		game.world.setBounds(0, 0, 540, 320);
		fishbg = game.add.image(0, 0, 'fishbg');
		fishbg.width=540;
		fishbg.height=320;
		fisher = game.add.sprite(20, 110, 'fisher');
		fisher.animations.add('act', [0, 1], 4, true);
		fisher.inputEnabled = true;
		
		fisher.width=300;
		fisher.height=100;
		
		drawbird();
		scoretext = game.add.text(10, 5, 'score:0', { font: '25px Arial', fill: 'black' });
		
		time=Math.floor(Math.random()*15)+5;
		time=time*60;
		
		startButton = game.add.button(270, 160, 'start', startGame1, this);
		startButton.anchor.set(0.5);
		startButton.width = 320;
		startButton.height = 125;
		
		fishdiv=game.add.image(210,280,'fishdiv');
		fishdiv.width=270;
		fishdiv.height=40;	
	},
	
	update: function(){
		if(play){
			delay++;
			if(delay==time){
				fisher.animations.play('act');
				
				got = game.add.button(410, 100, 'got', gotfish, this);
				got.anchor.set(0.5);
				got.width = 220;
				got.height = 105;
			}else if(delay>(time+speed*60))
				lose();
		}
	}
}
function lose(){
fisher.animations.stop('act');
fisher.frame=1;
play=false;
delay=0
gottext = game.add.text(game.world.width*0.5, 80, '你沒釣到', { font: '50px Arial', fill: 'red' });
gottext.anchor.set(0.5);
got.destroy();
restart = game.add.button(game.world.width*0.5-90, 200, 'restart', restartgame2, this);
restart.anchor.set(0.5);
restart.width = 150;
restart.height = 70;

finish = game.add.button(game.world.width*0.5+90, 200, 'finish', finishgame, this);
finish.anchor.set(0.5);
finish.width = 150;
finish.height = 70;

}
function gotfish(){
fisher.animations.stop('act');
fisher.frame=1;
play=false;
delay=0
gottext = game.add.text(game.world.width*0.5, 40, '你釣到了', { font: '25px Arial', fill: 'red' });
gottext.anchor.set(0.5);
got.destroy();
speed-=0.5;
var randfish=Math.floor(Math.random()*5)+1;
fish = game.add.image(game.world.width*0.5, 100, 'fish'+randfish);
fish.anchor.set(0.5);
fish.width=200;
fish.height=100;

div[fishnum]=game.add.image(215+fishnum*29,285,'fish'+randfish);
div[fishnum].width=27;
div[fishnum].height=27;
fishnum++;
if(randfish==1){
score+=1;
}else if(randfish==2){
score+=2;
}else if(randfish==3){
score+=3;
}else if(randfish==4){
score+=5;
}else{
score+=7;
}
scoretext.setText('score:'+score);
restart = game.add.button(game.world.width*0.5-90, 200, 'restart', restartgame, this);
restart.anchor.set(0.5);
restart.width = 150;
restart.height = 70;

finish = game.add.button(game.world.width*0.5+90, 200, 'finish', finishgame, this);
finish.anchor.set(0.5);
finish.width = 150;
finish.height = 70;

}
function restartgame(){
fisher.animations.stop('act');
play=true;
gottext.setText("");
fish.kill();
fisher.animations.play('act');
time=Math.floor(Math.random()*15)+5;
time=time*60;
restart.destroy();
finish.destroy();
}
function restartgame2(){
gottext.setText("");
fisher.animations.stop('act');
play=true;
fisher.animations.play('act');
time=Math.floor(Math.random()*15)+5;
time=time*60;
restart.destroy();
finish.destroy();
}

function finishgame(){
location.reload();
game.state.start('CSE_building');
}
function startGame1() {
for(var i=0;i<10;i++){
seagull[i].animations.play('act');
}
play=true;
 	startButton.destroy();
}

function drawbird(){
for(var i=0;i<10;i++){
var randX=Math.random()*490;
var randY=Math.random()*80;
seagull[i] = game.add.sprite(randX, randY, 'seagull');
seagull[i].animations.add('act', [0, 1], 4, true);
seagull[i].inputEnabled = true;
seagull[i].width=50;
seagull[i].height=20;

}
}
