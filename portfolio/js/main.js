import '../css/main.css';
import * as THREE from 'three';

// bg scene

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

// Render

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);
renderer.render(scene, camera);

// Control the lights

const pointLight = new THREE.PointLight(0x000000);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0x000000);
scene.add(pointLight, ambientLight);
// Bg

const spaceTexture = new THREE.TextureLoader().load('../portfolio/images/bg.jpg');
scene.background = spaceTexture;

// Avatar

const sahinTexture = new THREE.TextureLoader().load('../portfolio/images/sahin.png');

const sahin = new THREE.Mesh(new THREE.BoxGeometry(3, 3, 0), new THREE.MeshBasicMaterial({
  map: sahinTexture
}));

scene.add(sahin);

sahin.position.z = -4.5;
sahin.position.x = 2;
sahin.position.y = 0.7;

// Scroll Animation

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  camera.position.z = t * -0.01;
  camera.position.x = t * -0.000002;
  camera.rotation.y = t * -0.000002;
  sahin.rotation.y += 0.0000001;
  sahin.rotation.z += 0.0000001;
}

document.body.onscroll = moveCamera;
moveCamera();

// Stars

function addStars() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 12);
  const material = new THREE.MeshBasicMaterial({
    color: 0xffffff
  });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(150));

  star.position.set(x, y, z);
  scene.add(star);

}

Array(500).fill().forEach(addStars);

// Animation Loop

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();