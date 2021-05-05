
//	thomas.d.papadopoulos@gmail.com
//updated 11/09/2018 by Marianthi Grizioti mgriziot@ppp.uoa.gr

var titleDiv, titleText, problemDiv, problemText, linksDiv, linksText, authorText;

var colorDiv = new Array, pickerTop, pickerLeft, pickerTopPad, pickerLeftPad, colorsLeft, wireFrame;

var block_added = 0, block_removed = 0, rareBlock_removed = 0, rareBlock_numOf = 0;

var init_show, usr_show, rare_show, tot_show;

var lookUpDiv, lookUpWidth, lookUpLeft, lookUpText, lookUp;

var heightsTable;

var container;
var scene, renderer;

var camera, cameraControls;
var cameraDistance = 1200;

var clock = new THREE.Clock();

var projector, plane, cube;
var mouse2D, mouse3D, raycaster;

var isCtrlDown = false;
var rotating = false;

var voxelPosition = new THREE.Vector3(), tmpVec = new THREE.Vector3();
var cubeGeo, cubeMaterial;
var frameGeo, frameMaterial;
var i, intersector;

var gridDimension, cubeDimenstion, gridDensity;

var canvasGeometry;

var startMouse2D = new THREE.Vector3(0, 0, 0.5);
var currMouse2D = new THREE.Vector3(0, 0, 0.5);
var diffX = 0, diffY = 0;

var colors = [ 0x000000, 0xDF1F1F, 0xDFAF1F, 0x80DF1F, 0x1FDF50, 0x1FDFDF, 0x1F4FDF, 0x7F1FDF, 0xDF1FAF, 0xCCCCCC ];
var colorValue;


