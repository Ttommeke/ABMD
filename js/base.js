var scene = new THREE.Scene();

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight-4);
document.body.appendChild( renderer.domElement );
var TimeClock = new THREE.Clock();
var fpsCounter = new Stats();
fpsCounter.showPanel(0);
document.body.appendChild( fpsCounter.dom );


var mouseCube = Entity.createCube(0xCC0000,new THREE.Vector3(0.3,0.3,0.3),new THREE.Vector3(0,0.5,0),new THREE.Vector3(0,0,0));//var mouseCube =
scene.add(mouseCube);

var moveMouseCube = function() {
	var posLookMouse = MouseSelect.positionWhereMouseLooksOnYAxisFromCenterPoint(0.5, Camera.camera, Events.mouse.position);

	if (posLookMouse != null) {
		Utils.setXYZ(mouseCube.position, posLookMouse);
	}
};

var render = function() {
	fpsCounter.begin();
	var deltaTime = TimeClock.getDelta();

	moveMouseCube();

	if (Player.player != undefined) {
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
	}

	renderer.render( scene, Camera.camera );
	fpsCounter.end();

	requestAnimationFrame( render );
}

$.getJSON("map.json", function(data) {

	Camera.speed = data.cameraSpeed;
	Camera.setCameraPositionAndRotation(Camera.camera, data.cameras[0]);
	Camera.cameraInitialInfo = data.cameras[0];

	data.lights.forEach(function(light) {
		scene.add(Light.generateLight(light));
	});

	var emap = Map.generateMapFromNumberMap(data.map, data.objectList);
	Map.loadMapInScene(emap, scene);

	Map.map = emap;

	renderer.setClearColor( Utils.stringHexToHex( data.clearcolor ), 1 );

	var player = Living.generateLiving(data.player);
	scene.add(player);
	Player.player = player;

	TimeClock.getDelta();
	render();
});
