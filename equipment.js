SEEAss = {};
SEEAss.Knight=8;
SEEAss.Palladin=13;
SEEAss.DarkKnight=12;
SEEAss.Wizard=2;
//SEEAss.Mage=4;
SEEAss.Archer=4
SEEAss.Sage=10;
SEEAss.Healer=5;
SEEAss.Cleric=9;
SEEAss.Angel=11;
//SEEAss.Theif=5;
SEEAss.Ninja=6;
//SEEAss.Assasin=5;
SEEAss.Bear=0;
SEEAss.PolarBear=14;
SEEAss.EarthBound=16;
SEEAss.Theif=17;
SEEAss.Creeper=18
SEEAss.Dancer=19;
SEEAss.Skeleton=20;
SEEAss.CptBearmerica=31;
SEEAss.IronBear=32;
SEEAss.HulkBear=33;
SEEAss.Winger=7;
SEEAss.Frog=3;
SEEAss.RumHam=15;
SEEAss.Shoe=1;
SEEAss.Werewolf=21;
SEEAss.Vampire=22;
SEEAss.Samurai=23;
SEEAss.Monk=24;
SEEAss.Tiger=25;
SEEAss.Witch=29;
SEEAss.Pumpkinhead=30;
SEEAss.Mermaid=26;
SEEAss.Octopus=27;
SEEAss.BeastTamer=28;
var starting=false;
var bColors = ["#008000","#006400", "#FF4500", "#000080", "#696969", "#800080", "#808000", "#A52A2A", "#8B4513", "#FFDEAD", "#FFFF40","#000080" , "#FFFF80"]; //list of colors for radar/a few other things

function textbox() 
 {  //draws a text box
	this.exists=false;
	this.x=140;
	this.y=370;
	this.lines=1;
	this.scroll=0;
	this.width=600;
	this.height=55;
	this.colors=new Array(5);
	this.msg=new Array(5);
	this.msg[0]="Msg";
	this.msg[1]="msg";
	this.colors[0]="white";
	this.colors[1]="white";
	this.colors[2]="white";
	this.colors[3]="white";
	this.draw=function(can)
	{
		can.save();
		can.globalAlpha=0.80;
		can.fillStyle = "#DCDCDC";
		can.fillRect(this.x-10,this.y-10,this.width+10,this.height+10);
		
		can.fillStyle = "#483D8B ";
		can.fillRect(this.x,this.y,this.width-10,this.height-10);
		
		can.font = "16pt Calibri";
		can.textAlign = "left";
		can.textBaseline = "middle";
		can.fillStyle = "white";
		if(this.lines==1){
			can.fillStyle=this.colors[i];
			can.fillText(this.msg[0], this.x+10,this.y+8+(14));
		}else
		{
			for(var i=0;i<this.lines;i++){
				//if (i>bConsoleStr.length) {break;}
				can.fillStyle=this.colors[i];
				can.fillText(this.msg[i], this.x+10,this.y+4+(15*(i+1)));
			}	
		}
		can.restore();
	};
};

var battleBox=new textbox();
var townbox=new textbox();
var bmenuBox=new textbox();
var bossSpouted=false;

var monsta= new particleSystem();

function classLevel()
{
    var ted=[];
	//if this.class==SEEAss.
	ted.maxhp=3+Math.floor(Math.random()*4);
    ted.maxmp=4+Math.floor(Math.random()*4);
    ted.speed=0+Math.floor(Math.random()*1);
    ted.evade=1+Math.floor(Math.random()*4);
    ted.luck=1+Math.floor(Math.random()*4);
    ted.def=1+Math.floor(Math.random()*4);
    ted.mdef=1+Math.floor(Math.random()*4);
    ted.attack=1+Math.floor(Math.random()*5);
    ted.mag=2+Math.floor(Math.random()*4);
	if (this.class==SEEAss.Knight)
	{
		ted.maxhp=3+Math.floor(Math.random()*4);
		ted.maxmp=4+Math.floor(Math.random()*4);
		ted.speed=0+Math.floor(Math.random()*1);
		ted.evade=1+Math.floor(Math.random()*4);
		ted.luck=1+Math.floor(Math.random()*4);
		ted.def=3+Math.floor(Math.random()*4);
		ted.mdef=1+Math.floor(Math.random()*4);
		ted.attack=4+Math.floor(Math.random()*5);
		ted.mag=1+Math.floor(Math.random()*4);
	}else if (this.class==SEEAss.Wizard)
	{
		ted.maxhp=3+Math.floor(Math.random()*4);
		ted.maxmp=4+Math.floor(Math.random()*4);
		ted.speed=0+Math.floor(Math.random()*1);
		ted.evade=1+Math.floor(Math.random()*4);
		ted.luck=1+Math.floor(Math.random()*4);
		ted.def=1+Math.floor(Math.random()*4);
		ted.mdef=1+Math.floor(Math.random()*4);
		ted.attack=1+Math.floor(Math.random()*5);
		ted.mag=4+Math.floor(Math.random()*4);
	}else if (this.class==SEEAss.Sage)
	{
		ted.maxhp=3+Math.floor(Math.random()*4);
		ted.maxmp=4+Math.floor(Math.random()*4);
		ted.speed=0+Math.floor(Math.random()*1);
		ted.evade=1+Math.floor(Math.random()*4);
		ted.luck=1+Math.floor(Math.random()*4);
		ted.def=1+Math.floor(Math.random()*4);
		ted.mdef=3+Math.floor(Math.random()*4);
		ted.attack=1+Math.floor(Math.random()*5);
		ted.mag=5+Math.floor(Math.random()*4);
	}else if (this.class==SEEAss.Ninja)
	{
		ted.maxhp=3+Math.floor(Math.random()*4);
		ted.maxmp=4+Math.floor(Math.random()*4);
		ted.speed=0+Math.floor(Math.random()*1);
		ted.evade=3+Math.floor(Math.random()*4);
		ted.luck=1+Math.floor(Math.random()*4);
		ted.def=1+Math.floor(Math.random()*4);
		ted.mdef=1+Math.floor(Math.random()*4);
		ted.attack=2+Math.floor(Math.random()*5);
		ted.mag=2+Math.floor(Math.random()*4);
	}
	return ted;
};


