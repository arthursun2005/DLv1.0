// need three.js  >_
function Block(x,y,z,dx,dy,dz){
	this.p = new THREE.Vector3(x,y,z);
	this.d = new THREE.Vector3(dx,dy,dz);
	this.c = 0x777777;
	this.kill = false;
	this.hit = false;
	this.f = null;
	this.geometry = new THREE.BoxGeometry(1,1,1);
	this.material = new THREE.MeshLambertMaterial({color:this.c});
	this.cube = new THREE.Mesh(this.geometry,this.material);
	this.cube.scale.copy(this.d);
	this.cube.position.copy(this.p);
}
function NormalLine(x,y,z,d){
	this.p = new THREE.Vector3(x,y,z);
	this.d = new THREE.Vector3(d,d,d);
	this.geometry = new THREE.BoxGeometry(1,1,1);
	this.material = new THREE.MeshLambertMaterial({color:this.c});
	this.cube = new THREE.Mesh(this.geometry,this.material);
	this.cube.scale.copy(this.d);
	this.cube.position.copy(this.p);
}
NormalLine.prototype.method_name = function(first_argument) {
	// body...
};
function createBlocksFromInterval(a,b){
}
function World(){
	this.scene = 
}
var levels = [];