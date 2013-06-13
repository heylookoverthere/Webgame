$(document).bind("contextmenu",function(e){
	
	if(mode==0)
	{
		mX = e.pageX - canvasElement.get(0).offsetLeft;
		mY = e.pageY - canvasElement.get(0).offsetTop;
		for (var p=0;p<400;p++)
		{
					monsta.startOrbit(40000,Math.floor(Math.random()*CANVAS_WIDTH),Math.floor(Math.random()*CANVAS_HEIGHT),60);
		}
	}else if(mode==1){
		mode=0;
		mmcur=true;
	}else if(mode==2)
	{
		mX = e.pageX - canvasElement.get(0).offsetLeft;
		mY = e.pageY - canvasElement.get(0).offsetTop;
		tx=Math.floor(mX/16) * Math.pow(2, curMap.zoom-1);
		ty=Math.floor(mY/16) * Math.pow(2, curMap.zoom-1);
		if(!selBox.p1){
			selBox.exists=true;
			selBox.p2=false;
			//selBox.point1=[];
			selBox.point1.x=mX;
			selBox.point1.y=mY;
			selBox.point1.tX=tx+camera.x;//Math.floor(mX) * Math.pow(2, curMap.zoom-1);
			selBox.point1.tY=ty+camera.y;//Math.floor(mY) * Math.pow(2, curMap.zoom-1);
			selBox.p1=true
		}else if ((!selBox.p2) && (selBox.exists))
		{
			//selBox.point2=[];

			selBox.point2.x=mX;
			selBox.point2.y=mY;
			selBox.point2.tX=tx+camera.x;//Math.floor(mX) * Math.pow(2, curMap.zoom-1);
			selBox.point2.tY=ty+camera.y;//Math.floor(mY) * Math.pow(2, curMap.zoom-1);
		

			for(var i=0;i<armies[0].numSquads;i++)
			{
				if(armies[0].squads[i].isViable())
				{
					//if((armies[0].squads[i].x>selBox.point1.tX) && (armies[0].squads[i].x<selBox.point2.tX) && (armies[0].squads[i].y>selBox.point1.tY) && (armies[0].squads[i].y<selBox.point2.tY)) //todo box for squad (rects overlappign)
					var w =Math.abs(selBox.point1.tX-selBox.point2.tX);
					var h =Math.abs(selBox.point1.tY-selBox.point2.tY);
					var rect1=[];
					if(selBox.point1.tX>selBox.point2.tX)
					{
						rect1.x=selBox.point2.tX;
						rect1.width=selBox.point1.tX-selBox.point2.tX;
					}else
					{
						rect1.x=selBox.point1.tX;
						rect1.width=selBox.point2.tX-selBox.point1.tX;
					}
					if(selBox.point1.tY>selBox.point2.tY)
					{
						rect1.y=selBox.point2.tY;
						rect1.height=selBox.point1.tY-selBox.point2.tY;
					}else
					{
						rect1.y=selBox.point1.tY;
						rect1.height=selBox.point2.tY-selBox.point1.tY;
					}						
					/*rect1.y1=selBox.point1.tY;
					rect1.x2=selBox.point2.tX;
					rect1.y2=selBox.point2.tY;*/
					var rect2=[];
					rect2.x=armies[0].squads[i].x;
					rect2.y=armies[0].squads[i].y;
					rect2.width=2;
					rect2.height=2;
					console.log(rect1,rect2);
					if(rectOverlap(rect1,rect2))
					{
						armies[0].squads[i].selected=true;
									
					}else
					{
						if(!keydown["shift"]){
						armies[0].squads[i].selected=false;
						}
					}
				}
			}
			selBox.p2=true;
			selBox.p1=false;
		}
	}
    return false;
});

requestAnimationFrame = window.requestAnimationFrame || 
                        window.mozRequestAnimationFrame || 
                        window.webkitRequestAnimationFrame || 
                        window.msRequestAnimationFrame || 
                        setTimeout; 


var canvasElement = $("<canvas width='" + CANVAS_WIDTH + "' height='" + CANVAS_HEIGHT + "'></canvas");
var canvas = canvasElement.get(0).getContext("2d");

var sillycanvasElement = $("<canvas width='" + CANVAS_WIDTH + "' height='" + CANVAS_HEIGHT + "'></canvas");
var sillycanvas = sillycanvasElement.get(0).getContext("2d");

var battleCanvasElement = $("<canvas width='" + CANVAS_WIDTH + "' height='" + CANVAS_HEIGHT + "'></canvas");
var battleCanvas = battleCanvasElement.get(0).getContext("2d");

var radarElement = $("<canvas width='" + MAP_WIDTH + "' height='" + MAP_HEIGHT + "'></canvas");
var radarCanvas = radarElement.get(0).getContext("2d");

var mapCanvasElement = $("<canvas width='" + MAP_WIDTH + "' height='" + MAP_HEIGHT + "'></canvas");
var mapCanvas = mapCanvasElement.get(0).getContext("2d");

canvasElement.css("position", "absolute").css("z-index", "1");
canvasElement.appendTo('body');
canvasElement.css("position", "absolute").css("z-index", "1").css("top", canvasElement.position().top).css("left", canvasElement.position().left);
sillycanvasElement.css("position", "absolute").css("z-index", "0").css("top", canvasElement.position().top).css("left", canvasElement.position().left);
battleCanvasElement.css("position", "absolute").css("z-index", "2").css("top", canvasElement.position().top).css("left", canvasElement.position().left);
sillycanvasElement.appendTo('body');
battleCanvasElement.appendTo('body');



function playSound(name){
    
    nerp=document.getElementById(name);
    if(nerp.ended === true || nerp.currentTime === 0){
        nerp.play();
        numsounds++;
    }
    
}
var NUM_BUFFS=2;
Status = {};
Status.Haste = 0;
Status.Reflect =1; 
Status.Protect = 2; 
Status.Regen=3;
Status.Cloaked=4;
Status.Beserk=5;
Status.Slow = 6;
Status.Mute = 7;
Status.Imp = 8;


AttackTypes = {};
AttackTypes.Physical = 0; 
AttackTypes.Ranged = 1;
AttackTypes.Magical = 2;
AttackTypes.Heal = 3;
AttackTypes.GiveStatus = 4;
AttackTypes.HealStatus = 5; 
AttackTypes.someweirdshitthatignoresdefensemaybe =6;

AITypes = {};
AITypes.Random=0;
AITypes.Rush=1;
AITypes.FanOut=2;
AITypes.AttackNearest=3;
AITypes.DefendBase=4;
AITypes.DefendTowns=5;




function card(){
    this.name = "Flaccid Dolphin";
    this.type = Math.floor(Math.random()*5);
    this.sprite = Sprite("card0");
    if(this.type==1){   this.sprite = Sprite("card1");}
    if(this.type==2){   this.sprite = Sprite("card2");}
    if(this.type==3){   this.sprite = Sprite("card3");}
    if(this.type==4){   this.sprite = Sprite("card4");}

    this.setSprite=function(){
        if(this.type==1){       this.sprite = Sprite("card1");}
        if(this.type==2){       this.sprite = Sprite("card2");}
        if(this.type==3){       this.sprite = Sprite("card3");}
        if(this.type==4){       this.sprite = Sprite("card4");}
    };
    this.use=function(usqd,esqd)
    {
        //console.log("Played the " + this.name+ " card!");
        if (this.type===0){
            console.log("Played the Mother card!");
			bConsoleStr.push("Played the Mother card!");
			bConsoleClr.push("white");
            for(var i=0;i<usqd.numUnits;i++){
                if (usqd.units[i].alive) {
                    usqd.units[i].hp+=25;
                    if (usqd.units[i].hp>usqd.units[i].maxhp) {usqd.units[i].hp=usqd.units[i].maxhp;}
                }
            }
        }else if(this.type===1)
        {
            console.log("Played the Drowned God card!");
			bConsoleClr.push("white");
			bConsoleStr.push("Played the Drowned God card!");
            for(var i=0;i<esqd.numUnits;i++){
                if (esqd.units[i].alive) {
                    esqd.units[i].hurt(15);
                }
            }
        }else if(this.type===2)
        {
            console.log("Played The Father card!");
			bConsoleClr.push("white");
			bConsoleStr.push("Played The Father card!");
            esqd.turns=20;
            esqd.damaged=-1; //flee
        }else if(this.type===3)
        {
            console.log("Played The Stranger card!");
			bConsoleClr.push("white");
			bConsoleStr.push("Played The Stranger card");
            esqd.row();
        }else if(this.type===5)
        {
            console.log("Played the R'hllor card!");
			bConsoleClr.push("white");
			bConsoleStr.push("Played the R'hllor card!");
            for(var i=0;i<usqd.numUnits;i++){
                if (!usqd.units[i].alive) {
                    usqd.units[i].hp+=25;
                    usqd.units[i].alive=true;
                    if (usqd.units[i].hp>usqd.units[i].maxhp) {usqd.units[i].hp=usqd.units[i].maxhp;}
                }
            }
        }else if(this.type===3) {
            console.log("Played The Crone card!");
			bConsoleClr.push("white");
			bConsoleStr.push("Played The Crone card!");
            usqd.healStatus();
        }
    };
}

function akey(k) {  //represents a keyboard button
    k = k || "space";
    this.key =k;
    this.aflag=false;
    this.dflag=false;
    this.check= function(){
        if (keydown[this.key]) { 
            this.aflag=true;
            return false;
        }
        if((!keydown[this.key]) && (this.aflag===true)){
            this.aflag=false;
            return true;
        }
    };
    this.checkDown= function(){
        if ((keydown[this.key] )  && (!this.dflag)) { 
            this.dflag=true;
            return true;
        }
        if(!keydown[this.key]){
            this.dflag=false;
            return false;
        }
    };
    return this;
}

function status() {
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
}



function randomItem(){
	var gar=Math.floor(Math.random()*35);
	var itm=swords[0];
	if(gar===0) {itm=swords[1];}
	if(gar===1) {itm=swords[2];}
	if(gar===2) {itm=axe[0];}
	if(gar===3) {itm=axe[1];}
	if(gar===4) {itm=axe[2];}
	if(gar===5) {itm=katana[0];}
	if(gar===6) {itm=katana[0];}
	if(gar===7) {itm=bow[0];}
	if(gar===8) {itm=bow[1];}
	if(gar===9) {itm=crossbow[0];}
	if(gar===10) {itm=spear[0];}
	if(gar===11) {itm=spear[1];}
	if(gar===12) {itm=ring[0];}
	if(gar===13) {itm=rod;}
	if(gar===14) {itm=icemagic[0];}
	if(gar===15) {itm=icemagic[1];}
	if(gar===16) {itm=icemagic[2];}
	if(gar===17) {itm=icemagic[3];}
	if(gar===18) {itm=robe;}
	if(gar===19) {itm=shirt;}
	if(gar===20) {itm=icemagic[2];}
	if(gar===21) {itm=icemagic[3];}
	if(gar===22) {itm=breastplate;}
	if(gar===23) {itm=mythrilmail;}
	if(gar===24) {itm=heavyplate;}
	if(gar===25) {itm=chainmail;}
	if(gar===26) {itm=enchantedpants;}
	if(gar===27) {itm=cape;}
	if(gar===28) {itm=swords[3];}
	if(gar===29) {itm=swords[4];}
	if(gar===30) {itm=swords[5];}
	if(gar===31) {itm=swords[6];}
	if(gar===32) {itm=swords[7];}
	if(gar===33) {itm=swords[8];}
	if(gar===34) {itm=swords[9];}
	if(gar===35) {itm=knives[0];}
	return itm;
};

isBlokemon=function(cla){
	if ((cla==SEEAss.RumHam) ||(cla==SEEAss.Tiger) ||(cla==SEEAss.Shoe) ||(cla==SEEAss.Bear) ||(cla==SEEAss.PolarBear) || (cla==SEEAss.Creeper) || (cla==SEEAss.Skeleton)||(cla==SEEAss.EarthBound) || (cla==SEEAss.Octopus)) {return true;}
	return false;
	};

	getClass=function(bloke){
		var p=Math.floor(Math.random()*29);
		if(!bloke){
			while(isBlokemon(p)){
				p=Math.floor(Math.random()*29);
			}
		}
		return p;
	};

