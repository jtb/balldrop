var params = new URLSearchParams(location.search);
var demoColorPicker;
var container;
var camera, scene, renderer;
var cube;
var controls;
var i;
var j;
var colors = {};

var group;
var geometry2;
var starField;

var mouseUp = 1;
document.body.onmousedown = function() {
    mouseUp = 0;
}
document.body.onmouseup = function() {
    mouseUp = 1;
}

window.onload = function () {
	screwYouFacebook();
	
	for (i = 0; i < 16; i++) {
		$('.a' + i).css('fill', '#ffffff');
		colors["a" + i] = "0xffffff";
	}
	for (i = 16; i < 32; i++) {
		$('.a' + i).css('fill', '#000000');
		colors["a" + i] = "0x000000";
	}
	for (var p of params.entries()){
		$('.' + p[0]).css('fill', '#' + p[1]);
		colors[p[0]] = '0x' + p[1];
	}
	//alert(colors["a1"]);
	
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
	colors[key] = colorhex.replace('#', '0x');
	params.set(key, colorhex.replace('#', ''));
	window.history.replaceState({}, '', `${location.pathname}?${params}${location.hash}`);
	updateColors();
});

$(document).on('pagecontainershow',function(event, ui){
	screwYouFacebook()
	//if (Array.from(params).length > 0) {
	//	window.history.replaceState({}, '', `${location.pathname}?${params}${location.hash}`);
	//}
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
		
		controls = new THREE.TrackballControls( camera );
		controls.noPan = true;
		controls.noZoom = true;

        // create the Scene                                                                                                                                                                  
        scene = new THREE.Scene();
        scene.background = new THREE.Color( 0x0b0b31 );

        // create the Geodesic Dome
		generateDome();
		                                                                                                                                                          
        //cube = new THREE.Mesh( new THREE.CubeGeometry( 1,1,1 ), new THREE.MeshNormalMaterial() );
        //cube.position.y = 150;                                                                                                                                                             

        // Add dome to the scene.                                                             
		//addStarField();
		//scene.add( starField );                                                              
        scene.add( group );

        // init the WebGL renderer and append it to the DOM                                                                                                                                  
        renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize( window.innerWidth, window.innerHeight );
        container = document.getElementById( 'ThreeJS' );
        container.appendChild( renderer.domElement );

        // Helper for resizing window                                                                                                                                                        
        THREEx.WindowResize(renderer, camera);
}

function animate() {
    controls.update();
        
    // render the 3D scene
	requestAnimationFrame( animate );
    if (mouseUp) {
		  //group.rotation.x += 0.0013;                                             
		  group.rotation.y += 0.003;
	}                                                                                                                                                              
	
	render();
}

function render() {
        renderer.render( scene, camera );
}

function generateDome() {
	var geometry = new IcosahedralGeodesicBufferGeometry( 2, 3 );
	geometry2 = new IcosahedralGeodesicGeometry( 1.95, 12 );
	var geometry2b = new IcosahedralGeodesicGeometry( 1.96, 12 );
	var geometry3 = new IcosahedralGeodesicBufferGeometry( 1.97, 6 );
	
	var edges2 = new THREE.EdgesGeometry( geometry2b );
	var line2 = new THREE.LineSegments( edges2, new THREE.LineBasicMaterial( { color: 0x505050 } ) );
	var edges = new THREE.EdgesGeometry( geometry );
	var lineGeometry = new THREE.LineSegmentsGeometry().setPositions( edges.attributes.position.array );
	var lineMaterial = new THREE.LineMaterial( { color: 0x000000, linewidth: 8 } );
	lineMaterial.resolution.set( window.innerWidth, window.innerHeight );
	var line = new THREE.Line2( lineGeometry, lineMaterial);
	var edges3 = new THREE.EdgesGeometry( geometry3 );
	var lineGeometry3 = new THREE.LineSegmentsGeometry().setPositions( edges3.attributes.position.array );
	var lineMaterial3 = new THREE.LineMaterial( { color: 0x000000, linewidth: 3 } );
	lineMaterial3.resolution.set( window.innerWidth, window.innerHeight );
	var line3 = new THREE.Line2( lineGeometry3, lineMaterial3);
	
	var material = new THREE.MeshBasicMaterial(
	        {
	          //wireframeLinewidth: 30,                                                                                                                                                          
	          vertexColors: THREE.FaceColors,
	          //color: 0x00ff00,                                                                                                                                                                 
	          //transparent: true,                                                                                                                                                               
	          //opacity: 0.8                                                                                                                                                                     
	        } );
	var cube = new THREE.Mesh( geometry2, material );
	group = new THREE.Group();
	group.add(line);
	group.add(line2);
	group.add(line3);
	group.add(cube);
	updateColors();
}

String.prototype.hexEncode = function(){
    var hex, i;

    var result = "";
    for (i=0; i<this.length; i++) {
        hex = this.charCodeAt(i).toString(16);
        result += ("000"+hex).slice(-4);
    }

    return result
}

function updateColors() {
	for (i = 0; i < 20; i++) {
		geometry2.faces[i*144 + 0].color.setHex(colors["a16"]);
		geometry2.faces[i*144 + 1].color.setHex(colors["a18"]);
		geometry2.faces[i*144 + 2].color.setHex(colors["a17"]);
		geometry2.faces[i*144 + 3].color.setHex(colors["a21"]);
		geometry2.faces[i*144 + 4].color.setHex(colors["a20"]);
		geometry2.faces[i*144 + 5].color.setHex(colors["a26"]);
		geometry2.faces[i*144 + 6].color.setHex(colors["a25"]);
		geometry2.faces[i*144 + 7].color.setHex(colors["a15"]);
		geometry2.faces[i*144 + 8].color.setHex(colors["a9"]);
		geometry2.faces[i*144 + 9].color.setHex(colors["a10"]);
		geometry2.faces[i*144 + 10].color.setHex(colors["a11"]);
		geometry2.faces[i*144 + 11].color.setHex(colors["a12"]);
		geometry2.faces[i*144 + 12].color.setHex(colors["a13"]);
		geometry2.faces[i*144 + 13].color.setHex(colors["a14"]);
		geometry2.faces[i*144 + 14].color.setHex(colors["a15"]);
		geometry2.faces[i*144 + 15].color.setHex(colors["a9"]);
		geometry2.faces[i*144 + 16].color.setHex(colors["a31"]);
		geometry2.faces[i*144 + 17].color.setHex(colors["a30"]);
		geometry2.faces[i*144 + 18].color.setHex(colors["a24"]);
		geometry2.faces[i*144 + 19].color.setHex(colors["a23"]);
		geometry2.faces[i*144 + 20].color.setHex(colors["a19"]);
		geometry2.faces[i*144 + 21].color.setHex(colors["a18"]);
		geometry2.faces[i*144 + 22].color.setHex(colors["a16"]);
		geometry2.faces[i*144 + 23].color.setHex(colors["a19"]);
		geometry2.faces[i*144 + 24].color.setHex(colors["a23"]);
		geometry2.faces[i*144 + 25].color.setHex(colors["a22"]);
		geometry2.faces[i*144 + 26].color.setHex(colors["a28"]);
		geometry2.faces[i*144 + 27].color.setHex(colors["a27"]);
		geometry2.faces[i*144 + 28].color.setHex(colors["a13"]);
		geometry2.faces[i*144 + 29].color.setHex(colors["a14"]);
		geometry2.faces[i*144 + 30].color.setHex(colors["a8"]);
		geometry2.faces[i*144 + 31].color.setHex(colors["a4"]);
		geometry2.faces[i*144 + 32].color.setHex(colors["a5"]);
		geometry2.faces[i*144 + 33].color.setHex(colors["a6"]);
		geometry2.faces[i*144 + 34].color.setHex(colors["a7"]);
		geometry2.faces[i*144 + 35].color.setHex(colors["a8"]);
		geometry2.faces[i*144 + 36].color.setHex(colors["a4"]);
		geometry2.faces[i*144 + 37].color.setHex(colors["a10"]);
		geometry2.faces[i*144 + 38].color.setHex(colors["a11"]);
		geometry2.faces[i*144 + 39].color.setHex(colors["a29"]);
		geometry2.faces[i*144 + 40].color.setHex(colors["a28"]);
		geometry2.faces[i*144 + 41].color.setHex(colors["a22"]);
		geometry2.faces[i*144 + 42].color.setHex(colors["a21"]);
		geometry2.faces[i*144 + 43].color.setHex(colors["a17"]);
		geometry2.faces[i*144 + 44].color.setHex(colors["a24"]);
		geometry2.faces[i*144 + 45].color.setHex(colors["a30"]);
		geometry2.faces[i*144 + 46].color.setHex(colors["a29"]);
		geometry2.faces[i*144 + 47].color.setHex(colors["a11"]);
		geometry2.faces[i*144 + 48].color.setHex(colors["a12"]);
		geometry2.faces[i*144 + 49].color.setHex(colors["a6"]);
		geometry2.faces[i*144 + 50].color.setHex(colors["a7"]);
		geometry2.faces[i*144 + 51].color.setHex(colors["a3"]);
		geometry2.faces[i*144 + 52].color.setHex(colors["a1"]);
		geometry2.faces[i*144 + 53].color.setHex(colors["a2"]);
		geometry2.faces[i*144 + 54].color.setHex(colors["a3"]);
		geometry2.faces[i*144 + 55].color.setHex(colors["a1"]);
		geometry2.faces[i*144 + 56].color.setHex(colors["a5"]);
		geometry2.faces[i*144 + 57].color.setHex(colors["a6"]);
		geometry2.faces[i*144 + 58].color.setHex(colors["a12"]);
		geometry2.faces[i*144 + 59].color.setHex(colors["a13"]);
		geometry2.faces[i*144 + 60].color.setHex(colors["a27"]);
		geometry2.faces[i*144 + 61].color.setHex(colors["a26"]);
		geometry2.faces[i*144 + 62].color.setHex(colors["a20"]);
		geometry2.faces[i*144 + 63].color.setHex(colors["a31"]);
		geometry2.faces[i*144 + 64].color.setHex(colors["a9"]);
		geometry2.faces[i*144 + 65].color.setHex(colors["a10"]);
		geometry2.faces[i*144 + 66].color.setHex(colors["a4"]);
		geometry2.faces[i*144 + 67].color.setHex(colors["a5"]);
		geometry2.faces[i*144 + 68].color.setHex(colors["a1"]);
		geometry2.faces[i*144 + 69].color.setHex(colors["a2"]);
		geometry2.faces[i*144 + 70].color.setHex(colors["a0"]);
		geometry2.faces[i*144 + 71].color.setHex(colors["a0"]);
		geometry2.faces[i*144 + 72].color.setHex(colors["a0"]);
		geometry2.faces[i*144 + 73].color.setHex(colors["a2"]);
		geometry2.faces[i*144 + 74].color.setHex(colors["a3"]);
		geometry2.faces[i*144 + 75].color.setHex(colors["a7"]);
		geometry2.faces[i*144 + 76].color.setHex(colors["a8"]);
		geometry2.faces[i*144 + 77].color.setHex(colors["a14"]);
		geometry2.faces[i*144 + 78].color.setHex(colors["a15"]);
		geometry2.faces[i*144 + 79].color.setHex(colors["a25"]);
		geometry2.faces[i*144 + 80].color.setHex(colors["a15"]);
		geometry2.faces[i*144 + 81].color.setHex(colors["a14"]);
		geometry2.faces[i*144 + 82].color.setHex(colors["a8"]);
		geometry2.faces[i*144 + 83].color.setHex(colors["a7"]);
		geometry2.faces[i*144 + 84].color.setHex(colors["a3"]);
		geometry2.faces[i*144 + 85].color.setHex(colors["a2"]);
		geometry2.faces[i*144 + 86].color.setHex(colors["a0"]);
		geometry2.faces[i*144 + 87].color.setHex(colors["a0"]);
		geometry2.faces[i*144 + 88].color.setHex(colors["a0"]);
		geometry2.faces[i*144 + 89].color.setHex(colors["a2"]);
		geometry2.faces[i*144 + 90].color.setHex(colors["a1"]);
		geometry2.faces[i*144 + 91].color.setHex(colors["a5"]);
		geometry2.faces[i*144 + 92].color.setHex(colors["a4"]);
		geometry2.faces[i*144 + 93].color.setHex(colors["a10"]);
		geometry2.faces[i*144 + 94].color.setHex(colors["a9"]);
		geometry2.faces[i*144 + 95].color.setHex(colors["a13"]);
		geometry2.faces[i*144 + 96].color.setHex(colors["a12"]);
		geometry2.faces[i*144 + 97].color.setHex(colors["a6"]);
		geometry2.faces[i*144 + 98].color.setHex(colors["a5"]);
		geometry2.faces[i*144 + 99].color.setHex(colors["a1"]);
		geometry2.faces[i*144 + 100].color.setHex(colors["a3"]);
		geometry2.faces[i*144 + 101].color.setHex(colors["a2"]);
		geometry2.faces[i*144 + 102].color.setHex(colors["a1"]);
		geometry2.faces[i*144 + 103].color.setHex(colors["a3"]);
		geometry2.faces[i*144 + 104].color.setHex(colors["a7"]);
		geometry2.faces[i*144 + 105].color.setHex(colors["a6"]);
		geometry2.faces[i*144 + 106].color.setHex(colors["a12"]);
		geometry2.faces[i*144 + 107].color.setHex(colors["a11"]);
		geometry2.faces[i*144 + 108].color.setHex(colors["a11"]);
		geometry2.faces[i*144 + 109].color.setHex(colors["a10"]);
		geometry2.faces[i*144 + 110].color.setHex(colors["a4"]);
		geometry2.faces[i*144 + 111].color.setHex(colors["a8"]);
		geometry2.faces[i*144 + 112].color.setHex(colors["a7"]);
		geometry2.faces[i*144 + 113].color.setHex(colors["a6"]);
		geometry2.faces[i*144 + 114].color.setHex(colors["a5"]);
		geometry2.faces[i*144 + 115].color.setHex(colors["a4"]);
		geometry2.faces[i*144 + 116].color.setHex(colors["a8"]);
		geometry2.faces[i*144 + 117].color.setHex(colors["a14"]);
		geometry2.faces[i*144 + 118].color.setHex(colors["a13"]);
		geometry2.faces[i*144 + 119].color.setHex(colors["a9"]);
		geometry2.faces[i*144 + 120].color.setHex(colors["a15"]);
		geometry2.faces[i*144 + 121].color.setHex(colors["a14"]);
		geometry2.faces[i*144 + 122].color.setHex(colors["a13"]);
		geometry2.faces[i*144 + 123].color.setHex(colors["a12"]);
		geometry2.faces[i*144 + 124].color.setHex(colors["a11"]);
		geometry2.faces[i*144 + 125].color.setHex(colors["a10"]);
		geometry2.faces[i*144 + 126].color.setHex(colors["a9"]);
		geometry2.faces[i*144 + 127].color.setHex(colors["a15"]);
		geometry2.faces[i*144 + 128].color.setHex(colors["a25"]);
		geometry2.faces[i*144 + 129].color.setHex(colors["a26"]);
		geometry2.faces[i*144 + 130].color.setHex(colors["a27"]);
		geometry2.faces[i*144 + 131].color.setHex(colors["a28"]);
		geometry2.faces[i*144 + 132].color.setHex(colors["a29"]);
		geometry2.faces[i*144 + 133].color.setHex(colors["a30"]);
		geometry2.faces[i*144 + 134].color.setHex(colors["a31"]);
		geometry2.faces[i*144 + 135].color.setHex(colors["a20"]);
		geometry2.faces[i*144 + 136].color.setHex(colors["a21"]);
		geometry2.faces[i*144 + 137].color.setHex(colors["a22"]);
		geometry2.faces[i*144 + 138].color.setHex(colors["a23"]);
		geometry2.faces[i*144 + 139].color.setHex(colors["a24"]);
		geometry2.faces[i*144 + 140].color.setHex(colors["a17"]);
		geometry2.faces[i*144 + 141].color.setHex(colors["a18"]);
		geometry2.faces[i*144 + 142].color.setHex(colors["a19"]);
		geometry2.faces[i*144 + 143].color.setHex(colors["a16"]);
	}
	geometry2.elementsNeedUpdate = true;
}

function screwYouFacebook() {
	params.delete("fbclid");
	if (Array.from(params).length > 0) {
		window.history.replaceState({}, '', `${location.pathname}?${params}${location.hash}`);
	} else {
		window.history.replaceState({}, '', `${location.pathname}${location.hash}`);
	}
}

function addStarField() {
	var tex = new THREE.TextureLoader().load("https://threejs.org/examples/textures/sprites/disc.png");
	var starsGeometry = new THREE.Geometry();

	for ( var i = 0; i < 10000; i ++ ) {

		var star = new THREE.Vector3();
		star.x = THREE.Math.randFloatSpread( 1000 );
		star.y = THREE.Math.randFloatSpread( 1000 );
		star.z = THREE.Math.randFloatSpread( -5000);

		starsGeometry.vertices.push( star );

	}

	var starsMaterial = new THREE.PointsMaterial( { color: 0xfdffcc, size: 3.0, map: tex, alphaTest: 0.5, transparent: true } );

	starField = new THREE.Points( starsGeometry, starsMaterial );
	
}


  