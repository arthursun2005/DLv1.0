/*
  There is a world called Dl form init.js
*/
window.onmousedown = DL.interact;
window.ontouchstart = DL.interact;
var w1 = 30;
var sr = 15/2;
var b  = new Block(0,-w1,0,w1,w1,w1);
b.direction = 3;
DL.addBlock(b);
// b,length,diameter,thickness,changeInY,changeInD,turn,f
var y = 0, d = 0;
y = -30, d = 100;
DL.addBlock(createNormalBlockFromInterval(DL.blocks[DL.blocks.length-1],sr*Data.intervals1[0]-d,w1,w1,y,d));
for (var i = 1; i < Data.intervals1.length; i++) {
  var y = 0, d = 0;
  if(Data.intervals1[i] == 32){
    y = -170;
    d = 220;
  }
  DL.addBlock(createNormalBlockFromInterval(DL.blocks[DL.blocks.length-1],sr*Data.intervals1[i]-d,w1,w1,y,d));
}
function autoCamera(world){
  var l1 = 150-ww/20;
  var line = world.Line.copy();
  camera.rotation.x+=(-Math.PI/4-camera.rotation.x)*0.07;
  camera.rotation.z+=(Math.PI/4-camera.rotation.z)*0.07;
  camera.position.x+=(line.p.x-l1-camera.position.x)*0.025;
  camera.position.z+=(line.p.z+l1-camera.position.z)*0.025;
  camera.position.y+=(line.p.y+l1*2-camera.position.y)*0.06;
}
function backCam(world){
  var l1 = 65;
  var line = world.Line.copy();
  camera.rotation.x+=(-Math.PI/2-camera.rotation.x)*0.07;
  camera.rotation.z+=(Math.PI+Math.PI/4-camera.rotation.z)*0.07;
  camera.position.x+=(line.p.x-l1-camera.position.x)*0.025;
  camera.position.z+=(line.p.z-l1-camera.position.z)*0.025;
  camera.position.y+=(line.p.y+l1*2-camera.position.y)*0.06;
};
function closeCam(world){
  var l1 = 100-ww/20;
  var line = world.Line.copy();
  camera.rotation.x+=(-Math.PI/4-camera.rotation.x)*0.07;
  camera.rotation.z+=(Math.PI/8-camera.rotation.z)*0.07;
  camera.position.x+=(line.p.x-l1-camera.position.x)*0.025;
  camera.position.z+=(line.p.z+l1-camera.position.z)*0.025;
  camera.position.y+=(line.p.y+l1*2-camera.position.y)*0.06;
}
var dtime;
function animate() {
  light.position.set(200+DL.Line.p.x,220+DL.Line.p.y,-200+DL.Line.p.z);
  dtime = Date.now()-StartTime;
  /*
    main solution
  */
  DL.run(); // easy...
  if(dtime<6400){
    closeCam(DL);
  }else if(dtime<30000 || dtime>42000){
    autoCamera(DL);
  }else{
    backCam(DL);
  }
  if(dtime>10000){
    fog.density*=0.995;
  }
  requestAnimationFrame(animate);
  renderer.render(scene,camera);
}
animate();