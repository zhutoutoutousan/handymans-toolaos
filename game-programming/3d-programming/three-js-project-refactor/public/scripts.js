

        // Configure physics engine
        window.Physijs.scripts.worker = '/tmp-lib/physijs_worker';
        window.Physijs.scripts.ammo = '/tmp-lib/ammo';
        // THREE.addedProperty = "a";


// console.log(Object.isExtensible(THREE));
// console.log(typeof(THREE));
// console.log(THREE);


        // // First person: PointerLock
        // var havePointerLock = 'pointerLockElement' in document ||
        //                       'mozPointerLockElement' in document ||
        //                       'webkitPointerLockElement' in document;


        // Configure loading screen
        var loadingScreenText = document.getElementById('loading-progress');
        var pageLoadingState = false;
        var loadingManager = new THREE.LoadingManager( () => {
            const loadingScreen = document.getElementById('loading-screen');
            // loadingScreen.classList.add('fade-out');
            loadingScreen.remove();
            // optional: remove loader from DOM via event listener.
            // loadingScreen.addEventListener( 'transitioned', onTransitionEnd);
        })


        // Init scene
        var loader = new THREE.GLTFLoader(loadingManager);
        var scene = new Physijs.Scene;
        var camera = new THREE.PerspectiveCamera( 45 , window.innerWidth / window.innerHeight, 0.1, 3000);
        var clock = new THREE.Clock();
        


        var renderer = new THREE.WebGLRenderer();
        var light = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 );
        // var controls = new THREE.OrbitControls( camera, renderer.domElement );

        var stats = new Stats();
        stats.showPanel(1);
        document.body.appendChild( stats.dom );

        camera.position.z = 0;
        camera.position.x = 0;
        camera.position.y = 0;

        // controls.update();

        var spotLight = new THREE.SpotLight(0xffffff);
        spotLight.position.set(100,100,100);
        spotLight.castShadow = true; //If set to true light will cast dynamic shadows. Warning: This is expensive and requires tweaking to get shadows looking right.
        spotLight.shadowMapWidth = 1024;
        spotLight.shadowMapHeight = 1024;
        spotLight.shadowCameraNear = 500;
        spotLight.shadowCameraFar = 4000;
        spotLight.shadowCameraFov = 30;
        
        scene.add(spotLight);
        scene.add(light);
        scene.add( camera );

        renderer.setSize( window.innerWidth, window.innerHeight);
        renderer.setClearColor(new THREE.Color(0xEEEEEE, 1.0));
        document.body.appendChild( renderer.domElement );


        // Fly control
        var controls = new THREE.FirstPersonControls( camera, renderer.domElement );

        controls.movementSpeed = 10;
        controls.lookSpeed = 0.125;
        controls.lookVertical = true;
        controls.constrainVertical = true;
        controls.verticalMin = 1.1;
        controls.verticalMax = 2.2;


        // Load a obj resource
        loader.load(
            // resource URL
            './assets/gallary.glb',
            // called when the resource is loaded
            function ( gltf ) {

                scene.add( gltf.scene );
                console.log(gltf.scene);
                console.log(gltf);

            },
            // called while loading is progressing
            function ( xhr ) {

                console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
                console.log(scene);
                if(!pageLoadingState) loadingScreenText.innerText = `${xhr.loaded / xhr.total * 100} % loaded`;
                pageLoadingState = ( xhr.loaded / xhr.total * 100 ) === 100 ? true : false;
            },
            // called when loading has errors
            function ( error ) {

                console.log( 'An error happened' );

            }
        );

            // FlyControls(camera, renderer.domElement);


        let animate = function() {

            stats.begin();


            stats.end();

            requestAnimationFrame( animate );

            // controls.update();
            controls.update( clock.getDelta() );
            renderer.render(scene, camera);




        }

        animate();