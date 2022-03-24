var runIntro = function(){

  const scene = new THREE.Scene();

  //const loader = new THREE.TextureLoader();
  //const bg = loader.load( "images/background.png" );
  //scene.background = bg;

  const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000);


  const renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // Create Triangles

  var material = new THREE.MeshPhongMaterial({
    color: 0xf6c12a,
    shininess: 70 });


  var shape = new THREE.Shape();
  shape.moveTo(-2, 0);
  shape.lineTo(0, 3);
  shape.lineTo(2, 0);
  shape.lineTo(0, 0);

  var extrudeSettings = {
    steps: 1,
    depth: 0.8,
    bevelEnabled: false
    /* bevelThickness: 0.3,
    bevelSize: 0.5,
    bevelOffset: 0,
    bevelSegments: 1*/ };


  var geometry = new THREE.ExtrudeBufferGeometry(shape, extrudeSettings);

  // Sets the origin to the center of geometry for rotation
  geometry.center();

  var mesh1 = new THREE.Mesh(geometry, material);
  var mesh2 = new THREE.Mesh(geometry, material);
  var mesh3 = new THREE.Mesh(geometry, material);

  mesh1.position.x = -2;
  mesh1.position.y = 0;
  mesh1.position.z = -2;

  mesh2.position.x = 2;
  mesh2.position.y = 0;
  mesh2.position.z = -2;

  mesh3.position.x = 0;
  mesh3.position.y = 3;
  mesh3.position.z = -2;

  scene.add(mesh1, mesh2, mesh3);

  //Timeline
  var tl = gsap.timeline();
  tl.from(mesh1.rotation, {
    duration: 6,
    ease: "none",
    x: Math.PI * 0.5,
    y: -Math.PI * 5 })

    .from(mesh1.position, { duration: 6, x: -20, y: -10 }, "<")
    .from(
      mesh2.rotation,
      {
      duration: 6,
      ease: "none",
      x: Math.PI * 0.5,
      y: Math.PI * 5 },
      "<")
    .from(mesh2.position, { duration: 6, x: 20, y: -10 }, "<")
    .from(
      mesh3.rotation,
      {
      duration: 6,
      ease: "none",
      z: Math.PI * 0.5,
      x: -Math.PI * 5 },
      "<")
    .from(mesh3.position, { duration: 6, x: 0, y: 10 }, "<")
    .to(".mainLogo", { duration: 1, opacity: 1 }, "+=1")
    .to(".sword", {duration:1, opacity: 1}, "<")
    .from(".sword", { duration: 0.3, y: -600, ease: "none" })
    .to(".flashWhite", {duration: 0.05, opacity: 1})
    .to(".flashWhite", {duration: 0.05, opacity: 0})
    .to(".flashRed", {duration: 0.05, opacity: 1})
    .to(".flashRed", {duration: 0.05, opacity: 0})
    .to(".flashWhite", {duration: 0.05, opacity: 1})
    .to(".flashWhite", {duration: 0.05, opacity: 0})
    .to(".flashRed", {duration: 0.05, opacity: 1})
    .to(".flashRed", {duration: 0.05, opacity: 0})
    .to(".flashWhite", {duration: 0.05, opacity: 1})
    .to(".flashWhite", {duration: 0.05, opacity: 0})
    .to(".flashRed", {duration: 0.05, opacity: 1})
    .to(".flashRed", {duration: 0.05, opacity: 0})
    .to(".background", {duration: 0.3, opacity: 1}, "<");

    gsap.to("#play", {opacity: 0});

  camera.position.z = 10;
  //camera.position.y = 3;
  camera.lookAt(scene.position);

  // Add lights to the scene.
  var light = new THREE.HemisphereLight( 0xffffbb, 0x080820, 2 );
  scene.add( light );

  /*//grid
  const size = 10;
  const divisions = 10;
  const colorCenterLine = "red";

  const gridHelper = new THREE.GridHelper(size, divisions, colorCenterLine);
  scene.add(gridHelper);

  */

  function render() {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
  }

  render();
};

// Set up the intro sound.
var audio = new Audio('audio/intro.mp3');

var playAudio = function(){
  // Used to delay the audio by 0.5 seconds.
  setTimeout(function(){
    audio.play();
  }, 500);
};

var play = document.querySelector("#play");
play.addEventListener('click', runIntro);
play.addEventListener('click', playAudio);