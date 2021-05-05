import './App.css';
import * as THREE from 'three'
import {useEffect} from 'react'
import main from './cubeworld-three/js/main'

function App() {


  useEffect(()=>{
        // === THREE.JS CODE START ===

       // document.body.appendChild( renderer.domElement );

        main.init();
        main.animate();
        // === THREE.JS EXAMPLE CODE END ===
  })
  return (
    <div className="App">
    </div>
  );
}

export default App;
