// this file needs three.js to work
// random stuff: >_  **** :)  :( ha )  prime[2][3][5][7][11][13] = 0;

/*
	For directions, 0 means forward, 1 means right, 2 means backwards, 3 means left;
*/
function Block(x,y,z,dx,dy,dz){
	this.p = new THREE.Vector3(x,y,z);
	this.d = new THREE.Vector3(dx,dy,dz);
	this.v = new THREE.Vector3();
	this.c = 0x777777;
	this.kill = false;
	this.hit = false;
	this.f = null;
	this.geometry = new THREE.BoxGeometry(1,1,1);
	this.material = new THREE.MeshLambertMaterial({color:this.c});
	this.cube = new THREE.Mesh(this.geometry,this.material);
	this.cube.scale.copy(this.d);
	this.cube.position.copy(this.p);
	this.direction = 0;
	this.cube.receiveShadow = true;
	this.cube.castShadow = true;
}
Block.prototype.update = function() {
	if(this.f) this.f();
	this.p.addVectors(this.p,this.v);
	this.material = new THREE.MeshLambertMaterial({color:this.c});
	this.cube.material = this.material;
	this.cube.scale.copy(this.d);
	this.cube.position.copy(this.p);
};
Block.prototype.copy = function() {
	var b = new Block(this.p.x,this.p.y,this.p.z,this.d.x,this.d.y,this.d.z);
	b.f = this.f;
	b.c = this.c;
	b.direction = this.direction;
	return b;
};
function NormalLine(x,y,z,d){
	this.p = new THREE.Vector3(x,y,z);
	this.d = new THREE.Vector3(d,d,d);
	this.v = new THREE.Vector3();
	this.f = null;
	this.c = 0xFFEE66;
	this.geometry = new THREE.BoxGeometry(1,1,1);
	this.material = new THREE.MeshLambertMaterial({color:this.c});
	this.cube = new THREE.Mesh(this.geometry,this.material);
	this.cube.scale.copy(this.d);
	this.cube.position.copy(this.p);
	this.cube.receiveShadow = false;
	this.cube.castShadow = true;
	this.direction = 0;
	this.dv = 2.56;
	this.inAir = true;
	this.direction = 0;
}
NormalLine.prototype.move = function() {
	if(this.direction == 0){
		this.v.x = 0;
		this.v.z = -this.dv;
	}else if(this.direction == 1){
		this.v.x = this.dv;
		this.v.z = 0;
	}else if(this.direction == 2){
		this.v.x = 0;
		this.v.z = this.dv;
	}else if(this.direction == 3){
		this.v.x = -this.dv;
		this.v.z = 0;
	}
};
NormalLine.prototype.update = function() {
	if(this.f) this.f();
	this.move();
	this.p.addVectors(this.p,this.v);
	this.material = new THREE.MeshLambertMaterial({color:this.c});
	this.cube.material = this.material;
	this.cube.scale.copy(this.d);
	this.cube.position.copy(this.p);
};
NormalLine.prototype.copy = function() {
	var l = new NormalLine(this.p.x,this.p.y,this.p.z,this.d);
	l.f = this.f;
	l.c = this.c;
	l.dv = this.dv;
	l.direction = this.direction;
	return l;
};
function createNormalBlockFromInterval(b,length,diameter,thickness,changeInY,changeInD,f){
	var d1 = b.direction;
	if(d1 == 0){
		var nb = new Block(b.p.x-length/2-changeInD-b.d.x/2,b.p.y+changeInY+b.d.y/2-thickness/2,b.p.z-b.d.z/2+b.d.x/2,length+diameter,thickness,diameter);
		if(f) f(nb);
		nb.direction = 3;
	}else if(d1 == 3){
		var nb = new Block(b.p.x-b.d.x/2+b.d.z/2,b.p.y+changeInY+b.d.y/2-thickness/2,b.p.z-changeInD-length/2-b.d.z/2,diameter,thickness,length+diameter);
		if(f) f(nb);
		nb.direction = 0;
	}
	return nb;
}
function World(scene){
	this.scene = scene;
	this.blocks = [];
	this.Line = new NormalLine(0,0,0,10);
	this.lineIsDead = [false,false];
	this.gravity = 0;
	this.tails = [];
}
World.prototype.init = function() {
	for (var i = this.blocks.length - 1; i >= 0; i--) {
		this.scene.add(this.blocks[i].cube);
	}
	this.scene.add(this.Line.cube);
};
World.prototype.addBlocks = function(blocks) {
	for (var i = blocks.length - 1; i >= 0; i--) {
		this.scene.add(blocks[i].cube);
		this.blocks.push(blocks[i]);
	}
};
World.prototype.addBlock = function(block) {
	this.scene.add(block.cube);
	this.blocks.push(block);
};
World.prototype.removeBlock = function(id) {
	this.scene.remove(this.blocks[id].cube);
	this.blocks.splice(id,1);
};
World.prototype.changeLine = function(newLine) {
	this.scene.remove(this.Line.cube);
	this.Line = newLine.copy();
};
World.prototype.solve = function() {
	var hits = 0;
	for (var i = this.blocks.length - 1; i >= 0; i--) {
		var b = this.blocks[i];
		var test = straightBlockTest(this.Line, b);
		var hit = test[0] && test[1] && test[2];
		if(hit){
			hits++;
			if(b.dead){
				this.lineIsDead = [true,false];
			}else{
				this.Line.v.y = 0;
				this.Line.p.y = b.p.y+b.d.y/2+this.Line.d.y/2;
			}
		}
	}
	if(hits<=0) this.Line.inAir = true;
	else this.Line.inAir = false;

	if(!this.Line.inAir){
		var c = this.Line.c;
		var geometry = new THREE.BoxGeometry(1,1,1);
		var material = new THREE.MeshLambertMaterial({color:c});
		var cube = new THREE.Mesh(geometry,material);
		cube.scale.copy(this.Line.d);
		cube.position.copy(this.Line.p);
		cube.receiveShadow = false;
		cube.castShadow = true;
		this.tails.push(cube);
		this.scene.add(cube);
	}
};
World.prototype.interact = function(event) {
	var e = event || window.event;
	var thisWorld = DL;
	if(!thisWorld.Line.inAir){
		if(thisWorld.Line.direction == 0){
			thisWorld.Line.direction = 3;
		}else if(thisWorld.Line.direction == 3){
			thisWorld.Line.direction = 0;
		}
	}
};
World.prototype.run = function() {
	this.Line.v.y+=this.gravity;
	this.Line.update();
	this.solve();
	for (var i = this.blocks.length - 1; i >= 0; i--) {
		this.blocks[i].update();
	}

	if(this.tails.length>50){
		this.scene.remove(this.tails[0]);
		this.tails.splice(0,1);
	}
};
var levels = [];