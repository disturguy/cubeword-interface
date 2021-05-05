function createVoxelBase(objPlane, gridDim, gridDens, xPos, yPos, zPos, rot, suff) 
{

	// MODEL GRID PLANE
	var objPlane = new THREE.Mesh( new THREE.PlaneGeometry(gridDim, gridDim, gridDens, gridDens), new THREE.MeshBasicMaterial({ color: 0x000000, wireframe: true }) );
	objPlane.rotation.x = - rot;
	objPlane.position.x = xPos;
	objPlane.position.y = yPos;
	objPlane.position.z = zPos;
	objPlane.name = suff + 'grid';
	scene.add(objPlane);	

	// MODEL COLORED EDGES
	var x_axisMaterial = new THREE.MeshLambertMaterial({ color:  0x0000FF, side: THREE.DoubleSide });
	var x_axis = new THREE.Mesh( new THREE.CylinderGeometry(2, 2, gridDim, 30, 1, true), x_axisMaterial );		
	x_axis.rotation.z = - rot;
	x_axis.position.x = xPos;
	x_axis.position.y = yPos;
	x_axis.position.z = zPos - gridDim/2;
	x_axis.name = suff + 'grid';
	scene.add(x_axis );
	
	var xx_axisMaterial = new THREE.MeshLambertMaterial({ color:  0x00FF00, side: THREE.DoubleSide });
	var xx_axis = new THREE.Mesh( new THREE.CylinderGeometry(2, 2, gridDim, 30, 1, true), xx_axisMaterial );		
	xx_axis.rotation.z = - rot;
	xx_axis.position.x = xPos;
	xx_axis.position.y = yPos;
	xx_axis.position.z = zPos + gridDim/2;
	xx_axis.name = suff + 'grid';
	scene.add(xx_axis );	

	var y_axisMaterial = new THREE.MeshLambertMaterial({ color:  0xFF0000, side: THREE.DoubleSide });
	var y_axis = new THREE.Mesh( new THREE.CylinderGeometry(2, 2, gridDim, 30, 1, true), y_axisMaterial );		
	y_axis.rotation.y = - rot;	
	y_axis.rotation.z = - rot;
	y_axis.position.x = xPos - gridDim/2;
	y_axis.position.y = yPos;
	y_axis.position.z = zPos ;
	y_axis.name = suff + 'grid';
	scene.add(y_axis );				

	var yy_axisMaterial = new THREE.MeshLambertMaterial({ color:  0xFFFF00, side: THREE.DoubleSide });
	var yy_axis = new THREE.Mesh( new THREE.CylinderGeometry(2, 2, gridDim, 30, 1, true), yy_axisMaterial );		
	yy_axis.rotation.y = - rot;	
	yy_axis.rotation.z = - rot;
	yy_axis.position.x = xPos + gridDim/2;
	yy_axis.position.y = yPos;
	yy_axis.position.z = zPos;
	yy_axis.name = suff + 'grid';
	scene.add(yy_axis );
	
}