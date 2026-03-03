import {loadGLTF, loadAudio, loadVideo} from "./libs/loader.js";
const THREE = window.MINDAR.IMAGE.THREE;

document.addEventListener('DOMContentLoaded', () => {
  console.log('Loaded!');
  const start = async() => {
    //initiate the AR 3 object
    const mindarThree = new window.MINDAR.IMAGE.MindARThree({
      container: document.body,
      imageTargetSrc: './assets/targets/targets_loja_roupa.mind'
    });
    const {renderer, scene, camera} = mindarThree;

//light is needed when we use 3D objects (δεν χρειάζεται το φως)
    //const light = new THREE.HemisphereLight( 0xffffff, 0xbbbbff, 1 );
    //scene.add(light);

     // load and create the first video plane
  const video1 = await loadVideo("./assets/videos/Video Senha.webm");
  const texture1 = new THREE.VideoTexture(video1);
  const geometry1 = new THREE.PlaneGeometry(1, 240/428);
  const material1 = new THREE.MeshBasicMaterial({map: texture1});
  const plane1 = new THREE.Mesh(geometry1, material1);



  // add the first video plane to an anchor
  const anchor1 = mindarThree.addAnchor(0);
  anchor1.group.add(plane1);

  anchor1.onTargetFound = () => {
    //console.log('Start 1 video');
    video1.play();
  }
  anchor1.onTargetLost = () => {
    video1.pause();
  }
    
//start the experience
    await mindarThree.start();
    renderer.setAnimationLoop(() => {
      renderer.render(scene, camera);
    });
  }

  start();
});
