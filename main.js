/*
  There is a world called Dl form init.js
*/
window.onmousedown = DL.interact;
window.ontouchstart = DL.interact;
function autoCam(line){
  camera.rotation.x = -Math.PI/4;
  camera.rotation.z = Math.PI/4;
  camera.position.x+=(line.p.x-camera.position.x)*0.03;
  camera.position.z+=(line.p.z+80-camera.position.z)*0.03;
  camera.position.y = line.p.y+120;
}
var dtime;
function animate() {
  dtime = Date.now()-StartTime;
  requestAnimationFrame(animate);
  renderer.render(scene,camera);
}
animate();