var Element={};
Element.Fire=0;
Element.Ice=1;
Element.Wind=2;
Element.Light=3;
Element.Dark=4;

var Religon={};
Religon.Seven=1;
Religon.Old=2;
Religon.Red=3;
Religon.Storm=4;
Religon.Other=5;

var TileType={};
TileType.Grass=0;
TileType.Plains=1;
TileType.Swamp=2;
TileType.Hills=7;
TileType.Snow=5;
//TileType.DeepSnow=6;
TileType.Mountains=4;
TileType.Water=20;
TileType.Ocean=24;
TileType.Lava=28;
TileType.Forest=3;
TileType.Road=8;
TileType.Sand=9;

var lastEventX=0;
var lastEventY=0;

var selBox=[];
selBox.point1=[];
selBox.point2=[];
selBox.tX=0;
selBox.tY=0;
selBox.exists=false;
selBox.p1=false;
selBox.p2=false;
selBox.width=0;
selBox.height=0;

var someoneAttacking=false;
function drawSelBox(can){
	if(!selBox.exists) {return;}
	if(selBox.p1) {flagsprite.draw(can,selBox.point1.x,selBox.point1.y);}
	var w =selBox.point1.x-selBox.point2.x;
	var h =selBox.point1.y-selBox.point2.y;
	can.strokeStyle="#FFFF00";
	can.lineWidth=1;
	can.beginPath();
	if(!selBox.p2)
	{

		can.moveTo(selBox.point1.x,selBox.point1.y);
		console.log(mX,mY);
		can.lineTo(mX,selBox.point1.y);
		can.lineTo(mX,mY);
		can.lineTo(selBox.point1.x,mY);
		can.lineTo(selBox.point1.x,selBox.point1.y);
	}else
	{
		can.moveTo(selBox.point1.x,selBox.point1.y);
		can.lineTo(selBox.point2.x,selBox.point1.y);
		can.lineTo(selBox.point2.x,selBox.point2.y);
		can.lineTo(selBox.point1.x,selBox.point2.y);
		can.lineTo(selBox.point1.x,selBox.point1.y);
	}
    can.stroke();
	can.closePath();
};
function rectOverlap(r1,r2){
	
	if(r1.x> r2.x+2) {return false;}
	if(r1.x+r1.width< r2.x) {return false;}
	if(r1.y> r2.y+2) {return false;}
	if(r1.y+r1.height< r2.y) {return false;}

	return true;
};
var phsAttackSprite=new Array(3);
phsAttackSprite[0]=Sprite("ironsword");
phsAttackSprite[1]=Sprite("ironsword1");
phsAttackSprite[2]=Sprite("ironsword2");
var rangedAttackSprite=new Array(3);
rangedAttackSprite[0]=Sprite("bow");
rangedAttackSprite[1]=Sprite("bow1");
rangedAttackSprite[2]=Sprite("bow2");
var magAttackSprite=new Array(3);
magAttackSprite[0]=Sprite("explosion0");
magAttackSprite[1]=Sprite("explosion1");
magAttackSprite[2]=Sprite("explosion2");
var icemagAttackSprite=new Array(3);
icemagAttackSprite[0]=Sprite("ice0");
icemagAttackSprite[1]=Sprite("ice1");
icemagAttackSprite[2]=Sprite("ice2");
var windmagAttackSprite=new Array(3);
windmagAttackSprite[0]=Sprite("wave0");
windmagAttackSprite[1]=Sprite("wave1");
windmagAttackSprite[2]=Sprite("wave2");
var danceAttackSprite=new Array(3);
danceAttackSprite[0]=Sprite("dancer1");
danceAttackSprite[1]=Sprite("dancer2");
danceAttackSprite[2]=Sprite("dancer");
var healAttackSprite=new Array(3);
healAttackSprite[0]=Sprite("heal0");
healAttackSprite[1]=Sprite("heal1");
healAttackSprite[2]=Sprite("heal2");

