
var Animation = {
    animations: {},
    DANCE_CYCLE_TIME: 0.60,
    SHOT_TIME: 0.60
};

Animation.animations.dance = function( cube, elapseTime) {
    var cycleTime = Animation.DANCE_CYCLE_TIME;
    var hitbox = cube.hitbox;
    var difference = (elapseTime%cycleTime) / cycleTime;

    var scaleY = 1 + Math.sin(difference*Math.PI*2)/4;
    cube.scale.y = scaleY;
    cube.scale.x = 1 / (scaleY);
    cube.scale.z = 1 / (scaleY);
    cube.position.y = (scaleY*hitbox.y) / 2;
};

Animation.animations.move = function( cube, elapseTime) {
    var cycleTime = cube.speed/10;
    var difference = (elapseTime%cycleTime) / cycleTime;
    var hitbox = cube.hitbox;

    var scaleY = 1 + Math.sin(difference*Math.PI*2)/10;
    var scaleXandZ = 1/scaleY;
    cube.scale.y = scaleY;
    //cube.scale.x = scaleXandZ;
    //cube.scale.z = scaleXandZ;
    cube.position.y = (scaleY*hitbox.y) / 2;
}

Animation.animations.standStill = function( cube, elapseTime) {
    var hitbox = cube.hitbox;
    cube.scale.y = 1;
    cube.position.y = (hitbox.y)/2;
}
