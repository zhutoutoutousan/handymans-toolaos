
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';


let loader = new GLTFLoader();
let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera( 45 , window.innerWidth / window.innerHeight, 3, 3000);
let renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight);
document.body.appendChild( renderer.domElement );

// Load a obj resource
loader.load(
	// resource URL
	'scene.gltf',
	// called when the resource is loaded
	function ( obj ) {

		scene.add( obj );

		// obj.animations; // Array<THREE.AnimationClip>
		// obj.scene; // THREE.Group
		// obj.scenes; // Array<THREE.Group>
		// obj.cameras; // Array<THREE.Camera>
		// obj.asset; // Object

	},
	// called while loading is progressing
	function ( xhr ) {

		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

	},
	// called when loading has errors
	function ( error ) {

		console.log( 'An error happened' );

	}
);

        // let geometry = new THREE.BoxGeometry();
        // let material = new THREE.MeshBasicMaterial( { color: 0xeeff0f } );
        // let cube = new THREE.Mesh( geometry, material );
        // scene.add(cube);

        // camera.position.z = 9;

        // function animate() {
        //     requestAnimationFrame( animate );
        //     cube.rotation.x += 0.05;
        //     cube.rotation.y += 0.01;    
        //     renderer.render( scene, camera );
        // }

        // animate();