var numMapPoints=6;
var mmcur=false;
var bConsoleStr=new Array();
var bConsoleClr=new Array();
var bConsoleBox;
var bMenuBox;
var lastExplosion=0;
var EXPLOSION_RATE=500;
bConsoleStr.push("");
bConsoleStr.push("");
bConsoleStr.push("");
bConsoleStr.push("Game Start!");
bConsoleClr.push("white");
bConsoleClr.push("white");
bConsoleClr.push("white");
bConsoleClr.push("white");
var towns=new Array();
var radarBitmap=[];
var mapBitmap=[];
var sideBar=false;
var textPause=false;
var won="";
var textText="";
var ATTACK_LEN=15;
var ATTACK_ANI_LENGTH=12;
var CANVAS_WIDTH = 900;
var CANVAS_HEIGHT = 640;
var MUSIC_ON=true;
var MUSIC_VOL=0.1;
var wind=Math.floor(Math.random()*2)+1;
var MAP_WIDTH = 999;
var MAP_HEIGHT = 999;
var CRIT_CHANCE=100;
var FPS = 30;
var LAVA_RATE=2000;
var WATER_RATE=2000;
var BURN_RATE=100;
var CHARANI_RATE= 200;
var SPAWN_X=22;
var SPAWN_Y=19;
var GRAVITY_RATE=5;
var TEAM_SIZE = 12;
var SELECTED=0;
var MSELECTED=0;
var MUSELECTED=0;
var BSELECTED=0;
var NUM_STATUS=5;
var NUM_CLASSES=19;
var ENCOUNTER_RATE=25000;
var TAME_CHANCE=40;
var preBattle=0;
var preBattleLength=100;
var MAPNAME ="map3";
var pageCount=0;
var cardUsed=false;
var gamespeed=0;//2;
var isBattle=false;
var isMenu=0;
var battlelength=15;
var combatants=new Array(2);
var battledelay=10;
var battletick=0;
var battleenddelay=10;
var battleendtick=0;
var numMaps=5;
var mapSelected=0;
var winmode=0;
var mode=0;
var looseX=0;
var looseY=0;
var mapDirty=true;
var mmcur=true;
var victoryCount=0;
var victoryLap=200;
var victoryReport=200;
var victoryReporting=false;
var victory=false;
var projectionCount=0;
var projectionLength=200;
//var keychart = ["w","a","d","s","up","right","down","left","m","n","shift"];
var names= new Array (2);
names[0]=new Array(120);
names[1]=new Array(120);
var mX=120;
var mY=320;
var townnames=new Array(40);
townnames= ["Qarth","Meereen","Myr","Pentos","Ashford","Ashemark","Gulltown","Pyke","Lordsport","Lannisport","Lys","Tyrosh","Iben","New Ghis","Astapor","Yunkai","Qohor","Lorath","Volantis","Braavos","Vaes Dothrak","White Harbor","Maidenpool","Oldstones","Harrenhal","Riverrun","Seaguard","Winterfell","Saltpans","Castamere","Oxcross","Crakehall","The Crag","Duskendale","Dragonstone","Rosby","Highgarden","Oldtown","Grimston","Hardhome"];
tname=new Array(5);

tname[0]=["Last Hearth","Deepwood Motte","Karhold","Tohhren's Square","Barrowton","Hornwood","White Harbor","Castle Black"];
tname[1]=["Flint's Finger","Moat Cailin","Seaguard","Oldstones"];
tname[2]=["Fairmarket","Stoney Sept","High Heart","Acorn hall","Pinkmaiden"];
tname[3]=["Maidenpool","Duskendale","Brindlewood", "Crackclaw Point"];
tname[4]=["Blackmont","Kingsgrave","Wyl","Yornwood","Godsgrace","Saltshore","Lemonwood"];
names[0]= ["Eddard", "Theon","Bealor", "Aerys", "Aemon", "Aemond", "Fletcher Dick", "Beardless Dick", "Valarr", "Hot Pie", "Lommy", "Jon", "Matarys", "Dunk", "Egg", "Aerion","Bran","Bronn","Robb","Tyrion","Jamie","Tywin","Jeor","Jorah","Mero","Stannis","Gendrey","Yoren","Rickard","Drogo","Brandon","Gregor","Sandor","Polliver","Allister","Barristan","Jeoffery","Robert","Symon","Dolorous Edd","Podrick","Renly","Illyn","Aurane","Regular Ed","Merret","Walder","HODOR","Luwin","Cressen","Janos","Tytos","Garion","Willas","Garlan","Viserys","Loras","Willem","Martyn","Illyrio","Xaro Xhoan Ducksauce","Cleon","Aegon","Emmon","Skahaz","Cleos","Tygett","Vargo","Pono","Nimble Dick","Iron Emmett","Mance","Tormund","Varamyr","Orell","Jaquen","Wease","The Tickler","Dareon","Morroqo","Marwyn","Pate","Davos","Axel","Wyman","Pyter","Varys","Arnolf","Sigorn","Hoster","Tion","Helman","Torrhen","Yohn","Lyn","Nestor","Doran","Oberyn","Qyburn","Howland","Daario","Xhondo","Yellow Dick","Zachery","Zekko","Zollo","Will","Willbert","Wendel","Wendamyr","The Weeper","Wat","Walton","Vardis","Urrigon","Ulmer","Tobho","Timett","Syrio","Styr"];
names[1]= ["Alysane", "Lyra", "Naerys", "Pia", "Lynesse", "Maege", "Rhaenyra", "Kyra", "Rhae", "Tanselle", "Daena", "Elaena", "Myriah", "Aelinor","Arya","Sansa","Shae","Meera","Mina","Gilly","Ygritte","Ami","Cersei","Tanda","Lollys","Mya","Alayne","Myrcella","Lyanna","Lemore","Jayne","Talisa","Ros","Margery", "Catlyen", "Brienne", "Olenna", "Roslin", "Lysa", "Taena","Senelle","Falyse","Barra","Bella","Joanna","Joy","Janei","Dorna","Ashara","Allyria","Asha","Osha","Rhonda","Rhea","Alerie","Alysanne","Malora","Daenerys","Irri","Rhaella","Ellia","Illyrio","Quaithe", "Missandei", "Shireen","Mezzara","Kezmya","Qezza","Jhezene","Miklaz","Arianne","Shella","Mellario","Obara","Nymeria","Tyene","Obella","Dorea","Loreza","Myranda","Thistle","Alannys","Alla ","Alia","Alyce","Minisa","Meris","Wenda","Anya","Doreah","Horma","Weasel","Tysha","Sarella","Maggi","Jenny","Barbrey","Bethany","Wylla","Leona","Alys","Amarei","Old Nan","Yna","Ysilla","Victaria","Visenya","Val","The Waif","Tya","Tysane","Tansey","Talla","Taela","Squirrel","Shiera","Sharna","Scolera","Sarra","Sallei","S'vrone","Rhea","Rhialta"];
var namesused=new Array(2);
namesused[0]=new Array(120);
namesused[1]=new Array(120);
for( var i=0; i<120; i++ ){ namesused[0][i]=false;namesused[1][i]=false; }

