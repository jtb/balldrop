var params = new URLSearchParams(location.search);
var demoColorPicker;
var container;
var camera, scene, renderer;
var cube;

window.onload = function () {
	for (var p of params.entries()){
		$('.' + p[0]).css('fill', '#' + p[1]);
	}
	
	init();
	animate();
	
	demoColorPicker = new iro.ColorPicker("#color-picker-container", {
		  // Set the size of the color picker UI
		  width: 320,
		  height: 320,
		  color: "#f00",
		});
};

var allStates = $("svg.tricolor > *");


allStates.on('click touchstart', function () {
	var colorhex = demoColorPicker.color.hexString;
	$(this).css('fill', colorhex);
	var key = $(this).attr('class')
	params.set(key, colorhex.replace('#', ''));
	window.history.replaceState({}, '', `${location.pathname}?${params}${location.hash}`);
});

$(document).on('pagecontainershow',function(event, ui){
	if (Array.from(params).length > 0) {
		window.history.replaceState({}, '', `${location.pathname}?${params}${location.hash}`);
	}
});
  
function init() {
        // Create the camera                                                                                                                                                                 
        camera = new THREE.PerspectiveCamera(
                75 /* field of view */,
                window.innerWidth/window.innerHeight /* aspect ratio */,
                0.1 /* near plane */,
                1000 /* far plane*/
        );
        camera.position.z = 5;

        // create the Scene                                                                                                                                                                  
        scene = new THREE.Scene();
        scene.background = new THREE.Color( 0x0b0b31 );

        // create the Geodesic Dome                                                                                                                                                          
        cube = new THREE.Mesh( new THREE.CubeGeometry( 1,1,1 ), new THREE.MeshNormalMaterial() );
        //cube.position.y = 150;                                                                                                                                                             

        // Add dome to the scene.                                                                                                                                                            
        scene.add( cube );

        // init the WebGL renderer and append it to the DOM                                                                                                                                  
        renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize( window.innerWidth, window.innerHeight );
        container = document.getElementById( 'ThreeJS' );
        container.appendChild( renderer.domElement );

        // Helper for resizing window                                                                                                                                                        
        THREEx.WindowResize(renderer, camera);
}

function animate() {
        // relaunch the 'timer'                                                                                                                                                              
        requestAnimationFrame( animate );
        // render the 3D scene                                                                                                                                                               
        render();
}

function render() {
        renderer.render( scene, camera );
}

  