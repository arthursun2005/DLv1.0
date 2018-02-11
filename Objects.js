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
	this.geometry = new THREE.BoxGeometry(1,1,1);
	this.material = new THREE.MeshLambertMaterial({color:this.c});
	this.cube = new THREE.Mesh(this.geometry,this.material);
	this.cube.scale.copy(this.d);
	this.cube.position.copy(this.p);
	this.direction = 0;
	this.dv = 4;
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
function createBlockFromInterval(a,b,d,t,w){
	// a and b = length, d = direction, t = thickness, w = wideness.
}
function World(scene){
	this.scene = scene;
	this.blocks = [];
	this.Line = new NormalLine(0,0,0,10);
}
World.prototype.addBlocks = function(blocks) {
	for (var i = blocks.length - 1; i >= 0; i--) {
		this.scene.add(blocks[i]);
		this.blocks.push(blocks[i]);
	}
};
World.prototype.addBlock = function(block) {
	this.scene.add(block);
	this.blocks.push(block);
};
World.prototype.removeBlock = function(id) {
	this.scene.remove(this.blocks[id]);
	this.blocks.splice(id,1);
};
World.prototype.changeLine = function(newLine) {
	this.scene.remove(this.line);
	this.line = newLine.copy();
};
World.prototype.solve = function() {
	for (var i = this.blocks.length - 1; i >= 0; i--) {
		var b = this.blocks[i];
	}
};
World.prototype.interact = function(event) {
	var e = event || window.event;
};
World.prototype.run = function() {
	this.solve();
	for (var i = this.blocks.length - 1; i >= 0; i--) {
		this.blocks[i].update();
	}
	this.line.update();
};
var levels = [];