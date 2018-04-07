// ------------------------------------------------
// BASIC SETUP
// ------------------------------------------------

// renderer
var renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setClearColor("#000000");
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// empty scene
var scene = new THREE.Scene();

// a basic perspective camera
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 4;

// Cube Mesh with basic material
var geometry = new THREE.BoxGeometry(1, 1, 1);
var material = new THREE.MeshBasicMaterial({color: "#433F81"});
var cube = new THREE.Mesh(geometry, material);

scene.add(cube);

var controls = new THREE.OrbitControls( camera, renderer.domElement );

// Render Loop
var render = function() {
  requestAnimationFrame(render);

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  // Render the scene
  renderer.render(scene, camera);
};

render();

// responsive renderer
window.onresize = function(){
	console.log("Window size: "+window.innerWidth+"x"+window.innerHeight+"px");
	renderer.setSize(window.innerWidth,window.innerHeight);
	var aspectRatio = window.innerWidth/window.innerHeight;
	camera.aspect = aspectRatio;
	camera.updateProjectionMatrix();
}