function createText()
{

	titleDiv = document.createElement( 'div' );
	titleDiv.style.position = 'absolute';
	titleDiv.style.top = '5px';
	titleDiv.style.left = '5px';
	titleDiv.style.color = '#006699';
	titleDiv.style.font = '15px Verdana, Geneva, sans-serif';			// 18.7.13
	titleDiv.appendChild( document.createTextNode( titleText ) );
	container.appendChild( titleDiv );

	problemDiv = document.createElement( 'div' );
	problemDiv.style.position = 'absolute';
	problemDiv.style.top = '30px';
	problemDiv.style.width = '250px';
	problemDiv.style.left = '5px';
	problemDiv.style.border = '1px solid #a1a1a1';
	problemDiv.style.padding = '7px 10px';
	problemDiv.style.background = '#dddddd';
	problemDiv.style.borderRadius = '10px';
	problemDiv.style.textAlign = 'justify';
	problemDiv.style.font = '13px Verdana, Geneva, sans-serif';		// 18.7.13
	problemDiv.style.opacity = 0.8;
	problemDiv.innerHTML = '<span class=\"line\"> </span>';
	var i, j;
	var table = document.createElement("table");
	var tbody = document.createElement("tbody");
	table.appendChild(tbody);
	for (  i = 0; i < gridDensity; i ++ )
	{
		tbody.insertRow(i);
		for ( j = 0; j < gridDensity; j ++ )
		{
			tbody.rows[i].insertCell(j);
			if ( heightsTable[i][j] == 0 )
			{
				tbody.rows[i].cells[j].appendChild( document.createTextNode( "" ) );
			}
			else
			{
				tbody.rows[i].cells[j].appendChild( document.createTextNode( heightsTable[i][j].toString() ) );
			}
		}
	}
	problemDiv.appendChild(table);
	problemDiv.appendChild( document.createTextNode( problemText ) );
	container.appendChild( problemDiv );

	var linksTop = window.innerHeight - 20;
	linksDiv = document.createElement( 'div' );
	linksDiv.style.position = 'absolute';
	linksDiv.style.top = linksTop.toString() + 'px';
	linksDiv.style.left = '0px';
	linksDiv.style.width = '100%';
	linksDiv.style.font = '12px Verdana, Geneva, sans-serif';
	linksDiv.style.textAlign = 'center';

	linksText = authorText + '&nbsp&nbsp&nbsp&nbsp<a href = \"common/readme.html\" target = \"_blank\">Οδηγίες για μαθητή</a>' +
										'&nbsp&nbsp&nbsp&nbsp<a href = \"common/manual.html\" target = \"_blank\">Οδηγίες τροποποίησης</a>' +
										'&nbsp&nbsp&nbsp&nbsp<a href=\"http://etl.ppp.uoa.gr/cubeworld/grid_template.zip\" >Λήψη Προτύπου</a>';
	linksDiv.innerHTML = linksText;
	container.appendChild( linksDiv );


	if ( init_show || usr_show || rare_show || tot_show ) {
		lookUpWidth = 220;
		lookUpLeft = window.innerWidth - ( 65 + lookUpWidth );	// - 40 is the picker
		lookUp = false;

		lookUpDiv = document.createElement( 'div' );
		lookUpDiv.style.position = 'absolute';
		lookUpDiv.id = 'show_hide';
		lookUpDiv.style.top = '35px';		// 18.7.13 (same with picker)
		lookUpDiv.style.left = lookUpLeft.toString() + 'px';
		lookUpDiv.style.width = lookUpWidth.toString() + 'px';
		lookUpDiv.style.border = '1px solid #a1a1a1';
		lookUpDiv.style.font = '12px Verdana, Geneva, sans-serif';
		lookUpDiv.style.padding = '5px 5px';
		lookUpDiv.style.borderRadius = '5px';
		lookUpDiv.style.opacity = 0.8;
		lookUpDiv.addEventListener(
			"click",
			function () {
			lookUp = !lookUp;
			},
			false
		);
		container.appendChild( lookUpDiv );
	}


	pickerTop = 35;		// 18.7.13
	pickerLeft = window.innerWidth - 40;
	pickerTopPad = 45;		// 18.7.13
	pickerLeftPad = 7;

	colorDiv[0] = document.createElement( 'div' );
	colorDiv[0].style.position = 'absolute';
	colorDiv[0].style.top = pickerTop.toString() + 'px';
	colorDiv[0].style.width = '38px';
	colorDiv[0].style.height = '310px';
	colorDiv[0].style.left = pickerLeft.toString() + 'px';
	colorDiv[0].style.background = '#404040';
	colorDiv[0].style.borderRadius = '5px';
	colorDiv[0].style.opacity = 0.7;
	container.appendChild( colorDiv[0] );

	colorsLeft = pickerLeft + pickerLeftPad;

	for ( var ci = 0; ci < 9; ci ++ )
	{

		colorDiv[ ci + 1 ] = document.createElement( 'div' );
		colorDiv[ ci + 1 ].id = ( ci + 1 ).toString();
		colorDiv[ ci + 1 ].style.position = 'absolute';
		pickerTop = ci * 33 + pickerTopPad;
		colorDiv[ ci + 1 ].style.top = pickerTop.toString() + 'px';
		colorDiv[ ci + 1 ].style.left = colorsLeft.toString() + 'px';
		colorDiv[ ci + 1 ].style.height = '22px';
		colorDiv[ ci + 1 ].style.width = '22px';
		colorDiv[ ci + 1 ].style.border = '1px solid #FFFFFF';
		var tmpColor = colors[ ci + 1 ].toString(16);
		var tmpLength = tmpColor.length;
		for ( var i = 0; i < 6 - tmpLength; i ++ )
		{
			tmpColor = '0' + tmpColor;
		}
		colorDiv[ ci + 1 ].style.background = '#' + tmpColor;
		colorDiv[ ci + 1 ].style.borderRadius = '5px';
		colorDiv[ ci + 1 ].style.opacity = 0.5;
		colorDiv[ ci + 1 ].addEventListener(
			"click",
			function ( event ) {
				for ( var oi = 0; oi < 9; oi ++ ) {
					colorDiv[ oi + 1 ].style.opacity = 0.5;
				}
				event.target.style.opacity = 1;
				colorValue =  parseInt ( event.target.id ) ;
			},
			false
		);
		container.appendChild( colorDiv[ ci + 1 ] );

	}

}