var tileSprite=new Array(39);
tileSprite[TileType.Grass] = Sprite("grass");
tileSprite[TileType.Forest] = Sprite("darkgrass"); 
tileSprite[TileType.Snow] = Sprite("snow"); 
tileSprite[TileType.Ocean] = Sprite("ocean");
tileSprite[TileType.Ocean+1] = Sprite("ocean1");
tileSprite[TileType.Ocean+2] = Sprite("ocean2");
tileSprite[TileType.Ocean+3] = Sprite("ocean3");
tileSprite[TileType.Water] = Sprite("water");
tileSprite[TileType.Water+1] = Sprite("water");
tileSprite[TileType.Water+2] = Sprite("water");
tileSprite[TileType.Water+3] = Sprite("water");
tileSprite[TileType.Lava] = Sprite("lava0");
tileSprite[TileType.Lava+1] = Sprite("lava1");
tileSprite[TileType.Lava+2] = Sprite("lava2");
tileSprite[TileType.Lava+3] = Sprite("lava3");
tileSprite[TileType.Lava+4] = Sprite("lava4");
tileSprite[TileType.Mountains] = Sprite("stone");
tileSprite[TileType.Hills] = Sprite("hills");
tileSprite[TileType.Swamp] = Sprite("swamp");
tileSprite[TileType.Plains] = Sprite("dirt");
tileSprite[TileType.Road] = Sprite("road");
tileSprite[TileType.Sand] = Sprite("sand");


var tileColors=new Array(39);
tileColors[TileType.Grass] = "#008000";
tileColors[TileType.Forest] = "#003300";
tileColors[TileType.Ocean] = "#0000FF";
tileColors[TileType.Snow] = "#F0FFFF";
tileColors[TileType.Water] = "#0066CC";
tileColors[TileType.Mountains] = "#330000";
tileColors[TileType.Hills] = "#996666";
tileColors[TileType.Swamp] = "#669900";
tileColors[TileType.Plains] = "#FF9966";
tileColors[TileType.Road] = "#CCCCCC";
tileColors[TileType.Sand] = "#999966";
tileColors[TileType.Lava] = "#FF0000";



var poisonsprite = Sprite("poison");
var protectsprite = Sprite("protect");
var reflectsprite = Sprite("reflect");
var bluelocationsprite = Sprite("bluelocation");
var redlocationsprite = Sprite("redlocation");
var regensprite = Sprite("regen");
var selector = Sprite("cursor");
var selector2 = Sprite("newcursor");
var noleader= Sprite("noleader");
var flagsprite = Sprite("flag");
var thingysprite = Sprite("thingy");
var titlesprite = Sprite("title");
var worldmapsprite = Sprite("worldmap");
var clocksprite=new Array(6);
var RGB_THRESHOLD=15;
clocksprite[0] = Sprite("clock0");
clocksprite[1] = Sprite("clock1");
clocksprite[2] = Sprite("clock2");
clocksprite[3] = Sprite("clock3");
clocksprite[4] = Sprite("clock4");
clocksprite[5] = Sprite("clock5");
var explosionsprite=new Array(4);
explosionsprite[0] =Sprite("explosion0");
explosionsprite[1] =Sprite("explosion1");
explosionsprite[2] =Sprite("explosion2");
explosionsprite[3] =Sprite("explosion3");

var numClouds=44;

function cloud(){
	this.x=Math.floor(Math.random()*3520)+100;
	this.y=Math.floor(Math.random()*4480)+300;
	this.layer=Math.floor(Math.random()*2)+1;
	this.sprite=Sprite("cloud1");
	this.ang=Math.floor(Math.random()*90);
	var rnd=Math.floor(Math.random()*9);
	if(rnd>1){
		this.sprite=Sprite("cloud2");
	}	if(rnd>2){
		this.sprite=Sprite("cloud3");
	}	if(rnd>3){
		this.sprite=Sprite("cloud4");
	}	if(rnd>4){
		this.sprite=Sprite("cloud5");
	}	if(rnd>5){
		this.sprite=Sprite("cloud6");
	}	if(rnd>6){
		this.sprite=Sprite("cloud7");
	}   if(rnd>7){
		this.sprite=Sprite("cloud8");
	}   if(rnd>8){
		this.sprite=Sprite("cloud9");
	}
}
cloud.prototype.update = function() {
    this.y-=this.layer*wind/2;
    if (this.y<-200) {
	this.y=Math.floor(Math.random()*300)+4480;
	this.x=Math.floor(Math.random()*3420)+100;
    }
};
var clouds=new Array(numClouds);
for(var i=0;i<numClouds;i++)
{
	clouds[i]=new cloud();
}
var tileani=0;
  
 