function unit() {
    this.hp=40;
    this.gender=Math.floor(Math.random()*2);
    this.name="Miles";
    this.mp=0;
    this.maxhp=40;
    this.maxmp=40;
	this.flightHeight=-1;
	this.swimCarry=-1;
	this.statusTrack=0;
	this.whichBuff=0;
	this.whichDebuff=0;
	this.undead=false;
    this.nextLevel=60;
    this.speed=1;
    this.evade=1;
	this.team=0;
    this.luck=5;
    this.ali=50;
	this.element=Math.floor(Math.random()*3);
    this.attackType=new Array(2);
    this.attackType[0]=AttackTypes.Physical;
    this.attackType[1]=AttackTypes.Physical;
    this.status=new Array(7);
    this.status[0]=false;
    this.status[1]=false;
    this.status[2]=false;
    this.status[3]=false;
    this.status[4]=false;
    this.status[5]=false;
    this.status[6]=false;

    this.class=getClass(false);
    this.row=Math.floor(Math.random()*2);
    this.viewRange=5;
    this.level=1;
    this.def=1;
    this.mdef=1;
    this.attack=10;
    this.mag=5;
    this.alive=true;
    this.attacking=0;
	this.attackStage=0;
	this.attackAni=0;
	this.attackAniStage=0;
    this.hurting=0;
    this.atb=0;
    this.canlead = true;
    this.cost = 10;
    this.gambits = null;
    this.exp=0;
    this.level=1;
    this.equipment=new Array(3);
    this.equipment[0]=unarmed;
    this.equipment[1]=noarmor;
    this.equipment[2]=noaccessory;
    this.kills=0;
    this.damagetaken=0;
    this.damagedelt=0;
    this.battlesfought=0;
    this.battleswon=0;
    this.battleslost=0;
	this.religon=Math.floor(Math.random()*4);
	this.faith=Math.floor(Math.random()*60)+20;
    var nami=Math.floor(Math.random()*120);
    while(true) {
        if(namesused[this.gender][nami]) 
        {
            nami=Math.floor(Math.random()*120);
        }else {break;}
    }
    this.name=names[this.gender][nami];
    namesused[this.gender][nami]=true;
    
	this.stringifyUnit=function(){
		var smurf={'name':this.name,'class':this.class,'gender':this.gender,'def':this.def,'mdef':this.mdef,'ali':this.ali,'speed':this.speed,'evade':this.evade,'team':this.team,
		'alive':this.alive,'attack':this.attack,'mag':this.mag,'luck':this.luck,'level':this.level,'nextlevel':this.nextLevel,'exp': this.exp,'cost':this.cost,'canlead':this.canlead,
		'viewrange':this.viewRange,'kills':this.kills,'damagetaken':this.damagetaken,'damagedelt':this.damagedelt,'battlefought':this.battlesfought,'battleswon':this.battleswon,
		'battlelost':this.battlelost,'religion':this.religion,'faith':this.faith,'flightHeight':this.flightheight,'swimcarry':this.swimCarry,'maxhp':this.maxhp,'maxmp':this.maxmp,
		'undead':this.undead}
		var tempstring = JSON.stringify(smurf);
		//deal with equipment, attack type, status
		return tempstring;
	}
	

	
    this.getAttack= function(){
        //if status==beserek attack harder
		var nightBoost=0;
		if(theTime.hours>12){
			if(this.class==SEEAss.Werewolf){
				nightBoost=20;
				//this.attack+=20;
			}else if (this.class==SEEAss.Vampire)
			{
				nightBoost=10;
				//this.attack+=10;
				//this.evade+=10;
			}
		}
        if(this.getAttackType() == AttackTypes.Physical ) {
            return (this.attack+nightBoost-this.row)+this.equipAttack()+(this.level*1.5)+Math.floor(Math.random()*3);
        }else if( this.getAttackType() == AttackTypes.Ranged ) { //no row penalty
            return (this.attack+nightBoost)+this.equipAttack()+(this.level*1.5)+Math.floor(Math.random()*3);
        }else if( this.getAttackType() == AttackTypes.Magical ) {  //no row penalty
            return (this.mag)+this.equipMag()+(this.level*1.5)+Math.floor(Math.random()*3);
        }else if( this.getAttackType() == AttackTypes.Heal ) {
            return 0-this.mag;//todo problem?
        }
        //if(this.getAttackType() == AttackTypes.Physical ) {
        console.log(this.name+" "+this.class+" "+this.row);
        return (this.attack-this.row)+this.equipAttack()+(this.level*0.5)+Math.floor(Math.random()*3);
    };
    
    this.giveExp= function(val){
        this.exp+=val;
        if (this.exp>this.nextLevel) {
            this.exp=0;
            this.levelUp();
        }
    };
    
    this.esuna=function(){
        for(var i=0;i<NUM_STATUS;i++){
            this.status[i]=false;
        }
    };
	
	this.getClassName=function(){
		var texticles="";
		if(this.class===SEEAss.Bear) {texticles= "Bear"; }
        if(this.class===SEEAss.Shoe) {texticles= "Shoe"; }
        if(this.class===SEEAss.Wizard) {texticles= "Wizard"; }
        if(this.class===SEEAss.Frog) {texticles= "Frog"; }
        if(this.class===SEEAss.Archer) {texticles= "Archer"; }
		if(this.class===SEEAss.Healer) {texticles= "Healer"; }
		if(this.class===SEEAss.Ninja) {texticles= "Ninja"; }
		if(this.class===SEEAss.Winger) {texticles="Winger";}
        if(this.class===SEEAss.Knight) {texticles="Knight";}
        if(this.class===SEEAss.Cleric) {texticles="Cleric";}
        if(this.class===SEEAss.Sage) {texticles="Sage";}
        if(this.class===SEEAss.Angel) {texticles="Angel";}
        if(this.class===SEEAss.DarkKnight) {texticles="Dark Knight";}
        if(this.class===SEEAss.Palladin) {texticles="Palladin";}
        if(this.class===SEEAss.PolarBear) {texticles="Polar Bear";}
		if(this.class===SEEAss.CptBearmerica) {texticles="Cpt. Bearmerica";}
		if(this.class===SEEAss.IronBear) {texticles="Iron Bear";}
		if(this.class===SEEAss.HulkBear) {texticles="Hulk Bear";}
		if(this.class===SEEAss.RumHam) {texticles="Rum Ham";}
		if(this.class===SEEAss.Theif) {texticles="Theif";}
		if(this.class===SEEAss.Dancer) {texticles="Dancer";}
		if(this.class===SEEAss.Creeper) {texticles="Creeper";}
		if(this.class===SEEAss.Skeleton) {texticles="Skeleton";}
		if(this.class===SEEAss.Monk) {texticles="Monk";}
		if(this.class===SEEAss.Vampire) {texticles="Vampire";}
		if(this.class===SEEAss.Werewolf) {texticles="Werewolf";}
		if(this.class===SEEAss.Tiger) {texticles="Tiger";}
		if(this.class===SEEAss.Samurai) {texticles="Samurai";}
		if(this.class===SEEAss.Pumpkinhead) {texticles="Pumpkin Head";}
		if(this.class===SEEAss.Witch) {texticles="Witch";}
		if(this.class===SEEAss.Octopus) {texticles="Octopus";}
		if(this.class===SEEAss.Mermaid) {texticles="Mermaid";}
		if(this.class===SEEAss.BeastTamer) {texticles="Beast Tamer";}
		return texticles;
	};
    
    this.drawInfo=function(){
        
        //canvas.save();
        canvas.globalAlpha=0.60;
        canvas.fillStyle =  "#DCDCDC";
        canvas.fillRect(25,95,820,500);
        canvas.fillStyle =bColors[1];//Math.floor(Math.random()*5)];// "#483D8B ";
        canvas.fillRect(40,110,790,470);
       // canvas.restore();
		canvas.globalAlpha=1;
        canvas.font = "14pt Calibri";
        canvas.textAlign = "left";
        canvas.textBaseline = "middle";

        canvas.fillStyle = "white";
        var texticles= "Name: " + this.name;
        canvas.fillText(texticles, 60, 122);
        
        texticles= "HP: " + this.hp + " / " +this.maxhp;
        canvas.fillText(texticles, 60, 137);
        
        texticles= "MP: " + this.mp + " / " +this.maxmp;
        canvas.fillText(texticles, 60, 152);
        
        texticles= "Level: " + this.level;
        canvas.fillText(texticles, 60, 172);
        
        texticles= "Exp: " + this.exp +"/"+this.nextLevel;
        canvas.fillText(texticles, 60, 192);
 
		texticles=this.getClassName();
        canvas.fillText(texticles, 240, 122);
        
        texticles= "Speed: " + this.speed+ "+"+this.equipment[1].speed ;
        canvas.fillText(texticles, 180, 135);
        
        texticles= "Attack " + this.attack + "+"+this.equipment[0].attack;
        canvas.fillText(texticles, 180, 152);
        
        texticles= "Def: " + this.def + "+"+this.equipment[1].def;
        canvas.fillText(texticles, 180, 172);
        
        texticles= "M.Def: " + this.mdef + "+"+this.equipment[1].mdef ;
        canvas.fillText(texticles, 180, 192);
        
        texticles= "Magic: " + this.mag + "+"+this.equipment[1].mdef ;
        canvas.fillText(texticles, 330, 135);
        
        texticles= "Luck: " + this.luck + "+"+this.equipment[1].luck ;
        canvas.fillText(texticles, 330, 152);
        
        texticles= "Evade: " + this.evade + "+"+this.equipment[1].evade ;
        canvas.fillText(texticles, 330, 172);
        
        texticles= "Ali: " + this.ali ;
        canvas.fillText(texticles, 330, 192);
        
        if(this.getAttackType()===0) {texticles= "Attack Type: Physical";} 
        if(this.getAttackType()===1) {texticles= "Attack Type: Ranged";} 
        if(this.getAttackType()===2) {texticles= "Attack Type: Magic";} 
        if(this.getAttackType()===3) {texticles= "Attack Type: Heal";} 
        if(this.getAttackType()===4) {texticles= "Attack Type: Inflict Status";} 
        canvas.fillText(texticles, 60, 212);
        
        texticles= "Can be leader: " + this.canlead ;
        canvas.fillText(texticles, 60, 232);
        
        texticles= "Weapon: " + this.equipment[0].name;
        canvas.fillText(texticles, 60, 272);
        
        texticles= "Armor: " + this.equipment[1].name;
        canvas.fillText(texticles, 60, 292);
        
        texticles= "Accessory: " + this.equipment[2].name;
        canvas.fillText(texticles, 60, 312);
        
        
        texticles= "Battles Won: " + this.battleswon ;
        canvas.fillText(texticles, 380, 232);
        
        texticles= "Battles Lost: " + this.battleslost;
        canvas.fillText(texticles, 380, 252);
        
        texticles= "Units Killed: " + this.kills;
        canvas.fillText(texticles, 380, 272);
        
        texticles= "Damage Delt: " + this.damagedelt;
        canvas.fillText(texticles, 380, 292);
        
        texticles= "Damage Taken: " + this.damagetaken;
        canvas.fillText(texticles, 380, 312);
		
		canvas.fillText("O= Optimize",60,330);
		canvas.fillText("D= Remove all",60,350);
        
    };
    
    this.levelUp=function(){
        this.level++;
        this.nextLevel=20+(5*this.level);
		var ted=classLevel();
        this.maxhp+=ted.maxhp;
        this.hp+=ted.maxhp;
        this.maxmp+=ted.maxmp;
        this.mp+=ted.mp;
        //this.speed+=ted.speed;
        this.evade+=ted.evade;
        this.def+=ted.def;
        this.mdef+=ted.mdef;
        this.attack+=ted.attack;
		if(this.team==0){
        var tmpstr=this.name+ " gained a level!";
        console.log(tmpstr);
		bConsoleStr.push(tmpstr);
		bConsoleClr.push("white");
        //playSound("level");
		}
		
    };
    
    this.levelTo=function(tg){
		while(this.level<tg)
		{
			this.levelUp();
		}
    };
	
    this.getAttackType=function(){
        return this.attackType[this.row];
    };
    
    this.equipDef=function(){
        return this.equipment[0].def+this.equipment[1].def+this.equipment[2].def;
    };
    this.equipMDef=function(){  
        return this.equipment[0].mdef+this.equipment[1].mdef+this.equipment[2].mdef;
    };
    this.equipMag=function(){
        return this.equipment[0].mag+this.equipment[1].mag+this.equipment[2].mag;
    };
    this.equipSpeed=function(){
        return this.equipment[0].speed+this.equipment[1].speed+this.equipment[2].speed;
    };
    this.equipAttack=function(){
        return this.equipment[0].attack+this.equipment[1].attack+this.equipment[2].attack;
    };
    this.equipEvade=function(){
        return this.equipment[0].evade+this.equipment[1].evade+this.equipment[2].evade;
    };
    
    this.getDef= function(attacktype){
        if((attacktype==AttackTypes.Physical) || (attacktype==AttackTypes.Ranged)){
            if(this.row===0){
                return this.def+this.equipDef();
            }else{
                return this.def+5+this.equipDef();
            }
        }else
        {
            return this.mdef+this.equipMDef();
        }
        
    };
    this.hurt = function(dmg){

        this.hp-=dmg;
        this.damagetaken+=dmg;
        if (this.hp<0) {this.hp=0; this.alive=false;                    var tmpstr=this.name + " died.";
                        console.log(tmpstr);
						bConsoleStr.push(tmpstr);
						if(this.team==0) {bConsoleClr.push("red");}
						if(this.team==1) {bConsoleClr.push("green");}
                       }
    }; 
    
    this.heal=function(val){
        if (this.alive) {
            this.hp+=val;
            if (this.hp>this.maxhp) {this.hp=this.maxhp;}
        }
    };
    
    this.giveAli= function(val){
        this.ali+=val;
        if(this.ali>100) {this.ali=100;}
        if(this.ali<0) {this.ali=0;}
    };
    
    this.changeClass=function(){
        
    };
    
    this.giveStatus=function(stats){
        this.status[stats]=true;
    };
    
    this.removeStatus=function(stats){
        this.status[stats]=false;
    };
    
    
    this.hasStatus=function(stats){
        if(this.status[stats]) {return true;}
        return false;
    };
    
	this.canEquip=function(itm){
		var flag=false;
		for(var i=0;i<itm.classes.length;i++)
		{
			if(itm.classes[i]==this.class){
				flag=true;
			}
			
		}
		if (!flag) { return false;}
		return true;
	}
	
	this.equip=function(itm){
		
		if (!this.canEquip(itm)) { return false;}
		this.equipment[itm.slot]=itm;
		return true;
	};
	
    this.update = function (usqd,esqd){
        if(paused) {return;}
        //if(battleReport) {return;}
        if(battlePause) {return;}//todo for now
		this.team=usqd.team;
       /* if (this.attackStage>0) //doing this esewhere for now
		{
			if(this.attackStage==2)
			{
				this.attacking--; 
				if(this.attacking<1)
				{
					this.attackStage=0;
				}
				return;	
			}else if(this.attackStage==1)
			{
				this.attacking++; 
				if(this.attacking>10)
				{
					this.attackStage=2;
				}
				return;	
			}
		}*/
		if (this.attackStage>0) //no ATB when attackign
		{ return;
		}
        if (this.hurting>0) {this.hurting--; return;}
        if (this.atb>battlespeed) {
            //gambits, attack
            if(this.hasStatus(Status.Poison)){
                this.hurt(3);
            }
			if(this.hasStatus(Status.Regen)){
                this.heal(3);
            }
            this.atb=0;
            var targe=null;
            if(this.getAttackType()==AttackTypes.Heal)
            {
                if((this.class==SEEAss.Cleric) || (this.class==SEEAss.Angel)){
                    var deadguy=null;
                    for(var i=0;i<usqd.numUnits;i++){
                        if (!usqd.units[i].alive){
                            deadguy=usqd.units[i];
                            continue;
                        }
                    }
                    if(deadguy!==null)
                    {
                        deadguy.alive=true;
                        deadguy.heal(this.mag);
                        //esqd.damaged-=this.mag;
                        this.giveExp(this.mag);
                        var tmpstr=this.name + " revived " +deadguy.name;
                        console.log(tmpstr);
						bConsoleStr.push(tmpstr);
						bConsoleClr.push("white");
						usqd.turns++;
						this.attackStage=1;
						this.attackAniStage=1;
                    }else  if (this.class==SEEAss.Angel) 
                    {
                        var tmpstr=this.name + " healed the party" ;
                        console.log(tmpstr);
						bConsoleStr.push(tmpstr);
						bConsoleClr.push("white");
						usqd.turns++;
						this.attackStage=1;
						this.attackAniStage=1;
                        for(var i=0;i<usqd.numUnits;i++){
                            if (usqd.units[i].alive) {
                                usqd.units[i].heal(20);
                            }
                        }
                        
                    }else
                    {
                        targe=usqd.getWeakestHeal();
                        targe.heal(this.mag);
                        esqd.damaged-=this.mag;
                        this.giveExp(this.mag);
                        var tmpstr=this.name + " healed " +targe.name+ " " +this.mag+ " points.";
                        console.log(tmpstr);
						bConsoleStr.push(tmpstr);
						bConsoleClr.push("white");
						usqd.turns++;
						this.attackStage=1;
						this.attackAniStage=1;
                    }
                }else 
                {
                    targe=usqd.getWeakestHeal();
                    targe.heal(this.mag);
                    esqd.damaged-=this.mag;
                    this.giveExp(this.mag);
                    var tmpstr=this.name + " healed " +targe.name+ " " +this.mag+ " points.";
                    console.log(tmpstr);
					bConsoleStr.push(tmpstr);
					bConsoleClr.push("white");
					usqd.turns++;
					this.attackStage=1;
					this.attackAniStage=1;
                }
            }else if(this.getAttackType()==AttackTypes.GiveStatus){
				targe=usqd.units[this.statusTrack];
				usqd.units[this.statusTrack].giveStatus(this.whichBuff);
				this.whichBuff=Math.floor(Math.random()*3);//todo
				var stsu = "Haste";
				if(this.whichBuff==Status.Regen)
				{
					stsu="Regen";
				}else if(this.whichBuff==Status.Reflect)
				{
					stsu="Reflect";
				}else if(this.whichBuff==Status.Protect)
				{
					stsu="Protect";
				}else if(this.whichBuff==Status.Cloak)
				{
					stsu="Cloaked";
				}
				var tmpstr=this.name+" cast "+stsu+" on "+ usqd.units[this.statusTrack].name;
				console.log(tmpstr);
				bConsoleStr.push(tmpstr);
				bConsoleClr.push("white");
				this.attackStage=1;
				this.attackAniStage=1;
				usqd.turns++;
				this.statusTrack++;//todo: change
				if (this.statusTrack>usqd.numUnits-1) 
				{
					this.statusTrack=0;
					this.whichBuff++;
					if(this.wichBuff>NUM_BUFFS-1) {this.whichBuff=0;}
				}
				
			}else if(this.getAttackType()==AttackTypes.HealStatus){
				esqd.healStatus();
				usqd.turns++;
				//esqd.esuna();
			}else
            {
                if(this.equipment[0].hitAll){
                    for(var i=0;i<esqd.numUnits;i++)
                    {
                        if (esqd.units[i].alive)
                        {
                            targe=esqd.units[i];
                            var delt=Math.floor(this.getAttack()-targe.getDef(this.getAttackType()));
                            if (delt<1) {delt=1;}
                            if(Math.floor(Math.random()*20) > targe.evade) {
                                var temper="";
                                if(Math.floor(Math.random()*CRIT_CHANCE) < this.luck) { delt=delt+(delt/2); temper=" critical";} //critical hit
                                
                                var tmpstr=this.name + temper+" hit " +targe.name+ " for " +delt+ " damage.";
                                if(usqd.team===0) {
                                    console.log(tmpstr);//todo MONSOLE
									bConsoleStr.push(tmpstr);
									bConsoleClr.push("green");
                                }else
                                {
                                    console.warn(tmpstr);
									//todo set color
									bConsoleStr.push(tmpstr);
									bConsoleClr.push("red");
                                }
                                this.giveExp(delt);
                                this.damagedelt+=delt;
								if(targe.hasStatus(Status.Protect)){
									delt-=delt/.25;
								}
                                targe.hurt(delt); 
                                if(!targe.alive) { 
                                    this.kills++;
                                    if(targe.ali>this.ali+5){this.giveAli(2);}
                                    if(targe.ali<this.ali-5){this.giveAli(2);}
                                }
                                if((targe==esqd.leader) &&(!targe.alive)) {esqd.pickNewLeader();}
                                this.attackStage=1; 
								this.attackAniStage=1;
								if(this.attackType[this.row]==AttackTypes.Ranged)
								{
									//monsta.shoot(xp-50-this.attacking/2, 135+i*2*45,90,3);
									
								}
                                targe.hurting=20;
                                usqd.turns++;
                                usqd.damaged+=delt;
                            }
                        }
                    }
                }else
                {
                    if (usqd.battleAI===0) //weakest
                    {
                        targe=esqd.getWeakest();
                    }else if (usqd.battleAI===1) //Strongest
                    {
                        targe=esqd.getStrongest();
                    }else if (usqd.battleAI==2) //leader
                    {
                        targe=esqd.leader;
                        if(!targe.alive) {targe=esqd.getWeakest(); }
                    }
                    if((esqd!==null) && (esqd.alive)){
                        if(targe===null) { return;}//esqd.checkSurvivors(); return;}
                        var delt=Math.floor(this.getAttack()-targe.getDef(this.getAttackType()));
                        if (delt<1) {delt=1;}
                        if(Math.floor(Math.random()*20) > targe.evade) {
                            var temper="";
                            if(Math.floor(Math.random()*CRIT_CHANCE) < this.luck) { delt=delt+(delt/2); temper=" critical";} //critical hit
                            
                            var tmpstr=this.name + temper+" hit " +targe.name+ " for " +delt+ " damage.";
                            if(usqd.team===0) {
                                console.log(tmpstr);//todo MONSOLE
								bConsoleStr.push(tmpstr);
								bConsoleClr.push("green");
                            }else
                            {
                                console.warn(tmpstr);
								bConsoleStr.push(tmpstr);
								bConsoleClr.push("red");
                            }
                            this.giveExp(delt); //todo exp based on levels
                            this.damagedelt+=delt;
                            targe.hurt(delt); 
                            if(!targe.alive) { 
                                this.kills++;
                                if(targe.ali>this.ali+5){this.giveAli(2);}
                                if(targe.ali<this.ali-5){this.giveAli(2);}
                            }
                            if((targe==esqd.leader) &&(!targe.alive)) {esqd.pickNewLeader();}
							this.attackStage=1;
							this.attackAniStage=1;
                            targe.hurting=20;
                            usqd.turns++;
                            usqd.damaged+=delt;
                        } else {
			    
			    usqd.turns++;
			    this.attackStage=1; 
				this.attackAniStage=1;
			    var tmpstr = this.name + " missed "+ targe.name; 
			    console.log(tmpstr);
				bConsoleStr.push(tmpstr);
				bConsoleClr.push("white");
			} //miss
                    } else { endBattle(usqd,esqd); }
                }
            }
            
        }
        if((this.alive) &&(this.hp<1)) {
            this.hp=0; 
            this.alive=false;
            var tmpstr=this.name + " died.";
            console.log(tmpstr);//todo MONSOLE
			bConsoleStr.push(tmpstr);
			bConsoleClr.push("white");
            //usqd.checkSurvivors();
        }


		if(!battleReport){
			if(this.hasStatus(Status.Haste)){
				this.atb+=(this.speed*2*battleRate);
			}else if(this.hasStatus(Status.Slow)){
				this.atb+=(this.speed/2*battleRate);
			}else {
				this.atb+=this.speed*battleRate;
			}
		}
    };
    
    this.rowswap=function(){
        if (this.row===0) { this.row=1;}
        else if (this.row===1) { this.row=0;}
    };
    
    this.setClass=function() {
        var cla=this.class;
        if(cla===SEEAss.Bear) { //bear
            this.maxhp=60;
            this.hp=60;
            this.attack=14
            this.maxmp=40;
            this.speed=1;
            this.luck=5;
            this.ali=50;
			this.blokemon=true;
            this.viewRange=5;
            this.def=15;
            this.mdef=3;
            this.cost=10;
            this.canlead=true;
            this.attackType[0]=AttackTypes.Physical;
            this.attackType[1]=AttackTypes.Physical;
            this.equipment[0]=claws;
            //this.equipment[1]=breastplate;
            this.sprite = Sprite("bear1");
            if (this.gender===1) {this.sprite = Sprite("beargirl");}
        }else if(cla===SEEAss.Frog) { //frog
            this.maxhp=60;
            this.hp=60;
            this.attack=11;
            this.maxmp=40;
            this.speed=3;
            this.luck=5;
            this.ali=20;
            this.viewRange=5;
            this.def=12;
            this.mdef=5;
            this.cost=10;
			this.blokemon=true;
            this.canlead=true;
            this.attackType[0]=AttackTypes.Physical;
            this.attackType[1]=AttackTypes.Ranged;
            this.equipment[1]=breastplate;
            this.sprite = Sprite("frogman1");
            if (this.gender===1) {this.sprite = Sprite("froggirl");}
        }else if(cla===SEEAss.Wizard) { //wizard
            this.maxhp=50;
            this.hp=50;
            this.attack=5;
            this.maxmp=40;
            this.speed=1;
            this.luck=5;
            this.ali=35;
            this.viewRange=5;
            this.sprite = Sprite("wizard");
            //this.equipment[0]=rod;
            //this.equipment[1]=robe;
            if (this.gender===1) {this.sprite = Sprite("wizardgirl");}
            this.def=12;
            this.mdef=5;
            this.mag=20;
            this.cost=10;
            this.canlead=true;
            this.attackType[0]=AttackTypes.Physical;
            this.attackType[1]=AttackTypes.Magical;
        }else if(cla===SEEAss.Shoe) { //shoe
            this.maxhp=60;
            this.hp=60;
            this.attack=9;
            this.maxmp=40;
            this.speed=1;
            this.evade=4;
            this.luck=5;
            this.ali=10;
            this.viewRange=5;
            this.def=10;
            this.mdef=5;
            this.cost=10;
            this.canlead=false;
			this.blokemon=true;
            this.sprite = Sprite("shoe");
            this.attackType[0]=AttackTypes.Physical;
            this.attackType[1]=AttackTypes.Physical;
            if (this.gender===1) {this.sprite = Sprite("shoegirl");}
        }else if(cla===SEEAss.Archer) { //archer
            this.maxhp=45;
            this.hp=45;
            this.attack=5;
            this.maxmp=40;
            this.speed=1;
            this.luck=5;
            this.ali=40;
            this.viewRange=5;
			this.evade=2;
            this.def=11;
            this.mdef=5;
            this.cost=10;
            this.equipment[0]=bow[0];
            this.equipment[1]=shirt;
            this.canlead=true;
            this.sprite = Sprite("archer");
            this.attackType[0]=AttackTypes.Ranged;
            this.attackType[1]=AttackTypes.Ranged;
            if (this.gender===1) {this.sprite = Sprite("archergirl");}
        }else if(cla===SEEAss.Healer) { //healer
            this.maxhp=45;
            this.hp=45;
            this.attack=2;
            this.maxmp=40;
            this.speed=1;
            this.luck=5;
            this.ali=60;
            this.viewRange=5;
            this.def=8;
            this.mdef=5;
            this.mag=20;
            this.cost=10;
            this.equipment[0]=rod;
            this.equipment[1]=robe;
            this.canlead=true;
            this.sprite = Sprite("healer");
            this.attackType[0]=AttackTypes.Physical;
            this.attackType[1]=AttackTypes.Heal;
            if (this.gender===1) {this.sprite = Sprite("healergirl");}
        }else if(cla===SEEAss.Ninja) { //ninja
            this.maxhp=30;
            this.hp=30;
            this.attack=5;
            this.maxmp=40;
            this.speed=2;
            this.luck=5;
            this.ali=30;
            this.viewRange=5;
            this.def=14;
            this.evade=9;
            this.mdef=5;
            this.mag=15;
            this.cost=15;
            this.equipment[0]=katana[0];
            //this.equipment[1]=robe;
            this.canlead=true;
            this.sprite = Sprite("ninja");
            this.attackType[0]=AttackTypes.Physical;
            this.attackType[1]=AttackTypes.Ranged;
            if (this.gender===1) {this.sprite = Sprite("ninjagirl");}
        }else if(cla===SEEAss.Winger) { //winger
            this.maxhp=45;
            this.hp=45;
            this.attack=8;
            this.maxmp=40;
            this.speed=1;
            this.luck=5;
            this.ali=40;
			this.evade=2;
            this.viewRange=5;
			this.flightHeight=2;
            this.def=13;
            this.mdef=5;
            this.mag=15;
            this.cost=15;
            this.equipment[0]=spear[0];
            //this.equipment[1]=robe;
            this.canlead=true;
            this.sprite = Sprite("winger");
            this.attackType[0]=AttackTypes.Physical;
            this.attackType[1]=AttackTypes.Physical;
            if (this.gender===1) {this.sprite = Sprite("wingergirl");}
        }else if(cla===SEEAss.Knight) { //knight
            this.maxhp=75;
            this.hp=75;
            this.attack=20;
            this.maxmp=40;
            this.speed=1;
            this.luck=5;
            this.ali=60;
            this.viewRange=5;
            this.def=25;
            this.mdef=5;
            this.mag=15;
            this.cost=15;
            this.equipment[0]=swords[0];
            this.equipment[1]=chainmail;
            this.canlead=true;
            this.sprite = Sprite("knight");
            this.attackType[0]=AttackTypes.Physical;
            this.attackType[1]=AttackTypes.Physical;
            if (this.gender===1) {this.sprite = Sprite("knightgirl");}
        }else if(cla===SEEAss.Cleric) { //cleric
            this.maxhp=60;
            this.hp=60;
            this.attack=8;
            this.maxmp=40;
            this.speed=2;
            this.luck=5;
            this.ali=70;
            this.viewRange=5;
            this.def=12;
            this.mdef=5;
            this.mag=30;
            this.cost=20;
            this.equipment[1]=robe;
            this.canlead=true;
            this.sprite = Sprite("cleric");
            this.attackType[0]=AttackTypes.Magical;
            this.attackType[1]=AttackTypes.Heal;
            if (this.gender===1) {this.sprite = Sprite("clericgirl");}
        }else if(cla===SEEAss.Sage) { //sage
            this.maxhp=60;
            this.hp=60;
            this.attack=5;
            this.maxmp=40;
            this.speed=2;
            this.luck=5;
            this.ali=30;
            this.viewRange=5;
            this.sprite = Sprite("sage");
            this.equipment[0]=icemagic[2];
            this.equipment[1]=robe;
            if (this.gender===1) {this.sprite = Sprite("sagegirl");}
            this.def=12;
            this.mdef=5;
            this.mag=20;
            this.cost=20;
            this.canlead=true;
            this.attackType[0]=AttackTypes.Physical;
            this.attackType[1]=AttackTypes.Magical;
        }else if(cla===SEEAss.Angel) { //angel
            this.maxhp=80;
            this.hp=80;
            this.attack=5;
            this.maxmp=40;
            this.speed=2;
            this.luck=5;
            this.ali=90;
            this.viewRange=5;
			this.flightHeight=1;
            this.sprite = Sprite("angel");
            this.equipment[0]=icemagic[1];
            this.equipment[1]=robe;
            if (this.gender===1) {this.sprite = Sprite("angelgirl");}
            this.def=14;
            this.mdef=15;
            this.mag=30;
            this.cost=50;
            this.canlead=true;
            this.attackType[0]=AttackTypes.Magical;
            this.attackType[1]=AttackTypes.Heal;
        }else if(cla===SEEAss.DarkKnight) { //darkknight
            this.maxhp=100;
            this.hp=100;
            this.attack=25;
            this.maxmp=40;
            this.speed=1;
            this.luck=5;
            this.ali=10;
            this.viewRange=5;
            this.sprite = Sprite("darkknight");
            this.equipment[0]=swords[1];
            this.equipment[1]=breastplate;
            if (this.gender===1) {this.sprite = Sprite("darkknightgirl");}
            this.def=30;
            this.mdef=15;
            this.mag=30;
            this.cost=30;
            this.canlead=true;
            this.attackType[0]=AttackTypes.Physical;
            this.attackType[1]=AttackTypes.Physical;
        }else if(cla===SEEAss.Palladin) { //palladin
            this.maxhp=120;
            this.hp=120;
            this.attack=18;
            this.maxmp=40;
            this.speed=2;
            this.luck=5;
            this.ali=90;
            this.viewRange=5;
            this.sprite = Sprite("whiteknight");
            this.equipment[0]=icemagic[1];
            this.equipment[1]=robe;
            if (this.gender===1) {this.sprite = Sprite("whiteknightgirl");}
            this.def=20;
            this.mdef=15;
            this.mag=60;
            this.cost=30;
            this.canlead=true;
            this.attackType[0]=AttackTypes.Physical;
            this.attackType[1]=AttackTypes.Heal;
        }else if(cla===SEEAss.PolarBear) { //polar
            this.maxhp=70;
            this.hp=70;
            this.attack=14;
            this.maxmp=40;
            this.speed=2;
            this.luck=9;
            this.ali=90;
			this.blokemon=true;
            this.viewRange=5;
            this.sprite = Sprite("polarbear");
            this.equipment[0]=claws;
            this.equipment[1]=breastplate;
            if (this.gender===1) {this.sprite = Sprite("polarbear");}
            this.def=16;
            this.mdef=15;
            this.mag=30;
            this.cost=10;
            this.canlead=true;
            this.attackType[0]=AttackTypes.Physical;
            this.attackType[1]=AttackTypes.Heal;
        }else if(cla===SEEAss.CptBearmerica) { //capt bear
            this.maxhp=150;
            this.hp=150;
            this.attack=16;
            this.maxmp=40;
            this.speed=2;
            this.luck=12;
            this.ali=90;
            this.viewRange=5;
            this.sprite = Sprite("bearmerica");
            this.equipment[0]=claws;
            this.equipment[1]=chainmail;
            if (this.gender===1) {this.sprite = Sprite("bearmericagirl");}
            this.def=25;
            this.mdef=15;
            this.mag=30;
            this.cost=10;
            this.canlead=true;
            this.attackType[0]=AttackTypes.Physical;
            this.attackType[1]=AttackTypes.Ranged;
        }else if(cla===SEEAss.IronBear) { //iron bear
            this.maxhp=150;
            this.hp=150;
            this.attack=16;
            this.maxmp=40;
            this.speed=2;
            this.luck=12;
            this.ali=90;
			this.evade=2;
			this.flightHeight=3;
            this.viewRange=5;
            this.sprite = Sprite("ironbear");
            this.equipment[0]=claws;
            this.equipment[1]=heavyplate;
            if (this.gender===1) {this.sprite = Sprite("ironbeargirl");}
            this.def=40;
            this.mdef=15;
            this.mag=30;
            this.cost=10;
            this.canlead=true;
            this.attackType[0]=AttackTypes.Physical;
            this.attackType[1]=AttackTypes.Ranged;
        }else if(cla===SEEAss.HulkBear) { //hulk bear
            this.maxhp=130;
            this.hp=130;
            this.attack=35;
            this.maxmp=40;
            this.speed=1;
            this.luck=0;
            this.ali=1;
            this.viewRange=5;
            this.sprite = Sprite("hulkbear");
            this.equipment[0]=claws;
            this.equipment[1]=shirt;
            if (this.gender===1) {this.sprite = Sprite("shehulkbear");}
            this.def=16;
            this.mdef=15;
            this.mag=30;
            this.cost=10;
            this.canlead=false;
            this.attackType[0]=AttackTypes.Physical;
            this.attackType[1]=AttackTypes.Ranged;
        }else if(cla===SEEAss.RumHam) { //RUM HAM
            this.maxhp=50;
            this.hp=50;
            this.attack=14;
            this.maxmp=80;
            this.speed=3;
            this.luck=7;
            this.ali=1;
            this.viewRange=5;
			this.blokemon=true;
            this.sprite = Sprite("rumham");
            //this.equipment[0]=claws;
            this.equipment[1]=shirt;
            if (this.gender===1) {this.sprite = Sprite("rumhamgirl");}
            this.def=20;
            this.mdef=15;
            this.mag=3;
            this.cost=210;
            this.canlead=false;
            this.attackType[0]=AttackTypes.Physical;
            this.attackType[1]=AttackTypes.Ranged;
        }else if(cla===SEEAss.Dancer) { //RUM HAM
            this.maxhp=45;
            this.hp=45;
            this.attack=1;
            this.maxmp=80;
            this.speed=1;
            this.luck=7;
            this.ali=1;
			this.evade=2;
            this.viewRange=5;
            this.sprite = Sprite("dancer");
            //this.equipment[0]=claws;
            this.equipment[1]=shirt;
            if (this.gender===1) {this.sprite = Sprite("dancer");}
            this.def=12;
            this.mdef=15;
            this.mag=3;
            this.cost=210;
            this.canlead=true;
            this.attackType[0]=AttackTypes.GiveStatus;
            this.attackType[1]=AttackTypes.GiveStatus;
        }
		else if(cla===SEEAss.Creeper) { 
            this.maxhp=30;
            this.hp=30;
            this.attack=14;
            this.maxmp=80;
            this.speed=3;
            this.luck=7;
            this.ali=1;
            this.viewRange=5;
            this.sprite = Sprite("creeper");
            //this.equipment[0]=claws;
            this.equipment[1]=shirt;
			this.blokemon=true;
            if (this.gender===1) {this.sprite = Sprite("creeper");}
            this.def=20;
            this.mdef=15;
            this.mag=3;
            this.cost=210;
            this.canlead=false;
            this.attackType[0]=AttackTypes.Physical;
            this.attackType[1]=AttackTypes.Ranged;
        }else if(cla===SEEAss.EarthBound) { //Earthbount
            this.maxhp=50;
            this.hp=50;
            this.attack=14;
            this.maxmp=80;
            this.speed=3;
            this.luck=7;
            this.ali=1;
            this.viewRange=5;
            this.sprite = Sprite("ebound");
            //this.equipment[0]=claws;
            this.equipment[1]=shirt;
			this.blokemon=true;
            if (this.gender===1) {this.sprite = Sprite("ebound");}
            this.def=20;
            this.mdef=15;
            this.mag=3;
            this.cost=210;
            this.canlead=false;
            this.attackType[0]=AttackTypes.Physical;
            this.attackType[1]=AttackTypes.Ranged;
        }else if(cla===SEEAss.Skeleton) {
            this.maxhp=50;
            this.hp=50;
            this.attack=14;
            this.maxmp=80;
            this.speed=3;
            this.luck=7;
            this.ali=1;
            this.viewRange=5;
            this.sprite = Sprite("skeleton");
            //this.equipment[0]=claws;
            this.equipment[1]=shirt;
			this.blokemon=true;
            if (this.gender===1) {this.sprite = Sprite("skeleton");}
            this.def=20;
            this.mdef=15;
            this.mag=3;
            this.cost=210;
            this.canlead=false;
            this.attackType[0]=AttackTypes.Physical;
            this.attackType[1]=AttackTypes.Ranged;
        }else if(cla===SEEAss.Theif) {
            this.maxhp=45;
            this.hp=45;
            this.attack=14;
            this.maxmp=8;
            this.speed=2;
            this.luck=7;
            this.ali=20;
            this.viewRange=5;
			this.evade=4;
            this.sprite = Sprite("theif");
            //this.equipment[0]=claws;
            this.equipment[1]=shirt;
            if (this.gender===1) {this.sprite = Sprite("theif");}
            this.def=14;
            this.mdef=15;
            this.mag=3;
            this.cost=210;
            this.canlead=true;
            this.attackType[0]=AttackTypes.Physical;
            this.attackType[1]=AttackTypes.Ranged;
        }else if(cla===SEEAss.Werewolf) {
            this.maxhp=40;
            this.hp=40;
            this.attack=24;
            this.maxmp=8;
            this.speed=3;
            this.luck=7;
            this.ali=1;
            this.viewRange=5;
            this.sprite = Sprite("lycan");
			this.nightSprite= Sprite("werewolf");
            //this.equipment[0]=claws;
            this.equipment[1]=shirt;
            if (this.gender===1) {this.sprite = Sprite("lycan");}
            this.def=20;
            this.mdef=15;
            this.mag=3;
            this.cost=210;
            this.canlead=true;
            this.attackType[0]=AttackTypes.Physical;
            this.attackType[1]=AttackTypes.Ranged;
        }else if(cla===SEEAss.Samurai) {
            this.maxhp=80;
            this.hp=80;
            this.attack=30;
            this.maxmp=8;
            this.speed=2;
            this.luck=7;
            this.ali=1;
			this.evade=5;
            this.viewRange=5;
            this.sprite = Sprite("samurai");
            //this.equipment[0]=claws;
            this.equipment[1]=shirt;
            if (this.gender===1) {this.sprite = Sprite("samurai");}
            this.def=25;
            this.mdef=15;
            this.mag=3;
            this.cost=210;
            this.canlead=true;
            this.attackType[0]=AttackTypes.Physical;
            this.attackType[1]=AttackTypes.Ranged;
        }else if(cla===SEEAss.Monk) {
            this.maxhp=100;
            this.hp=100;
            this.attack=28;
            this.maxmp=8;
            this.speed=2;
            this.luck=7;
            this.ali=60;
            this.viewRange=5;
            this.sprite = Sprite("monk");
            //this.equipment[0]=claws;
            this.equipment[1]=shirt;
            if (this.gender===1) {this.sprite = Sprite("monk");}
            this.def=25;
            this.mdef=15;
            this.mag=3;
            this.cost=210;
            this.canlead=true;
            this.attackType[0]=AttackTypes.Physical;
            this.attackType[1]=AttackTypes.Physical;
        }else if(cla===SEEAss.Vampire) {
            this.maxhp=40;
            this.hp=40;
            this.attack=4;
            this.maxmp=8;
            this.speed=1;
            this.luck=7;
            this.ali=1;
            this.viewRange=5;
            this.sprite = Sprite("vamp");
            //this.equipment[0]=claws;
            this.equipment[1]=shirt;
            if (this.gender===1) {this.sprite = Sprite("vamp");}
            this.def=20;
            this.mdef=15;
            this.mag=3;
            this.cost=210;
            this.canlead=true;
            this.attackType[0]=AttackTypes.Physical;
            this.attackType[1]=AttackTypes.Ranged;
        }else if(cla===SEEAss.Tiger) {
            this.maxhp=40;
            this.hp=40;
            this.attack=4;
            this.maxmp=8;
            this.speed=3;
            this.luck=7;
            this.ali=1;
            this.viewRange=5;
            this.sprite = Sprite("tiger");
            //this.equipment[0]=claws;
            this.equipment[1]=shirt;
			this.blokemon=true;
            if (this.gender===1) {this.sprite = Sprite("tiger");}
            this.def=20;
            this.mdef=15;
            this.mag=3;
            this.cost=210;
            this.canlead=false;
            this.attackType[0]=AttackTypes.Physical;
            this.attackType[1]=AttackTypes.Ranged;
        }else if(cla===SEEAss.Witch) {
            this.maxhp=100;
            this.hp=100;
            this.attack=4;
            this.maxmp=80;
			this.gender=1;
            this.speed=1;
            this.luck=17;
			this.name="Deneb";
            this.ali=1;
            this.viewRange=5;
            this.sprite = Sprite("witch");
            this.equipment[0]=icemagic[3];
            this.equipment[1]=robe;
            if (this.gender===1) {this.sprite = Sprite("witch");}
            this.def=18;
            this.mdef=15;
            this.mag=12;
            this.cost=310;
            this.canlead=true;
            this.attackType[0]=AttackTypes.Magical;
            this.attackType[1]=AttackTypes.Magical;
        }else if(cla===SEEAss.Pumpkinhead) {
            this.maxhp=80;
            this.hp=80;
            this.attack=8;
            this.maxmp=80;
			this.gender=0;
            this.speed=1;
            this.luck=17;
			this.ali=1;
            this.viewRange=5;
            this.sprite = Sprite("pumpkinhead");
            this.equipment[0]=icemagic[3];
            this.equipment[1]=robe;
			this.blokemon=true;
            if (this.gender===1) {this.sprite = Sprite("pumpkinhead");}
            this.def=18;
            this.mdef=15;
            this.mag=17;
            this.cost=210;
            this.canlead=true;
            this.attackType[0]=AttackTypes.Physical;
            this.attackType[1]=AttackTypes.Magical;
        }else if(cla===SEEAss.Mermaid) {
            this.maxhp=80;
            this.hp=80;
            this.attack=8;
            this.maxmp=80;
			this.gender=1;
            this.speed=1;
            this.luck=17;
			this.ali=1;
            this.viewRange=5;
			this.swimCarry=2;
            this.sprite = Sprite("mermaid");
            this.equipment[0]=icemagic[3];
            this.equipment[1]=robe;
            if (this.gender===1) {this.sprite = Sprite("mermaid");}
            this.def=9;
            this.mdef=15;
            this.mag=17;
            this.cost=210;
            this.canlead=true;
            this.attackType[0]=AttackTypes.Physical;
            this.attackType[1]=AttackTypes.Magical;
        }else if(cla===SEEAss.Octopus) {
            this.maxhp=100;
            this.hp=100;
            this.attack=12;
            this.maxmp=80;
            this.speed=1;
            this.luck=7;
			this.ali=10;
            this.viewRange=5;
			this.swimCarry=3;
			this.blokemon=true;
            this.sprite = Sprite("octopus");
            this.equipment[0]=icemagic[3];
            this.equipment[1]=robe;
            if (this.gender===1) {this.sprite = Sprite("octopus");}
            this.def=17;
            this.mdef=15;
            this.mag=17;
            this.cost=210;
            this.canlead=true;
            this.attackType[0]=AttackTypes.Physical;
            this.attackType[1]=AttackTypes.Physical;
        }else if(cla===SEEAss.BeastTamer) {
            this.maxhp=50;
            this.hp=50;
            this.attack=12;
            this.maxmp=80;
            this.speed=1;
            this.luck=7;
			this.ali=40;
            this.viewRange=5;
            this.sprite = Sprite("beasttamer");
            this.equipment[0]=whip[0];
            this.equipment[1]=shirt;
            if (this.gender===1) {this.sprite = Sprite("beasttamer");}
            this.def=17;
            this.mdef=15;
            this.mag=17;
            this.cost=210;
            this.canlead=true;
            this.attackType[0]=AttackTypes.Physical;
            this.attackType[1]=AttackTypes.Physical;
        }
        
        
    };
    this.setClass();
    this.hp=this.maxhp;
    this.mp=this.maxmp;
	this.viewRange=50;
    if (this.gender===2) {this.name="Nancy";}
}

