function particle(){
	this.alive=false;
	this.x=0;
	this.y=0;
	this.color=bColors[Math.floor(Math.random()*8)];
	this.gravity=false;
	this.xv=0;
	this.yv=0;
	this.textured=false;
	//this.texture=
	this.size=6;
	this.speed=(Math.random()*4)+1;
	this.orbiting=false;
	this.orbx=0;
	this.orby=0;
	this.orbitDiameter=4;
	this.orbitTrack=0;
	this.orbitSpeed=1;
	this.updateRate=40;
	this.destx=0;
	this.desty=0;
	this.gotoDest=false;
	this.lastUpdateTime=0;
	this.startTime=0;
	this.durTime=2000;
	this.gravity=true;
	this.smoker=false;
	this.flicker=true;
	this.exploader=false;
	//this.startTime=
	//this.curTime=
	//this.durTime=2;
	this.update=function(){
		var stamp = new Date();
		var tim=stamp.getTime();
		if(tim-this.startTime>this.durTime) {this.alive=false;}
		if(tim-this.lastUpdateTime<this.updateRate) { return;}
		if(this.orbiting)
		{
			this.orbitTrack+=this.orbitSpeed;
			//if((this.shrinking) && (this.orbitDiameter>1)) {this.orbitDiameter--;}
			if (this.orbitTrack>360){ this.orbitTrack=0;}
			this.x=this.orbx+Math.cos(this.orbitTrack* (Math.PI / 180))*this.orbitDiameter;
			this.y=this.orby+Math.sin(this.orbitTrack*(Math.PI / 180))*this.orbitDiameter;
			this.y+=this.yv;
			if(this.gotoDest)
			{
				if(this.orbx<this.destx) {this.orbx+=this.speed;}
				if(this.orbx>this.destx) {this.orbx-=this.speed;}
				if(this.orby<this.desty) {this.orby+=this.speed;}
				if(this.orby>this.desty) {this.orby-=this.speed;}
				if((Math.abs(this.orbx-this.destx)<5) && (Math.abs(this.orby-this.desty)<5)) {this.gotoDest=false;}
			}
		}else
		{
			this.x+=this.xv;
			this.y+=this.yv;
			if(this.flicker)
			{
				this.color=bColors[Math.floor(Math.random()*8)];
			}

		}
		if(this.gravity)
		{
				this.yv+=0.5;
		}
		//this.counter--;
		//time stuff
		//if (this.counter<1) this.alive=false;


	};
};