function fillScene() {

	// GRID PLANE
	createVoxelBase(plane, gridDimension, gridDensity, 0, 0, 0, Math.PI/2, '');

	// cubes
	colorValue = 8;
	cubeGeo = new THREE.CubeGeometry( cubeDimension, cubeDimension, cubeDimension );
	cubeMaterial = new THREE.MeshLambertMaterial( { color: colors[colorValue], ambient: 0x00ff80, shading: THREE.FlatShading } );

	frameGeo = new THREE.CubeGeometry( cubeDimension, cubeDimension, cubeDimension );
	frameMaterial = new THREE.MeshBasicMaterial({color: 0xffffff, wireframe: true});

	//	rare canvas

	var row, col, alt;

	rareBlock_numOf = 0;

	for ( row = 0; row <= gridDensity - 1; row ++ )
	{
		for ( col = 0; col <= gridDensity - 1; col ++ )
		{
			for ( alt = 0; alt <= gridDensity - 1; alt ++ )
			{
				if ( canvasGeometry[row][col][alt] > 0 )
				{
					colorValue = canvasGeometry[row][col][alt];
					var voxel = new THREE.Mesh( cubeGeo, new THREE.MeshLambertMaterial( { color: colors[colorValue], ambient: 0x00ff80, shading: THREE.FlatShading } )  );
					voxel.name = 'rareBlock';
					voxel.position.x = cubeDimension * col + cubeDimension/2 - gridDimension/2;
					voxel.position.y = cubeDimension * alt + cubeDimension/2;
					voxel.position.z = cubeDimension * row + cubeDimension/2 - gridDimension/2;
					voxel.matrixAutoUpdate = false;
					voxel.updateMatrix();
					scene.add( voxel );

					rareBlock_numOf ++;

					if ( wireFrame )
					{
						var voxelFrame = new THREE.Mesh( frameGeo, frameMaterial );
						voxelFrame.name = voxel.id.toString();
						voxelFrame.position.x = cubeDimension * col + cubeDimension/2 - gridDimension/2;
						voxelFrame.position.y = cubeDimension * alt + cubeDimension/2;
						voxelFrame.position.z = cubeDimension * row + cubeDimension/2 - gridDimension/2;
						voxelFrame.matrixAutoUpdate = false;
						voxelFrame.updateMatrix();
						scene.add( voxelFrame );
					}
				}
			}
		}
	}

	// picking
	projector = new THREE.Projector();
	mouse2D = new THREE.Vector3( 0, 10000, 0.5 );

}


function init() {

	readModel();

	container = document.createElement( 'div' );
	document.body.appendChild( container );

	// RENDERER
	renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.gammaInput = true;
	renderer.gammaOutput = true;
	renderer.setSize(window.innerWidth, window.innerHeight);
	container.appendChild( renderer.domElement );

	// CAMERAS
	camera = new THREE.PerspectiveCamera( 30, window.innerWidth / window.innerHeight, 1, 10000 );
	camera.position.set( cameraDistance, cameraDistance, cameraDistance );

	// CONTROLS
	cameraControls = new THREE.OrbitKeyControl(camera, renderer.domElement);
	cameraControls.target.set(0,0,0);
	cameraControls.minPolarAngle = 0;
	cameraControls.maxPolarAngle = Math.PI;
	cameraControls.minDistance = 600;
	cameraControls.maxDistance = 3000;

	scene = new THREE.Scene();
	scene.fog = new THREE.Fog( 0x808080, 2000, 4000 );

	// LIGHTS
	var ambientLight = new THREE.AmbientLight( 0x222222 );

	var light = new THREE.DirectionalLight( 0xffffff, 1.0 );
	light.position.set( 200, 400, 500 );

	var light2 = new THREE.DirectionalLight( 0xffffff, 1.0 );
	light2.position.set( -200, -400, -200 );

	scene.add(ambientLight);
	scene.add(light);
	scene.add(light2);

	fillScene();
	createText();

	for ( var i = 0; i < 9; i ++ ) {
		colorDiv[ i + 1 ].style.opacity = 0.5;
	}

	if ( colorValue > 0 ) {
		colorDiv[colorValue].style.opacity = 1;
	}

	document.addEventListener( 'mousemove', onDocumentMouseMove, false );
	document.addEventListener( 'mousedown', onDocumentMouseDown, false );
	document.addEventListener( 'mouseup', onDocumentMouseUp, false );
	document.addEventListener( 'mousewheel', onMouseWheel, false );	// WebKit / Opera / Explorer 9
		document.addEventListener( 'contextmenu', onRightClick, false );
	document.addEventListener( 'keydown', onKeyDown, false );
	document.addEventListener( 'keyup', onKeyUp, false );
	document.addEventListener( 'DOMMouseScroll', onMouseWheel, false ); // firefox

}


function clearScene()
{
	var obj, i;

	block_added = 0;
	block_removed = 0;
	rareBlock_removed = 0;

	for ( i = scene.children.length - 1; i >= 0 ; i -- )
	{
		obj = scene.children[ i ];
		if ( obj.name == 'block' || obj.name == 'rareBlock' || obj.name == 'grid')
		{
			scene.remove(obj);
			if ( obj.name == 'block' || obj.name == 'rareBlock' )
			{
				deleteFrameObj( obj.id.toString());
			}
		}
	}

	fillScene();

	for ( var i = 0; i < 9; i ++ ) {
		colorDiv[ i + 1 ].style.opacity = 0.5;
	}

	if ( colorValue > 0 ) {
		colorDiv[colorValue].style.opacity = 1;
	}
}


