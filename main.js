/*
  There is a world called Dl form init.js
*/
window.onmousedown = DL.interact;
window.ontouchstart = DL.interact;
window.onkeydown = DL.interact;
DL.addBlocks(Data.music.make1());
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
  var l1 = 150-ww/20;
  var line = world.Line.copy();
  camera.rotation.x+=(-Math.PI/2-camera.rotation.x)*0.07;
  camera.rotation.z+=(Math.PI+Math.PI/4-camera.rotation.z)*0.07;
  camera.position.x+=(line.p.x-l1-camera.position.x)*0.025;
  camera.position.z+=(line.p.z-l1-camera.position.z)*0.025;
  camera.position.y+=(line.p.y+l1*2-camera.position.y)*0.06;
};
function closeCam(world){
  var l1 = 120-ww/15;
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
  if(dtime>11500){
    fog.density*=0.995;
  }
  requestAnimationFrame(animate);
  renderer.render(scene,camera);
}
animate();