function numSquads(team){
    var count=0;
    for(var i=0;i<armies[0].numSquads;i++) 
    {
        if(team===0) {if((armies[0].squads[i].alive) &&(armies[0].squads[i].deployed)) {count++;} }
    }   
    for(var i=0;i<armies[1].numSquads;i++) 
    {
        if(team===1) {if((armies[1].squads[i].alive) &&(armies[1].squads[i].deployed)){count++;} }
    }
    return count;
}

function numArmyUnits(team){
    var count=0;
    if(team===0){
        for(var i=0;i<armies[0].numSquads;i++) 
        {
            if(armies[0].squads[i].alive) 
            {
                count+=armies[0].squads[i].numSquadUnits();
            }
        }
    }else if (team===1) {
        for(var i=0;i<armies[1].numSquads;i++) 
        {
            if(armies[1].squads[i].alive) 
            {
                for(var j=0;j<armies[1].squads[i].numUnits;j++){
                    if(armies[1].squads[i].units[j].alive) {count++;}
                }
            }

        }
    }
    return count;
}

curMap = new Map();


function town() {
    this.x = 1;
    this.y = 1;
    this.base=false;
    this.name="Qarth";
    this.team=1;
	this.alive=true;
	this.deployed=true;
    this.pop=2;
    this.width=64;
    this.height=32;
    this.speaker="Villager:";
	this.itemChance=0;
    this.plotText=new Array(4);
    this.plotText[0]="Bears are the best!";
    this.plotText[1]="Bears are the best!";
    this.plotText[2]="Bears are the best!";
    this.plotText[3]="Bears are the best!";
    this.spouted=false;
    //this.sprite = Sprite("town");
    this.bsprite=new Array(2);
    this.bsprite[0] = Sprite("townblue");
    this.bsprite[1] = Sprite("townblues");
    this.rsprite=new Array(2);
    this.rsprite[0] = Sprite("townred");
    this.rsprite[1] = Sprite("townreds");
}
town.prototype.checkCollision=function(squd){
    return ((squd.isViable())&&(squd.x>this.x-1) && (squd.x<this.x+2) && 
	    (squd.y>this.y-1) && (squd.y<this.y+2)); 
		//return false;
};
town.prototype.getTileX=function(cam){
    return Math.floor((this.x+cam.x)/16);
};
town.prototype.getTileY=function(cam){
    return Math.floor((this.y+cam.y)/16);
};
town.prototype.getIncome=function(arm){
	return 2000; 
	//TODO:factor in opinion, subtract from opinion if hella days.
};
town.prototype.getItem=function(){
		return randomItem();
};
town.prototype.draw=function(cam) {
    if(curMap.zoom<2) {
        if(this.team===0)
        {
            this.bsprite[0].draw(canvas,
                                 (this.x * 16  - 8 - cam.x * 16) / Math.pow(2, curMap.zoom-1), 
                                 (this.y * 16  - 8- cam.y * 16) / Math.pow(2, curMap.zoom-1));
        }else if(this.team===1)
        {
            this.rsprite[0].draw(canvas,
                                 (this.x * 16  - 8 - cam.x * 16) / Math.pow(2, curMap.zoom-1), 
                                 (this.y * 16  - 8- cam.y * 16) / Math.pow(2, curMap.zoom-1));
        }
    }else
    {
        if(this.team===0)
        {
            this.bsprite[1].draw(canvas,
                                 (this.x * 16  - 8 - cam.x * 16) / Math.pow(2, curMap.zoom-1), 
                                 (this.y * 16  - 8- cam.y * 16) / Math.pow(2, curMap.zoom-1));
        }else if(this.team===1)
        {
            this.rsprite[1].draw(canvas,
                                 (this.x * 16  - 8 - cam.x * 16) / Math.pow(2, curMap.zoom-1), 
                                 (this.y * 16  - 8- cam.y * 16) / Math.pow(2, curMap.zoom-1));
        }
    }
};


function endGame(win){
	if (win==0){
		mode=1;
		maps[mapSelected].team=0;
		//comeback
		townbox.exists=false;
		armies[0].gold+=2500;
		for(var i=0; i<armies[0].numSquads;i++)
		{
			armies[0].squads[i].healStatus();
			armies[0].squads[i].refresh();
			armies[0].squads[i].deployed=false;
			armies[0].squads[i].clearDestination();
			armies[0].squads[i].bx=8;
			armies[0].squads[i].by=8;
			armies[0].squads[i].alive=true;
		}
		//resetEnemyArmy();
		for( i=0; i<armies[1].numSquads;i++)
		{
			armies[1].squads[i].healStatus();
			armies[1].squads[i].refresh();
			armies[1].squads[i].deployed=false;
			armies[1].squads[i].clearDestination();
			armies[1].squads[i].bx=8;
			armies[1].squads[i].by=8;
			armies[1].squads[i].alive=true;
		}
		sillycanvas.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
		//armies[0].squads[0].deploy();
		//armies[0].lastDeployed=1;//1?
		//armies[0].
		//armies[1].squads[0].deploy();
		isBattle=false;
		preBattle=0;
		battletick=0;
		looseX=0;
		looseY=0;
		SELECTED=0;
		MSELECTED=0;
		if(MUSIC_ON){
		    document.getElementById("titleAudio").currentTime = 0;
			document.getElementById("titleAudio").play();
			document.getElementById("mapAudio").pause();
			document.getElementById("mapAudio").currentTime = 0;
		}
		//heal all squads and units
	}
};

function checkEndGame(){
    if(winmode==0)
    {
        if(towns[0].team==1) { 
			/*console.log("YOU LOSE");
			bConsoleStr.push("YOU LOSE");
			bConsoleClr.push("red");*/
		}
        if(towns[1].team==0) { 
			/*console.log("A WINNER IS YOU");
			bConsoleStr.push("A WINNER IS YOU");
			bConsoleClr.push("green");*/
			victory=true;
		}
    }else if(winmode==1)
    {
        var toaster=true;
        for(var i=0;i<maps[mapSelected].numTowns;i++)
        {
            if(towns[i].team!=0) {toaster=false;}
        }
        //if(toaster) {console.log("A WINNER IS YOU");}
        
        toaster=true;
        for(var i=0;i<maps[mapSelected].numTowns;i++)
        {
            if(towns[i].team!=1) {toaster=false;}
        }
        //if(toaster) {console.log("YOU LOSE");}
    }
};


distance=function(one,two){
	return(Math.pow(one.x-two.x,2)+Math.pow(one.y-two.y,2));
};


function army() {
    this.numSquads=3;
    this.team=0;
    this.ali=50;
    this.basex=12;
    this.basey=12;
	this.dailyIncome=0;
	this.baseName="Oldtown";
    this.opinion=50;
	this.numItems=5;
	this.items=new Array(99);
	for(var i=0;i<this.numItems;i++)
	{
		this.items[i]=randomItem();
	}

    this.fieldAI=AITypes.Random;
    this.cards=new Array(5);
    this.cards[0]=new card();
    this.cards[1]=new card();
    this.cards[2]=new card();
    this.cards[3]=new card();
    this.cards[4]=new card();
    this.numLooseUnits=35;
    this.looseUnits=new Array (99);
	for(var i=0;i<this.numLooseUnits;i++){
	    this.looseUnits[i]=new unit();
	}

    this.gold=4000; 
    this.name="Fighting Mongooses"
    this.squads=new Array (TEAM_SIZE);
    this.wins=0;
    this.losses=0;
    this.lastDeployed=1;
	this.visibleEnemies=new Array;
    this.getOpinion=function(){
        return this.opinion;
    };
	
	this.toggleSelected=function() //todo problem
	{
		if(!keydown["shift"])
		{
			for (var i=0;i<this.numSquads;i++)
			{
				this.squads[i].selected=false;
			}
		}
		var nerp=false;
		if(SELECTED<this.numSquads-1)
		{
			for(var i=SELECTED+1;i<this.numSquads;i++)
			{
				if(this.squads[i].isViable())
				{
					SELECTED=i;
					nerp=true;
					break;
				}
			}
			if(!nerp)
			{
				for(var i=0;i<this.numSquads;i++)
				{
					if(this.squads[i].isViable())
					{
						SELECTED=i;
						nerp=true;
						break;
					}
				}
			}
		}else
		{
			if(this.squads[0].isViable()){
				SELECTED=0;
				nerp=true;
			}
		}
		camera.center(this.squads[SELECTED]);
		return nerp;
	};
	this.getVisible=function(enemyarmy){
		this.visibleEnemies=null;
		this.visibleEnemies=new Array();
		for(var i=0;i<enemyarmy.numSquads;i++)
		{
			if(enemyarmy.squads[i].isViable())
			{
				for( var j=0;j<this.numSquads;j++)
				{
					if((this.squads[j].isViable()) && (distance(enemyarmy.squads[i],this.squads[j])<Math.pow(this.squads[j].viewRange,2)))
					{
						this.visibleEnemies.push(enemyarmy.squads[i]);
						break;
					}
				}
			}
		}
	};
	this.getCost=function(){
		var ca=0;
		for( var j=0;j<this.numSquads;j++)
				{
					if(this.squads[j].deployed)
					{
						ca+=this.squads[j].getCost();
					}
				}
				return ca;
	};
	this.call=function (nme){
		for(var i=0;i<this.numLooseUnits;i++)
		{
			if(this.looseUnits[i].name==nme) {
				
				console.log("unit is not assigned to a squad.");
				bConsoleStr.push("unit is not assigned to a squad.");
				bConsoleClr.push("white");
				return this.looseUnits[i];
			}
		}
		for(i=0;i<this.numSquads;i++)
		{
			for(var j=0;j<this.squads[i].numUnits;j++)
			{
				if(this.squads[i].units[j].name==nme)
				{
					var tmpstr="unit is in " + this.squads[i].leader.name+ "'s squad."
					console.log(tmpstr);
					bConsoleStr.push(tmpstr);
					bConsoleClr.push("white");
					return this.squads[i].units[j];
				}
			}
		}
		console.log("no unit found by that name.");
		return this.leader;
	}
	
	this.removeItem=function(id)
    {
        if (this.numItems<1) {return false;}
        
        for(var i=id;i<this.numItems-1;i++)
        {
            this.items[i]=this.items[i+1];
            
        }
        this.numItems--;
		return true;
    };
	
	this.addItem=function(itm){
		if((itm==claws) || (itm=unarmed)) {return;} 
		this.items[this.numItems]=itm;
		this.numItems++;
	};
	
	this.optimizeUnit=function(uknit){
		
		var bestwep=uknit.equipment[0];
		var bestarm=uknit.equipment[1];
		var bestacc=uknit.equipment[2];
		var bestwepi=0;
		var bestarmi=0;
		var bestacci=0;
		for(var i=0;i<this.numItems;i++)
		{
			if(this.items[i].slot===0)
			{
				if ((uknit.canEquip(this.items[i]))&&(this.items[i].attack>bestwep.attack))
				{
					bestwep=this.items[i];
					bestwepi=i;
				}
			}else if(this.items[i].slot===1)
			{
				if ((uknit.canEquip(this.items[i]))&&(this.items[i].def>bestarm.def))
				{
					bestarm=this.items[i];
					bestarmi=i;
				}
			}else if(this.items[i].slot===2)
			{
				if ((uknit.canEquip(this.items[i]))&&(this.items[i].attack>bestacc.attack))
				{
					bestacc=this.items[i];
					bestacci=i;
				}
			}
		}
		
		var oldwep=uknit.equipment[0];
		var oldarm=uknit.equipment[1];
		var oldacc=uknit.equipment[2];
		
		if((bestwep!=uknit.equipment[0])&&(	uknit.equip(bestwep))){
			this.removeItem(bestwepi);
			if(oldwep!=unarmed) {
				this.addItem(oldwep);
			}
		}
		if((bestarm!=uknit.equipment[1]) && (uknit.equip(bestarm))){
			//uknit.equip(bestarm);
			this.removeItem(bestarmi);
			if(oldarm!=noarmor) {
				this.addItem(oldarm);
			}
		}	
		if((bestacc!=uknit.equipment[2])&& (uknit.equip(bestacc))){
			
			this.removeItem(bestacci);
			if(oldacc!=noaccessory) {
				this.addItem(oldacc);
			}
		}
	};
	
	this.removeAll=function(uknit){
		if(uknit.equipment[0]!=unarmed)
		{
			this.addItem(uknit.equipment[0]);
			uknit.equipment[0]=unarmed;
		}
		if(uknit.equipment[1]!=noarmor)
		{
			this.addItem(uknit.equipment[1]);
			uknit.equipment[1]=noarmor;
		}
		if(uknit.equipment[2]!=noaccessory)
		{
			this.addItem(unknit.equipment[2]);
			uknit.equipment[2]=noaccessory;
		}
	};
	
	this.buildSquad=function()
	{
		if (this.numLooseUnits<1) return false;
		if (this.numSquads>TEAM_SIZE) return false;
		//this.numSquads++;
		this.addSquad(this.looseUnits[0]);
		this.removeLoose(0);
		var p=1;
		while((this.numLooseUnits>0) && (p<5))
		{
			this.squads[this.numSquads-1].numUnits++;
			this.squads[this.numSquads-1].units[p]=this.looseUnits[0];
			this.removeLoose(0);
			p++;
		}
		this.squads[this.numSquads-1].leader=this.squads[this.numSquads-1].units[0];
		this.squads[this.numSquads-1].team=this.team;
		this.squads[this.numSquads-1].ID=this.numSquads-1;
        this.squads[this.numSquads-1].deployed=false;
		return true;
	};
	
    this.numSquadsAlive=function()
	{
		var count=0;
		for(var i=0;i<this.numSquads;i++)
		{
			if(this.squads[i].alive){
				count++;
			}
		}
		return count;
	};
    this.addLoose=function(uknit)
    {
        if (this.numLooseUnits>99) {return false;}
        this.looseUnits[this.numLooseUnits]=uknit;//new unit();
        this.numLooseUnits++;
		return true;
    };
    
    this.removeLoose=function(id)
    {
        if (this.numLooseUnits<0) {return false;}
        this.looseUnits[id]=null;
		for(var i=id;i<this.numLooseUnits-1;i++)
        {
            this.looseUnits[i]=this.looseUnits[i+1];
            
        }
        this.numLooseUnits--;
    };
	
	this.addSquad=function(uknit){
		    if(this.numSquads>TEAM_SIZE) {console.log("You have too many squads already!");bConsoleStr.push("You have too many squads already!");bConsoleClr.push("red");return false;}
			this.numSquads++;
            this.squads[this.numSquads-1]=new squad();
			this.squads[this.numSquads-1].numUnits=1;
			this.squads[this.numSquads-1].units[0]=uknit;
			this.squads[this.numSquads-1].leader=uknit;
            this.squads[this.numSquads-1].team=this.team;
            this.squads[this.numSquads-1].ID=this.numSquads-1;
            this.squads[this.numSquads-1].deployed=false;
			return true;
	};
	
	this.removeSquad=function(id)
    {
        if (this.numSquads<0) {return false;}
        this.squads[id]=null;
		for(var i=id;i<this.numSquads-1;i++)
        {
            this.squads[i]=this.squads[i+1];
			this.squads[i].ID=i;
            
        }
        this.numSquads--;
    };
	
    this.init=function(side){
        //this.numSquads=8;
        this.team=side;
        this.gold=6000;
        this.name="Fighting Mongooses";
        for(var i=0;i<this.numSquads;i++){
            //if(i=0) { this.squads[i].numUnits=5;}
            this.squads[i]=new squad();
            this.squads[i].ID=i;
        }
        this.leader=this.squads[0].leader;
        if (side==1) {
            this.leader=this.squads[0].leader;
            this.leader.hp+=100;
            this.leader.equipment[1]=breastplate;
        }
        
    };
	this.drawEquipScreen=function()
	{

    //canvas.save();
    canvas.globalAlpha=0.80;
    canvas.fillStyle =  "#DCDCDC";
    canvas.fillRect(25,95,790,500);
    canvas.fillStyle =bColors[5];//Math.floor(Math.random()*5)];// "#483D8B ";
    canvas.fillRect(40,110,760,470);
	canvas.globalAlpha=1;
    //canvas.restore();
    canvas.font = "14pt Calibri";
    canvas.textAlign = "left";
    canvas.textBaseline = "middle";
	canvas.fillStyle =  "white";
		for(var i=0;i<this.numItems;i++)
		{
		
			var g=this.items[i].attack;
			if(this.items[i].slot==1)
			{
				g=this.items[i].def;
			}
			var texticles= this.items[i].name
			var xp=60;
			var yp=130+i*32+32;
			if(i>12){
				xp+=200;
				yp=130+(i-12)*32;
			}
			if(i>24){
				xp+=200;
				yp=130+(i-24)*32;
			}
			
			if(i>32){
				xp+=200;
				yp=130+(i-32)*32;
			}
			canvas.fillText(g, xp+140, yp);
			canvas.fillText(texticles, xp, yp);
			
		}
	};
	this.drawResults=function(){
        
        //canvas.save();
        canvas.globalAlpha=0.60;
        canvas.fillStyle =  "#DCDCDC";
        canvas.fillRect(25,95,820,500);
        canvas.fillStyle =bColors[1];//Math.floor(Math.random()*5)];// "#483D8B ";
        canvas.fillRect(40,110,790,470);
        canvas.globalAlpha=1;
		//canvas.restore();
        canvas.font = "14pt Calibri";
        canvas.textAlign = "left";
        canvas.textBaseline = "middle";

        canvas.fillStyle = "white";
        var texticles= "Name: " + this.name;
        canvas.fillText(texticles, 360, 122);
        
        texticles= "Unit's Lost: who knows" ;
        canvas.fillText(texticles, 360, 137);
        
        texticles= "Unit's Killed: who knows";
        canvas.fillText(texticles, 60, 152);
		
		canvas.fillText("Squads surviving: "+armies[0].numSquadsAlive(), 360, 152);
        
        texticles= "Day's Past:" + theTime.days;
        canvas.fillText(texticles, 60, 172);
        
        texticles= "Wins/losses: " +armies[0].wins+ " / " + armies[0].losses;
        canvas.fillText(texticles, 60, 192);
       
        var texticles= "You have defeated "+ towns[1].speaker;
		canvas.fillText(texticles, 60, 122);
		//gold earned/lost?
		canvas.fillText("Squads: "+armies[0].numSquadsAlive(), 680, 24);
		canvas.fillText("Units: " + numArmyUnits(0), 680, 38);
    };
	
	this.drawProjections=function(){
        
        //canvas.save();
        canvas.globalAlpha=0.60;
        canvas.fillStyle =  "#DCDCDC";
        canvas.fillRect(250,195,420,400);
        canvas.fillStyle =bColors[4];//Math.floor(Math.random()*5)];// "#483D8B ";
        canvas.fillRect(265,210,390,370);
        //canvas.restore();
		canvas.globalAlpha=1;
        canvas.font = "14pt Calibri";
        canvas.textAlign = "left";
        canvas.textBaseline = "middle";

        canvas.fillStyle = "white";
        var texticles= "Gold: " + this.gold;
        canvas.fillText(texticles, 310, 242);
		
		var texticles= "Daily Expenses: " + this.getCost();
        canvas.fillText(texticles, 310, 282);
		
		var texticles= "Daily Income: "+this.dailyIncome;
        canvas.fillText(texticles, 310, 322);
        

    };
}


