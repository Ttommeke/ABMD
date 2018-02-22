var Text = {
    TEXT_COLOR: 0xc1c1c1,
    font: undefined,
    textList: []
};

Text.initText = function(textInfo, textList) {
    var fontLoader = new THREE.FontLoader();
	fontLoader.load( textInfo.fontFile, Text.loadFont, undefined, undefined );
    Text.textList = textList;
};

Text.loadFont = function(myFont) {
    Text.font = myFont;

    Text.displayTextList(Text.textList);
};

Text.displayTextList = function(textList) {
    textList.forEach(function(textJson) {
		var textObject = Text.createText( textJson.text, textJson.size, Utils.stringHexToHex(textJson.color));
	    textObject.position.set(textJson.position.x, textJson.position.y, textJson.position.z);
	    textObject.rotation.set(textJson.rotation.x, textJson.rotation.y, textJson.rotation.z);
	    scene.add(textObject);
	});
}

Text.createText = function(text, size, color) {
    var geometry = new THREE.TextGeometry(text, {
            font: Text.font,
            size: size,
            height: size/2
        });
    var material = new THREE.MeshLambertMaterial({"color": color});
    var textM = new THREE.Mesh( geometry, material );

    return textM;
};