function deleteFrameOwner( ownerID )
{
	var obj, i;
	for ( i = scene.children.length - 1; i >= 0 ; i -- )
	{
		obj = scene.children[ i ];
		if ( obj.id == parseInt( ownerID ) )
		{
			if  ( obj.name == 'block' ) {
				block_removed ++;
			}
			else {
				rareBlock_removed ++;
			}
			scene.remove( obj );
			return;
		}
	}
}


function deleteFrameObj( nameStr )
{
	var obj, i;
	for ( i = scene.children.length - 1; i >= 0 ; i -- )
	{
		obj = scene.children[ i ];
		if ( obj.name == nameStr )
		{
			scene.remove(obj);
			return;
		}
	}
}


function getRealIntersector( intersects )
{

	for( i = 0; i < intersects.length; i++ )
	{
		intersector = intersects[ i ];

		if ( intersector.object != null )
		{
			return intersector;
		}
	}

	return null;

}


function setVoxelPosition( intersector ) {

	tmpVec.copy( intersector.face.normal );
	tmpVec.applyMatrix4( intersector.object.matrixRotationWorld );

	voxelPosition.addVectors( intersector.point, tmpVec );

	voxelPosition.x = Math.floor( voxelPosition.x / cubeDimension ) * cubeDimension + cubeDimension/2;
	voxelPosition.y = Math.floor( voxelPosition.y / cubeDimension ) * cubeDimension + cubeDimension/2;
	voxelPosition.z = Math.floor( voxelPosition.z / cubeDimension ) * cubeDimension + cubeDimension/2;

}


function onKeyDown( event ) {

	switch( event.keyCode ) {

		case 17: isCtrlDown = true; break;
		case 8: if ( isCtrlDown ) { clearScene(); } break;
	}
}


function onKeyUp( event ) {

	if ( event.keyCode == 17 ) {

		isCtrlDown = false;
	}
}


function onDocumentMouseDown( event ) {

	event.preventDefault();

	mouse2D.x = 2 * ( event.clientX - window.innerWidth / 2 ) / window.innerWidth;
	mouse2D.y = - 2 * ( event.clientY - window.innerHeight/2 ) / window.innerHeight;

	rotating = true;

	startMouse2D.x = mouse2D.x;
	startMouse2D.y = mouse2D.y;
}

function onRightClick (event) {

		event.preventDefault();
		var thetaDelta = 0;
		var phiDelta = 0;

		thetaDelta = Math.abs(cameraControls.endTheta - cameraControls.startTheta);
		phiDelta = Math.abs(cameraControls.endPhi - cameraControls.startPhi);

		if ( thetaDelta <= 0.01 && phiDelta <= 0.01 )
		{
			raycaster = projector.pickingRay( mouse2D.clone(), camera );
			var intersects = raycaster.intersectObjects( scene.children );

			if ( intersects.length > 0 )
			{
				intersector = getRealIntersector( intersects );
					if ( intersector.object.name != 'grid' )
					{

						switch( intersector.object.name )
						{

							case 'block':
								scene.remove( intersector.object );
								block_removed ++;
								if ( wireFrame )
								{
									deleteFrameObj( intersector.object.id.toString());
								}
								break;
							case 'rareBlock':
								scene.remove( intersector.object );
								rareBlock_removed ++;
								if ( wireFrame )
								{
									deleteFrameObj( intersector.object.id.toString());
								}
								break;
							default:
								deleteFrameOwner( intersector.object.name );
								scene.remove( intersector.object );

						}

					}

}
}
}
function onDocumentMouseMove( event ) {

	event.preventDefault();
if (event.which == 1){
	mouse2D.x = 2 * ( event.clientX - window.innerWidth / 2 ) / window.innerWidth;
	mouse2D.y = - 2 * ( event.clientY - window.innerHeight/2 ) / window.innerHeight;

	currMouse2D.x = mouse2D.x;
	currMouse2D.y = mouse2D.y;

	diffX = currMouse2D.x - startMouse2D.x;
	diffY = currMouse2D.y - startMouse2D.y;

	if ( rotating )
	{
		cameraControls.rotateLeft(Math.PI * diffX);
		cameraControls.rotateUp(Math.PI / 2 * diffY);
	}

	startMouse2D.x = currMouse2D.x;
	startMouse2D.y = currMouse2D.y;
}
}

