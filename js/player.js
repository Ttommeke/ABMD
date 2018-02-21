
var Player = {};

Player.lookTowardsPosition = function(player, lookVector) {
    var mouseVector = lookVector.clone();
    mouseVector.sub(player.position);
    mouseVector.y = 0;

    var angleToMouse = mouseVector.angleTo(new THREE.Vector3(1,0,0));

    if (isNaN(angleToMouse)) {
        angleToMouse = 0;
    }
    if (mouseVector.z > 0) {
        angleToMouse *= -1;
    }

    player.rotation.y = angleToMouse;
}

Player.executeKeys = function(player, deltaTime) {

    var direction = new THREE.Vector3(0,0,0);

    if (Events.keys.ArrowUp.isPressed()) {
        direction.z -= 1;
    }
    if (Events.keys.ArrowDown.isPressed()) {
        direction.z += 1;
    }
    if (Events.keys.ArrowLeft.isPressed()) {
        direction.x -= 1;
    }
    if (Events.keys.ArrowRight.isPressed()) {
        direction.x += 1;
    }

    if (Events.keys[" "].isPressed()) {
        player.state.dancing = true;
    } else {
        player.state.dancing = false;
    }

    if (direction.x != 0 || direction.y != 0 || direction.z != 0) {
        player.state.moving = true;
    } else {
        player.state.moving = false;
    }

    direction.applyAxisAngle(new THREE.Vector3(0,1,0), player.rotation.y - 3.1415/2);

    Living.moveLivingWithCollisionCheck(player, deltaTime, direction, player.speed, Map.map);
}
