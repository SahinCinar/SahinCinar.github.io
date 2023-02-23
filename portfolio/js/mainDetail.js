import '../css/main.css';
import * as THREE from 'three';

// Basics

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

// Light control

const pointLight = new THREE.PointLight(0x000000);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0x000000);
scene.add(pointLight, ambientLight);

function addStars() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 12);
  const material = new THREE.MeshBasicMaterial( { color: 0xffffff } );
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3) .fill() .map(() => THREE.MathUtils.randFloatSpread(150));

  star.position.set(x, y, z);
  scene.add(star);

}

// Stars
Array(500).fill().forEach(addStars);

// Bg

const spaceTexture = new THREE.TextureLoader().load('../images/bg.jpg');
scene.background = spaceTexture;

// Scroll Animation

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.000002;
  camera.rotation.y = t * -0.000002;
}

document.body.onscroll = moveCamera;
moveCamera();

// Animation Loop

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();