townbox.x=100;
townbox.width=600;
townbox.y=300;
townbox.height=200;
var anicount=0;
var anirate=4000;
var lastani=0;
var gotall=false;
var BATTLE_REPORT_LENGTH=400;
var numsounds=0;
var soundsplaying ="";
var timestamp = new Date(); 
var milliseconds = timestamp.getTime();
var lasttime=0;
var enemyDeployCount=1;
var deployRate=200;
var battlespeed=100;
var battleRate=2;
var paused=false;
var mappause=false;
var battleReport=false;
var battlePause=false;
var unitinfo=false;
var lastClick=0;
var dblClickRate=350;
var healcount=0;
var healrate=140;
//var numTowns=6;
var CSELECTED=0;
var maps=new Array(6);
var mapIconWidth=32;
var mapIconHeight=45;
maps[0]=[];
maps[0].x=270;
maps[0].y=140;
maps[0].team=1;
maps[0].numTowns=6;
maps[0].name="The North";
maps[0].preReq=new Array();
maps[0].preReq.push(0);
maps[0].numReqs=1;
//maps[1].buildMap("map3");
maps[1]=[];
maps[1].x=230;
maps[1].y=251;
maps[1].team=1;
maps[1].numTowns=6;
maps[1].name="The Neck";
maps[1].preReq=new Array();
maps[1].preReq.push(0);
maps[1].numReqs=1;

maps[2]=[];
maps[2].x=241;
maps[2].y=343;
maps[2].team=1;
maps[2].numTowns=6;
maps[2].name="The Riverlands";
maps[2].preReq=new Array();
maps[2].preReq.push(1);
maps[2].numReqs=1;

//maps[3].buildMap("map");

maps[3]=[];
maps[3].x=333;
maps[3].y=400;
maps[3].team=1;
maps[3].numTowns=6;
maps[3].name="Kings Landing";
maps[3].preReq=new Array();
maps[3].preReq.push(2);
maps[3].numReqs=1;

maps[4]=[];
maps[4].x=253;
maps[4].y=545;
maps[4].team=1;
maps[4].numTowns=6;
maps[4].name="The Dornish Marches";
maps[4].preReq=new Array();
maps[4].preReq.push(3);
maps[4].numReqs=1;

maps[5]=[];
maps[5].x=161;
maps[5].y=77;
maps[5].team=1;
maps[5].numTowns=6;
maps[5].name="Bear Island";
maps[5].preReq=new Array();
maps[5].preReq.push(0);
maps[5].preReq.push(3);
maps[5].numReqs=2;
function equipment() {
    this.name="none";
    this.hitAll=false;
    this.slot=0;
	this.classes=new Array();
    this.value=0;
    this.attack=0;
    this.def=0;
    this.mdef=0;
    this.evade=0;
    this.speed=0;
    this.mag=0;
    this.prefix="Shitty ";
    this.sprite=null;
    this.haste=false;
    this.slow=false;
    this.beserk=false;
    this.posion=false;
    this.mute=false;
    this.reflect=false;
    this.protect=false;
    this.regen=false;
    this.imp=false;
    this.HIV=false;
    this.tooltip = "";
	this.allClasses=function(){
		for(i=0;i<NUM_CLASSES;i++)
		{
			this.classes.push(i);
		}
	};
}

var unarmed = new equipment();
var noarmor = new equipment();
noarmor.slot=1;
var noaccessory = new equipment();
noaccessory.slot=2;
var swords=new Array(10);
swords[0]= new equipment();
swords[0].name="Wooden Sword";
swords[0].attack=3;
swords[0].value=10;
swords[0].classes.push(SEEAss.Knight);
swords[0].classes.push(SEEAss.DarkKnight);
swords[0].classes.push(SEEAss.Palladin);
swords[0].classes.push(SEEAss.RumHam);
swords[0].tooltip = "It is dangerous to go alone.";

swords[1]= new equipment();
swords[1].attack=6;
swords[1].name="Iron Sword";
swords[1].value=50;
swords[1].classes.push(SEEAss.Knight);
swords[1].classes.push(SEEAss.DarkKnight);
swords[1].classes.push(SEEAss.Palladin);
swords[1].classes.push(SEEAss.RumHam);
swords[1].tooltip = "it's metal!";


swords[2]= new equipment();
swords[2].attack=9;
swords[2].name="Silver Sword";
swords[2].value=100;
swords[2].classes.push(SEEAss.Knight);
swords[2].classes.push(SEEAss.DarkKnight);
swords[2].classes.push(SEEAss.Palladin);
swords[2].classes.push(SEEAss.RumHam);
swords[2].tooltip = "Shiney!";

swords[4]= new equipment();
swords[4].attack=14;
swords[4].name="Longclaw";
swords[4].speed=1;
swords[4].value=3000;
swords[4].classes.push(SEEAss.Knight);
swords[4].classes.push(SEEAss.DarkKnight);
swords[4].classes.push(SEEAss.Palladin);
swords[4].classes.push(SEEAss.RumHam);
swords[4].tooltip = "Ancestral blade of house Mormont";

