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
scene.background = new THREE.Color(0xffffff);
var fog = new THREE.FogExp2(0xffffff,0.0085);
scene.fog = fog;
scene.add(camera);
const g = -1/24;
container.appendChild(renderer.domElement);
var light = new THREE.HemisphereLight( 0xffff99, 0xffffff, 2/3 );
scene.add(light);
var light = new THREE.PointLight(0xffffff,1/2,0);
light.position.set(100,200,-240);
light.castShadow = true;
light.shadow.mapSize.width = 512;
light.shadow.mapSize.height = 512;
light.shadow.camera.near = 0.005;
light.shadow.camera.far = 1e10;
light.radius = 0.005;
scene.add(light);
var DL = new World(scene);
DL.gravity = g;
DL.init();
var dtime = 0;


var texture = new THREE.TextureLoader().load('imgs/img1.jpeg');