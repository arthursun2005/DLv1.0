window.onmousedown = DL.interact;
window.ontouchstart = DL.interact;
window.onkeydown = DL.interact;
var U = {
	update: function(){
		this.b = DL.blocks[DL.blocks.length-1];
		this.d = DL.dblocks[DL.dblocks.length-1];
	},
	C: {
  		auto: function(world){
			var l1 = 165-ww/20;
			var line = world.Line.copy();
			camera.rotation.x+=(-Math.PI/4-camera.rotation.x)*0.07;
			camera.rotation.z+=(Math.PI/4-camera.rotation.z)*0.07;
			camera.position.x+=(line.p.x-l1-camera.position.x)*0.025;
			camera.position.z+=(line.p.z+l1-camera.position.z)*0.025;
			camera.position.y+=(line.p.y+l1*2-camera.position.y)*0.06;
		},
		back: function(world) {
			var l1 = 150-ww/20;
			var line = world.Line.copy();
			camera.rotation.x+=(-Math.PI/2-camera.rotation.x)*0.07;
			camera.rotation.z+=(Math.PI+Math.PI/4-camera.rotation.z)*0.07;
			camera.position.x+=(line.p.x-l1-camera.position.x)*0.025;
			camera.position.z+=(line.p.z-l1-camera.position.z)*0.025;
			camera.position.y+=(line.p.y+l1*2-camera.position.y)*0.06;
		},
		close: function(world) {
			var l1 = 120-ww/16.5;
			var line = world.Line.copy();
			camera.rotation.x+=(-Math.PI/4-camera.rotation.x)*0.07;
			camera.rotation.z+=(Math.PI/8-camera.rotation.z)*0.07;
			camera.position.x+=(line.p.x-l1-camera.position.x)*0.025;
			camera.position.z+=(line.p.z+l1-camera.position.z)*0.025;
			camera.position.y+=(line.p.y+l1*2-camera.position.y)*0.06;
 		}
 	}
}
DL.Line.dv = Data.m1.speed;
DL.Line.p.set(0,-20,-50);
var bs = Data.m1.make1();
for(var i=0;i<bs.length;i++) DL.addBlock(bs[i]);
DL.update();
function animate() {
	if(d1.b || d1.a<=0){
		renderer.render(scene,camera);
		requestAnimationFrame(animate);
		return;
	}
	DL.update();
	requestAnimationFrame(animate);
	light.position.set(200+DL.Line.p.x,220+DL.Line.p.y,-200+DL.Line.p.z);
	if(dtime<420 || (dtime>570 && dtime<770)){
		U.C.close(DL);
	}else{
		U.C.auto(DL);
	}
	if(dtime>550){
		fog.density*=0.995;
	}
	dtime++;
	renderer.render(scene,camera);
}
animate();