swords[5]= new equipment();
swords[5].attack=18;
swords[5].name="Ice";
swords[5].value=1500;
swords[5].classes.push(SEEAss.Knight);
swords[5].classes.push(SEEAss.DarkKnight);
swords[5].classes.push(SEEAss.Palladin);
swords[5].classes.push(SEEAss.RumHam);
swords[5].tooltip = "Ancestral blade of house Stark";

swords[6]= new equipment();
swords[6].attack=29;
swords[6].name="Dark Sister";
swords[6].speed=1;
swords[6].value=5000;
swords[6].classes.push(SEEAss.Knight);
swords[6].classes.push(SEEAss.DarkKnight);
swords[6].classes.push(SEEAss.Palladin);
swords[6].classes.push(SEEAss.RumHam);
swords[6].tooltip = "Bloodraven's sword";


swords[3]= new equipment();
swords[3].attack=10;
swords[3].name="Lady Forlorn";
swords[3].value=1000;
swords[3].classes.push(SEEAss.Knight);
swords[3].classes.push(SEEAss.DarkKnight);
swords[3].classes.push(SEEAss.Palladin);
swords[3].classes.push(SEEAss.RumHam);
swords[3].tooltip = "Ancestral blade of house Corbray";

swords[7]= new equipment();
swords[7].attack=24;
swords[7].speed=2;
swords[7].name="Dawn";
swords[7].value=9000;
swords[7].classes.push(SEEAss.Knight);
swords[7].classes.push(SEEAss.DarkKnight);
swords[7].classes.push(SEEAss.Palladin);
swords[7].classes.push(SEEAss.RumHam);
swords[7].tooltip = "Forged from the heart of a fallen star.";

swords[8]= new equipment();
swords[8].attack=24;
swords[8].def=5;
swords[8].name="Blackfyre";
swords[8].value=6000;
swords[8].classes.push(SEEAss.Knight);
swords[8].classes.push(SEEAss.DarkKnight);
swords[8].classes.push(SEEAss.Palladin);
swords[8].classes.push(SEEAss.RumHam);
swords[8].tooltip = "Ancestral blade of house Targaryan";

swords[9]= new equipment();
swords[9].attack=24;
swords[9].def=10;
swords[9].evade=5;
swords[9].mdef=20;
swords[9].name="Lightbringer";
//kill undead
swords[9].value=10000;
swords[9].classes.push(SEEAss.Knight);
swords[9].classes.push(SEEAss.DarkKnight);
swords[9].classes.push(SEEAss.Palladin);
swords[9].classes.push(SEEAss.RumHam);
swords[9].tooltip = "Legenday blade of Azro Ahai.";

trident=new Array(1);
trident[0]= new equipment();
trident[0].name="Trident";
trident[0].attack=8;
trident[0].value=10;
trident[0].evade=10;
trident[0].speed=1;
trident[0].classes.push(SEEAss.Mermaid);
trident[0].classes.push(SEEAss.RumHam);
trident[0].tooltip = "DERP";

var whip=new Array(1);
whip[0]= new equipment();
whip[0].name="Leather Whip";
whip[0].attack=3;
whip[0].value=10;
whip[0].classes.push(SEEAss.BeastTamer);
whip[0].classes.push(SEEAss.RumHam);
whip[0].tooltip = "whip it";

knives=new Array(2);
knives[0]= new equipment();
knives[0].name="Dirk";
knives[0].attack=3;
knives[0].value=10;
knives[0].evade=10;
knives[0].speed=1;
knives[0].classes.push(SEEAss.Knight);
knives[0].classes.push(SEEAss.DarkKnight);
knives[0].classes.push(SEEAss.Palladin);
knives[0].classes.push(SEEAss.RumHam);
knives[0].tooltip = "DERP";

knives[1]= new equipment();
knives[1].name="Valyrian Dirk";
knives[1].attack=13;
knives[1].value=800;
knives[1].evade=14;
knives[1].speed=2;
knives[1].classes.push(SEEAss.Knight);
knives[1].classes.push(SEEAss.DarkKnight);
knives[1].classes.push(SEEAss.Palladin);
knives[1].classes.push(SEEAss.RumHam);
knives[1].tooltip = "VALYRIAN DERP";
var axe=new Array(3);
axe[0]= new equipment();
axe[0].name="Wooden Axe";
axe[0].attack=3;
axe[0].value=10;
axe[0].classes.push(SEEAss.Knight);
axe[0].classes.push(SEEAss.DarkKnight);
axe[0].classes.push(SEEAss.Palladin);
axe[0].classes.push(SEEAss.RumHam);
axe[0].tooltip = "";

axe[1]= new equipment();
axe[1].attack=10;
axe[1].name="War Axe";
axe[1].value=100;
axe[1].classes.push(SEEAss.Knight);
axe[1].classes.push(SEEAss.DarkKnight);
axe[1].classes.push(SEEAss.Palladin);
axe[1].classes.push(SEEAss.RumHam);
axe[1].tooltip = "";

axe[2]= new equipment();
axe[2].attack=24;
axe[2].name="Valyrian Axe";
axe[2].value=300;
axe[2].classes.push(SEEAss.Knight);
axe[2].classes.push(SEEAss.DarkKnight);
axe[2].classes.push(SEEAss.Palladin);
axe[2].classes.push(SEEAss.RumHam);
axe[2].tooltip = "Forged from the heart of a fallen star.";