var armies=new Array (2);
armies[0]=new army();
armies[1]=new army();
function squad() {
    //list of units
    //list of items
    //list of blokemon
    //leader
    //AI 
    //target
    //waypoints?
	this.selected=false;
    this.flightHeight=0;
    this.swimCarry=0;
    this.x = 12;
    this.y = 12;
    this.army=0;
    this.lastmove=0;
    this.basex=12;
    this.basey=12;
    this.battleAI=0;
    this.alive=true;
    this.numUnits=Math.floor(Math.random()*3)+3;//3;
    this.battling=false;
    this.units = new Array (5);
    this.units[0]= new unit();
    this.units[1]= new unit();
    this.units[2]= new unit();
    this.units[3]= new unit();
    this.units[4]= new unit();
    //for(var i=0;i<this.numUnits;i++) { this.units[i].alive=true;}
    this.leader = this.units[0];
    this.knockback=7;
    this.deployed=false;
    this.width=32;
    this.height=32;
    this.bx = 8;
    this.by = 8;
    this.dx = 0;
    this.dy = 0;
    this.team=0;
    this.cohesion=50;
    this.damaged=0;
    this.leaderless=false;
    this.ID=89;
    this.turns=0;
    this.sprite = this.leader.sprite;
    this.path = null;
    this.nextMove = null;
    this.nextTile = {x: this.x, y: this.y};
    this.inNextTile = false;
    this.viewRange=50;
    this.encounterCounter=0;
    this.encounterPoint=Math.floor(Math.random()*400)+200;
}

squad.prototype.stringifySquad=function(){
   var tempunits=new Array();
    for (i=0;i<this.numUnits; i++){
		tempunits.push(this.units[i].stringifyUnit());
    }
	var tempobj = {'numUnits': this.numUnits, 'units':tempunits};
    var tempstring = JSON.stringify(tempobj);
    return tempstring;
};

squad.prototype.isInTown=function(twns){
	for(var i=0;i<maps[mapSelected].numTowns;i++)
	{
		if(twns[i].checkCollision(this)){
			return i;
		}
	}	
	return false;
};
squad.prototype.classFromTerrain=function(map){
		if(map.tiles[this.x][this.y].data==TileType.Swamp) {return SEEAss.Frog;}
		if(map.tiles[this.x][this.y].data==TileType.Water) {return SEEAss.Octopus;}
		if(map.tiles[this.x][this.y].data==TileType.Forest) {return SEEAss.Tiger;}
		if(map.tiles[this.x][this.y].data==TileType.Plains) {return SEEAss.EarthBound;}
		if(map.tiles[this.x][this.y].data==TileType.Sand) {return SEEAss.Creeper;}
		if(map.tiles[this.x][this.y].data==TileType.Road) {return SEEAss.Creeper;}
		if(theTime.hours>16) {return SEEAss.Pumpkinhead;}
		if(theTime.hours>12) {return SEEAss.Skeleton;}
		return SEEAss.Shoe;
	};
	
squad.prototype.getViewRange=function() {
		var feight=0;
		for(var i=0;i<this.numUnits;i++)
		{
			feight+=this.units[i].viewRange;
		}
		return Math.floor(feight/this.numUnits);
	};	
    
squad.prototype.getFlightHeight=function()
	{
		var feight=0;
		for(var i=0;i<this.numUnits;i++)
		{
			if(this.units[i].alive){
				feight+=this.units[i].flightHeight;
			}
		}
		return feight;
	};	
	
	
	squad.prototype.canSwim=function()
	{
		var feight=0;
		for(var i=0;i<this.numUnits;i++)
		{
			if(this.units[i].alive){
				feight+=this.units[i].swimCarry;
			}
		}
		if ( feight>0) {return true;}
		return false;
	};	
    
squad.prototype.addUnit=function(uknit)
    {
        if (this.numUnits>4) {return false;}
        this.units[this.numUnits]=uknit;//new unit();
        this.numUnits++;
		return true;
    };
    
squad.prototype.removeUnit=function(id)
    {
        if (this.numUnits<1) {return false;}
        this.units[id].exists=false;
        //this.units[id].alive=false;
        
        for(var i=id;i<this.numUnits-1;i++)
        {
            this.units[i]=this.units[i+1];
            
        }
        /*this.units[this.numUnits].alive=false;
          this.units[this.numUnits].exists=false;
          this.units[this.numUnits].alive=null;*/
        this.numUnits--;
		return true;
    };
    
    squad.prototype.deploy=function()
    {
        var cst = this.getCost();
        if ((this.team==0) &&(armies[this.team].gold<cst)) {  var tmpstr="Not enough gold to deploy "+ this.leader.name+ "'s unit."; console.log(tmpstr);bConsoleStr.push(tmpstr);bConsoleClr.push("red"); return;}
        armies[this.team].gold-=cst;
        //revive and heal all just in case.
        this.deployed=true;
    }
    
    squad.prototype.healStatus=function(){
        for(var i=0;i<this.numUnits;i++){
            this.units[i].esuna();
        }
    };
    
    squad.prototype.refresh=function(){
        for(var i=0;i<this.numUnits;i++){
            this.units[i].alive=true;
            this.units[i].hp=this.units[i].maxhp;
            this.units[i].mp=this.units[i].maxmp;
            this.units[i].atb=0;
            //reset stats?
        }
        this.healStatus();
    };
    
    squad.prototype.row=function(){
        for (var i=0;i<this.numUnits;i++)
        {
            if (this.units[i].row===0) { this.units[i].row=1;}
            else if (this.units[i].row===1) { this.units[i].row=0;}
        }
    };
    squad.prototype.heal=function(){
        if (healcount<healrate) {healcount++; return;}
        healcount=0;
        for(var i=0;i<this.numUnits;i++){
            if (this.units[i].alive) {
                this.units[i].hp++;
                if (this.units[i].hp>this.units[i].maxhp) {this.units[i].hp=this.units[i].maxhp;}
            }
        }
    };
    
    squad.prototype.getCost=function(){
        var cst=0;
		for(var i=0;i<this.numUnits;i++)
		{
			cst+=this.units[i].cost;
		}
		return cst;
    };
	squad.prototype.getAli=function(){
        var cst=0;
		for(var i=0;i<this.numUnits;i++)
		{
			cst+=this.units[i].ali;
		}
		return Math.floor(cst/this.numUnits);
    };
	
	squad.prototype.getLuck=function(){
        var cst=0;
		for(var i=0;i<this.numUnits;i++)
		{
			cst+=this.units[i].luck;
		}
		return Math.floor(cst);
    };
squad.prototype.flee= function(c)
    {
		if(!isBattle) {return;}
        if(Math.floor(Math.random()*30) > (15)) {
            this.turns=20;
            this.damaged=-1;
			this.cohesion-=2;
        }else
        {
            console.log("Couldn't escape!");
			bConsoleStr.push("Couldn't escape!");
			bConsoleClr.push("red");
        }
    };
    squad.prototype.getHP=function(){
        var herbert=0;
        for (var i=0;i<this.numUnits;i++) {
            if(this.units[i].alive) {
                herbert=herbert+this.units[i].hp;
            }
        }
        return herbert;
    };
    squad.prototype.getMaxHP=function(){
        var herbert=0;
        for (var i=0;i<this.numUnits;i++) {
            if(this.units[i].alive) {
                herbert=herbert+this.units[i].maxhp;
            }
        }
        return herbert;
    };
    squad.prototype.getMP=function(){
        var herbert=0;
        for (var i=0;i<this.numUnits;i++) {
            if(this.units[i].alive) {
                herbert=herbert+this.units[i].mp;
            }
        }
        return herbert;
    };
    
    squad.prototype.pickNewLeader=function() { 
        var oldlead=this.leader;
        for(var i=0;i<this.numUnits;i++)
        {       
            if((this.units[i].alive) && (this.units[i].canlead)) {
                this.leader=this.units[i];
				var tmpstr=this.leader.name + " took over " + oldlead.name+"'s squad";
                console.log(tmpstr);
				bConsoleStr.push(tmpstr);
				bConsoleClr.push("white");
                return;
            }
        }
        if(this.alive===true){
			var tmpstr=this.leader.name + "'s squad has no qualified leader! returning to base!" 
            console.log(tmpstr);
			bConsoleStr.push(tmpstr);
			bConsoleClr.push("red");
            this.leaderless=true;
			if(this.path){
				this.clearDestination();
			}
            //this.setDestination(this.basex,this.basey,curMap);
        }
        return ;
    };
    
    squad.prototype.smartRow=function()
    {
        for(var j=0;j<this.numUnits;j++)
        {
            if(this.units[j].alive) {
                this.units[j].row=0;
                if ((this.units[j].class==SEEAss.Healer) || (this.units[j].class==SEEAss.Cleric)||(this.units[j].class==SEEAss.Archer)||(this.units[j].class==SEEAss.Wizard))
                {
                    this.units[j].row=1;
                }
            }
        }
    };
    
    squad.prototype.numSquadUnits=function() {
        var count=0;
        if(this.alive) 
        {
            for(var j=0;j<this.numUnits;j++)
            {
                if(this.units[j].alive) {count++;} //PROBLEM
            }
        }
        return count;
    };

    squad.prototype.getStrongest=function(){
        var strongest=null;
        var h=0;
        for(var i=0;i<this.numUnits;i++){
            if(this.units[i].hp>h) {
                h=this.units[i].hp;
                strongest=this.units[i];
            }
        }
        return strongest;
    };
    
    squad.prototype.checkSurvivors=function() {    //check for any living units if not kill squad.
        var anylife=false;
        for(var j=0;j<this.numUnits;j++)
        {
            if(this.units[j].alive) {anylife=true;}
        }
        if (anylife===false) { 
            this.alive=false;
			this.deployed=false;
            return false;
        }
        return true;
    };

    squad.prototype.getWeakest=function() {
        var weakest=null;
        var h=999;
        for(var i=0;i<this.numUnits;i++){
            if((this.units[i].hp<h) && (this.units[i].hp>0)) {
                h=this.units[1].hp;
                weakest=this.units[i];
            }
        }
        return weakest;
    };
    
    
    squad.prototype.getWeakestHeal=function() {
        var weakest=this.leader;
        var h=999;
        for(var i=0;i<this.numUnits;i++){
            if((this.units[i].hp<h) && (this.units[i].hp>0) && (this.units[i].hp<this.units[i].maxhp)) {
                h=this.units[i].hp;
                weakest=this.units[i];
            }
        }
        return weakest;
    };
	
	squad.prototype.isViable=function()
	{
		if((this.alive) && (this.deployed)) {return true;}
		return false;
	}

    squad.prototype.draw = function(cam) {
        if ((!this.alive) ||(!this.deployed)){return;} //TODO: also check visual range for enemies
        var press=this.leader.sprite;
		var xm=0;
		var ym=0;
		if(cam.zoom==2){
			//xm=8;
			//ym=8;
		}else if(cam.zoom==3){
			//xm=16;
			//ym=16;
		}
		if((this.leader.class==SEEAss.Werewolf) && (theTime.hours>12)) {
			press=this.leader.nightSprite;
		}
		press.draw(canvas,
                         (this.x * 16 + (Math.round(this.bx) - 8) - cam.x * 16) / Math.pow(2, curMap.zoom-1)-xm, 
                         (this.y * 16 + (Math.round(this.by) - 8) - cam.y * 16) / Math.pow(2, curMap.zoom-1)-ym);
        if (this.leaderless){
            noleader.draw(canvas,
                          (this.x * 16 + (Math.round(this.bx) - 8) - cam.x * 16) / Math.pow(2, curMap.zoom-1)-xm, 
                          (this.y * 16 + (Math.round(this.by) - 8) - cam.y * 16) / Math.pow(2, curMap.zoom-1)-ym);
        }
		if(this.isInTown(towns)==false)
		{
			if(curMap.tiles[this.x][this.y+2].data==TileType.Forest) {
				var gx=(this.x-cam.x)*16/Math.pow(2, curMap.zoom-1);
				var gy=(this.y-cam.y+1)*16/Math.pow(2, curMap.zoom-1);
				var plop=this.by;
				if(curMap.zoom>2) { 
					gy-=8;
					plop=0;
				}//todo
				tileSprite[TileType.Forest].draw(canvas, gx, gy+8*(Math.pow(2, curMap.zoom-1)-1)+plop);
				tileSprite[TileType.Forest].draw(canvas, gx+16, gy+8*(Math.pow(2, curMap.zoom-1)-1)+plop);//todo
		
			}else if((curMap.tiles[this.x][this.y+2].data==TileType.Water) &&(this.getFlightHeight()<1)) {
				var gx=(this.x-cam.x)*16/Math.pow(2, curMap.zoom-1);
				var gy=(this.y-cam.y+1)*16/Math.pow(2, curMap.zoom-1);
				//canvas.save();
				/*plop=this.by;
				if(curMap.zoom>2) { 
					gy-=8;
					plop=0;
				}//todo*/
				canvas.globalAlpha=0.80;
				tileSprite[TileType.Water+tileani].draw(canvas, gx, gy+8*(curMap.zoom-1)+plop);
				tileSprite[TileType.Water+tileani].draw(canvas, gx+16, gy+8*(curMap.zoom-1)+plop);//todo
				tileSprite[TileType.Water+tileani].draw(canvas, gx, gy+16+8*(curMap.zoom-1)+plop);
				tileSprite[TileType.Water+tileani].draw(canvas, gx+16, gy+16+8*(curMap.zoom-1)+plop);//todo
				//canvas.restore();
				canvas.globalAlpha=1;
			}
		}
    };

    squad.prototype.drawdest = function(cam) {
        if (!this.isViable()){return;} 
        flagsprite.draw(canvas, ((this.dx * 16 - cam.x * 16)+8) / Math.pow(2, curMap.zoom-1), ((this.dy * 16 - cam.y * 16)+8) / Math.pow(2, curMap.zoom-1));
    };
    
    squad.prototype.checkCollision= function() {

        if (this.team==0) {
            for(var i=0;i<armies[1].numSquads;i++){
                if ((this.isViable()) &&(armies[1].squads[i].isViable())&& (armies[1].squads[i].x-2<this.x) &&(armies[1].squads[i].x+2>this.x)&& (armies[1].squads[i].y+2>this.y) && (armies[1].squads[i].y-2<this.y)) {return armies[1].squads[i];} //TODO:START BATTLE
            }
        }

        return null;
    };

    squad.prototype.update = function(map) {
		//if(milliseconds-this.timelastmoved<this.speed){ return; }//todo
		if(!gamestart) {return;}
        if ((paused) || (!this.alive) ||(!this.deployed)|| (battleReport) || (isBattle) ||(preBattle)) {return;}
		var targ=null;
        if(this.team==0){
			targ=this.checkCollision();
		}else if(this.team==1) {targ=null;} 
        if ((targ!=null) && (targ.alive)) {
			if(targ.leader==armies[1].leader)
			 {
				if(!bossSpouted){
					bossSpouted=true;
					//alert("poopy");
					townbox.lines=4;
					var i=1;
					townbox.msg[0]=towns[i].speaker;
					townbox.msg[1]=towns[i].plotText[0];
					townbox.msg[2]=towns[i].plotText[1];
					townbox.msg[3]=towns[i].plotText[2];
					townbox.exists=true;
					paused=true;
				}
			 }
             preBattle=preBattleLength; /*isBattle=true;*/ /*battleCanvas.show();*/ 
			 if(MUSIC_ON){
				 document.getElementById("mapAudio").pause();
				 document.getElementById("battleAudio").volume=MUSIC_VOL;
				 document.getElementById("battleAudio").currentTime = 4;
				 document.getElementById("battleAudio").play();
			 }

			 combatants[0]=this;
			 combatants[1]=targ;
			 //camera.center(this);
			 camera.pan(this.x,this.y);
			 mapDirty=true; 
			 SELECTED=this.ID;
            var tmpstr=this.leader.name + "'s squad encountered an enemy!";

			battleBox.msg[0]=tmpstr;
			battleBox.exists=true;
            console.log(tmpstr);//todo MONSOLEreturn;
			bConsoleStr.push(tmpstr);
			bConsoleClr.push("white");
        };
        if((this.leaderless===true) && (this.path==null)){
            this.setDestination(this.basex,this.basey,curMap)}
        for(var i=0;i<maps[mapSelected].numTowns;i++) 
        {
			if(towns[i].checkCollision(this)) 
            {
                if(towns[i].team!=this.team)
				{
                    towns[i].team=this.team;
					if(towns[i].team==0) 
					{
						armies[0].opinion+=5;
						var tmpstr=this.leader.name+"'s unit liberated " + towns[i].name;
						lastEventX=towns[i].x;
						lastEventY=towns[i].y;
						console.log(tmpstr); 
						bConsoleStr.push(tmpstr);
						bConsoleClr.push("white");
						if(towns[i].itemChance>(Math.random()*99))
						{
							var lenny=towns[i].getItem();
							armies[0].addItem(lenny);
							bConsoleStr.push("The townsfolk give you a "+lenny.name);
							bConsoleClr.push("white");
						}
						
						if((this.team==0)&& (!towns[i].spouted) && (i!=maps[mapSelected].numTowns-1)){
							towns[i].spouted=true;
							townbox.lines=4;
							townbox.msg[0]=towns[i].speaker;
							townbox.msg[1]=towns[i].plotText[0];
							townbox.msg[2]=towns[i].plotText[1];
							townbox.msg[3]=towns[i].plotText[2];
							townbox.exists=true;
							paused=true;
						}
					}
                    if(towns[i].team==1)
					{
						armies[0].opinion-=10; 
						var tmpstr=this.leader.name+"'s unit captured " + towns[i].name; console.warn(tmpstr); 
						lastEventX=towns[i].x;
						lastEventY=towns[i].y;
						bConsoleStr.push(tmpstr);
						bConsoleClr.push("white");
					

					}
                }
                this.heal();
            }
		
        }
		
		if(armies[0].opinion<0) {armies[0].opinion=0;}
		
        if( !this.nextMove ) {
            this.updateNextMove();
        }
        if( !this.nextMove ) {
            return;
        }
        var terrain = map.tiles[this.nextTile.x][this.nextTile.y].data;
        var speed = (terrain == 4 ? 2 : 4);
        if (this.leaderless) {speed=3;} //PROBLEM?
        if((terrain==4) &&(this.units[0].class==SEEAss.Frog)) {speed=4};

        //speed = speed / Math.pow(2, curMap.zoom-1);
		var stamp = new Date();
		var milli=stamp.getTime();
		//speed=(speed * delta) * (60 / 1000);

		if(milli-this.lastmove>30){
			if( this.nextMove.x > this.x ) {
				this.bx += speed;
				this.encounterCounter++;
			} else if( this.nextMove.x < this.x ) {
				this.bx -= speed;
				this.encounterCounter++;
			}
			if( this.nextMove.y > this.y ) {
				this.by += speed;
				this.encounterCounter++;
			} else if( this.nextMove.y < this.y ) {
				this.by -= speed;
				this.encounterCounter++;
			}
			this.lastmove=stamp.getTime();
		}

        if( !this.inNextTile && ( this.bx <= 0 || this.bx >= 16 || this.by <= 0 || this.by >= 16 )) {
            this.nextTile = {};
            this.nextTile.x = this.nextMove.x;
            this.nextTile.y = this.nextMove.y;
            //           if( this.bx == 0 ) { this.bx = 16 } else if( this.bx == 16 ) { this.bx = 0; } 
            //           if( this.by == 0 ) { this.by = 16 } else if( this.by == 16 ) { this.by = 0; }          
            this.inNextTile = true;

        }
        if(( this.bx >= 24 || this.bx <= -8 ) || ( this.by <= -8 || this.by >= 24 )) {
            this.bx = this.by = 8;
            this.inNextTile = false;
            this.x = this.nextMove.x;
            this.y = this.nextMove.y;
            this.nextTile = {x: this.x, y: this.y};
            this.nextMove = null;

        }
		if(this.randomEncounter()){
			var bloke=new unit();
			bloke.class=this.classFromTerrain(map);
			bloke.setClass();
			var tmpstr=this.leader.name + "'s squad encountered a wild "+bloke.getClassName();
			console.log(tmpstr);
			bConsoleStr.push(tmpstr);
			bConsoleClr.push("white");
			var blokeSquad=new squad();
			blokeSquad.numUnits=1;
			blokeSquad.units[0]=bloke;
			combatants[0]=this;
			combatants[1]=blokeSquad;
			preBattle=preBattleLength;
			//todo different song
			if(MUSIC_ON){
				document.getElementById("mapAudio").pause();
				document.getElementById("battleAudio").volume=MUSIC_VOL;
				document.getElementById("battleAudio").currentTime = 4;
				document.getElementById("battleAudio").play();
			}//camera.center(this);
			camera.pan(this.x,this.y);
			battleBox.msg[0]=tmpstr;
			battleBox.exists=true;
            console.log(tmpstr);//todo MONSOLEreturn;
		}
    };
	squad.prototype.hasTamer=function(){
		for(var i=0;i<this.numUnits;i++){
			if (this.units[i].class==SEEAss.BeastTamer) {return true;}
		}
		return false;
	};
	squad.prototype.randomEncounter=function(){
		if(this.team==1) {return false;}
		if(!this.hasTamer()) {return false;}
		if(this.encounterCounter>this.encounterPoint){
			this.encounterCounter=0;
			this.encounterPoint=Math.floor(Math.random()*400)+ENCOUNTER_RATE;
			return true;
		}
		return false;
	};
    squad.prototype.updateNextMove = function() {
        if( !this.path ) {
            return;
        }
        this.nextMove = this.path.shift();
        if( !this.nextMove ) {
			if(this.team==0){
				var tmpstr=this.leader.name + "'s squad reached their destination.";
				bConsoleStr.push(tmpstr);
				bConsoleClr.push("white");
			}else
			{
				//todo give enemy squads new destination now.
			}
            this.path = null; return;
        }
    };
    squad.prototype.isWalking = function() {
        return this.path != null;
    };
    squad.prototype.clearDestination=function(){
        this.path=null; this.dx = this.x; this.dy = this.y; this.nextMove = null;
    };
    squad.prototype.setDestination = function(x, y, map) {
		if(!map.walkable(x,y,this)) {return;}
        this.clearDestination();
        this.path = map.getPath(this.x, this.y, x, y,this);
        this.dx=x;
        this.dy=y;
    };
	
    squad.prototype.kickBack=function(esqd){

	function booTile(x, y,sqd) {
		if(sqd.getFlightHeight()>1) {return false;}
		if((sqd.getFlightHeight()>0) && (curMap.tiles[x][y].data!=TileType.Mountains)){return false;}
		if((sqd.canSwim()) && (curMap.tiles[x][y].data==TileType.Water)) {return false;}
	    return ((curMap.tiles[x][y].data==TileType.Mountains) || (curMap.tiles[x][y].data==TileType.Ocean)||(curMap.tiles[x][y].data==TileType.Lava));
	};

	var newX, newY;
	if( this.x > esqd.x ) {
	    newX = function(x, y, i) { return x+i; };
	    newY = function(x, y, i) { return y; };
	    adjust = function(that, theKnock) { that.x+=theKnock; if( that.x > MAP_WIDTH ) { that.x=MAP_WIDTH-1; } };
	} else if( this.x < esqd.x) {
	    newX = function(x, y, i) { return x-i; };
	    newY = function(x, y, i) { return y; };
	    adjust = function(that, theKnock) { that.x-=theKnock; if( that.x < 1 ) { that.x = 0; } };
    }else if( this.y > esqd.y ) {
	    newX = function(x, y, i) { return x; };
	    newY = function(x, y, i) { return y+i; };
	    adjust = function(that, theKnock) { that.y+=theKnock; if(that.y>MAP_HEIGHT) { that.y=MAP_HEIGHT-1; } };
	} else {
	    newX = function(x, y, i) { return x; };
	    newY = function(x, y, i) { return y-i; };
	    adjust = function(that, theKnock) { that.y-=theKnock; if( that.y < 1 ) { that.y = 0; } };
	}

	var theKnock = this.knockback;
	for( var i = 1; i < this.knockback + 1; i++ ) {
	    if( booTile(newX(this.x, this.y, i), newY(this.x, this.y, i),this) ) {
		theKnock=i-1;
		break;
	    }
	}
	adjust(this, theKnock);
    }

function time(){
    this.hours=0; 
    this.minutes=0;
    this.seconds=0;
    this.days=0;
}
time.prototype.update=function(twns,arm){
    this.seconds++;
    if(this.seconds>60){
        this.seconds=0;
        this.minutes++;
        if (this.minutes>60){
            this.hours++;
            if(this.hours>24) {
				this.hours=0; 
				this.days++;
				projectionCount=projectionLength;//todo
				arm.dailyIncome=0;
				for(var i=0;i<maps[mapSelected].numTowns;i++)
				{
					if(twns[i].team==0){
						arm.dailyIncome+=twns[i].getIncome();
					}
				}
				arm.gold+=arm.dailyIncome;
			} 
            this.minutes=0;
            this.seconds=0;
        }
    }
};

var theTime=new time();

