
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const container = document.getElementById("robot3d");

if (container) {
  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    40,
    1,
    0.1,
    1000
  );

  camera.position.set(4, 3, 6);

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true
  });

  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.setSize(container.clientWidth, container.clientHeight || 420);

  container.appendChild(renderer.domElement);
  const controls = new OrbitControls(camera, renderer.domElement);

controls.enableDamping = true;
controls.dampingFactor = 0.05;

controls.enableZoom = false;
controls.enablePan = false;

controls.minPolarAngle = Math.PI / 4;
controls.maxPolarAngle = Math.PI / 1.7;

  scene.add(new THREE.AmbientLight(0xffffff, 2));

  const light = new THREE.DirectionalLight(0xffffff, 3);
  light.position.set(5, 8, 6);
  scene.add(light);

  const robot = new THREE.Group();
  scene.add(robot);
  const clock = new THREE.Clock();
let mixer = null;
let motorAction = null;

  const loader = new GLTFLoader();

  loader.load(
    "./robot-model/scene.gltf",

    function (gltf) {
      const model = gltf.scene;
      if (gltf.animations.length > 0) {
  mixer = new THREE.AnimationMixer(model);

  motorAction = mixer.clipAction(gltf.animations[0]);
const action = motorAction;
  action.setLoop(THREE.LoopRepeat, Infinity);
  action.play();

  console.log("Motor animation started!");
}
      console.log("Available animations:", gltf.animations.length);

gltf.animations.forEach((clip, index) => {
  console.log(
    "Animation",
    index + 1,
    "Name:",
    clip.name,
    "Duration:",
    clip.duration
  );
});

      const bounds = new THREE.Box3().setFromObject(model);
      const center = bounds.getCenter(new THREE.Vector3());
      const size = bounds.getSize(new THREE.Vector3());

      model.position.sub(center);

      const scale = 5 / Math.max(size.x, size.y, size.z);
      model.scale.setScalar(scale);

      robot.add(model);
      


model.updateMatrixWorld(true);

model.traverse((object) => {
  if (object.name === "Roda004") {
    console.log("WHEEL GROUP:", object.name);

    object.children.forEach((child, index) => {
      const bounds = new THREE.Box3().setFromObject(child);
      const center = bounds.getCenter(new THREE.Vector3());
      const size = bounds.getSize(new THREE.Vector3());

      console.log("CHILD", index + 1, child.name);
      console.log("CENTER:", center.toArray());
      console.log("SIZE:", size.toArray());
    });
  }
});




      camera.position.set(4, 3, 6);
      camera.lookAt(0, 0, 0);

      console.log("Realistic robot loaded successfully!");
    },

    undefined,

    function (error) {
      console.error("Robot loading error:", error);
    }
  );

  function resize() {
    const width = container.clientWidth;
    const height = container.clientHeight || 420;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setSize(width, height);
  }

  window.addEventListener("resize", resize);
  resize();

  function animate() {
    requestAnimationFrame(animate);
    const delta = clock.getDelta();

if (mixer) {
  mixer.update(delta);
}

    // Rotate the robot slightly to display its 3D shape
const t = clock.elapsedTime;
const speed = 0.7;

robot.position.x = Math.sin(t * speed) * 0.7;
robot.rotation.y = Math.sin(t * 0.5) * 0.25;

if (motorAction) {
  motorAction.timeScale = Math.cos(t * speed) >= 0 ? 1 : -1;
}

    controls.update();
    renderer.render(scene, camera);
  }

  animate();
}
