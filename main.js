/*
  There is a world called Dl form init.js
*/
window.onmousedown = DL.interact;
window.ontouchstart = DL.interact;

var b  = new Block(0,-2,0,10,4,10);
DL.addBlock(b);
function autoCamera(world){
  var line = world.Line.copy();
  camera.rotation.x = -Math.PI/4;
  camera.rotation.z = Math.PI/4;
  camera.position.x+=(line.p.x-hh/8-camera.position.x)*0.025;
  camera.position.z+=(line.p.z+hh/8-camera.position.z)*0.025;
  camera.position.y = line.p.y+hh/4;
}
var dtime;
function animate() {
  light.position.set(200+DL.Line.p.x,220+DL.Line.p.y,-200+DL.Line.p.z);
  dtime = Date.now()-StartTime;
  /*
    main solution
  */
  DL.run(); // easy...
  autoCamera(DL);
  requestAnimationFrame(animate);
  renderer.render(scene,camera);
}
animate();