function endBattle(usqd,esqd){
    isBattle=false;
    battleReport=true;
    battleendtick=100;
	cardUsed=false;
	
	
    if(usqd.damaged>=esqd.damaged) //win
    {
       
		esqd.kickBack(usqd);
        //esqd.path=null;
        esqd.clearDestination();
        console.log("win @", usqd.x,usqd.y);
		bConsoleStr.push("Victory!");
		bConsoleClr.push("green");
        won="Victory!";
        armies[1].losses++;
        armies[0].wins++;
        usqd.cohesion++;
        for(var i=0;i<esqd.numUnits;i++)
        {
            esqd.units[i].battleslost++;
			
        }
        for(var i=0;i<usqd.numUnits;i++)
        {
            usqd.units[i].battleswon++;
        }

    }else if(usqd.damaged<esqd.damaged) {//lose
        usqd.kickBack(esqd);
        usqd.clearDestination();
        console.log("loss");
		bConsoleStr.push("Defeat");
		bConsoleClr.push("red");
        usqd.cohesion--;
        won="Defeat!";
		if(MUSIC_ON){
			document.getElementById("defeatAudio").volume=MUSIC_VOL;
			document.getElementById("battleAudio").pause();
			document.getElementById("battleAudio").currentTime = 4;
			document.getElementById("defeatAudio").currentTime = 110;
			document.getElementById("defeatAudio").play();
		}
        armies[0].losses++;
        armies[1].wins++;
        for(var i=0;i<esqd.numUnits;i++)
        {
            esqd.units[i].battleswon++;
        }
        for(var i=0;i<usqd.numUnits;i++)
        {
            usqd.units[i].battleslost++;
        }
        if(usqd.turns==20) {won = "Ran away";}
        //paused=true; //TODO
    }

    usqd.turns=0;
    usqd.damaged=0;
    esqd.turns=0;
    esqd.damaged=0;
    for(var i=0;i<usqd.numUnits;i++)
    {
        usqd.units[i].atb=0;
        usqd.units[i].attacking=0;
		usqd.units[i].attackStage=0;
		usqd.units[i].attackAni=0;
		usqd.units[i].attackAniStage=0;
        usqd.units[i].hurting=0;
    }
    for(var i=0;i<esqd.numUnits;i++)
    {
        esqd.units[i].atb=0;
        esqd.units[i].attacking=0;
		esqd.units[i].attackStage=0;
		esqd.units[i].attackAni=0;
		esqd.units[i].attackAniStage=0;
        esqd.units[i].hurting=0;
    }
    paused=battlePause;
    battleCanvas.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
	//battleCanvas.hide();
};


function armyInfo(sq){
    canvas.font = "14pt Calibri";
    canvas.textAlign = "left";
    canvas.textBaseline = "middle";
    canvas.fillStyle = "white";
    canvas.fillText(armies[0].name, 515, 70);
    canvas.fillText("Gold: "+armies[0].gold, 515, 8);

    canvas.fillText("Wins/losses: " +armies[0].wins+ " / " + armies[0].losses, 515, 24);
    canvas.fillText("Deployed: "+armies[0].lastDeployed, 515, 36);
    canvas.fillText("Days: "+theTime.days, 515, 56);
    canvas.fillText("Selected: " + SELECTED, 680, 8);
    canvas.fillText("Squads: "+armies[0].numSquadsAlive(), 680, 24);
    canvas.fillText("Units: " + numArmyUnits(0), 680, 38);
    canvas.fillText(armies[0].squads[SELECTED].leader.name + "'s unit", 680, 56);
    
    canvas.fillStyle = "white";
    canvas.fillRect(810+37,114,8,-(armies[0].opinion/2));//getAli());
    thingysprite.draw(canvas,810,8);
    var timeRound =1;
    //if(theTime.hours>4) {timeRound=1;}
    if(theTime.hours>8) {timeRound=2;}
    if(theTime.hours>12) {timeRound=3;}
    if(theTime.hours>16) {timeRound=4;}
    if(theTime.hours>20) {timeRound=0;}
    clocksprite[timeRound].draw(canvas,822,8);

    

};


function drawmousetext(targ,cam) { //draws unit status info
	if((!targ.alive) || (!targ.deployed)) {return;}
    canvas.font = "14pt Calibri";
    canvas.textAlign = "center";
    canvas.textBaseline = "middle";
    canvas.fillStyle = "blue";
    if(targ.team==1) {  canvas.fillStyle = "red";}

    tempstr = targ.leader.name+": "+targ.getHP()+ " / " +targ.getMaxHP();
    canvas.fillText(tempstr, (targ.x-cam.x)*16/curMap.zoom+(targ.width/2), (targ.y-cam.y)*16/curMap.zoom+targ.height+8);
    
    canvas.fillStyle = "#5F9EA0";
};

function drawtowntext(targ,cam) { //draws town name
    canvas.font = "14pt Calibri";
    canvas.textAlign = "center";
    canvas.textBaseline = "middle";
    canvas.fillStyle = "white";
    //if(targ.team==1) {        canvas.fillStyle = "red";}

    tempstr = targ.name;
    canvas.fillText(tempstr, (targ.x-cam.x)*16/curMap.zoom+(targ.width/2)-5, (targ.y-cam.y)*16/curMap.zoom+targ.height+12);
    
    canvas.fillStyle = "#5F9EA0";
};

isOver= function(targ,cam){ //is the mouse over the player/object 
    if((mX>(targ.x-cam.x)*16/curMap.zoom) && (mX<((targ.x-cam.x)*16+targ.width*curMap.zoom)/curMap.zoom) &&(mY>((targ.y-cam.y)*16)/curMap.zoom) &&(mY<((targ.y-cam.y)*16+targ.height)/curMap.zoom)) {return true;}
    return false;
};

function mouseWheel(e){
	var delta = 0;
	if (e.wheelDelta)
	{
			delta = e.wheelDelta/120;
	} else if (event.detail) 
	{ /** Mozilla case. */
			delta = -e.detail/3;
	}
	mX = e.pageX - canvasElement.get(0).offsetLeft;
	mY = e.pageY - canvasElement.get(0).offsetTop;
	//if (delta)
	if((mode==2))
	{ //&& (!isMenu)){
	
		if(isMenu==1)
		{
			if((mX>300) && (mX<850) &&(mY>175) &&(mY<645)) 
			{

				if(delta>0){
					if (pageCount>0){ pageCount--;}
				}
				if(delta<0){
					if (pageCount<3){ pageCount++;}
				}
			}
		}else
		{
			var targ=bConsoleBox;
			if((mX>targ.x) && (mX<(targ.x+targ.width)) &&(mY>targ.y) &&(mY<(targ.y+targ.height))) 
			{

				if(delta>0)
					bConsoleBox.scroll++;
				if(delta<0)
					bConsoleBox.scroll--;

					if(bConsoleBox.scroll<0) {bConsoleBox.scroll=0;}
					if(bConsoleBox.scroll>bConsoleStr.length-4) {bConsoleBox.scroll=bConsoleStr.length-5;}
			}else
			{
				if(delta<0)
				{
					
					curMap.setZoom(camera);
					camera.check();
				}else if(delta>0){

					curMap.minusZoom(camera);
					var blob=[];
					blob.x=Math.floor(mX/16) * Math.pow(2, curMap.zoom-1)+camera.x;
					blob.y=Math.floor(mY/16) * Math.pow(2, curMap.zoom-1)+camera.y;
					camera.center(blob);
					camera.check();
				}
				if(curMap.zoom>3) {curMap.zoom=3;}
				if(curMap.zoom<1) {curMap.zoom=1;}
			}
		}
	}

	if (e.preventDefault)
			e.preventDefault();
	e.returnValue = false;
};

function mouseClick(e) {  //represents the mouse
	e.preventDefault();    
	mX = e.pageX - canvasElement.get(0).offsetLeft;
	mY = e.pageY - canvasElement.get(0).offsetTop;
	var tm=new Date();
	var mili=tm.getTime();
	tx=Math.floor(mX/16) * Math.pow(2, curMap.zoom-1);
	ty=Math.floor(mY/16) * Math.pow(2, curMap.zoom-1);
	if (mode==0)
	{
		switch (e.which)
		{
			case 1:
				tx=Math.floor(mX/16) * Math.pow(2, curMap.zoom-1);
				ty=Math.floor(mY/16) * Math.pow(2, curMap.zoom-1);

				if((mX>174) && (mX<275) &&(mY>440) &&(mY<452)) 
				{
					mmcur=true;175,475175,450
					mode=1;
					
				}
				if((mX>174) && (mX<275) &&(mY>464) &&(mY<576)) 
				{
					mmcur=false;
				}
				monsta.swarm(mX,mY);
			break;
			case 2:

				for (var p=0;p<400;p++)
				{
					monsta.startOrbit(40000,Math.floor(Math.random()*CANVAS_WIDTH),Math.floor(Math.random()*CANVAS_HEIGHT),60);
				}
				break;

		}
	}else if (mode==1)
	{
		switch (e.which)
		{
			case 1:
				
				if(mili-lastClick>dblClickRate){
					for(var i=0;i<numMapPoints;i++)
					{	
						if((mX>maps[i].x) && (mX<maps[i].x+mapIconWidth) &&(mY>maps[i].y) && (mY<maps[i].y+mapIconHeight)) {
							mapSelected=i;
						}
					}
				}else{
					for(var i=0;i<numMapPoints;i++)
					{	
						if((mX>maps[i].x) && (mX<maps[i].x+mapIconWidth) &&(mY>maps[i].y) && (mY<maps[i].y+mapIconHeight)) {
							if(reqsMet(mapSelected)){
								mapSelected=i;
								canvas.font = "16pt Calibri";
								canvas.fillStyle = "white";
								canvas.fillText("LOADING....", 740, 627);
								starting=true;
							}
						}
					}
				
				}

			lastClick=mili;
			break;
			case 2:
				mode=0;
			break;
			
		}
	}else if(mode==2){
		switch (e.which)
		{
			case 1:
					if(selBox.exists)
					{
						selBox.exists=false;
						selBox.p1=false;
						selBox.p2=false;
						break;
					}
					if(isBattle)
					{ break;
					
					}else{
						tx=Math.floor(mX/16) * Math.pow(2, curMap.zoom-1);
						ty=Math.floor(mY/16) * Math.pow(2, curMap.zoom-1);

						onSomething=null;
						for(var i=0;i<armies[0].numSquads;i++)
						{
							if ((armies[0].squads[i].isViable())&&(isOver(armies[0].squads[i],camera))) {
								onSomething=armies[0].squads[i];
								armies[0].squads[i].selected=true;
								SELECTED=i;
								
							}else
							{
								if(!keydown["shift"])
								{
									armies[0].squads[i].selected=false;
								}
							}
						}
						if (onSomething==null){
							if( armies[0].squads[SELECTED].path ) { armies[0].squads[SELECTED].clearDestination(); return; }
							var onTown=null;
							for(var j=0;j<maps[mapSelected].numTowns;j++)
							{
								if (isOver(towns[j],camera)) {onTown=towns[j];}
							}
							if(onTown==null)
							{
								for(var i=0;i<armies[0].numSquads;i++) //todo numSelected
								{
									if(armies[0].squads[i].selected)
									{
										armies[0].squads[i].setDestination(tx + camera.x, ty + camera.y,curMap); 
									}
								}
								armies[0].squads[SELECTED].setDestination(tx + camera.x, ty + camera.y,curMap); 
							}else{
								//armies[0].squads[SELECTED].setDestination(onTown.getTileX(camera), onTown.getTileY(camera),curMap); 
								for(var i=0;i<armies[0].numSquads;i++) //todo numSelected
								{
									if(armies[0].squads[i].selected)
									{
										armies[0].squads[i].setDestination(onTown.x, onTown.y,curMap); 
									}
								}
								armies[0].squads[SELECTED].setDestination(onTown.x, onTown.y,curMap); 
							}
						}
					break;
					}
			case 2:
				if(mode==2)
				{
					mX = e.pageX - canvasElement.get(0).offsetLeft;
					mY = e.pageY - canvasElement.get(0).offsetTop;

					tx=Math.floor(mX/16) * Math.pow(2, curMap.zoom-1);
					ty=Math.floor(mY/16) * Math.pow(2, curMap.zoom-1);
					var bot=[];
					bot.x=camera.x+tx;
					bot.y=camera.y+ty;
					camera.center(bot);
					camera.check();
					mapDirty=true;
				}
				break;
			case 3:
				alert('Right mouse button pressed');
				break;
			default:
				alert('You have a strange mouse');
		}

	}



};

mouseXY= function(e) {
    if (!e) var e = event;
    mX = e.pageX - canvasElement.get(0).offsetLeft;
    mY = e.pageY - canvasElement.get(0).offsetTop;
    
};



document.body.addEventListener("click", mouseClick, false);
//document.body.addEventListener("dblclick", mouseDblClick, false);
document.body.addEventListener("mousewheel",mouseWheel,false);
document.body.addEventListener("DOMMouseScroll", mouseWheel, false);
canvasElement.get(0).addEventListener("mousemove", mouseXY, false);

var ksavekey=new akey("o"); //define the different keys
var loadkey=new akey("l");

var randomwalk=false;
var gamestart=false;
var radar=true;

var pausekey=new akey("space");
var debugkey=new akey("l");
var escapekey=new akey("esc");
var pageupkey=new akey("pageup");
var pagedownkey=new akey("pagedown");
var radarkey=new akey("y");
var escapekey=new akey("q");
var serversavekey=new akey("i");
var serverloadkey=new akey("k");
var upkey=new akey("up");
var rightkey=new akey("right");
var downkey=new akey("down");
var leftkey=new akey("left");
var tabkey=new akey("capslock");
var camspeedkey=new akey("shift");
var zoomkey=new akey("z");
var helpkey=new akey("h");
var speedkey=new akey("x");
var statuskey=new akey("s");
var rowkey=new akey("r");
var enterkey=new akey("space");
var startkey=new akey("return");
var menukey=new akey("esc");
var fleekey=new akey("f");
var aikey=new akey("a");
var addkey=aikey;

var unitinfokey=new akey("u");
var cardkey=new akey("c");
var cardcyclekey=new akey("v");
var deploykey=new akey("d");
var removekey=new akey("r");
var newkey=new akey("n");
var createkey=new akey("j");
var optkey=new akey("o");
var tamekey=new akey("t");

var camera = {  //represents the camera, aka what part of the map is on screen
    x: 0,
    y: 0,
    width: 60,
    height: 40,
    zoom: 1,
	panning: false,
	panX: 0,
	panY: 0,
	panSpeed: 3,
	pan: function(x,y) {
		this.panning=true;
		        if(this.zoom==1)
		{
			this.panX=x-26;
			this.panY=y-20;
		}
		else if(this.zoom==2){
			this.panX=x-46;
			this.panY=y-40;
		}else if(this.zoom==3){
			this.panX=x-78;
			this.panY=y-60;
		}
		
	},
	centerX: function() {
        if(this.zoom==1)
		{
			return this.x+26;// * Math.pow(2, curMap.zoom-1);
		}
		else if(this.zoom==2){
			return this.x+46;// * Math.pow(2, curMap.zoom-1);
		}else if(this.zoom==3){
			 return this.x+78;// * Math.pow(2, curMap.zoom-1);
		}

    },
	centerY: function() {
        if(this.zoom==1)
		{
			return this.y+20;// * Math.pow(2, curMap.zoom-1);
		}
		else if(this.zoom==2){
			return this.y+40;
		}else if(this.zoom==3){
			return this.y+60;
		}

    },
    center: function(targ) {
        //if(this.zoom>1) {tx=0;ty=0;x=0;y=0;return;}
		mapDirty=true;
        if(this.zoom==1)
		{
			tax=targ.x-26;// * Math.pow(2, curMap.zoom-1);
			tay=targ.y-20;// * Math.pow(2, curMap.zoom-1);
		}
		else if(this.zoom==2){
			 tax=targ.x-46;// * Math.pow(2, curMap.zoom-1);
			tay=targ.y-40;
		}else if(this.zoom==3){
			 tax=targ.x-78;// * Math.pow(2, curMap.zoom-1);
			tay=targ.y-60;
		}
        if (tax<0) {tax=0;}
        if (tay<0) {tay=0;}
        if (tax>MAP_WIDTH-this.width) {tax=MAP_WIDTH-this.width;}
        if (tay>MAP_HEIGHT-this.height) {tay=MAP_HEIGHT-this.height;}

        this.x=tax;
        this.y=tay;
    },
	update: function() {

		if(this.panning){
			mapDirty=true;
			if((this.x<this.panX)  && (this.x<MAP_WIDTH-(this.width* this.zoom)))
			{
				this.x+=this.panSpeed;
				if(this.x>this.panX)
				{
					this.x=this.panX;
				}
			}else if((this.x>this.panX)  && (this.x>1))
			{

				this.x-=this.panSpeed;
				if(this.x<this.panX)
				{
					this.x=this.panX;
				}
			}
			if((this.y<this.panY) && (this.y<MAP_HEIGHT-(this.height* this.zoom))) //todo
			{
				
				this.y+=this.panSpeed;
				if(this.y>this.panY)
				{
					this.y=this.panY;
				}
			}else if((this.y>this.panY) && (this.y>1))
			{
				this.y-=this.panSpeed;
				if(this.y<this.panY)
				{
					this.y=this.panY;
				}
			}
			if((this.x==this.panX) && (this.y==this.panY))
			{
				this.panning=false;
			}
			if((this.x>MAP_WIDTH-((this.width+this.zoom)* this.zoom)) && (this.y>MAP_HEIGHT-((this.height+this.zoom)* this.zoom)))
			{
				this.panning=false;
			}
			if((this.x<2) && (this.y<2))
			{
				this.panning=false;
			}
		}
		this.check();
	},
    check: function() {
		if(this.zoom==1){
			this.x.clamp(0, MAP_WIDTH-60);
			this.y.clamp(0, MAP_HEIGHT-40);
		}else if(this.zoom==2){
		     this.x.clamp(0, MAP_WIDTH-60);
			 this.y.clamp(0, MAP_HEIGHT-40);
		}else if(this.zoom==3){
			this.x.clamp(0, MAP_WIDTH-60);
			this.y.clamp(0, MAP_HEIGHT-40);//todo
		}
        //if(this.zoom>1) {tx=0;ty=0;x=0;y=0;return;}
    },
    rX: function(fx) {
        return fx-this.x;
    },
    rY: function(fy) {
        return fy-this.y;
    }
};





function Tile() { //the Map is made of a 2D array of tiles.
    this.x = 0;
    this.y = 0;
    this.data =  0;
}
Tile.prototype.width = 16;
Tile.prototype.height = 16;
Tile.prototype.draw = function(cam) { 
    if(this.data==TileType.Grass){
        tileSprite[TileType.Grass].draw(canvas, (this.x-cam.x)*16, (this.y-cam.y)*16);
    }else if(this.data==TileType.Mountains){
	tileSprite[TileType.Mountains].draw(canvas, (this.x-cam.x)*16, (this.y-cam.y)*16);
    }else if(this.data==TileType.Swamp){
        tileSprite[TileType.Swamp].draw(canvas, (this.x-cam.x)*16, (this.y-cam.y)*16);
    }else if(this.data==TileType.Forest){
        tileSprite[TileType.Forest].draw(canvas, (this.x-cam.x)*16, (this.y-cam.y)*16); 
    }else if(this.data==TileType.Water){
        tileSprite[TileType.Water+tileani].draw(canvas, (this.x-cam.x)*16, (this.y-cam.y)*16);
    }else if(this.data==TileType.Plains){
        tileSprite[TileType.Plains].draw(canvas, (this.x-cam.x)*16, (this.y-cam.y)*16);
    }else if(this.data==TileType.Ocean){
        tileSprite[TileType.Ocean+tileani].draw(canvas, (this.x-cam.x)*16, (this.y-cam.y)*16);
    }else if(this.data==42){
        watersprite.draw(canvas, (this.x-cam.x)*16, (this.y-cam.y)*16);
    }else{  //if strange data, draw a solid color
        canvas.fillStyle = bColors[0]; 
        canvas.fillRect((this.x-cam.x)*this.width, (this.y-cam.y)*this.height, this.width, this.height);
    }
    if(this.cracked==1){
        crackedsprite.draw(canvas, (this.x-cam.x)*16, (this.y-cam.y)*16);
    }
    if(this.platform==1){
        platformsprite.draw(canvas, (this.x-cam.x)*16, (this.y-cam.y)*16);
    }
    
};

function tileToCost(data, sqd) {
    if(sqd.getFlightHeight()>2) {return 2;}
    if(( data == TileType.Mountains ) ||( data == TileType.Ocean )) return 0;
    if(sqd.getFlightHeight()>1) {return 2;}
    if(( data == TileType.Water ) && sqd.canSwim()){ return 2;}
    if( data == TileType.Water ) {return 0;}
    if((data==TileType.Swamp ) &&(sqd.leader.class==SEEAss.Frog)) {return 2};
    if( data == TileType.Swamp  ) return 5;
    if( data == TileType.Forest  ) return 3;
    if( data == TileType.Sand  ) return 2;
    if( data == TileType.Road  ) return 1;
    return 2;
};

function mapToGraph(map, sqd) { 
    var tilesArray = [];
    for( var i=0; i<MAP_WIDTH; ++i ) {
        var rowArray = [];
        for( var j=0; j<MAP_HEIGHT; ++j ) {
            var tile = map.tiles[i][j];
            var data = tileToCost(tile.data, sqd);
            for( var ii=-1; ii<2; ++ii ) {
                for( var jj=-1; jj<2; ++jj) {
                    if( i+ii < 0 || i+ii >= MAP_WIDTH || j+jj < 0 || j+jj >= MAP_WIDTH ) {
                        continue;
                    }
                    var adjTile = map.tiles[i+ii][j+jj];
                    if( !adjTile ) continue;
                    adjData = tileToCost(adjTile.data,sqd);
                    if( data == 0 || adjData == 0 ) { data = 0; } else {
                        data = Math.max(data, adjData);
                    }
                }
            }
            rowArray.push(data);
        }
        tilesArray.push(rowArray);
    }
    return new Graph(tilesArray);
}


