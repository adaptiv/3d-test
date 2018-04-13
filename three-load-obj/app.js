var container, controls;
var camera, scene, renderer;
var mesh;

var modelPath = 'model/';

init();
render();

function init() {
  // dom
  container = document.createElement('div');
  document.body.appendChild(container);

  // camera
  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2000);
  camera.position.z = 50;
  camera.position.y = 20

  // scene
  scene = new THREE.Scene();
  scene.add(camera);

  // lights
  var ambientLight = new THREE.AmbientLight(0xcccccc, 2000);
  scene.add(ambientLight);

  var pointLight = new THREE.PointLight(0xffffff, 10);
  camera.add(pointLight);

  // model
  var mtlLoader = new THREE.MTLLoader();
  mtlLoader.setPath(modelPath);
  mtlLoader.load('FarmHouse.mtl', function(materials) {

    materials.preload();

    var objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.setPath('model/');
    objLoader.load(
      'FarmHouse.obj',
      function(object) {
        mesh = object;
        scene.add(mesh)
      },
      progressLogger,
      console.log
    );
  });

  //
  renderer = new THREE.WebGLRenderer({antialias: true});
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);

  container.appendChild(renderer.domElement);

  controls = new THREE.OrbitControls(camera, renderer.domElement);
  window.addEventListener('resize', onWindowResize, false);
}

// render loop
function render() {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function progressLogger(xhr) {
  if (xhr.lengthComputable) {
    var percentComplete = xhr.loaded / xhr.total * 100;
    console.log(Math.round(percentComplete, 2) + '% downloaded');
  }
};
