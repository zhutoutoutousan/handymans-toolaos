// https://codepen.io/guardabrazo/pen/XjKGWk

var windowWidth, windowHeight, scene, camera, controls, flashLight, spotLight, spotlight2, spotlight3, container, renderer, havePointerLock, element, canvas;

		windowWidth = window.innerWidth - 30;
		windowHeight = window.innerHeight - 30;

		havePointerLock = 'pointerLockElement' in document || 'mozPointerLockElement' in document || 'webkitPointerLockElement' in document;

		if ( havePointerLock ) {

			element = document.body;

			var pointerlockchange = function ( event ) {

				if ( document.pointerLockElement === element || document.mozPointerLockElement === element || document.webkitPointerLockElement === element ) {
					controls.enabled = true;
				} else {
					controls.enabled = false;
				}
			};

			var pointerlockerror = function ( event ) {
				console.log('Error loading Pointer Lock');
			};

			// Hook pointer lock state change events
			document.addEventListener( 'pointerlockchange', pointerlockchange, false );
			document.addEventListener( 'mozpointerlockchange', pointerlockchange, false );
			document.addEventListener( 'webkitpointerlockchange', pointerlockchange, false );

			document.addEventListener( 'pointerlockerror', pointerlockerror, false );
			document.addEventListener( 'mozpointerlockerror', pointerlockerror, false );
			document.addEventListener( 'webkitpointerlockerror', pointerlockerror, false );

			element.addEventListener( 'click', function ( event ) {

				// Ask the browser to lock the pointer
				element.requestPointerLock = element.requestPointerLock || element.mozRequestPointerLock || element.webkitRequestPointerLock;

				if ( /Firefox/i.test( navigator.userAgent ) ) {

					var fullscreenchange = function ( event ) {

						if ( document.fullscreenElement === element || document.mozFullscreenElement === element || document.mozFullScreenElement === element ) {

							document.removeEventListener( 'fullscreenchange', fullscreenchange );
							document.removeEventListener( 'mozfullscreenchange', fullscreenchange );

							element.requestPointerLock();
						}

					};

					document.addEventListener( 'fullscreenchange', fullscreenchange, false );
					document.addEventListener( 'mozfullscreenchange', fullscreenchange, false );

					element.requestFullscreen = element.requestFullscreen || element.mozRequestFullscreen || element.mozRequestFullScreen || element.webkitRequestFullscreen;

					element.requestFullscreen();

				} else {

					element.requestPointerLock();

				}

			}, false );

		} else {
			console.error('Your browser doesn\'t support the pointer lock API');
		}

		init();
		animate();

		function init () {

			var floor, wall, ambientLight;

			// SCENE
			scene = new THREE.Scene();
			scene.fog = new THREE.Fog(0x000000, 0, 100);

			// CAMERA / CONTROLS
			camera = new THREE.PerspectiveCamera(75, (windowWidth / windowHeight), 1, 1000);
			controls = new THREE.PointerLockControls(camera);
			controls.enabled = false;
			scene.add(controls.getObject());

			// RENDERER
			container = document.getElementById('wrapper');
			renderer = new THREE.WebGLRenderer();
			renderer.physicallyCorrectLights = true;
			renderer.gammaInput = true;
			renderer.gammaOutput = true;
			renderer.shadowMap.enabled = true;
			renderer.toneMapping = THREE.ReinhardToneMapping;
			renderer.setPixelRatio(window.devicePixelRatio);
			renderer.setSize(windowWidth, windowHeight);
			container.appendChild(renderer.domElement);

			// LIGHTS
			ambientLight = new THREE.AmbientLight(0xffffff, 0.05);
			scene.add(ambientLight);

			flashLight = new THREE.Mesh(new THREE.CylinderGeometry(1, 1, 7, 20), new THREE.MeshPhongMaterial({color:0x000000}));
			flashLight.rotateX(Math.PI/2);
			camera.add(flashLight);

			spotLight = new THREE.SpotLight(0xffffff, 0.5, 150);
			spotLight.power = 4000;
			spotLight.angle = 0.5;
			spotLight.decay = 2;
			spotLight.penumbra = 0.1;
			spotLight.distance = 200;
			spotLight.castShadow = true;
			spotLight.rotateX(Math.PI/2);

      spotLight2 = new THREE.SpotLight(0xCCCCCC, 0.5, 150);
			spotLight2.power = 2000;
			spotLight2.angle = 0.55;
			spotLight2.decay = 2;
			spotLight2.penumbra = 0.1;
			spotLight2.distance = 200;
			spotLight2.castShadow = true;
			spotLight2.rotateX(Math.PI/2);
      
      spotLight3 = new THREE.SpotLight(0xFFFFFF, 0.5, 150);
			spotLight3.power = 4000;
			spotLight3.angle = 0.6;
			spotLight3.decay = 2.5;
			spotLight3.penumbra = 0.1;
			spotLight3.distance = 200;
			spotLight3.castShadow = true;
			spotLight3.rotateX(Math.PI/2);
      
      flashLight.add(spotLight);
			flashLight.add(spotLight.target);
			flashLight.add(spotLight2);
			flashLight.add(spotLight2.target);
      flashLight.add(spotLight3);
			flashLight.add(spotLight3.target);

			// FLOOR
			floor = new THREE.Mesh(new THREE.PlaneBufferGeometry(500, 500), new THREE.MeshStandardMaterial({color:0xffffff}));
			floor.rotateX(-Math.PI/2);
			scene.add(floor);

			// WALLS
			wall = new THREE.Mesh(new THREE.PlaneBufferGeometry(40, 30), new THREE.MeshStandardMaterial({color:0xffffff}));
			wall.position.set(0, 15, -20);
			scene.add(wall);

			wall = new THREE.Mesh(new THREE.PlaneBufferGeometry(40, 30), new THREE.MeshStandardMaterial({color:0xffffff}));
			wall.rotateY(90 * Math.PI / 180);
			wall.position.set(-20, 15, 0);
			scene.add(wall);

		}

		function animate () {

			flashLight.position.copy(camera.position);
			flashLight.position.x += 2;
			flashLight.position.y -= 3;
			flashLight.position.z -= 1;

			renderer.toneMappingExposure = Math.pow(0.68, 5.0);
			renderer.shadowMap.enabled = true;
			renderer.render(scene, camera);

			requestAnimationFrame(animate);

		}