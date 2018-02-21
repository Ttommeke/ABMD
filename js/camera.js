
var Camera = {
    "camera": new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 50 ),
    "speed": 4,
    "cameras": [],
    "cameraId": 0
};

Camera.nextCamera = function() {
    if (Camera.cameraId < Camera.cameras.length - 1) {
        Camera.cameraId++;
    }
}

Camera.previousCamera = function() {
    if (Camera.cameraId > 0) {
        Camera.cameraId--;
    }
}

Camera.moveCamera = function(camera, cameraToMoveTo, deltaTime) {
    var difference = new THREE.Vector3(0,0,0);
    difference.subVectors(cameraToMoveTo.position, camera.position);

    camera.position.addScaledVector(difference, cameraToMoveTo.speed * deltaTime);

    var differenceRotation = new THREE.Vector3(0,0,0);
    differenceRotation.subVectors(cameraToMoveTo.rotation, camera.rotation);

    camera.rotation.x = camera.rotation.x + differenceRotation.x * deltaTime * cameraToMoveTo.speed;
    camera.rotation.y = camera.rotation.y + differenceRotation.y * deltaTime * cameraToMoveTo.speed;
    camera.rotation.z = camera.rotation.z + differenceRotation.z * deltaTime * cameraToMoveTo.speed;
}

Camera.setCameraPositionAndRotation = function(cameraToSet, cameraJson) {
    Utils.setXYZ(cameraToSet.position, cameraJson.position);
	Utils.setXYZ(cameraToSet.rotation, cameraJson.rotation);

    cameraToSet.rotation.order = "YXZ";
}
