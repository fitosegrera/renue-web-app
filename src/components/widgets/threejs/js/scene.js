import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";

let camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  1,
  2000
);
camera.position.set(15, 450, 1100);
camera.rotation.y = -Math.PI / 1010;

const scene = new THREE.Scene();
// scene.background = new THREE.Color(0xa0a0a0);
scene.fog = new THREE.FogExp2(0xfdffff, 0.00045);

const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444);
hemiLight.position.set(0, 200, 0);
scene.add(hemiLight);

const dirLight = new THREE.DirectionalLight(0xffffff);
dirLight.position.set(0, 200, 100);
dirLight.castShadow = true;
dirLight.shadow.camera.top = 180;
dirLight.shadow.camera.bottom = -100;
dirLight.shadow.camera.left = -120;
dirLight.shadow.camera.right = 120;
scene.add(dirLight);

const loader = new FBXLoader();

let renderer;
let controls;

const loadModel = () => {
  loader.load(
    "assets/planta.fbx",
    (object) => {
      object.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
      //object.position
      scene.add(object);
    },
    (xhr) => {
      let loaded = Math.floor((xhr.loaded / xhr.total) * 100);
      // console.log(loaded + "% loaded");
      let loader = document.getElementById("loader");
      loader.innerHTML = "Loading model: " + loaded + "%";
      if (loaded >= 100) {
        console.log("model loaded!");
        loader.innerHTML = "Model loaded!";
        document.getElementById("ok-button").style.visibility = "visible";
        document.getElementById("loaded-icon").style.visibility = "visible";
        document.getElementById("loading-icon").style.visibility = "hidden";
      }
    }
  );
};

//Background
let textureEquirec;

const textureLoader = new THREE.TextureLoader();

textureEquirec = textureLoader.load("assets/background.jpg");
textureEquirec.mapping = THREE.EquirectangularReflectionMapping;
textureEquirec.encoding = THREE.sRGBEncoding;

//scene.background = textureEquirec;

// CUBE MODEL
const geometry = new THREE.IcosahedronGeometry(100, 15);
const sphereMaterial = new THREE.MeshLambertMaterial({
  envMap: textureEquirec,
});
const sphereMesh = new THREE.Mesh(geometry, sphereMaterial);
//scene.add(sphereMesh);

// ground
const mesh = new THREE.Mesh(
  new THREE.PlaneGeometry(4000, 4000),
  new THREE.MeshLambertMaterial({
    envMap: textureEquirec,
  })
);
mesh.rotation.x = -Math.PI / 2;
mesh.receiveShadow = true;
// mesh.position.y = 2.5;
//scene.add(mesh);

// const grid = new THREE.GridHelper(2000, 20, 0x000000, 0x000000);
// grid.material.opacity = 0.2;
// grid.material.transparent = true;
// grid.position.y = 2.5;
// scene.add(grid);

const animate = () => {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  // console.log(camera);
};

const resize = () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
};

export const createScene = (e) => {
  renderer = new THREE.WebGLRenderer({
    antialias: true,
    canvas: e,
    alpha: true,
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  // renderer.setClearColor("#50ABC7", 1);
  controls = new OrbitControls(camera, renderer.domElement);
  loadModel();
  resize();
  animate();
};

window.addEventListener("resize", resize);
