import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshStandardMaterial({
	color: 0xcccccc,
	roughness: 0.2,
	metalness: 0.5,
	normalScale: new THREE.Vector2(1, -1), // why does the normal map require negation in this case?
	side: THREE.DoubleSide
});
var light = new THREE.HemisphereLight(0x404040, 0xffffff, 0.5);
const cube = new THREE.Mesh(geometry, material);
const loader = new GLTFLoader();

let renderer;
let controls;
let loading;

scene.add(light);
// scene.add(cube);
camera.position.z = 5;

const loadModel = () => {
	loader.load(
		// resource URL
		'assets/planta.gltf',
		// called when the resource is loaded
		(gltf) => {
			scene.add(gltf.scene);
			gltf.animations; // Array<THREE.AnimationClip>
			gltf.scene; // THREE.Group
			gltf.scenes; // Array<THREE.Group>
			gltf.cameras; // Array<THREE.Camera>
			gltf.asset; // Object
		},
		// called while loading is progressing
		(xhr) => {
			console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
			loading = (xhr.loaded / xhr.total) * 100;
		},
		// called when loading has errors
		(error) => {
			console.log('An error happened');
		}
	);
};

const animate = () => {
	requestAnimationFrame(animate);
	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;
	renderer.render(scene, camera);
};

const resize = () => {
	renderer.setSize(window.innerWidth, window.innerHeight);
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
};

export const createScene = (e) => {
	renderer = new THREE.WebGLRenderer({ antialias: true, canvas: e, alpha: false });
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setClearColor(0xffffff, 1);
	controls = new OrbitControls(camera, renderer.domElement);
	loadModel();
	resize();
	animate();
};

window.addEventListener('resize', resize);