function particleSystem(){
	this.particles = new Array();
	this.updateRate=1;
	this.lastUpdate=0;
	this.start=function(dur,x,y,xv,yv,color,gravity,exploader){
		var tod=new particle();
		if(!exploader) {exploader=false;}
		tod.x=x;
		tod.y=y;
		tod.xv=xv;
		tod.yv=yv;
		tod.alive=true;
		tod.counter=dur;
		tod.color=color;
		tod.gravity=gravity
		tod.exploader=exploader;
		var stamp = new Date();
		tod.startTime=stamp.getTime();
		tod.durTime=dur;
		this.particles.push(tod);
	};
	this.startTextured=function(dur,x,y,xv,yv,color,gravity,exploader,spt){
		var tod=new particle();
		if(!exploader) {exploader=false;}
		tod.x=x;
		tod.y=y;
		tod.xv=xv;
		tod.yv=yv;
		tod.alive=true;
		tod.textured=true;
		tod.sprite=Sprite(spt);
		tod.counter=dur;
		tod.color=color;
		tod.gravity=gravity
		tod.exploader=exploader;
		var stamp = new Date();
		tod.startTime=stamp.getTime();
		tod.durTime=dur;
		this.particles.push(tod);
	};
	this.draw=function(can,cam){
		var c=1;
		for(var i=0;i<this.particles.length;i++)
		{
			if(this.particles[i].alive)
			{
				if (true){//this.particles[i].color!=c){
					can.fillStyle = this.particles[i].color;
					c= this.particles[i].color;
				}
				if(this.particles[i].textured)
				{
					this.particles[i].sprite.draw(can, this.particles[i].x+cam.x,this.particles[i].y+cam.y);
				}else
				{
					can.fillRect(this.particles[i].x+cam.x, this.particles[i].y+cam.y, this.particles[i].size*cam.zoom, this.particles[i].size*cam.zoom);
				}
			}
		}
	};
	this.update=function(){
		for(var i=0;i<this.particles.length;i++)
		{
			this.particles[i].update();
			if(!this.particles[i].alive)
			{
				if(this.particles[i].exploader)
				{
					this.explosion(6,this.particles[i].x,this.particles[i].y,4);
				}	
				this.particles.splice(i,1);
			}
		}
	};
	this.explosion=function(num,x,y,force){
		for( var i = 0; i < num;i++) {
			var ang = Math.random()*360;
			var vel = Math.random() * 15 + 8;
			this.start(700, x, y, Math.cos(ang* (Math.PI / 180))*vel, Math.sin(ang*(Math.PI / 180))*vel,bColors[Math.floor(Math.random()*8)],true);
		}
	};
	this.explosionTextured=function(num,x,y,force,txt){
		for( var i = 0; i < num;i++) {
			var ang = Math.random()*360;
			var vel = Math.random() * 15 + 8;
			this.startTextured(700, x, y, Math.cos(ang* (Math.PI / 180))*vel, Math.sin(ang*(Math.PI / 180))*vel,bColors[Math.floor(Math.random()*8)],true,false,txt);
		}
	};
	this.shoot=function(x,y,ang,vel){
		this.start(1000, x, y, Math.cos(ang* (Math.PI / 180))*vel, Math.sin(ang*(Math.PI / 180))*vel,bColors[Math.floor(Math.random()*8)],false);

	};
	this.shootTextured=function(x,y,ang,vel,tex){
		this.startTextured(1000, x, y, Math.cos(ang* (Math.PI / 180))*vel, Math.sin(ang*(Math.PI / 180))*vel,bColors[Math.floor(Math.random()*8)],true,false,tex);

	};
	this.startOrbit=function(dur,x,y,diam){
		var tod=new particle();
		//if(!exploader) {exploader=false;}
		tod.x=x;
		tod.y=y;
		tod.orbx=x;
		tod.orby=y;
		tod.orbiting=true;
		tod.orbitDiameter=diam;
		tod.xv=0;
		tod.yv=0;
		tod.shrinking=true;
		tod.alive=true;
		tod.orbitSpeed=(Math.random()*8)+1;
		tod.textured=true;
		tod.sprite=Sprite("bee");
		tod.counter=dur;
		tod.color="white";
		tod.gravity=false;
		tod.exploader=true;
		var stamp = new Date();
		tod.startTime=stamp.getTime();
		tod.durTime=dur;
		this.particles.push(tod);
	};
	this.swarm=function(x,y){
		for(var i=0;i<this.particles.length;i++)
		{
			if(this.particles[i].orbiting)
			{
				var dx=(Math.random()*64)-32;
				var dy=(Math.random()*64)-32;
				/*this.particles[i].orbx=x+dx;
				this.particles[i].orby=y+dy;*/
				this.particles[i].gotoDest=true;
				this.particles[i].destx=x+dx;
				this.particles[i].desty=y+dy;
			}
		}
	}
	this.unSwarm=function(){
		for(var i=0;i<this.particles.length;i++)
		{
			if(this.particles[i].orbiting)
			{
				this.particles[i].gotoDest=true;
				this.particles[i].destx=Math.floor(Math.random()*CANVAS_WIDTH);
				this.particles[i].desty=Math.floor(Math.random()*CANVAS_HEIGHT);
			}
		}
	}
	this.colonyCollapse=function(){
		for(var i=0;i<this.particles.length;i++)
		{
			if(this.particles[i].orbiting)
			{
				this.particles[i].gravity=true;
			}
		}
	}
};
