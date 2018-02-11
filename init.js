const ww = window.innerWidth, hh = window.innerHeight;
var container =
   document.querySelector('#container');
var renderer = new THREE.WebGLRenderer();
renderer.setSize(ww,hh);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
var camera = new THREE.PerspectiveCamera(75,ww/hh,1,1e10);
var scene = new THREE.Scene();
scene.add(camera);
var dead = false, win = false;
const g = -1/10;
const StartTime = Date.now();
container.appendChild(renderer.domElement);
var light = new THREE.HemisphereLight( 0xffffff, 0x888833, 1/2 );
scene.add(light);
var light = new THREE.PointLight(0xffffff,2,0,1);
light.position.set(100,100,-50);
light.castShadow = true;
scene.add(light);

var DL = new World(scene);
DL.init();