// CAMERA
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 400;

// SCENE
var scene = new THREE.Scene();

// LIGHTS
var light = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(light)

var light2 = new THREE.PointLight(0xffffff, 0.5);
scene.add(light2)

// MATERIAL
var material = new THREE.MeshStandardMaterial({roughness: 0.1, metalness: 0.3, color: 0xff0000});

var material2 = new THREE.MeshStandardMaterial({roughness: 0.5, metalness: 0.1, color: 0xffff00});

// GEOMETRY
var geometry = new THREE.BoxGeometry(100, 100, 100);
var cube = new THREE.Mesh(geometry, material);
cube.position.x = -100
scene.add(cube);

var geometry2 = new THREE.SphereGeometry(50, 20, 20);
var sphere = new THREE.Mesh(geometry2, material2);
sphere.position.x = 100
scene.add(sphere)

// RENDERER
var renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setClearColor("#000000");
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var controls = new THREE.OrbitControls(camera, renderer.domElement);

// Render Loop
var render = function() {
  requestAnimationFrame(render);

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  renderer.render(scene, camera);
};

render();

// responsive renderer
window.onresize = function() {
  console.log("Window size: " + window.innerWidth + "x" + window.innerHeight + "px");
  renderer.setSize(window.innerWidth, window.innerHeight);
  var aspectRatio = window.innerWidth / window.innerHeight;
  camera.aspect = aspectRatio;
  camera.updateProjectionMatrix();
}
