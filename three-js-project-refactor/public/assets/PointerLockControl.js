/**
 * @author mrdoob / http://mrdoob.com/
 * @author schteppe / https://github.com/schteppe
 */

 var PointerLockControls = function ( camera, cannonBody) {
     var eyeYpos = 2; // eyes are 2 meters above the ground
     var velocityFactor = 0.2;
     var jumpVelocity = 20;
     var scope = this;

     var pitchObject = new THREE.Object3D();
     pitchObject.add( camera );

     var yawObject = new THREE.Object3D();
     yawObject.position.y = 2;
     yawObject.add( pitchObject);

     var quat = new THREE.Quaternion();
 }