function Map(I) { //map object
    I = I || {};
    var i = 0;
    var j = 0;
	I.x=0;
	I.y=0;
	//list of towns
	//story file?
	//enemy unit file
    I.active = true;
    I.color = "#00A";
    I.tiles = new Array(MAP_WIDTH);
    for( i=0; i<MAP_WIDTH; i++ ) { I.tiles[i] = new Array(MAP_HEIGHT);  }
    for (i=0;i<MAP_WIDTH; i++){
        for (j=0;j<MAP_HEIGHT; j++){
            I.tiles[i][j]= new Tile();
            I.tiles[i][j].x=i;
            I.tiles[i][j].y=j;
        }
    }
    I.width = MAP_WIDTH;
    I.height = MAP_HEIGHT;

    I.getPath = function(startX, startY, endX, endY,sqd) {
        var graph = mapToGraph(I,sqd);
        return astar.search(graph.nodes, graph.nodes[startX][startY], graph.nodes[endX][endY]);
    };
	
	I.walkable=function(x,y,sqd){
		if(sqd.getFlightHeight()>1) {return true;}
		if((sqd.getFlightHeight()>0) && (I.tiles[x][y].data!=TileType.Mountains)){return true;}
		if((sqd.canSwim()) && (curMap.tiles[x][y].data==TileType.Water)) {return true;}
		if((I.tiles[x][y].data!=TileType.Mountains) &&(I.tiles[x][y].data!=TileType.Ocean) &&(I.tiles[x][y].data!=TileType.Lava)) {return true;}
		return false;
	}
	
	I.stringifyTiles = function(name) {
		var tempstring= "";
		for (i=0;i<MAP_WIDTH; i++){
			for (j=0;j<MAP_HEIGHT; j++){
			tempstring = tempstring +I.tiles[i][j].data;
			tempstring += ","
			}
		}
	};
	
	I.loadTiles = function (name) {
	var hempstring=localStorage.getItem(name);
		I.buildMapFromLoadedTiles(name, hempstring);
    };
	
	I.buildMapFromLoadedTiles = function(name, hempstring) {
		tempstring=hempstring.split(",");
		for (i=0;i<MAP_WIDTH; i++){
			for (j=0;j<MAP_HEIGHT; j++){
			I.tiles[i][j].data = tempstring[j+MAP_HEIGHT*i];
			}
		}
    };
	
	I.saveTiles = function (name) {
		var tempstring = I.stringifyTiles(name);
		localStorage.setItem(name, tempstring);
	
    };
	
    
    I.drawPath = function(x,y,xx,yy) {
        var path = I.getPath(x, y, xx, yy);
        for( var i=0; i<path.length; ++i ) {
            I.setTile(path[i].x, path[i].y, 1);
        }
    };
    I.zoom = 1;
	
	I.minusScrollZoom = function(cam) {
        if (I.zoom == 1)
		{
			//I.zoom=3;cam.x-=20;cam.y-=13;
			
		} else if (I.zoom==2) 
		{
			I.zoom=1;cam.x+=30*Math.pow(2, I.zoom-1);cam.y+=20*Math.pow(2, I.zoom-1);

		} else 
		{
			I.zoom=2;cam.x+=30*Math.pow(2, I.zoom-1);cam.y+=20*Math.pow(2, I.zoom-1);			
		}
		if(cam.x<0)
		{
			cam.x=0;
		}
		if(cam.y<0)
		{
			cam.y=0;
		}
		if(I.zoom==0)
		{
			if(cam.x>MAP_WIDTH-60)
			{
				cam.x=MAP_WIDTH-60;
			}
			if(cam.y>MAP_HEIGHT-40)
			{
				cam.y=MAP_HEIGHT-40;
			}
		}else if(I.zoom==2)
		{
			if(cam.x>MAP_WIDTH-30)
			{
				cam.x=MAP_WIDTH-30;
			}
			if(cam.y>MAP_HEIGHT-20)
			{
				cam.y=MAP_HEIGHT-20;
			}
		}
        cam.zoom=I.zoom;
		cam.check();
		mapDirty=true;
    };
	
	I.minusZoom = function(cam) {
        if (I.zoom == 1)
		{
			//I.zoom=3;cam.x-=20;cam.y-=13;
			
		} else if (I.zoom==2) 
		{
			I.zoom=1;cam.x+=30*Math.pow(2, I.zoom-1);cam.y+=20*Math.pow(2, I.zoom-1);

		} else 
		{
			I.zoom=2;cam.x+=30*Math.pow(2, I.zoom-1);cam.y+=20*Math.pow(2, I.zoom-1);			
		}
		if(cam.x<0)
		{
			cam.x=0;
		}
		if(cam.y<0)
		{
			cam.y=0;
		}
		if(I.zoom==0)
		{
			if(cam.x>MAP_WIDTH-60)
			{
				cam.x=MAP_WIDTH-60;
			}
			if(cam.y>MAP_HEIGHT-40)
			{
				cam.y=MAP_HEIGHT-40;
			}
		}else if(I.zoom==2)
		{
			if(cam.x>MAP_WIDTH-30)
			{
				cam.x=MAP_WIDTH-30;
			}
			if(cam.y>MAP_HEIGHT-20)
			{
				cam.y=MAP_HEIGHT-20;
			}
		}
        cam.zoom=I.zoom;
		cam.check();
		mapDirty=true;
    };
	
    I.setZoom = function(cam) {
        if (I.zoom == 1) 
		{
			I.zoom=2;cam.x-=30*Math.pow(2, I.zoom-1);cam.y-=20*Math.pow(2, I.zoom-1);
		} else if (I.zoom==2) 
		{
			I.zoom=3;cam.x-=30*Math.pow(2, I.zoom-1);cam.y-=20*Math.pow(2, I.zoom-1);
		} else {
			//I.zoom=1;cam.x+=50;cam.y+=33;
		}
		if(cam.x<0)
		{
			cam.x=0;
		}
		if(cam.y<0)
		{
			cam.y=0;
		}
		if(I.zoom==0)
		{
			if(cam.x>MAP_WIDTH-60)
			{
				cam.x=MAP_WIDTH-60;
			}
			if(cam.y>MAP_HEIGHT-40)
			{
				cam.y=MAP_HEIGHT-40;
			}
		}else if(I.zoom==2)
		{
			if(cam.x>MAP_WIDTH-30)
			{
				cam.x=MAP_WIDTH-30;
			}
			if(cam.y>MAP_HEIGHT-20)
			{
				cam.y=MAP_HEIGHT-20;
			}
		}
        cam.zoom=I.zoom;
		cam.check();
		mapDirty=true;
    };

    I.draw = function(cam) {
		if(!mapDirty) {return;}
		if((isBattle) /*||(preBattle)*/||(battleReport)){return;}
        cam.zoom=I.zoom;
        cam.check();
		var poopx=cam.x+cam.width*Math.pow(2, I.zoom-1);
		var poopy=cam.y+cam.height*Math.pow(2, I.zoom-1);
		if(poopx>MAP_WIDTH)
		{
			//poopx=MAP_WIDTH-(cam.x+cam.width);
		}
		if(poopy>MAP_HEIGHT)
		{
			poopy=MAP_HEIGHT-(cam.y+cam.height);
		}
        for (i=cam.x;i<poopx; i+=I.zoom){
            for (j=cam.y;j<poopy; j+=I.zoom){
                var tileTypes = {};
                for( var ii=0; ii<I.zoom; ii+=1 ) {
                    if ((i+ii>=MAP_WIDTH)) { continue;}
                    for( var jj=0; jj<I.zoom; jj+=1 ) {
                        if ((j+jj>=MAP_HEIGHT)) {continue;}

                        var data = I.tiles[i+ii][j+jj];
                        if( data ) {
                            if( !tileTypes[data.data] ) { tileTypes[data.data] = 1; }
                            else{ tileTypes[data.data] += 1; }
                        }
                    }
                }
                var dominantType = {type: null, occurs: 0};

                for( var type in tileTypes ) {
                    if( tileTypes[type] && tileTypes[type] > dominantType.occurs ) {
                        dominantType.occurs = tileTypes[type];
                        dominantType.type = type;
                    }
                }
                if(dominantType.type && dominantType.type <20) {
					tileSprite[dominantType.type].draw(sillycanvas, (i-cam.x)*16/Math.pow(2,I.zoom-1), (j-cam.y)*16/Math.pow(2,I.zoom-1));
                }else if(dominantType.type&& dominantType.type<24){
					tileSprite[20+tileani].draw(sillycanvas, (i-cam.x)*16/Math.pow(2,I.zoom-1), (j-cam.y)*16/Math.pow(2,I.zoom-1));
				}else if (dominantType.type&& dominantType.type<28) {
					tileSprite[24+tileani].draw(sillycanvas, (i-cam.x)*16/Math.pow(2,I.zoom-1), (j-cam.y)*16/Math.pow(2,I.zoom-1));
				}else 
				{
					tileSprite[TileType.Lava+tileani].draw(sillycanvas, (i-cam.x)*16/Math.pow(2,I.zoom-1), (j-cam.y)*16/Math.pow(2,I.zoom-1));
				}
            }
        }
		mapDirty=false;
    };
    I.clear =function(){
        for (i=0;i<MAP_WIDTH; i++){
            for (j=0;j<MAP_HEIGHT; j++){
                I.tiles[i][j]= new Tile();
                I.tiles[i][j].x=i;
                I.tiles[i][j].y=j;
            }
        }
    };
    

    I.setTile = function (x,y,data) {
        I.tiles[x][y].data = data;
    };
    
	closeEnough=function(dba,tgb){
		if(Math.abs(dba[0]-tgb[0])>RGB_THRESHOLD)
		{
			return false;
		}
		if(Math.abs(dba[1]-tgb[1])>RGB_THRESHOLD)
		{
			return false;
		}
		if(Math.abs(dba[2]-tgb[2])>RGB_THRESHOLD)
		{
			return false;
		}
		return true;
	};

	I.buildMap= function(name){
        
		var imageObj = new Image();
		imageObj.onload = function() {
				mapCanvas.drawImage(imageObj, 0, 0);
				MAP_WIDTH=imageObj.width;
				MAP_HEIGHT=imageObj.height;				
				mapBitmap = mapCanvas.getImageData(0, 0, MAP_WIDTH, MAP_HEIGHT);
		for( var i=0; i<MAP_WIDTH * MAP_HEIGHT * 4; i+=4 ) {//TODO/PROBLEMMAPWIDTH?
		  var rgba = [mapBitmap.data[i], mapBitmap.data[i+1], mapBitmap.data[i+2], mapBitmap.data[i+3]];
		  var mountainrgb =[0,0,0,0];
		  var oceanrgb =[0,0,255,0];
		  var forestrgb =[0,255,0,0];
		  var sandrgb =[255,255,0,0];
		  var roadrgb =[195,195,195,0];
		  var swamprgb =[0,255,64,0];
		  var plainsrgb =[128,64,64,0];
		  var snowrgb =[230,230,230,0];
		  var waterrgb =[0,100,255,0];
		  var lavargb =[255,0,0,0];
		  var grassrgb=[255,255,255,0];
		  var yPos = Math.floor(i / 4 / MAP_WIDTH);
		  var xPos = (i / 4) % MAP_WIDTH;
		if(closeEnough(rgba,mountainrgb)) {
			I.setTile(xPos, yPos, TileType.Mountains);
		  } else if (closeEnough(rgba,forestrgb)){
			I.setTile(xPos, yPos, TileType.Forest);
		  } else if (closeEnough(rgba,oceanrgb)){
			I.setTile(xPos, yPos, TileType.Ocean);
		  } else if (closeEnough(rgba,sandrgb)){
			I.setTile(xPos, yPos, TileType.Sand);
		  } else if (closeEnough(rgba,roadrgb)){
			I.setTile(xPos, yPos, TileType.Road);
		  } else if (closeEnough(rgba,waterrgb)){
			I.setTile(xPos, yPos, TileType.Water);
		  } else if (closeEnough(rgba,plainsrgb)){
			I.setTile(xPos, yPos, TileType.Plains);
		  } else if (closeEnough(rgba,lavargb)){
			I.setTile(xPos, yPos, TileType.Lava);
		  } else if (closeEnough(rgba,swamprgb)){
			I.setTile(xPos, yPos, TileType.Swamp);
		  }else if (closeEnough(rgba,snowrgb)){
			I.setTile(xPos, yPos, TileType.Snow);
		  }else{ //if (closeEnough(rgba,grassrgb)) {
			I.setTile(xPos, yPos, TileType.Grass);
		  }
		}
		I.buildRadar();

      };
	imageObj.src = "images/"+name+".png";

    };
	
    I.buildRadar= function(){
        
       //radarCanvas.globalAlpha = 0.55;
        for (var i=0;i<MAP_WIDTH; i++){
            for (j=0;j<MAP_HEIGHT; j++){
                radarCanvas.fillStyle = tileColors[I.tiles[i][j].data];
                radarCanvas.fillRect(i, j, 2, 2);
            }
        }

        radarBitmap = radarCanvas.getImageData(0, 0, MAP_WIDTH, MAP_HEIGHT);

    };

    I.drawRadar= function (cam,x,y,arm) {
		
	
        cam.check();
        //canvas.save();
        canvas.globalAlpha = 0.75;
        canvas.putImageData(radarBitmap,x,y);
		//canvas.drawImage(radarCanvas,x,y);
        
        for(var i=0;i<maps[mapSelected].numTowns;i++)
        {
            canvas.fillStyle = "blue";
            if(towns[i].team==1){ canvas.fillStyle = "#FF2C85";}
            canvas.fillRect(x+towns[i].x, y+towns[i].y, 8, 8);
        }
        
        for(var i=0;i<arm[0].numSquads;i++){
            
            canvas.fillStyle = "#FFD700";
            canvas.fillRect(x+arm[0].squads[i].x, y+arm[0].squads[i].y, 4, 4);
        }
        
        for(var i=0;i<arm[1].numSquads;i++){
            
            canvas.fillStyle = "red";
            canvas.fillRect(x+arm[1].squads[i].x, y+arm[1].squads[i].y, 4, 4);
        }

        canvas.globalAlpha = 0.35;
        canvas.fillStyle = "white";
        canvas.fillRect(x+cam.x, y+cam.y, cam.width*I.zoom, cam.height*I.zoom);
		canvas.globalAlpha=1;
	   // canvas.restore();
    };
    return I;
}

function resetEnemyArmy()
{
	/*//armies[1].squads=null;
	for (var i=0;i<armies[1].numSquads;i++){
		armies[1].removeSquad(i);
	}
	//alert(armies[1].numSquads);
	armies[1].numSquads=0;
	armies[1].addSquad(new unit());
	armies[1].addSquad(new unit());
	armies[1].addSquad(new unit());
	armies[1].addSquad(new unit());
	armies[1].addSquad(new unit());

	for (var i=0;i<armies[1].numSquads;i++){
		armies[1].squads[i].leader.class=SEEAss.HulkBear;
		armies[1].squads[i].leader.setClass();
		armies[1].squads[i].sprite=armies[1].squads[i].leader.sprite;
		armies[1].squads[i].team=1;
		for(var j=0;j<Math.floor(Math.random()*2)+3;j++)
		{
			armies[1].squads[i].addUnit(new unit());
		}
		armies[1].squads[i].smartRow();
	}*/
	armies[1]=new army();
	armies[1].init(1);
	/*armies[1].addSquad(new unit());
	armies[1].addSquad(new unit());
	armies[1].addSquad(new unit());
	armies[1].addSquad(new unit());
	armies[1].addSquad(new unit());*/

	/*for (var i=0;i<armies[1].numSquads;i++){
		armies[1].squads[i].leader.class=SEEAss.HulkBear;
		armies[1].squads[i].leader.setClass();
		armies[1].squads[i].sprite=armies[1].squads[i].leader.sprite;
		armies[1].squads[i].team=1;
		for(var j=0;j<Math.floor(Math.random()*2)+3;j++)
		{
			armies[1].squads[i].addUnit(new unit());
		}
		armies[1].squads[i].smartRow();
	}*/
};

function initArmies(){
	armies[0].init(0);
	armies[1].init(1);

	armies[0].squads[1].leader.class=SEEAss.IronBear;
	armies[0].squads[1].leader.setClass();
	armies[0].squads[1].leader.name="Iron Bear"
	armies[0].squads[2].leader.class=SEEAss.CptBearmerica;
	armies[0].squads[2].leader.setClass();
	armies[0].squads[1].sprite=armies[0].squads[1].leader.sprite;
	armies[0].squads[2].sprite=armies[0].squads[2].leader.sprite;
	armies[0].squads[2].leader.name="Captain Bearmerica";
	armies[0].squads[2].smartRow();
	armies[0].squads[0].smartRow();
	armies[0].squads[1].smartRow();
	

	/*armies[0].name = "Lannisters";
	armies[0].name = "The Kingsguard";
	armies[1].name = "The Bastard Boys";
	armies[1].leader.name="Roose";
	/*for (var i=0;i<armies[1].numSquads;i++){
			armies[1].squads[i].basex=armies[1].basex;
			armies[1].squads[i].basey=armies[1].basey;
			armies[1].squads[i].x=armies[1].basex;
			armies[1].squads[i].y=armies[1].basey;
	}*/




	armies[1].addSquad(new unit());
	armies[1].addSquad(new unit());
	armies[1].addSquad(new unit());
	armies[1].addSquad(new unit());
	armies[1].addSquad(new unit());

	for (var i=0;i<armies[1].numSquads;i++){
		armies[1].squads[i].leader.class=SEEAss.HulkBear;
		armies[1].squads[i].leader.setClass();
		armies[1].squads[i].sprite=armies[1].squads[i].leader.sprite;
		armies[1].squads[i].team=1;
		//armies[1].squads[i].x=armies[1].squads[i].basex;
		//armies[1].squads[i].y=armies[1].squads[i].basey;

		//armies[1].squads[i].deploy();//TODO delay between deployment 
		//armies[1].lastDeployed++;
		for(var j=0;j<Math.floor(Math.random()*2)+3;j++)
		{
			armies[1].squads[i].addUnit(new unit());
		}
		armies[1].squads[i].smartRow();
	}
	armies[0].leader.name="Bearistan";
	armies[0].leader.class=SEEAss.Bear;
	armies[0].leader.setClass();
	armies[0].leader.maxhp+=20;
	armies[0].leader.hp=armies[0].leader.maxhp;
	armies[0].squads[0].sprite=armies[0].squads[0].leader.sprite;

	armies[1].squads[0].name="Ramsey";
	armies[1].squads[0].leader.class=SEEAss.DarkKnight;
	armies[1].squads[0].leader.setClass();
	armies[1].squads[0].sprite=armies[1].squads[0].leader.sprite;

	/*armies[1].squads[1].leader.class=SEEAss.Witch;
	armies[1].squads[1].leader.setClass();
	armies[1].squads[1].leader.name="Deneb";
	for(i=1;i<armies[1].squads[1].numUnits;i++)
	{
		armies[1].squads[1].units[i].class=SEEAss.Pumpkinhead;
		armies[1].squads[1].units[i].setClass();
	}


	armies[1].leader.maxhp+=20;
	armies[1].leader.hp=armies[1].leader.maxhp;
	armies[1].leader.equipment[0]=swords[1];
	armies[1].leader.equipment[1]=breastplate;*/
	//armies[1].leader.equipment[2]=cape;
	armies[1].squads[0].units[1].name="Reek";
	armies[1].squads[0].units[1].class=SEEAss.Cleric;
	armies[1].squads[0].units[1].setClass();

	armies[1].squads[0].units[1].maxhp+=25;
	armies[1].squads[0].units[1].hp=armies[1].leader.maxhp;
	armies[1].squads[0].units[1].row=1;

};

function mapInitArmies(){
	for (var i=0;i<armies[0].numSquads;i++){
			armies[0].squads[i].basex=armies[0].basex;
			armies[0].squads[i].basey=armies[0].basey;
			armies[0].squads[i].x=armies[0].basex;
			armies[0].squads[i].y=armies[0].basey;
			for(var j=0;j<armies[0].squads[i].numUnits;j++)
			{
				armies[0].squads[i].units[j].levelTo(3);
			}
	}
	for(var j=0;j<armies[0].numLooseUnits;j++)
	{
		armies[0].looseUnits[j].levelTo(3);
	}
	for (var i=0;i<armies[1].numSquads;i++){
			armies[1].squads[i].basex=armies[1].basex;
			armies[1].squads[i].basey=armies[1].basey;
			armies[1].squads[i].x=armies[1].basex;
			armies[1].squads[i].y=armies[1].basey;
			for(var j=0;j<armies[1].squads[i].numUnits;j++)
			{
				armies[1].squads[i].units[j].levelTo(4*(mapSelected+1));
			}
	}
	bConsoleStr.length=0;
	//armies[0].name = "Lannisters";
	armies[0].name = "The Kingsguard";
	armies[1].name = "The Bastard Boys";
	//armies[1].leader.name="Roose";
	armies[0].squads[0].deploy();
	armies[1].squads[0].deploy();
	armies[0].lastDeployed=1;
	armies[1].lastDeployed=1;

};
function merp() {
requestAnimationFrame(merp,canvas);
	if(mode==0){
		mainMenuUpdate();
		mainMenuDraw();
	}else if(mode==1){
		worldMapUpdate();
		worldMapDraw();
	}else if(mode==2){
		mapUpdate();
		if((!isBattle) && (!battleReport))
		{
			mapDraw();
		}else
		{
			battleDraw();
		}
	}
	//canvas.beginPath();
	//osCanvas.drawImage(canvasElement,0,0);
}




/*document.getElementById("myAudio").addEventListener('ended', function() { //loops music
    this.currentTime = 0;
    this.play();
}, false);*/

function menuDraw()
{

    battletick++;
    //canvas.save();
    canvas.globalAlpha=0.80;
    canvas.fillStyle =  "#DCDCDC";
    canvas.fillRect(25,95,850,500);
    canvas.fillStyle =bColors[6];//Math.floor(Math.random()*5)];// "#483D8B ";
    canvas.fillRect(40,110,820,470);
    //canvas.restore();
	canvas.globalAlpha=1;
    canvas.font = "14pt Calibri";
    canvas.textAlign = "left";
    canvas.textBaseline = "middle";
    
}

	bmenuBox.msg[0]="                     A=AI  C=Card  F=Flee R=Row swap T=Tame";
	bmenuBox.y=570;
	bmenuBox.lines=1;
	bConsoleBox=new textbox();
	bConsoleBox.width=460;
	bConsoleBox.height=90;
	
	bConsoleBox.msg[0]=bConsoleStr[0+bConsoleBox.scroll];//[bConsoleStr.length-4];
	bConsoleBox.msg[1]=bConsoleStr[1+bConsoleBox.scroll];//[bConsoleStr.length-3];
	bConsoleBox.msg[2]=bConsoleStr[2+bConsoleBox.scroll];//[bConsoleStr.length-2];
	bConsoleBox.msg[3]=bConsoleStr[3+bConsoleBox.scroll];//[bConsoleStr.length-1];
	bConsoleBox.y=15;
	bConsoleBox.x=30;
	bConsoleBox.lines=4;
	