function onDocumentMouseUp( event ) {

	event.preventDefault();
if (event.which == 1){
	var thetaDelta = 0;
	var phiDelta = 0;

	rotating = false;

	thetaDelta = Math.abs(cameraControls.endTheta - cameraControls.startTheta);
	phiDelta = Math.abs(cameraControls.endPhi - cameraControls.startPhi);

	if ( thetaDelta <= 0.01 && phiDelta <= 0.01 )
	{
		raycaster = projector.pickingRay( mouse2D.clone(), camera );
		var intersects = raycaster.intersectObjects( scene.children );

		if ( intersects.length > 0 )
		{
			intersector = getRealIntersector( intersects );


				intersector = getRealIntersector( intersects );
				setVoxelPosition( intersector );

				var voxel = new THREE.Mesh( cubeGeo, new THREE.MeshLambertMaterial( { color: colors[colorValue], ambient: 0x00ff80, shading: THREE.FlatShading } ) );
				voxel.name = 'block';
				voxel.position.copy( voxelPosition );
				voxel.matrixAutoUpdate = false;
				voxel.updateMatrix();

				if ( wireFrame )
				{
					var voxelFrame = new THREE.Mesh( frameGeo, frameMaterial );
					voxelFrame.name = voxel.id.toString();
					voxelFrame.position.copy( voxelPosition );
					voxelFrame.matrixAutoUpdate = false;
					voxelFrame.updateMatrix();
				}

				if ((Math.abs(voxel.position.x) <= gridDimension/2) && (Math.abs(voxel.position.y) <= gridDimension) && (Math.abs(voxel.position.z) <= gridDimension/2))
				{
					scene.add( voxel );

					block_added ++;

					if ( wireFrame )
					{
						scene.add( voxelFrame );
					}
				}
			}
		}

}
	cameraControls.resetAngleDifferences();
}


function onMouseWheel( event ) {

	var delta = 0;
	console.log(event);

	if ( event.wheelDelta ) {	// WebKit / Opera / Explorer 9
		delta = event.wheelDelta;
	} else if ( event.detail ) {	// Firefox
		delta = - event.detail;
	}

	if ( delta > 0 ) {
		cameraControls.dollyOut();
	} else {
		cameraControls.dollyIn();
	}

}


function animate()
{
	window.requestAnimationFrame(animate);
	render();
}


function render()
{
	renderer.setSize ( window.innerWidth, window.innerHeight );

	var delta = clock.getDelta();
	cameraControls.update(delta);
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.render(scene, camera);

	raycaster = projector.pickingRay( mouse2D.clone(), camera );

	var linksTop = window.innerHeight - 20;
	linksDiv.style.top = linksTop.toString() + 'px';

	lookUpLeft = window.innerWidth - ( 65 + lookUpWidth );	// - 40 is the picker
	lookUpDiv.style.left = lookUpLeft.toString() + 'px';

	if ( lookUp ) {
		if ( init_show || usr_show || rare_show || tot_show ) {
			lookUpText = 'Πλήθος Κύβων <<br><hr>';
			if ( init_show ) { lookUpText += 'Στην αρχή υπήρχαν ' + rareBlock_numOf.toString() + '<br>'; }
			if ( usr_show ) { lookUpText += 'Πρόσθεσες ' + ( block_added - block_removed ).toString() + '<br>'; }
			if ( rare_show ) { lookUpText += 'Από τους αρχικούς διέγραψες ' + ( rareBlock_removed ).toString() + '<br>'; }
			if ( tot_show ) { lookUpText += 'Τώρα συνολικά υπάρχουν ' + ( rareBlock_numOf + block_added - block_removed - rareBlock_removed ).toString(); }
		}
	}
	else {
		if ( init_show || usr_show || rare_show || tot_show ) {
			lookUpText = 'Πλήθος Κύβων >';
		}
	}
	lookUpDiv.innerHTML = lookUpText;

	pickerLeft = window.innerWidth - 40;
	colorDiv[0].style.left = pickerLeft.toString() + 'px';
	colorsLeft = pickerLeft + pickerLeftPad;
	for ( var ci = 1; ci < 10; ci ++ )
	{
		colorDiv[ ci ].style.left = colorsLeft.toString() + 'px';
	}

}