var katana=new Array(2);
katana[0]= new equipment();
katana[0].name="Wooden Katana";
katana[0].attack=9;
katana[0].value=10;
katana[0].classes.push(SEEAss.Ninja);
katana[0].classes.push(SEEAss.RumHam);
katana[0].tooltip = "Who makes a wooden Katana?";

katana[1]= new equipment();
katana[1].attack=30;
katana[1].name="Muramasa";
katana[1].value=100;
katana[1].classes.push(SEEAss.Ninja);
katana[1].classes.push(SEEAss.RumHam);
katana[1].tooltip = "OGOPOGO!";

var bow=new Array(2);
bow[0]= new equipment();
bow[0].slot=0;
bow[0].name="Wooden Bow";
bow[0].evade=1;
bow[0].attack=15;
bow[0].value=20;
bow[0].classes.push(SEEAss.Archer);
bow[0].classes.push(SEEAss.RumHam);
bow[0].tooltip = "Finally, the power to slay your social betters.";

bow[1]= new equipment();
bow[1].slot=0;
bow[1].name="Weirwood Bow";
bow[1].evade=7;
bow[1].attack=35;
bow[1].value=300;
bow[1].classes.push(SEEAss.Archer);
bow[1].classes.push(SEEAss.RumHam);
bow[1].tooltip = "Better bow!";

claws= new equipment();
claws.slot=0;
claws.name="Bear hands";
claws.evade=0;
claws.attack=15;
claws.value=30;
claws.classes.push(SEEAss.Bear);
claws.classes.push(SEEAss.PolarBear);
claws.classes.push(SEEAss.CptBearmerica);
claws.classes.push(SEEAss.IronBear);
claws.classes.push(SEEAss.HulkBear);
claws.tooltip = "";

var spear=new Array(2);
spear[0]= new equipment();
spear[0].slot=0;
spear[0].name="Wooden spear";
spear[0].evade=4;
spear[0].attack=15;
spear[0].value=20;
spear[0].tooltip = "Poke 'em mon!";
spear[0].classes.push(SEEAss.Angel);
spear[0].classes.push(SEEAss.RumHam);
spear[0].classes.push(SEEAss.Winger);

spear[1]= new equipment();
spear[1].slot=0;
spear[1].name="Zodiac spear";
spear[1].evade=12;
spear[1].attack=25;
spear[1].value=200;
spear[1].tooltip = "You cheated.";
spear[1].classes.push(SEEAss.Angel);
spear[1].classes.push(SEEAss.RumHam);
spear[1].classes.push(SEEAss.Winger);

var crossbow=new Array(2);
crossbow[0]= new equipment();
crossbow[0].slot=0;
crossbow[0].name="X-Bow";
crossbow[0].evade=12;
crossbow[0].speed=1;
crossbow[0].attack=15;
crossbow[0].value=20;
crossbow[0].classes.push(SEEAss.Archer);
crossbow[0].classes.push(SEEAss.RumHam);
crossbow[0].tooltip = "Banned by the catholic church!";

var ring=new Array(2);
ring[0]= new equipment();
ring[0].slot=2;
ring[0].name="Lucky Ring";
ring[0].luck=12;
ring[0].value=200;
ring[0].tooltip = "Luuuuucky";
ring[0].classes.push(SEEAss.All);

ring[1]= new equipment();
ring[1].slot=2;
ring[1].name="Cursed Ring";
ring[1].luck=12;
ring[1].value=200;
ring[1].tooltip = "fuck!";
ring[1].classes.push(SEEAss.All);

ring[2]= new equipment();
ring[2].slot=2;
ring[2].name="Ruby Ring";
ring[2].mag=12;
ring[2].value=200;
ring[2].tooltip = "maaaaaaagic";
ring[2].classes.push(SEEAss.All);

ring[3]= new equipment();
ring[3].slot=2;
ring[3].name="Crystal Ring";
ring[3].mdef=20;
ring[3].value=200;
ring[3].tooltip = "MDEF";
ring[3].classes.push(SEEAss.All);

ring[4]= new equipment();
ring[4].slot=2;
ring[4].name="White Ring";
ring[4].maxhp=40;
ring[4].value=200;
ring[4].tooltip = "...on the moon";
ring[4].classes.push(SEEAss.All);

ring[5]= new equipment();
ring[5].slot=2;
ring[5].name="Protect Ring";
ring[5].def=20;
ring[5].value=200;
ring[5].tooltip = "Protecty";
ring[5].classes.push(SEEAss.All);

ring[6]= new equipment();
ring[6].slot=2;
ring[6].name="Mist Ring";
ring[6].luck=12;
ring[6].value=200;
ring[6].tooltip = "Misty";
ring[6].classes.push(SEEAss.All);

var rod = new equipment();
rod.slot=1;
rod.name="Rod";
rod.attack=2;
rod.mag=5;
rod.mdef=5;
rod.value=20;
rod.classes.push(SEEAss.Healer);
rod.classes.push(SEEAss.Sage);
rod.classes.push(SEEAss.Wizard);
rod.classes.push(SEEAss.Cleric);
rod.classes.push(SEEAss.Healer);
rod.classes.push(SEEAss.Angel);
rod.tooltip = "Good for magic!";

var icemagic=new Array(4);
icemagic[0]= new equipment();
icemagic[0].slot=0;
icemagic[0].name="Ice";
icemagic[0].evade=2;
icemagic[0].mag=15;
icemagic[0].value=20;
icemagic[0].tooltip = "Basic ice attack";
icemagic[0].classes.push(SEEAss.Sage);
icemagic[0].classes.push(SEEAss.Wizard);
icemagic[0].classes.push(SEEAss.PolarBear);
icemagic[0].classes.push(SEEAss.RumHam);

