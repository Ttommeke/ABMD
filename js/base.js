var scene = new THREE.Scene();

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight-4);
document.body.appendChild( renderer.domElement );
var TimeClock = new THREE.Clock();
var fpsCounter = new Stats();
fpsCounter.showPanel(0);
document.body.appendChild( fpsCounter.dom );

var render = function() {
	fpsCounter.begin();
	var deltaTime = TimeClock.getDelta();

	/*if (Player.player != undefined) {
		Player.executeKeys(Player.player, deltaTime);
		Living.animateLiving(Player.player, TimeClock.elapsedTime);
		Player.lookTowardsPosition(Player.player, mouseCube.position);

		var direction = mouseCube.position.clone();
		var cameraPosition = new THREE.Vector3(
			Player.player.position.x + Camera.cameraInitialInfo.offset.x,
			Player.player.position.y + Camera.cameraInitialInfo.offset.y,
			Player.player.position.z + Camera.cameraInitialInfo.offset.z
		);

		direction.sub(Player.player.position);
		direction.setLength(2);
		cameraPosition.add(direction);

		Camera.moveCamera(Camera.camera, cameraPosition, deltaTime, Camera.speed);
	}*/

	if (Events.keys.ArrowLeft.isPressedDown()) {
        Camera.previousCamera();
    }
    if (Events.keys.ArrowRight.isPressedDown()) {
        Camera.nextCamera();
    }

	Camera.moveCamera(Camera.camera, Camera.cameras[Camera.cameraId], deltaTime);

	renderer.render( scene, Camera.camera );
	fpsCounter.end();

	requestAnimationFrame( render );
}

$.getJSON("map.json", function(data) {

	Camera.speed = data.cameraSpeed;
	Camera.setCameraPositionAndRotation(Camera.camera, data.cameras[0]);
	Camera.cameras = data.cameras;

	data.lights.forEach(function(light) {
		scene.add(Light.generateLight(light));
	});

	Text.initText( data.text, data.textList);

	var emap = Map.generateMapFromNumberMap(data.map, data.objectList);
	Map.loadMapInScene(emap, scene);

	Map.map = emap;

	renderer.setClearColor( Utils.stringHexToHex( data.clearcolor ), 1 );

	TimeClock.getDelta();
	render();
});