function battleDo()
{
	monsta.update();
	for(var i=0;i<combatants[0].numUnits;i++)
    {
		if(!combatants[0].units[i].alive) {continue;}
		if(battletick>battledelay) { combatants[0].units[i].update(combatants[0],combatants[1]);}
		if (combatants[0].units[i].attackStage>0) 
		{
			someoneAttacking=true;
			if(combatants[0].units[i].attackStage==2)
			{
				combatants[0].units[i].attacking--; 
				if(combatants[0].units[i].attacking<1)
				{
					combatants[0].units[i].attackStage=0;
					combatants[0].units[i].attackAniStage=0;
					someoneAttacking=false;
				}
			}else if(combatants[0].units[i].attackStage==1)
			{
				combatants[0].units[i].attacking++; 
				if(combatants[0].units[i].attacking>ATTACK_LEN)
				{
					combatants[0].units[i].attackStage=2;
				}
			}
		}
		if (combatants[0].units[i].attackAniStage>0) 
			{
				
				if(combatants[0].units[i].attackAniStage==2)
				{
					combatants[0].units[i].attackAni--; 
					if(combatants[0].units[i].attackAni<1)
					{
						combatants[0].units[i].attackAniStage=0;
					}
				}else if(combatants[0].units[i].attackStage==1)
				{
					combatants[0].units[i].attackAni++; 
					if(combatants[0].units[i].attackAni>ATTACK_ANI_LENGTH)
					{
						combatants[0].units[i].attackAniStage=2;
					}
				}
			}
        if(combatants[0].units[i].hurting>0) {combatants[0].units[i].hurting--;}
	}

	
	for(var i=0;i<combatants[1].numUnits;i++)
    {
		if(!combatants[1].units[i].alive) {continue;}
		if(battletick>battledelay) {combatants[1].units[i].update(combatants[1],combatants[0]);}
		if (combatants[1].units[i].attackStage>0) 
		{
			someoneAttacking=true;
			if(combatants[1].units[i].attackStage==2)
			{
				combatants[1].units[i].attacking--; 
				if(combatants[1].units[i].attacking<1)
				{
					combatants[1].units[i].attackStage=0;
					combatants[1].units[i].attackAniStage=0;
					someoneAttacking=false;
				}
			}else if(combatants[1].units[i].attackStage==1)
			{
				combatants[1].units[i].attacking++; 
				if(combatants[1].units[i].attacking>ATTACK_LEN)
				{
					combatants[1].units[i].attackStage=2;
				}
			}
		}
		if (combatants[1].units[i].attackAniStage>0) 
			{
				
				if(combatants[1].units[i].attackAniStage==2)
				{
					combatants[1].units[i].attackAni--; 
					if(combatants[1].units[i].attackAni<1)
					{
						combatants[1].units[i].attackAniStage=0;
					}
				}else if(combatants[1].units[i].attackStage==1)
				{
					combatants[1].units[i].attackAni++; 
					if(combatants[1].units[i].attackAni>ATTACK_ANI_LENGTH)
					{
						combatants[1].units[i].attackAniStage=2;
					}
				}
			}

        if(combatants[1].units[i].hurting>0) {combatants[1].units[i].hurting--;}
	}
	if(combatants[0].turns+combatants[1].turns>=battlelength) {endBattle(combatants[0],combatants[1]);}
    if((tamekey.check()) && (combatants[0].hasTamer())){
		var meth=Math.floor(Math.random()*TAME_CHANCE);
		if(meth<10){
			var tmpstr="Tamed the "+combatants[1].units[0].getClassName()
			console.log(tmpstr);
			bConsoleStr.push(tmpstr);
			bConsoleClr.push("white");
			armies[0].addLoose(combatants[1].units[0]);
			combatants[0].turns=10;
			combatants[0].damaged=400;
		}else
		{
			console.log("Monster bit you!");
			//todo monster name?
			var turtle=Math.floor(Math.random()*combatants[0].numUnits);
			bConsoleStr.push("Monster bit "+combatants[0].units[turtle].name);


			combatants[0].units[turtle].hurt(combatants[1].units[0].attack*2);
			if((combatants[0].units[turtle]==combatants[0].leader) &&(!combatants[0].units[turtle].alive)) {combatants[0].pickNewLeader();}
		}
		
	}
	 if((combatants[0].alive)&& (!combatants[0].checkSurvivors()))   { 
        var tmpstr=combatants[0].leader.name + "'s squad was eliminated.";
        console.log(tmpstr); 
		bConsoleStr.push(tmpstr);
		bConsoleClr.push("red");
        combatants[0].damaged=0;
        combatants[1].damaged=10;
		combatants[1].turns=10;
        endBattle(combatants[0],combatants[1]);
		armies[0].removeSquad(combatants[0].ID);
    }
    if((combatants[1].alive)&& (!combatants[1].checkSurvivors()))   
    { 
        var tmpstr=combatants[1].leader.name + "'s squad was eliminated.";
        console.log(tmpstr); 
		bConsoleStr.push(tmpstr);
		bConsoleClr.push("green");
		combatants[1].turns=10;
		var ods=combatants[0].getLuck()+30;
		if((ods*2)>(Math.random()*99))
		{
			var lenny=randomItem();
			armies[0].addItem(lenny);
			bConsoleStr.push("Found a "+lenny.name+" on the enemy squad.");
			bConsoleClr.push("white");
		}

        combatants[1].damaged=0;
        combatants[0].damaged=10;
        endBattle(combatants[0],combatants[1]);
		armies[1].removeSquad(combatants[1].ID);
    }

		if(battletick>battledelay) {battletick=0;}
};
function battleDraw()
{
	//enus pump
	battleCanvas.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
	bmenuBox.exists=true;
    battletick++;
    //battleCanvas.save();
    battleCanvas.globalAlpha=0.60;
    battleCanvas.fillStyle =  "#DCDCDC";
    battleCanvas.fillRect(25,95,820,500);
    battleCanvas.fillStyle =bColors[6];//Math.floor(Math.random()*5)];// "#483D8B ";
    battleCanvas.fillRect(40,110,790,470);
    //battleCanvas.restore();
	canvas.globalAlpha=1;
    battleCanvas.font = "14pt Calibri";
    battleCanvas.textAlign = "left";
    battleCanvas.textBaseline = "middle";

    battleCanvas.fillStyle = "blue";
    var texticles= "";
    if (combatants[0].battleAI==0) {texticles="Weakest";}
    if (combatants[0].battleAI==1) {texticles="Strongest";}
    if (combatants[0].battleAI==2) {texticles="Leader";}
    battleCanvas.fillText(texticles, 515, 132);
	
	//update console
	bConsoleBox.msg[0]=bConsoleStr[bConsoleStr.length-4-bConsoleBox.scroll];
	//bConsoleBox.colors[0]=bConsoleClr[bConsoleStr.length-4-bConsoleBox.scroll];
	bConsoleBox.msg[1]=bConsoleStr[bConsoleStr.length-3-bConsoleBox.scroll];
	//bConsoleBox.colors[1]=bConsoleClr[bConsoleStr.length-3-bConsoleBox.scroll];
	bConsoleBox.msg[2]=bConsoleStr[bConsoleStr.length-2-bConsoleBox.scroll];
	//bConsoleBox.colors[2]=bConsoleClr[bConsoleStr.length-2-bConsoleBox.scroll];
	bConsoleBox.msg[3]=bConsoleStr[bConsoleStr.length-1-bConsoleBox.scroll];
	//bConsoleBox.colors[3]=bConsoleClr[bConsoleStr.length-1-bConsoleBox.scroll];
	battleCanvas.globalAlpha=1;
	bConsoleBox.msg[0]=bConsoleStr[bConsoleStr.length-4-bConsoleBox.scroll];
	bConsoleBox.msg[1]=bConsoleStr[bConsoleStr.length-3-bConsoleBox.scroll];
	bConsoleBox.msg[2]=bConsoleStr[bConsoleStr.length-2-bConsoleBox.scroll];
	bConsoleBox.msg[3]=bConsoleStr[bConsoleStr.length-1-bConsoleBox.scroll];
	{	
		bConsoleBox.draw(canvas);
	}
    for(var i=0;i<combatants[0].numUnits;i++)
    {
        if(!combatants[0].units[i].alive) {continue;}
		var sevenup=combatants[0].units[i].sprite;
		if((combatants[0].units[i].class==SEEAss.Werewolf) && (theTime.hours>12))
		{
			sevenup=combatants[0].units[i].nightSprite;
		}
		var closs=combatants[0].units[i].getClassName();
        var xp=600+combatants[0].units[i].row*40;
        battleCanvas.fillText("HP:"+combatants[0].units[i].hp +"/"+combatants[0].units[i].maxhp, xp, 130+i*2*45);
        battleCanvas.fillText("Lvl: "+ combatants[0].units[i].level, xp+100, 130+i*2*45);
 
        battleCanvas.fillText("ATB:", xp, 145+i*2*45);
        battleCanvas.fillStyle =  "#DCDCDC";
        battleCanvas.fillRect(xp+60,143+(i*45*2),battlespeed+3,15);
        if(combatants[0].units[i].hasStatus(Status.Haste)){
            battleCanvas.fillStyle =  "green";
        }else if(combatants[0].units[i].hasStatus(Status.Slow)){
            battleCanvas.fillStyle =  "red";
        }else
        {
            battleCanvas.fillStyle =  "yellow";
        }
        battleCanvas.fillRect(xp+60+1,144+(i*45*2),combatants[0].units[i].atb,13);

        battleCanvas.fillStyle = "blue";
        battleCanvas.fillText("Name:", xp, 172+i*2*45);
        battleCanvas.fillText(combatants[0].units[i].name, xp+52, 172+i*2*45);
        battleCanvas.fillText(closs, xp, 158+i*2*45);

        if((combatants[0].units[i].attacking>0) && (combatants[0].units[i].class!=SEEAss.Dancer)) {combatants[0].units[i].sprite.draw(battleCanvas, xp-40-combatants[0].units[i].attacking/2, 135+i*2*45);}
        if(i==BSELECTED) {selector.draw(battleCanvas, xp-40-combatants[0].units[i].attacking/2, 135+i*2*45);}

				
        if((combatants[0].units[i].hurting<1) || (combatants[0].units[i].hurting%2==0)) {
			if((combatants[0].units[i].class==SEEAss.Dancer) && (combatants[0].units[i].attackStage>0))
			{
				//alert("po");
			}else{
				sevenup.draw(battleCanvas, xp-40-combatants[0].units[i].attacking/2, 135+i*2*45);
			}
        }
        //if(battletick>battledelay) { combatants[0].units[i].update(combatants[0],combatants[1]);}
		//battleCanvas.save();
		if(combatants[0].units[i].attackStage>0){
			if(combatants[0].units[i].class==SEEAss.Dancer)//(combatants[0].units[i].attackType[combatants[0].units[i].row]==AttackTypes.GiveStatus) //todo and dancer
			{
				danceAttackSprite[combatants[0].units[i].attackAniStage].draw(battleCanvas, xp-50-combatants[0].units[i].attacking/2, 135+i*2*45);
			}else if(combatants[0].units[i].attackType[combatants[0].units[i].row]==AttackTypes.Physical)
			{
				phsAttackSprite[combatants[0].units[i].attackAniStage].draw(battleCanvas, xp-50-combatants[0].units[i].attacking/2, 135+i*2*45);
			}else if(combatants[0].units[i].attackType[combatants[0].units[i].row]==AttackTypes.Ranged)
			{
				rangedAttackSprite[combatants[0].units[i].attackAniStage].draw(battleCanvas, xp-50-combatants[0].units[i].attacking/2, 135+i*2*45);
				if((combatants[0].units[i].attackAniStage==0) && (combatants[0].units[i].attacking<2))
				{	
					monsta.shootTextured(xp-100-combatants[0].units[i].attacking/2, (i*2*45)-32,210,15,"arrow");
					console.log("shot");
				}
			}else if(combatants[0].units[i].attackType[combatants[0].units[i].row]==AttackTypes.Heal)
			{
				healAttackSprite[combatants[0].units[i].attackAniStage].draw(battleCanvas, xp-50-combatants[0].units[i].attacking/2, 135+i*2*45);
			} else if(combatants[0].units[i].attackType[combatants[0].units[i].row]==AttackTypes.Magical)
			{
				
				if(combatants[0].units[i].equipment[0].hitAll)
				{
					if(combatants[0].units[i].element==Element.Fire)
					{
						magAttackSprite[combatants[0].units[i].attackAniStage].draw(battleCanvas, xp-60-(25*(combatants[0].units[i].attackStage+1))-combatants[0].units[i].attacking/2, 150);
						magAttackSprite[combatants[0].units[i].attackAniStage].draw(battleCanvas, xp-60-(25*(combatants[0].units[i].attackStage+1))-combatants[0].units[i].attacking/2, 300);
						magAttackSprite[combatants[0].units[i].attackAniStage].draw(battleCanvas, xp-60-(25*(combatants[0].units[i].attackStage+1))-combatants[0].units[i].attacking/2, 450);
					}else if(combatants[0].units[i].element==Element.Ice)
					{
						icemagAttackSprite[combatants[0].units[i].attackAniStage].draw(battleCanvas, xp-60-(25*(combatants[0].units[i].attackStage+1))-combatants[0].units[i].attacking/2, 150);
						icemagAttackSprite[combatants[0].units[i].attackAniStage].draw(battleCanvas, xp-60-(25*(combatants[0].units[i].attackStage+1))-combatants[0].units[i].attacking/2, 300);
						icemagAttackSprite[combatants[0].units[i].attackAniStage].draw(battleCanvas, xp-60-(25*(combatants[0].units[i].attackStage+1))-combatants[0].units[i].attacking/2, 450);
					}else if(combatants[0].units[i].element==Element.Wind)
					{
						windmagAttackSprite[combatants[0].units[i].attackAniStage].draw(battleCanvas, xp-60-(25*(combatants[0].units[i].attackStage+1))-combatants[0].units[i].attacking/2, 150);
						windmagAttackSprite[combatants[0].units[i].attackAniStage].draw(battleCanvas, xp-60-(25*(combatants[0].units[i].attackStage+1))-combatants[0].units[i].attacking/2, 300);
						windmagAttackSprite[combatants[0].units[i].attackAniStage].draw(battleCanvas, xp-60-(25*(combatants[0].units[i].attackStage+1))-combatants[0].units[i].attacking/2, 450);
					}
				}else
					{
					if(combatants[0].units[i].element==Element.Fire)
					{
						magAttackSprite[combatants[0].units[i].attackAniStage].draw(battleCanvas, xp-50-(25*(combatants[0].units[i].attackStage+1))-combatants[0].units[i].attacking/2, 135+i*2*45);
					}else if(combatants[0].units[i].element==Element.Ice)
					{
						icemagAttackSprite[combatants[0].units[i].attackAniStage].draw(battleCanvas, xp-50-(25*(combatants[0].units[i].attackStage+1))-combatants[0].units[i].attacking/2, 135+i*2*45);
					}else if(combatants[0].units[i].element==Element.Wind)
					{
						windmagAttackSprite[combatants[0].units[i].attackAniStage].draw(battleCanvas, xp-50-(25*(combatants[0].units[i].attackStage+1))-combatants[0].units[i].attacking/2, 135+i*2*45);
					}
				}	
			} 
		}
		battleCanvas.globalAlpha=0.60;
        if(combatants[0].units[i].hasStatus(Status.Poison)) {poisonsprite.draw(battleCanvas, xp-40-combatants[0].units[i].attacking/2, 135+i*2*45);}
		if(combatants[0].units[i].hasStatus(Status.Protect)) {protectsprite.draw(battleCanvas, xp-40-combatants[0].units[i].attacking/2, 135+i*2*45);}
        if(combatants[0].units[i].hasStatus(Status.Reflect)) {reflectsprite.draw(battleCanvas, xp-40-combatants[0].units[i].attacking/2, 135+i*2*45);}
		if(combatants[0].units[i].hasStatus(Status.Regen)) {regensprite.draw(battleCanvas, xp-40-combatants[0].units[i].attacking/2, 135+i*2*45);}
		battleCanvas.globalAlpha=1;
		//battleCanvas.restore();

    }
//other side
    battleCanvas.fillStyle = "red";
    if (combatants[1].battleAI==0) {texticles="Weakest";}
    if (combatants[1].battleAI==1) {texticles="Strongest";}
    if (combatants[1].battleAI==2) {texticles="Leader";}
    battleCanvas.fillText(texticles, 275, 132);
    for(var i=0;i<combatants[1].numUnits;i++)
    {
		var sevenup=combatants[1].units[i].sprite;
		if((combatants[1].units[i].class==SEEAss.Werewolf) && (theTime.hours>12))
		{
			sevenup=combatants[1].units[i].nightSprite;
		}
        if(!combatants[1].units[i].alive) {continue;}
        var closs=combatants[1].units[i].getClassName();
        var xp=135-combatants[1].units[i].row*40;
        battleCanvas.fillText("HP:"+combatants[1].units[i].hp +"/"+combatants[1].units[i].maxhp, xp, 130+i*2*45);
        battleCanvas.fillText("Lvl: "+ combatants[1].units[i].level, xp+100, 130+i*2*45);
        battleCanvas.fillText("ATB:", xp, 143+i*2*45);
        battleCanvas.fillStyle =  "#DCDCDC";
        battleCanvas.fillRect(xp+60,143+(i*45*2),battlespeed+3,15);
        battleCanvas.fillStyle =  "yellow";
        battleCanvas.fillRect(xp+60+1,144+(i*45*2),combatants[1].units[i].atb,13);

        battleCanvas.fillStyle = "red";
        battleCanvas.fillText(closs, xp, 158+i*2*45);
        battleCanvas.fillText("Name:", xp, 172+i*2*45);
        battleCanvas.fillText(combatants[1].units[i].name, xp+80, 172+i*2*45);

		if((combatants[1].units[i].attacking>0) && (combatants[1].units[i].hurting<1)&& (combatants[1].units[i].class!=SEEAss.Dancer)) {combatants[1].units[i].sprite.draw(canvas, xp-40+combatants[1].units[i].attacking/2, 135+i*2*45);}
        
        if((combatants[1].units[i].hurting<1) || (combatants[1].units[i].hurting%2==0)) {
			if((combatants[1].units[i].class==SEEAss.Dancer) && (combatants[1].units[i].attackStage>0))
			{
			
			}else
			{
			   sevenup.draw(battleCanvas, xp-40+combatants[1].units[i].attacking/2, 135+i*2*45);
			}
        }
        //if(battletick>battledelay) {combatants[1].units[i].update(combatants[1],combatants[0]);}
		//battleCanvas.save();
		if(combatants[1].units[i].attackStage>0){
			if(combatants[1].units[i].class==SEEAss.Dancer)//(combatants[1].units[i].attackType[combatants[1].units[i].row]==AttackTypes.GiveStatus) //todo and dancer
			{
				danceAttackSprite[combatants[1].units[i].attackAniStage].draw(battleCanvas, xp+combatants[1].units[i].attacking/2, 135+i*2*45);
			}else if(combatants[1].units[i].attackType[combatants[1].units[i].row]==AttackTypes.Physical)
			{
				phsAttackSprite[combatants[1].units[i].attackAniStage].draw(battleCanvas, xp+combatants[1].units[i].attacking/2, 135+i*2*45);
			}else if(combatants[1].units[i].attackType[combatants[1].units[i].row]==AttackTypes.Ranged)
			{
				rangedAttackSprite[combatants[1].units[i].attackAniStage].draw(battleCanvas, xp+combatants[1].units[i].attacking/2, 135+i*2*45);
				if((combatants[1].units[i].attackAniStage==0) && (combatants[1].units[i].attacking<2))
				{	
					monsta.shootTextured(xp+combatants[1].units[i].attacking/2, (i*2*45)-32,330,15,"arrow");
					console.log("shot");
				}
			}else if(combatants[1].units[i].attackType[combatants[1].units[i].row]==AttackTypes.Heal)
			{
				healAttackSprite[combatants[1].units[i].attackAniStage].draw(battleCanvas, xp+combatants[1].units[i].attacking/2, 135+i*2*45);
			} else if(combatants[1].units[i].attackType[combatants[1].units[i].row]==AttackTypes.Magical)
			{
				
				if(combatants[1].units[i].equipment[0].hitAll)
				{
					if(combatants[1].units[i].element==Element.Fire)
					{
						magAttackSprite[combatants[1].units[i].attackAniStage].draw(battleCanvas, xp+60+(25*(combatants[1].units[i].attackStage+1))-combatants[1].units[i].attacking/2, 150);
						magAttackSprite[combatants[1].units[i].attackAniStage].draw(battleCanvas, xp+60+(25*(combatants[1].units[i].attackStage+1))-combatants[1].units[i].attacking/2, 300);
						magAttackSprite[combatants[1].units[i].attackAniStage].draw(battleCanvas, xp+60+(25*(combatants[1].units[i].attackStage+1))-combatants[1].units[i].attacking/2, 450);
					}else if(combatants[1].units[i].element==Element.Ice)
					{
						icemagAttackSprite[combatants[1].units[i].attackAniStage].draw(battleCanvas, xp+60+(25*(combatants[1].units[i].attackStage+1))-combatants[1].units[i].attacking/2, 150);
						icemagAttackSprite[combatants[1].units[i].attackAniStage].draw(battleCanvas, xp+60+(25*(combatants[1].units[i].attackStage+1))-combatants[1].units[i].attacking/2, 300);
						icemagAttackSprite[combatants[1].units[i].attackAniStage].draw(battleCanvas, xp+60+(25*(combatants[1].units[i].attackStage+1))-combatants[1].units[i].attacking/2, 450);
					}else if(combatants[1].units[i].element==Element.Wind)
					{
						windmagAttackSprite[combatants[1].units[i].attackAniStage].draw(battleCanvas, xp+60+(25*(combatants[1].units[i].attackStage+1))-combatants[1].units[i].attacking/2, 150);
						windmagAttackSprite[combatants[1].units[i].attackAniStage].draw(battleCanvas, xp+60+(25*(combatants[1].units[i].attackStage+1))-combatants[1].units[i].attacking/2, 300);
						windmagAttackSprite[combatants[1].units[i].attackAniStage].draw(battleCanvas, xp+60+(25*(combatants[1].units[i].attackStage+1))-combatants[1].units[i].attacking/2, 450);
					}
				}else
					{
					if(combatants[1].units[i].element==Element.Fire)
					{
						magAttackSprite[combatants[1].units[i].attackAniStage].draw(battleCanvas, xp+50+(25*(combatants[1].units[i].attackStage+1))-combatants[1].units[i].attacking/2, 135+i*2*45);
					}else if(combatants[1].units[i].element==Element.Ice)
					{
						icemagAttackSprite[combatants[1].units[i].attackAniStage].draw(battleCanvas, xp+50+(25*(combatants[1].units[i].attackStage+1))-combatants[1].units[i].attacking/2, 135+i*2*45);
					}else if(combatants[1].units[i].element==Element.Wind)
					{
						windmagAttackSprite[combatants[1].units[i].attackAniStage].draw(battleCanvas, xp+50+(25*(combatants[1].units[i].attackStage+1))-combatants[1].units[i].attacking/2, 135+i*2*45);
					}
				}	
			} 
		}
		battleCanvas.globalAlpha=0.60;
        if(combatants[1].units[i].hasStatus(Status.Poison)) {poisonsprite.draw(battleCanvas, xp-40-combatants[0].units[i].attacking/2, 135+i*2*45);}
	    if(combatants[1].units[i].hasStatus(Status.Protect)) {protectsprite.draw(battleCanvas, xp-40-combatants[0].units[i].attacking/2, 135+i*2*45);}
	    if(combatants[1].units[i].hasStatus(Status.Reflect)) {reflectsprite.draw(battleCanvas, xp-40-combatants[0].units[i].attacking/2, 135+i*2*45);}
	    if(combatants[1].units[i].hasStatus(Status.Regen)) {regensprite.draw(battleCanvas, xp-40-combatants[0].units[i].attacking/2, 135+i*2*45);}
		battleCanvas.globalAlpha=1;
		//battleCanvas.restore();

    }
    battleCanvas.fillStyle = "white";
    var texticle= "Turns:" +(combatants[0].turns+combatants[1].turns) + "/"+battlelength;
    battleCanvas.fillText(texticle, 360, 132);
    if(battlePause) {//in battle menu
        battleCanvas.fillText("battle pause!", 350, 432);
    }
   


	bmenuBox.draw(battleCanvas);
	if(isBattle){armies[0].cards[CSELECTED].sprite.draw(battleCanvas,760, 560);}
	if(battleReport) {battleCanvas.fillText(won, 430, 370);}
	   monsta.draw(battleCanvas,camera);
}

initArmies();
if(MUSIC_ON){
	document.getElementById("titleAudio").volume=MUSIC_VOL;
	document.getElementById("titleAudio").play(); //starts music
}

function mainMenuDraw(){
	canvas.fillStyle = "black";
	canvas.fillRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
	titlesprite.draw(canvas,0,0);
	canvas.fillStyle = "white";
	canvas.font = "16pt Calibri";
	//canvas.fillText("Press Enter",200,500);
	canvas.fillText("  New Game",175,450);
	canvas.fillStyle = "grey";
	canvas.fillText("  Load Game",175,475);

	if(mmcur){
		canvas.fillText("-",160,450);
	}else	{
		canvas.fillText("-",160,475);

	}
	monsta.draw(canvas,camera);
	//canvas.fillText("Particles: "+ monsta.particles.length,460,550);
};

function mainMenuUpdate(){
	var tick=0;
	lasttime=milliseconds;
    timestamp = new Date();
    milliseconds = timestamp.getTime();
    tick++;
	monsta.update();
	 if(debugkey.check()) {
		MUSIC_ON=!MUSIC_ON;
		document.getElementById("titleAudio").pause();
		//monsta.startOrbit(40000,Math.floor(Math.random()*CANVAS_WIDTH),Math.floor(Math.random()*CANVAS_HEIGHT),60);
	 }
	if(startkey.check()){
		mode=1;
	}
	if(downkey.check()){
		mmcur=!mmcur;
	}
	if(upkey.check()){
		mmcur=!mmcur;
	}
};

function reqsMet(dex){
	if(dex==0) {return true;}
	for(var i=0;i<maps[dex].numReqs;i++)
	{
		if(maps[maps[dex].preReq[i]].team==1)
		{
			return false;
		}
	}
	return true;
};


function worldMapDraw(){
worldmapsprite.draw(canvas,0,0);
	if(starting) {
		canvas.font = "16pt Calibri";
		canvas.fillStyle = "white";
		canvas.fillText("LOADING....", 740, 627);
	}
	var prevPoint=maps[0];
	canvas.beginPath();
	canvas.lineWidth = 7;
	canvas.moveTo(maps[0].x+14,maps[0].y+17);
	for(var i=0;i<numMapPoints;i++)
	{
		if((i==0) || (reqsMet(i)))
		{
			canvas.lineTo(maps[i].x+14,maps[i].y+17);
			prevPoint=maps[i];
		}
	}
	
	canvas.stroke();
	canvas.closePath();//todo multiple lines?
	for(var i=0;i<numMapPoints;i++)
	{

		
		if(maps[i].team==0)
		{
			bluelocationsprite.draw(canvas,maps[i].x,maps[i].y);
			
		}else
		{
			if((i==0) || (reqsMet(i)))
				{

					//canvas.moveTo(prevPoint.x+14,prevPoint.y+17);

					redlocationsprite.draw(canvas,maps[i].x,maps[i].y);

				}
				

		}

		
	}

	armies[0].leader.sprite.draw(canvas,maps[mapSelected].x-1,maps[mapSelected].y+2);
	canvas.font = "19pt Algerian";
	canvas.textAlign = "center";
	canvas.textBaseline = "middle";
	canvas.fillStyle = "black";
	canvas.fillText(maps[mapSelected].name,600,100);
	canvas.font = "16pt Calibri";
	
	if(((reqsMet(mapSelected)))&&(startkey.check())){
		canvas.font = "16pt Calibri";
		canvas.fillStyle = "white";
		canvas.fillText("LOADING....", 740, 627);
		starting=true;
		return;
	}
};




function worldMapUpdate(){
	var tick=0;
	lasttime=milliseconds;
    timestamp = new Date();
    milliseconds = timestamp.getTime();
    tick++;
	
	//check for clicks on maps, move there or close as possible.
	//check for key for menu
	if(debugkey.check()){
		for(var i=0;i<numMapPoints;i++)
		{
			maps[i].team=0;
		}
	}
	if(tabkey.check()){
		//if(maps(mapSelected+1).team==0){ todo
		if((true/*mapSelected<1*/) && (reqsMet(mapSelected+1)))
		{
			mapSelected++;
		}	
		if(mapSelected>numMapPoints-1){mapSelected=0;}
	}

	if(starting)
	{
		if(mapSelected==0){
			MAPNAME="map1";
		}else if(mapSelected==1){
			MAPNAME="map3";
		}else if(mapSelected==2){
			MAPNAME="map7";
		}else if(mapSelected==3){
			MAPNAME="map";
		} else if(mapSelected==4){
			MAPNAME="map4";
		
		}
		victory=false;
		$.getJSON("/maps/"+MAPNAME+".txt", function(data) 
			{


				armies[0].baseName=data.town0.name;
				armies[0].basex=data.town0.x;
				armies[0].basey=data.town0.y;
				armies[1].baseName=data.town1.name;
				armies[1].basex=data.town1.x;
				armies[1].basey=data.town1.y;
				
				for(var p=0;p<maps[mapSelected].numTowns;p++)
				{
					towns[p]=new town();
					//if(p>1){
					//towns[p].name=tname[mapSelected][p-2];
					//}	
				}
			
				towns[0].x=armies[0].basex;
				towns[0].y=armies[0].basey;
				towns[0].team=0;
				towns[0].spouted=true;
				towns[0].name=armies[0].baseName;
				towns[1].x=armies[1].basex
				towns[1].y=armies[1].basey
				towns[1].name=armies[1].baseName;
				towns[1].speaker=data.town1.speaker;
				towns[1].plotText[0]=data.town1.text1;
				towns[1].plotText[1]=data.town1.text2;
				towns[1].plotText[2]=data.town1.text3;
				towns[1].plotText[3]=data.town1.text4;
				towns[1].itemChance=data.town1.itemchance;
				
				towns[2].x=data.town2.x;
				towns[2].y=data.town2.y;
				towns[2].name=data.town2.name;
				towns[2].speaker=data.town2.speaker;
				towns[2].plotText[0]=data.town2.text1;
				towns[2].plotText[1]=data.town2.text2;
				towns[2].plotText[2]=data.town2.text3;
				towns[2].plotText[3]=data.town2.text4;
				towns[2].itemChance=data.town2.itemchance;
				
				towns[3].x=data.town3.x;
				towns[3].y=data.town3.y;
				towns[3].name=data.town3.name;
				towns[3].speaker=data.town3.speaker;
				towns[3].plotText[0]=data.town3.text1;
				towns[3].plotText[1]=data.town3.text2;
				towns[3].plotText[2]=data.town3.text3;
				towns[3].plotText[3]=data.town3.text4;
				towns[3].itemChance=data.town3.itemchance;
				
				towns[4].x=data.town4.x;
				towns[4].y=data.town4.y;
				towns[4].name=data.town4.name;
				towns[4].speaker=data.town4.speaker;
				towns[4].plotText[0]=data.town4.text1;
				towns[4].plotText[1]=data.town4.text2;
				towns[4].plotText[2]=data.town4.text3;
				towns[4].plotText[3]=data.town4.text4;
				towns[4].itemChance=data.town4.itemchance;
				
				towns[5].x=data.town5.x;
				towns[5].y=data.town5.y;
				towns[5].name=data.town5.name;
				towns[5].speaker=data.town4.speaker;
				towns[5].plotText[0]=data.town5.text1;
				towns[5].plotText[1]=data.town5.text2;
				towns[5].plotText[2]=data.town5.text3;
				towns[5].plotText[3]=data.town5.text4;
				towns[5].itemChance=data.town5.itemchance;

				curMap.buildMap(MAPNAME);
				mapInitArmies();

				mode=2;
				camera.center(armies[0].squads[0]);
				gamestart=true;
				starting=false;
				mapDirty=true;
				armies[1].leader.name=towns[1].speaker;
				if(MUSIC_ON){
					document.getElementById("titleAudio").pause();
					document.getElementById("mapAudio").volume=MUSIC_VOL;
					document.getElementById("mapAudio").play();
					
				}	
				lastEventX=armies[1].basex;
				lastEventY=armies[1].basey;

			})
		
		var bot=[];
		bot.x=armies[0].basex;
		bot.y=armies[0].basey;
		camera.center(bot);

		canvas.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);

	}
};