icemagic[1]= new equipment();
icemagic[1].slot=0;
icemagic[1].name="Ice 2";
icemagic[1].evade=0;
icemagic[1].mag=25;
icemagic[1].value=200;
icemagic[1].tooltip = "It's...Slightly colder!";
icemagic[1].classes.push(SEEAss.Sage);
icemagic[1].classes.push(SEEAss.Wizard);
icemagic[1].classes.push(SEEAss.PolarBear);
icemagic[1].classes.push(SEEAss.RumHam);

icemagic[2]= new equipment();
icemagic[2].slot=0;
icemagic[2].name="Blizzard 1";
icemagic[2].hitAll=true;
icemagic[2].evade=0;
icemagic[2].mag=10;
icemagic[2].value=2000;
icemagic[2].tooltip = "Hits all enemies";
icemagic[2].classes.push(SEEAss.Sage);
icemagic[2].classes.push(SEEAss.Wizard);
icemagic[2].classes.push(SEEAss.PolarBear);
icemagic[2].classes.push(SEEAss.RumHam);

icemagic[3]= new equipment();
icemagic[3].slot=0;
icemagic[3].hitAll=true;
icemagic[3].name="Blizzard 2";
icemagic[3].evade=0;
icemagic[3].mag=25;
icemagic[3].value=2000;
icemagic[3].tooltip = "Hits all enemies harder";
icemagic[3].classes.push(SEEAss.Sage);
icemagic[3].classes.push(SEEAss.Wizard);
icemagic[3].classes.push(SEEAss.PolarBear);
icemagic[3].classes.push(SEEAss.RumHam);

var firemagic=new Array(4);
firemagic[0]= new equipment();
firemagic[0].slot=0;
firemagic[0].name="Fire";
firemagic[0].evade=2;
firemagic[0].mag=15;
firemagic[0].value=20;
firemagic[0].tooltip = "Basic fire attack";
firemagic[0].classes.push(SEEAss.Sage);
firemagic[0].classes.push(SEEAss.Wizard);
firemagic[0].classes.push(SEEAss.RumHam);


var robe= new equipment();
robe.slot=1;
robe.name="Robe";
robe.def=1;
robe.mdef=5;
robe.value=20;
robe.tooltip = "Should conceal your erection.";
robe.allClasses();

var shirt= new equipment();
shirt.slot=1;
shirt.name="Shirt";
shirt.def=2;
shirt.mdef=1;
shirt.value=20;
shirt.tooltip = "It's got stripes!.";
shirt.allClasses();

var breastplate= new equipment();
breastplate.slot=1;
breastplate.name="Breastplate";
breastplate.def=10;
breastplate.mdef=1;
breastplate.value=50;
breastplate.tooltip = "Why are there nipples on it?";
breastplate.classes.push(SEEAss.Knight);
breastplate.classes.push(SEEAss.DarkKnight);
breastplate.classes.push(SEEAss.Palladin);

var mythrilmail= new equipment();
mythrilmail.slot=1;
mythrilmail.name="Mythril Mail";
mythrilmail.def=17;
mythrilmail.mdef=4;
mythrilmail.value=1500;
mythrilmail.tooltip = "frodo approved!";
mythrilmail.classes.push(SEEAss.Knight);
mythrilmail.classes.push(SEEAss.DarkKnight);
mythrilmail.classes.push(SEEAss.Palladin);
mythrilmail.classes.push(SEEAss.Archer);
mythrilmail.classes.push(SEEAss.Palladin);
mythrilmail.classes.push(SEEAss.RumHam);

var chainmail= new equipment();
chainmail.slot=1;
chainmail.name="Chainmail";
chainmail.def=6;
chainmail.mdef=1;
chainmail.value=150;
chainmail.tooltip = "you can pretend you're a fence!";
chainmail.classes.push(SEEAss.Knight);
chainmail.classes.push(SEEAss.DarkKnight);
chainmail.classes.push(SEEAss.Palladin);
chainmail.classes.push(SEEAss.Archer);
chainmail.classes.push(SEEAss.Frog);
chainmail.classes.push(SEEAss.PolarBear);
chainmail.classes.push(SEEAss.Bear);
chainmail.classes.push(SEEAss.RumHam);

var heavyplate= new equipment();
heavyplate.slot=1;
heavyplate.name="Heavy plate";
heavyplate.def=26;
heavyplate.mdef=2;
heavyplate.value=250;
heavyplate.tooltip = "Why are there nipples on it?";
heavyplate.classes.push(SEEAss.Knight);
heavyplate.classes.push(SEEAss.DarkKnight);
heavyplate.classes.push(SEEAss.Palladin);
heavyplate.classes.push(SEEAss.IronBear);
heavyplate.classes.push(SEEAss.RumHam);

var enchantedpants= new equipment();
enchantedpants.slot=1;
enchantedpants.name="Enchanted Pants";
enchantedpants.def=12;
enchantedpants.mdef=18;
enchantedpants.value=450;
enchantedpants.tooltip = "It's enchanted!";
enchantedpants.allClasses();

var cape= new equipment();
cape.slot=2;
cape.name="Wooden Bow";
cape.evade=5;
cape.attack=0;
cape.value=20;
cape.tooltip = "You're batman.";
cape.allClasses();
