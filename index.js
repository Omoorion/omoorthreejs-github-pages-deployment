import * as THREE from 'https://unpkg.com/three@0.126.1/build/three.module.js';
import { OrbitControls } from 'https://unpkg.com/three@0.126.1/examples/jsm/controls/OrbitControls.js';
import Stats from 'https://unpkg.com/three@0.126.1/examples/jsm/libs/stats.module.js';
import {GUI} from 'https://unpkg.com/three@0.126.1/examples/jsm/libs/dat.gui.module';

const textureLoader = new THREE.TextureLoader();

      const normalTexture = textureLoader.load("./GmanMap.png");

      // Debug
      const gui = new GUI();

      // Canvas
      const canvas = document.querySelector("canvas.webgl");

      // Scene
      const scene = new THREE.Scene();

      // Objects
      //const geometry = new THREE.SphereBufferGeometry(0.5, 64, 64);
      const geometry = new THREE.SphereBufferGeometry(0.5, 64, 64);
      // Materials

      const material = new THREE.MeshStandardMaterial();
      material.roughness = 0.2;
      material.metalness = 0.7;
      material.normalMap = normalTexture;
      material.color = new THREE.Color(0x292929);

      // Mesh
      const sphere = new THREE.Mesh(geometry, material);
      scene.add(sphere);

      // Lights

      //Light
      const pointLight = new THREE.PointLight(0xffffff, 0.1);
      pointLight.position.x = 2;
      pointLight.position.y = 3;
      pointLight.position.z = 4;
      scene.add(pointLight);

      //Light 1
      const pointLight1 = new THREE.PointLight(0x16163e, 2);
      pointLight1.position.set(-1.71, 1.59, -0.66);
      pointLight1.intensity = 10;

      scene.add(pointLight1);

        const light1 = gui.addFolder("Light 1");

        light1.add(pointLight1.position, "x").min(-6).max(6).step(0.01);
        light1.add(pointLight1.position, "y").min(-3).max(3).step(0.01);
        light1.add(pointLight1.position, "z").min(-3).max(3).step(0.01);
        light1.add(pointLight1, "intensity").min(0).max(10).step(0.01);

      const light1Color = {
        color: 0x16163e,
      };

        light1.addColor(light1Color, "color").onChange(() => {
          pointLight1.color.set(light1Color.color);
        });
      // const pointLightHelper = new THREE.PointLightHelper(pointLight1, 1) //second par controls helper size
      // scene.add(pointLightHelper)

      //Light 2
      const pointLight2 = new THREE.PointLight(0xc50700, 2);
      pointLight2.position.set(2.79, -1.52, -1.6);
      pointLight2.intensity = 10;

      scene.add(pointLight2);

        const light2 = gui.addFolder("Light 2");

        light2.add(pointLight2.position, "x").min(-6).max(6).step(0.01);
        light2.add(pointLight2.position, "y").min(-3).max(3).step(0.01);
        light2.add(pointLight2.position, "z").min(-3).max(3).step(0.01);
        light2.add(pointLight2, "intensity").min(0).max(10).step(0.01);

      const light2Color = {
        color: 0xc50700,
      };

        light2.addColor(light2Color, "color").onChange(() => {
          pointLight2.color.set(light2Color.color);
        });

      // const pointLightHelper1 = new THREE.PointLightHelper(pointLight2, 1) //second par controls helper size
      // scene.add(pointLightHelper1)

      /**
       * Sizes
       */
      const sizes = {
        width: window.innerWidth,
        height: window.innerHeight,
      };

      window.addEventListener("resize", () => {
        // Update sizes
        sizes.width = window.innerWidth;
        sizes.height = window.innerHeight;

        // Update camera
        camera.aspect = sizes.width / sizes.height;
        camera.updateProjectionMatrix();

        // Update renderer
        renderer.setSize(sizes.width, sizes.height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      });

      /**
       * Camera
       */
      // Base camera
      const camera = new THREE.PerspectiveCamera(
        75,
        sizes.width / sizes.height,
        0.1,
        100
      );
      camera.position.x = 0;
      camera.position.y = 0;
      camera.position.z = 2;
      scene.add(camera);

      // Controls
      // const controls = new OrbitControls(camera, canvas)
      // controls.enableDamping = true

      /**
       * Renderer
       */
      const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
      });
      renderer.setSize(sizes.width, sizes.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      /**
       * Animate
       */

      document.addEventListener("mousemove", onDocumentMouseMove);

      let mouseX = 0;
      let mouseY = 0;

      let targetX = 0;
      let targetY = 0;

      const windowX = window.innerWidth / 2;
      const windowY = window.innerHeight / 2;

      function onDocumentMouseMove(event) {
        mouseX = event.clientX - windowX;
        mouseY = event.clientY - windowY;
      }

      function updateSphere(event) {
        sphere.position.y = window.scrollY * 0.001;
      }
      //Or
      //const updateSphere = (event) =>{
      //    sphere.position.y = window.scrollY * .001
      //}

      window.addEventListener("scroll", updateSphere);

      const clock = new THREE.Clock();

      const tick = () => {
        targetX = mouseX * 0.001;
        targetY = mouseY * 0.001;

        const elapsedTime = clock.getElapsedTime();

        // Update objects
        //sphere.rotation.y = -1 * elapsedTime //if you want it to rotate
        sphere.rotation.y = -3.25; //if you want it to face the user and stay still

        sphere.rotation.y += 0.5 * (targetX - sphere.rotation.y);
        sphere.rotation.x += 0.5 * (targetY - sphere.rotation.x);
        sphere.position.z += -0.5 * (targetY - sphere.rotation.x);
        // Update Orbital Controls
        // controls.update()

        // Render
        renderer.render(scene, camera);

        // Call tick again on the next frame
        window.requestAnimationFrame(tick);
      };

      tick();