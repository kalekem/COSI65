theScene = null;

// once everything is loaded, we run our Three.js stuff.
function init() {

    var scene = new THREE.Scene();
	theScene =scene;
    var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100000);

    var webGLRenderer = new THREE.WebGLRenderer();
    webGLRenderer.setClearColor(new THREE.Color(0x0000cc, 1.0));
    webGLRenderer.setSize(window.innerWidth, window.innerHeight);
    webGLRenderer.shadowMapEnabled = true;

    camera.position.x = 0;
    camera.position.y = -20;
    camera.position.z = 5;
	camera.up.set(0,0,1);  // let z be the up direction for the camera
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    var spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(150, 150, 150);
    spotLight.intensity = 2;
    scene.add(spotLight);

    document.getElementById("WebGL-output").appendChild(webGLRenderer.domElement);

    var loader = new THREE.ColladaLoader();

    theScene=null;
	suzy=null;
    loader.load("models/simpleScene.dae", function (result) {
        theScene = result.scene.clone();
		suzy = theScene.getObjectByName("Suzanne");
        scene.add(theScene);
    });
	
	


    render();

	var dt=0.05;
	
    function render() {
        requestAnimationFrame(render);
		if (suzy){
			suzy.rotateZ(dt);
		}
		
        webGLRenderer.render(scene, camera);
    }
	
	
	//INTERACTION CODE
	
	

	var mouseX = 0, mouseY = 0;

	var windowHalfX = 0;
	var windowHalfY = 0;

	//

	var handleResize = function () {

		windowHalfX = window.innerWidth / 2;
		windowHalfY = window.innerHeight / 2;

	};
	
	function onKeyDown( event ) {
		console.log("keydown: "+event.keyCode);
		//event.preventDefault();

		switch ( event.keyCode ) {

			case 38: /*up*/
			case 87: /*W*/  camera.position.y += 0.1; break;

			case 37: /*left*/
			case 65: /*A*/  break;

			case 40: /*down*/
			case 83: /*S*/  camera.position.y -= 0.1; break;

			case 39: /*right*/
			case 68: /*D*/  break;

			case 81: /*Q*/  break;
			case 69: /*E*/  break;

			case 82: /*R*/  break;
			case 70: /*F*/  break;

		}

	};

	function onKeyUp( event ) {

		switch( event.keyCode ) {

			case 38: /*up*/
			case 87: /*W*/  break;

			case 37: /*left*/
			case 65: /*A*/  break;

			case 40: /*down*/
			case 83: /*S*/  break;

			case 39: /*right*/
			case 68: /*D*/  break;

			case 81: /*Q*/  break;
			case 69: /*E*/  break;

			case 82: /*R*/  break;
			case 70: /*F*/  break;

		}

	};

	function onMouseMove( event ) {

		mouseX = ( event.clientX - windowHalfX ) / window.innerWidth;
		mouseY = ( event.clientY - windowHalfY ) / window.innerHeight;
		//console.log("mouse:["+mouseX+","+mouseY+"]");
	};

	function onMouseDown ( event ) {

		event.preventDefault();
		event.stopPropagation();

		switch ( event.button ) {

			case 0: forwardSpeed = 1; break;
			case 2: forwardSpeed = -1; break;

		}


	};

	function onMouseUp ( event ) {

		event.preventDefault();
		event.stopPropagation();

		switch ( event.button ) {

			case 0: forwardSpeed = 0; break;
			case 2: forwardSpeed = 0; break;

		}

	};

	document.addEventListener( 'contextmenu', function ( event ) { event.preventDefault(); }, false );

	document.addEventListener( 'mousemove', onMouseMove, false );
	document.addEventListener( 'mousedown', onMouseDown, false );
	document.addEventListener( 'mouseup', onMouseUp, false );
	document.addEventListener( 'keydown', onKeyDown, false );
	document.addEventListener( 'keypress', onKeyDown, false );
	document.addEventListener( 'keyup', onKeyUp, false );

	handleResize();

	

  
}
window.onload = init;