//------------MAIN DRAW-----------------------------------------
function mapDraw() {
	canvas.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
	curMap.draw(camera);
	if(isMenu==1) 
    {
        var looseIndex=0;
		menuDraw();
        //draw out squad
        canvas.fillStyle = "white";
        canvas.fillRect(284,110,16,470);
		if(MSELECTED>armies[0].numSquads-1) {MSELECTED=0;}
        for(var i=0;i<armies[0].squads[MSELECTED].numUnits;i++)
        {
            if((armies[0].squads[MSELECTED].units[i]==null)||(!armies[0].squads[MSELECTED].units[i].alive)) {continue;}
            var closs=armies[0].squads[MSELECTED].units[i].getClassName();
            var xp=80;
            canvas.fillText("HP:", xp, 130+i*2*45);
            canvas.fillText(armies[0].squads[MSELECTED].units[i].hp, xp+30, 130+i*2*45);
            canvas.fillText("/", xp+60, 130+i*2*45);
            canvas.fillText(armies[0].squads[MSELECTED].units[i].maxhp, xp+70, 130+i*2*45);
            canvas.fillText("Lvl:", xp+100, 130+i*2*45);
            canvas.fillText(armies[0].squads[MSELECTED].units[i].level, xp+130, 130+i*2*45);


            canvas.fillText("Name:", xp, 172+i*2*45);
            canvas.fillText(armies[0].squads[MSELECTED].units[i].name, xp+52, 172+i*2*45);
            canvas.fillText(closs, xp, 158+i*2*45);

            armies[0].squads[MSELECTED].units[i].sprite.draw(canvas, xp-40, 135+i*2*45);

            if(armies[0].squads[MSELECTED].units[i].hasStatus(Status.Poison)) {poisonsprite.draw(canvas, xp-40-armies[0].squads[MSELECTED].units[i].attacking/2, 135+i*2*45);}
            if(armies[0].squads[MSELECTED].units[i].hasStatus(Status.Poison)) {poisonsprite.draw(canvas, xp-40-armies[0].squads[MSELECTED].units[i].attacking/2, 135+i*2*45);}

        }
		canvas.fillStyle = "white";
		canvas.fillText("Cost:", 50, 560);
        canvas.fillText(armies[0].squads[MSELECTED].getCost(), 90, 560);
		canvas.fillText("Ali:", 140, 560);
        canvas.fillText(armies[0].squads[MSELECTED].getAli(), 165, 560);
		var babydick=pageCount*10+10;
		if(babydick>armies[0].numLooseUnits){
			babydick=armies[0].numLooseUnits;
		}
        for(var i=pageCount*10;i<babydick;i++)
        {
            if((armies[0].looseUnits[i]==null)||(!armies[0].looseUnits[i].alive)) {continue;}
            var closs=armies[0].looseUnits[i].getClassName();
            var xp=360;
			var yp=130+(i-pageCount*10)*2*45;
			if((i-pageCount*10)>4) {xp=560; yp=130+((i-pageCount*10)-5)*2*45;}
            canvas.fillText("HP:", xp, yp);
            canvas.fillText(armies[0].looseUnits[i].hp, xp+30, yp);
            canvas.fillText("/", xp+60, yp);
            canvas.fillText(armies[0].looseUnits[i].maxhp, xp+70, yp);
            canvas.fillText("Lvl:", xp+100, yp);
            canvas.fillText(armies[0].looseUnits[i].level, xp+130, yp);


            //canvas.fillStyle = "blue";
            canvas.fillText("Name:", xp, yp+42);
            canvas.fillText(armies[0].looseUnits[i].name, xp+52, yp+42);
            canvas.fillText(closs, xp, yp+28);

            armies[0].looseUnits[i].sprite.draw(canvas, xp-40, yp);

            if(armies[0].looseUnits[i].hasStatus(Status.Poison)) {poisonsprite.draw(canvas, xp-40-armies[0].looseUnits[i].attacking/2, yp+5);}
            if(armies[0].looseUnits[i].hasStatus(Status.Poison)) {poisonsprite.draw(canvas, xp-40-armies[0].looseUnits[i].attacking/2, yp+5);}

        }
	if(!sideBar){
			xp=360;
			if(looseX>1) {xp=540;}
            selector.draw(canvas, xp-40+looseX*200, looseY*2*45+84+45);
        }else
        {
            selector.draw(canvas, 40, looseY*2*45+92+45);
        }
		var txte="";
		if (armies[0].squads[MSELECTED].canSwim()) {txte="Can Swim";}
		if (armies[0].squads[MSELECTED].getFlightHeight()>0) {txte="Low Flying";}
		if (armies[0].squads[MSELECTED].getFlightHeight()>1) {txte="High Flying";}
		canvas.fillText(txte,460,570);
		canvas.fillText("Page: "+ (pageCount+1)+ "/4",760,570);
        return;
	}else if (isMenu==2)
    {
        //menuDraw();
		if(!sideBar) {
			if(armies[0].looseUnits[pageCount*10+looseX*5+looseY]!=null){
				armies[0].looseUnits[pageCount*10+looseX*5+looseY].drawInfo();
			}else
			{
				isMenu=1;
			}
		}else
		{
			if(armies[0].squads[MSELECTED].numUnits>looseY){
				armies[0].squads[MSELECTED].units[looseY].drawInfo();
			}
		}
		return;
	}else if (isMenu==3)
	{
		armies[0].drawEquipScreen();
		return;
	}//non-menu drawing
	for(var i=0;i<maps[mapSelected].numTowns;i++)
    {
		towns[i].draw(camera);
    }
	armies[0].getVisible(armies[1]);
	if(armies[0].visibleEnemies!=null){
		for (var i=0;i<armies[0].visibleEnemies.length;i++) {
			armies[0].visibleEnemies[i].draw(camera);
			if(isOver(armies[0].visibleEnemies[i],camera)) { drawmousetext(armies[0].visibleEnemies[i],camera); };
			
		}
    }



    for (var i=0;i<armies[0].numSquads;i++) {
        if((isOver(armies[0].squads[i],camera))&&(armies[0].squads[i].alive)&&(armies[0].squads[i].deployed)) { drawmousetext(armies[0].squads[i],camera); }

    }
	
    canvas.globalAlpha=0.00;
    if(theTime.hours>8){canvas.globalAlpha=0.20;}
    if(theTime.hours>12){canvas.globalAlpha=0.30;}
    if(theTime.hours>16){canvas.globalAlpha=0.40;}
    if(theTime.hours>20){canvas.globalAlpha=0.50;}
    canvas.fillStyle="#1B1733 ";//"#483D8B ";
    canvas.fillRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
    canvas.globalAlpha=1;

	for (var i=0;i<maps[mapSelected].numTowns;i++) {
        if (isOver(towns[i],camera)){drawtowntext(towns[i],camera);}
    }
	for (var i=0;i<armies[0].numSquads;i++) {
        armies[0].squads[i].draw(camera);
		if ((i==SELECTED)&&(armies[0].squads[i].path!=null)) {armies[0].squads[i].drawdest(camera);}
		if(armies[0].squads[i].selected)
		{
			selector2.draw(canvas, (armies[0].squads[i].x * 16 + (Math.round(armies[0].squads[i].bx) - 8) - camera.x * 16) / Math.pow(2, curMap.zoom-1), (armies[0].squads[i].y * 16 + (Math.round(armies[0].squads[i].by) - 8) - camera.y * 16) / Math.pow(2, curMap.zoom-1));

		}
    }
	if(armies[0].squads[SELECTED])//TODO: fuck selected.
	{
		selector.draw(canvas, (armies[0].squads[SELECTED].x * 16 + (Math.round(armies[0].squads[SELECTED].bx) - 8) - camera.x * 16) / Math.pow(2, curMap.zoom-1), (armies[0].squads[SELECTED].y * 16 + (Math.round(armies[0].squads[SELECTED].by) - 8) - camera.y * 16) / Math.pow(2, curMap.zoom-1));
    }
	if(bConsoleStr[bConsoleStr.length-4-bConsoleBox.scroll]!=null){
		bConsoleBox.msg[0]=bConsoleStr[bConsoleStr.length-4-bConsoleBox.scroll];
	}
	if(bConsoleStr[bConsoleStr.length-3-bConsoleBox.scroll]) 
	{
		bConsoleBox.msg[1]=bConsoleStr[bConsoleStr.length-3-bConsoleBox.scroll];
	}
	if(bConsoleStr[bConsoleStr.length-2-bConsoleBox.scroll]) 
	{
		bConsoleBox.msg[2]=bConsoleStr[bConsoleStr.length-2-bConsoleBox.scroll];
	}
	if(bConsoleStr[bConsoleStr.length-1-bConsoleBox.scroll]) 
	{
		bConsoleBox.msg[3]=bConsoleStr[bConsoleStr.length-1-bConsoleBox.scroll];
	}
	{	
		bConsoleBox.draw(canvas);
	}


    if(unitinfo) {
        if((isBattle) || (battleReport)){
            armies[0].squads[SELECTED].units[BSELECTED].drawInfo();
        }else {
            armies[0].squads[SELECTED].leader.drawInfo();
        }
    }
	canvas.globalAlpha=0.60;
	for(var i=0;i<numClouds;i++)
	{
		clouds[i].update();
		if((curMap.zoom>1) &&(!isBattle)&&(!isMenu)&&(!battleReport)&&(!preBattle))
		{
		//canvas.rotate(clouds[i].ang*Math.PI/180);
		clouds[i].sprite.draw(canvas, clouds[i].x-camera.x*16, clouds[i].y-camera.y*16);
		}
	}
	if((radar) && (!isBattle)&&(!battleReport)&&(!preBattle))
    {
		curMap.drawRadar(camera, CANVAS_WIDTH-MAP_WIDTH-10, CANVAS_HEIGHT-MAP_HEIGHT-10,armies);
    }
	canvas.globalAlpha=1;
	if(preBattle)
	{
		battleBox.draw(canvas);
	}

	if(townbox.exists)
	{
		townbox.draw(canvas);
		if((startkey.check())|| (escapekey.check())){
			townbox.exists=false;
			paused=false;
		}
	}

	armyInfo();
	if(projectionCount>0)
	{
		projectionCount--;
		armies[0].drawProjections();
		paused=true;
		if (projectionCount==0)
		{
			paused=false;
			
		
		}
		
	}
	
	drawSelBox(canvas); //not during battle?
	canvas.fillStyle="white";
	if((paused) && (!battleReport)) {canvas.fillText("P A U S E D", 450, 370);}

	
	if(victory)
	{
		canvas.font = "19pt Algerian";
		canvas.fillText("CONGRADULATIONS",380,310);
		monsta.update();
		monsta.draw(canvas,camera);
		victoryReport--;
		if(victoryReport<1)
		{ 
			victoryReport=200;
			victoryReporting=true;
		}
		if(victoryReporting)
		{
			canvas.fillStyle = "white";
			armies[0].drawResults();
			victoryCount++;
			if(victoryCount>victoryLap)
			{
				victoryCount=0;
				endGame(0);
				victory=false;
				victoryReporting=false;
			}
		}	
		var stamp=new Date();
		gil=stamp.getTime();
		if(gil-lastExplosion>EXPLOSION_RATE){
			monsta.explosion(150,Math.floor(Math.random()*CANVAS_WIDTH),Math.floor(Math.random()*CANVAS_HEIGHT/2),4);
			lastExplosion=gil;
		}
		
	}
   
};
//------------MAIN LOOP-----------------------------------------
function mapUpdate()
{
	if(!gamestart) return;
	if((!isBattle) &&(!preBattle)&&(isMenu==0)&&(!paused)&&(!battleReport)) {
        theTime.update(towns,armies[0]);
    }
	var tick=0;	
    lasttime=milliseconds;
    timestamp = new Date();
    milliseconds = timestamp.getTime();
    tick++;
	if ((milliseconds-lastani>WATER_RATE) &&(!isBattle))
	{
		tileani++;
		lastani=milliseconds;
		anicount=0;
		mapDirty=true;
    }
    if (tileani>3) {tileani=0} //tile animations
	if(armies[1].lastDeployed<armies[1].numSquads-1)
	{
		enemyDeployCount++;
		if(enemyDeployCount>deployRate)
		{
			enemyDeployCount=0;
			armies[1].squads[armies[1].lastDeployed].deploy();
			armies[1].squads[armies[1].lastDeployed].x=armies[1].basex;
			armies[1].squads[armies[1].lastDeployed].y=armies[1].basey;
            armies[1].lastDeployed++; 
		}
	}
	if((deploykey.check())&&(isMenu==0))
	{ 
        if (armies[0].lastDeployed>armies[0].numSquads-1)
		{
            //return;
        }else
        {
            armies[0].squads[armies[0].lastDeployed].deploy();
			armies[0].squads[armies[0].lastDeployed].x=armies[0].basex;
			armies[0].squads[armies[0].lastDeployed].y=armies[0].basey;
            armies[0].lastDeployed++; 
        }
    }
    if(menukey.check()) 
	{
        if(!isBattle) 
        {
            if(isMenu==1) 
            {   
                isMenu=0;
            }else if(isMenu==2)
            {
                isMenu=0;
            }else if(isMenu==3)
            {
                isMenu=0;
            }else
            {
                isMenu=1;
            }
            
        }
    }
	if(helpkey.check())
	{
		if(isMenu==0)
		{
			alert("Arrow keys=move camera, Z=zoom, X=cycle gamespeed,O=toggle ally AI,S=get squad status,shift=cycle units, space = pause, R=row,A=change AI,F=Flee");
		}else 
		{
			alert("M=exit menu,Shift=cycle squads, Arrow keys=cursor, space=select unit/toggle menues, N = form new squad, D=remove unit from squad, A= add unit too squad. Pageup/down scroll pages.");
		}
		
	}
	if(isMenu==1) 
    {

	if(tabkey.check())
	{
		MSELECTED++;
		looseY=0;
		if(MSELECTED>armies[0].numSquads-1)
		{
			MSELECTED=0;
		}
		
	}
	if(downkey.check())
	{
		looseY++;
		if((looseY>armies[0].squads[MSELECTED].numUnits-1)&&(sideBar)) { looseY=armies[0].squads[MSELECTED].numUnits-1;}
		if(looseY>4) looseY=0;
	}else if(upkey.check())
	{
		looseY--;
		if(looseY<1) { looseY=0;}
		
	}else if(leftkey.check())
	{
		looseX--;
		if(looseX<0) { looseX=0;sideBar=true;if(looseY>armies[0].squads[MSELECTED].numUnits) {looseY=armies[0].squads[MSELECTED].numUnits-1;}}
		
	}else if(rightkey.check())
	{
		if(!sideBar){
			looseX++;
			if(looseX>1) { looseX=1;}
		}else
		{
			sideBar=false;
		}
            
   }
	if(pageupkey.check())
	{
		if (pageCount>0){ pageCount--;}
	}
	if(pagedownkey.check())
	{
		if (pageCount<3){ pageCount++;}
	}
	looseIndex= (pageCount*10)+(looseX*5)+looseY;
	if(addkey.check())
	{
		if(!sideBar)
		{
			if((armies[0].numLooseUnits>0) && (looseY<armies[0].numLooseUnits) &&(armies[0].looseUnits[looseIndex]!=null))
			{
				if(armies[0].squads[MSELECTED].addUnit(armies[0].looseUnits[looseIndex]))
				{ //TODO
					armies[0].removeLoose(looseIndex);
				}else {console.log("Could not add unit, no free slots.");bConsoleClr.push("red");bConsoleStr.push("Could not add unit, no free slots.");}
			}else {console.log("No unit to add!");bConsoleClr.push("red"); bConsoleStr.push("No unit to add!");}
		}
	}
	if(newkey.check())
	{
		if(!sideBar)
		{
			if((looseY>armies[0].numLooseUnits-1) || (armies[0].looseUnits[looseIndex]==null)){ console.log("select a leader!");}
			else if(!armies[0].looseUnits[looseIndex].canlead)
			{
				console.log("This unit cannot lead!");
				bConsoleStr.push("This unit cannot lead!");
				bConsoleClr.push("red");
			}else
			{
				if((armies[0].looseUnits[looseIndex]!=null)&&(armies[0].addSquad(armies[0].looseUnits[looseIndex])))
				{
					armies[0].removeLoose(looseIndex);
					var tmpstr=armies[0].squads[armies[0].numSquads-1].leader.name + " 's squad has been created";
					console.log(tmpstr);
					bConsoleStr.push(tmpstr);
					bConsoleClr.push("white");
				}else {console.log("Select a unit!");bConsoleStr.push("Select a unit!");bConsoleClr.push("red");}
			}
		}
	}
	if(removekey.check())
	{
		if(sideBar){
			if(armies[0].squads[MSELECTED].units[looseY]==armies[0].leader)
			{
				console.log("Cannot disband this squad.");
				bConsoleStr.push("Cannot disband this squad.");
				bConsoleClr.push("red");
			}else if(armies[0].squads[MSELECTED].units[looseY]==armies[0].squads[MSELECTED].leader)
			{
				console.log("Squad disbanded.");
				bConsoleStr.push("Squad disbanded.");
				bConsoleClr.push("white");
				for (var i=0;i<armies[0].squads[MSELECTED].numUnits;i++)
				{
					armies[0].addLoose(armies[0].squads[MSELECTED].units[i]);
				}
				armies[0].removeSquad(armies[0].squads[MSELECTED].ID);
			}else{
				if(armies[0].addLoose(armies[0].squads[MSELECTED].units[looseY]))
				{
					armies[0].squads[MSELECTED].removeUnit(looseY); //TODO
					looseY=0;
				}else {console.log("Could not remove unit, no free slots.");bConsoleClr.push("red");bConsoleStr.push("Could not remove unit, no free slots.");}
			}
		}
	}
       
	if(enterkey.check())
	{
		isMenu=2;
		
	}

    }else if (isMenu==2)
    {
		if(!sideBar) {
			if(armies[0].looseUnits[pageCount*10+looseX*5+looseY]!=null)
			{
				//armies[0].looseUnits[pageCount*10+looseX*5+looseY].drawInfo();
			}else
			{
				isMenu=1;
			}
		}else
		{
			if(armies[0].squads[MSELECTED].numUnits>looseY)
			{
				//armies[0].squads[MSELECTED].units[looseY].drawInfo();
			}
		}
        if(removekey.check())
		{
			if(sideBar){
				armies[0].removeAll(armies[0].squads[MSELECTED].units[looseY]);
			}else
			{
				armies[0].removeAll(armies[0].looseUnits[pageCount*10+looseX*5+looseY]);
			}
		}
		if(optkey.check())
		{
			if(sideBar){
				armies[0].optimizeUnit(armies[0].squads[MSELECTED].units[looseY]);
			}else
			{
				armies[0].optimizeUnit(armies[0].looseUnits[pageCount*10+looseX*5+looseY]);
			}
		}

        if(tabkey.check())
        {
            if(sideBar){
				looseY++;
				if (looseY>4) {looseY=0;}
				if(MUSELECTED>armies[0].squads[MSELECTED].numUnits-1)
				{
					MUSELECTED=0;
				}
			}else
			{
				looseY++;
				if (looseY>4) {looseY=0;}
			}
            
        }
        if(enterkey.check())
        {
            isMenu=3;
        }
        return;
    }else if (isMenu==3)
	{
		//armies[0].drawEquipScreen();
		
		if(enterkey.check())
        {
            isMenu=1;
        }
		return;
	}
	//main map doing stuff
    if(zoomkey.check()) {
        curMap.setZoom(camera);
    }
	if(!victory)
	{
		for (var i=0;i<armies[0].numSquads;i++) //path setting
			{
				if((!armies[0].squads[i].alive) || (!armies[0].squads[i].deployed)) {continue;}
				armies[0].squads[i].update(curMap);
				if(armies[0].squads[i].path!=null) {continue;}
				if(armies[0].fieldAI==AITypes.Random)
				{
					if( (!armies[0].squads[i].path) && (randomwalk) && (i != SELECTED) ) 
					{
						var cx=Math.floor(Math.random()*(MAP_WIDTH));
						var cy=Math.floor(Math.random()*(MAP_HEIGHT));
						while(!curMap.walkable(cx,cy,armies[0].squads[i])){
							cx=Math.floor(Math.random()*(MAP_WIDTH));
							cy=Math.floor(Math.random()*(MAP_HEIGHT));
						}
						armies[0].squads[i].setDestination(cx,cy,curMap); 
					}
				}else if(armies[0].fieldAI==AITypes.Rush)
				{
					if( (!armies[0].squads[i].path) && (!((armies[0].squads[i].x==armies[1].basex) &&(armies[0].squads[i].y==armies[1].basey))))
					{
						armies[0].squads[i].setDestination(armies[1].basex,armies[1].basey,curMap); 
					}
				}
			}
			
			for(var i=0;i<armies[1].numSquads;i++){ 
				if((!armies[1].squads[i].alive) || (!armies[1].squads[i].deployed)) {continue;}
				armies[1].squads[i].update(curMap);
				if(armies[1].squads[i].path!=null) {continue;}
				if(armies[1].fieldAI==AITypes.Random){
					if((armies[1].squads[i].isViable())&&(!armies[1].squads[i].path) && (gamestart)&&(i != 0 )) {
						var cx=Math.floor(Math.random()*(MAP_WIDTH));
						var cy=Math.floor(Math.random()*(MAP_HEIGHT));
						while(!curMap.walkable(cx,cy,armies[1].squads[i])){
							cx=Math.floor(Math.random()*(MAP_WIDTH));
							cy=Math.floor(Math.random()*(MAP_HEIGHT));
						}
						armies[1].squads[i].setDestination(cx,cy,curMap); };
				}else if(armies[1].fieldAI==AITypes.Rush){
					if( (!armies[1].squads[i].path)&& (i != 0 ) && (!((armies[1].squads[i].x==armies[0].basex) &&(armies[1].squads[i].y==armies[0].basey)))) {
						armies[1].squads[i].setDestination(armies[0].basex,armies[0].basey,curMap); };
				}
			}
    }

	if((preBattle) &&(!paused)&&(!isMenu))
	{
			camera.update();
            preBattle--; 
            if (preBattle<1){
				preBattle=0;
				isBattle=true;
				battleCanvas.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
				//battleCanvas.show(); todo
                //paused=true;
            }
	}


       
    /*for (var i=0;i<armies[1].numSquads;i++) {
		armies[1].squads[i].draw(camera);
        if(isOver(armies[1].squads[i],camera)) { drawmousetext(armies[1].squads[i],camera); };
        
    }*/
	
	var cspd=1;
	if(keydown["shift"]){
		cspd=5;
	}
	if((!isBattle) &&(!preBattle) &&(!isMenu))
	{
		if(keydown.left)
		{
			camera.x -= cspd*curMap.zoom;
			if (camera.x<0) {camera.x=0;}
			mapDirty=true;
			if(selBox.p2)
			selBox.exists=false;
		}
		
		if(keydown.right) {
			camera.x += cspd*curMap.zoom;
			if (camera.x>(MAP_WIDTH-(camera.width*curMap.zoom))) {camera.x=MAP_WIDTH-(camera.width*curMap.zoom);}
			mapDirty=true;
			if(selBox.p2)
			selBox.exists=false;
		}
		
		if(keydown.up) {
			camera.y -= cspd*curMap.zoom;
			if (camera.y<0) {camera.y=0;}
			mapDirty=true;
			if(selBox.p2)
			selBox.exists=false;
		}
		
		if(keydown.down) {
			camera.y += cspd*curMap.zoom;
			if (camera.y>(MAP_HEIGHT-(camera.height*curMap.zoom))) {(camera.y=MAP_HEIGHT-(camera.height*curMap.zoom));}
			mapDirty=true;
			if(selBox.p2)
			selBox.exists=false;
		}
    }
    if (ksavekey.check()) {randomwalk=!randomwalk;}

    if(isBattle)
	{
        if (tabkey.check()) {BSELECTED++; if(BSELECTED>armies[0].squads[SELECTED].numUnits-1) {BSELECTED=0;}}
    }else if (!preBattle){
        if (tabkey.check()) {
			armies[0].toggleSelected();
		}
    }

    if ((armies[0].squads[SELECTED]) && ((!armies[0].squads[SELECTED].alive) || (!armies[0].squads[SELECTED].deployed))) {
		if(!armies[0].toggleSelected()) {alert("you lose");endGame(0);}
	}

	 if(debugkey.check()) {
		if(isMenu==0)
		{
			victory=true;
		}else
		{
			armies[0].buildSquad();
		}
	}
	
    if(pausekey.check()) 
	{
        if(isBattle)
		{
            battlePause=!battlePause;
        }else
        {
            paused=!paused; 
            battleReport=false; 
        }
    }
    
    if(createkey.check())
	{
        if (armies[0].numSquads>TEAM_SIZE-1)
		{
            //return;
        }else
        {
            armies[0].numSquads++;
            armies[0].squads[armies[0].numSquads-1]=new squad();
            armies[0].squads[armies[0].numSquads-1].team=0;
            armies[0].squads[armies[0].numSquads-1].ID=armies[0].numSquads-1;
            armies[0].squads[armies[0].numSquads-1].deployed=false;
        }
    }

    
    
    if(zoomkey.check()) {
        curMap.setZoom(camera);
    }
    

	
    if(aikey.check())
	{
        armies[0].squads[SELECTED].battleAI++;
        if (armies[0].squads[SELECTED].battleAI>2) {armies[0].squads[SELECTED].battleAI=0;}
    }
    
    if(rowkey.check()) 
	{
        if(!isBattle)
        {
            armies[0].squads[SELECTED].row();
        }else
            armies[0].squads[SELECTED].units[BSELECTED].rowswap();
    }

    if(cardkey.check()) 
	{
        if((isBattle) && (!cardUsed))
        {
            armies[0].cards[CSELECTED].type=CSELECTED;
            armies[0].cards[CSELECTED].setSprite();
            armies[0].cards[CSELECTED].use(combatants[0],combatants[1]);
			cardUsed=true;
        }
    }
	
	if(cardcyclekey.check())
	{
            CSELECTED++;
            if(CSELECTED>4) { CSELECTED=0;}
    }
    
    if(fleekey.check())
	{
        armies[0].squads[SELECTED].flee();
    }

    if(radarkey.check())
    {
        radar=!radar;
    }
    
    
    if((isBattle) || (battleReport)) 
	{
		battleDo();

    }

    if(speedkey.check())
	{
        gamespeed++;
        if (gamespeed>2) {gamespeed=0;}
    }
    
    if(unitinfokey.check())
	{
	
        unitinfo=!unitinfo;
    }
    if(statuskey.check())
	{
		camera.pan(lastEventX,lastEventY);
    }
	
	if ((tick>gamespeed) && (!isBattle)&&(!preBattle))
	{
		camera.update();
        tick=0;
        if(battleReport)
		{
            battleendtick++; 
            if (battleendtick>BATTLE_REPORT_LENGTH)
			{
                battleReport=false;
                //paused=true;
				//battleCanvas.hide();
				if(MUSIC_ON){
					//document.getElementById("battleAudio").pause();
					document.getElementById("defeatAudio").pause();
					//document.getElementById("mapAudio").currentTime = 0;
					document.getElementById("mapAudio").play();
				}

				battleCanvas.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
                battleendtick=0;
            }
        }
	}

	
    checkEndGame();

}
merp();
