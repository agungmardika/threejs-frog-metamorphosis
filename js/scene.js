/**
 * THREE.JS SCENE, LIGHTING, ENVIRONMENT, HOTSPOTS & CAMERA ENGINE
 */

class FrogScene {
  constructor(canvasContainer) {
    this.container = canvasContainer;
    this.modelFactory = new FrogModelFactory();
    this.currentStageIndex = 0;
    this.currentModelGroup = null;
    this.hotspotObjects = [];
    this.isNightMode = false;
    this.isWireframe = false;
    this.isAutoRotate = false;
    this.customGLBModels = {}; // cache for uploaded GLB files

    this.initScene();
    this.initLights();
    this.initEnvironment();
    this.initControls();
    this.initRaycaster();
    this.animate = this.animate.bind(this);
    requestAnimationFrame(this.animate);

    window.addEventListener('resize', () => this.onWindowResize());
  }

  initScene() {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x061510);
    this.scene.fog = new THREE.Fog(0x061510, 8, 22);

    this.camera = new THREE.PerspectiveCamera(
      45,
      this.container.clientWidth / this.container.clientHeight,
      0.1,
      60
    );
    this.camera.position.set(3.2, 2.0, 4.2);

    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: "high-performance",
      preserveDrawingBuffer: true, // for crystal-clear screenshots
      alpha: true
    });
    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    // Optimized pixel ratio: crisp visuals without burning low-end GPU/CPU
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFShadowMap;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.15;

    this.container.appendChild(this.renderer.domElement);
  }

  initLights() {
    this.lightsGroup = new THREE.Group();
    this.scene.add(this.lightsGroup);

    // 1. Ambient Light (Soft Emerald tint)
    this.ambientLight = new THREE.AmbientLight(0x7ee787, 0.75);
    this.lightsGroup.add(this.ambientLight);

    // 2. Main Sun Directional Light (Optimized shadow map 1024x1024)
    this.sunLight = new THREE.DirectionalLight(0xfffaed, 1.3);
    this.sunLight.position.set(4, 7, 4);
    this.sunLight.castShadow = true;
    this.sunLight.shadow.mapSize.width = 1024;
    this.sunLight.shadow.mapSize.height = 1024;
    this.sunLight.shadow.camera.near = 0.5;
    this.sunLight.shadow.camera.far = 18;
    this.sunLight.shadow.bias = -0.001;
    const d = 3.0;
    this.sunLight.shadow.camera.left = -d;
    this.sunLight.shadow.camera.right = d;
    this.sunLight.shadow.camera.top = d;
    this.sunLight.shadow.camera.bottom = -d;
    this.lightsGroup.add(this.sunLight);

    // 3. Water Caustics (Cyan fill light)
    this.causticLight = new THREE.PointLight(0x06b6d4, 1.2, 8);
    this.causticLight.position.set(0, -1.2, 0);
    this.lightsGroup.add(this.causticLight);

    // 4. Subtle Gold Backlight for 3D silhouette separation
    this.backLight = new THREE.DirectionalLight(0xf59e0b, 0.5);
    this.backLight.position.set(-4, 3, -3);
    this.lightsGroup.add(this.backLight);
  }

  initEnvironment() {
    this.envGroup = new THREE.Group();
    this.scene.add(this.envGroup);

    // 1. Reflective Pond Water Floor (Optimized polygon count)
    const waterGeom = new THREE.PlaneGeometry(20, 20, 8, 8);
    this.waterMat = new THREE.MeshStandardMaterial({
      color: 0x073527,
      roughness: 0.2,
      metalness: 0.6,
      transparent: true,
      opacity: 0.85
    });
    this.waterPlane = new THREE.Mesh(waterGeom, this.waterMat);
    this.waterPlane.rotation.x = -Math.PI / 2;
    this.waterPlane.position.y = -0.65;
    this.waterPlane.receiveShadow = true;
    this.envGroup.add(this.waterPlane);

    // 2. Concentric Ripple Rings (2 lightweight rings instead of 4)
    this.rippleRings = [];
    for (let r = 0; r < 2; r++) {
      const ringGeom = new THREE.RingGeometry(0.8 + r * 0.9, 0.86 + r * 0.9, 32);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0x34d399,
        transparent: true,
        opacity: 0.25 - r * 0.08,
        side: THREE.DoubleSide
      });
      const ringMesh = new THREE.Mesh(ringGeom, ringMat);
      ringMesh.rotation.x = -Math.PI / 2;
      ringMesh.position.y = -0.64;
      this.envGroup.add(ringMesh);
      this.rippleRings.push(ringMesh);
    }

    // 3. Lightweight Floating Nature Spores (Optimized to 40 particles)
    const particleCount = 40;
    const pGeom = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = -0.4 + Math.random() * 3.5;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }

    pGeom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const pMat = new THREE.PointsMaterial({
      color: 0x6ee7b7,
      size: 0.08,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    });
    this.particles = new THREE.Points(pGeom, pMat);
    this.envGroup.add(this.particles);

    // 4. Background Decorative Aquatic Plants
    const reedMat = new THREE.MeshStandardMaterial({ color: 0x144026, roughness: 0.6 });
    for (let i = 0; i < 18; i++) {
      const angle = (i / 18) * Math.PI * 2;
      const dist = 5.5 + Math.sin(i * 3) * 1.5;
      const reedGeom = new THREE.CylinderGeometry(0.04, 0.07, 3 + Math.random() * 2, 8);
      const reed = new THREE.Mesh(reedGeom, reedMat);
      reed.position.set(Math.cos(angle) * dist, 0.8, Math.sin(angle) * dist);
      reed.rotation.z = (Math.random() - 0.5) * 0.2;
      reed.rotation.x = (Math.random() - 0.5) * 0.2;
      this.envGroup.add(reed);
    }
  }

  initControls() {
    this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.maxPolarAngle = Math.PI / 2 - 0.02; // prevent dipping under water floor
    this.controls.minDistance = 1.2;
    this.controls.maxDistance = 8.0;
    this.controls.target.set(0, 0, 0);
  }

  initRaycaster() {
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();

    this.renderer.domElement.addEventListener('pointerdown', (e) => {
      const rect = this.renderer.domElement.getBoundingClientRect();
      this.mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      this.mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      this.checkHotspotClick();
    });
  }

  checkHotspotClick() {
    if (!this.hotspotObjects.length) return;
    this.raycaster.setFromCamera(this.mouse, this.camera);
    const intersects = this.raycaster.intersectObjects(this.hotspotObjects, true);

    if (intersects.length > 0) {
      let targetObj = intersects[0].object;
      while (targetObj && !targetObj.userData.hotspotData && targetObj.parent) {
        targetObj = targetObj.parent;
      }
      if (targetObj && targetObj.userData.hotspotData && this.onHotspotClickCallback) {
        this.onHotspotClickCallback(targetObj.userData.hotspotData);
      }
    }
  }

  // -------------------------------------------------------------
  // HOTSPOTS 3D PINS
  // -------------------------------------------------------------
  createHotspots(stageData) {
    // Clear old hotspots
    this.hotspotObjects.forEach(obj => this.scene.remove(obj));
    this.hotspotObjects = [];

    if (!stageData || !stageData.hotspots) return;

    stageData.hotspots.forEach(hs => {
      const pinGroup = new THREE.Group();
      pinGroup.position.set(hs.position.x, hs.position.y, hs.position.z);
      pinGroup.userData.hotspotData = hs;

      // Outer pulsing ring
      const ringGeom = new THREE.RingGeometry(0.08, 0.11, 24);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0x38bdf8,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.85
      });
      const ringMesh = new THREE.Mesh(ringGeom, ringMat);
      ringMesh.lookAt(this.camera.position);
      pinGroup.add(ringMesh);

      // Core glowing sphere
      const coreGeom = new THREE.SphereGeometry(0.045, 16, 16);
      const coreMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const coreMesh = new THREE.Mesh(coreGeom, coreMat);
      pinGroup.add(coreMesh);

      // Vertical marker stem
      const stemGeom = new THREE.CylinderGeometry(0.01, 0.01, 0.18, 8);
      const stemMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.6 });
      const stemMesh = new THREE.Mesh(stemGeom, stemMat);
      stemMesh.position.y = -0.1;
      pinGroup.add(stemMesh);

      this.scene.add(pinGroup);
      this.hotspotObjects.push(pinGroup);
    });
  }

  // -------------------------------------------------------------
  // MODEL SWITCHING & LOADING (GLB + PROCEDURAL FALLBACK)
  // -------------------------------------------------------------
  async loadStage(stageIndex) {
    this.currentStageIndex = stageIndex;
    const stageData = STAGES_DATA[stageIndex];

    // GSAP Camera animation
    if (window.gsap) {
      gsap.to(this.camera.position, {
        x: stageIndex === 0 ? 2.5 : stageIndex === 5 ? 3.4 : 3.0,
        y: stageIndex === 0 ? 1.6 : stageIndex === 5 ? 2.2 : 1.8,
        z: stageIndex === 0 ? 3.0 : stageIndex === 5 ? 4.0 : 3.6,
        duration: 1.2,
        ease: "power2.inOut"
      });
    }

    // Remove existing model with smooth scale-down
    if (this.currentModelGroup) {
      const oldModel = this.currentModelGroup;
      if (window.gsap) {
        gsap.to(oldModel.scale, {
          x: 0.01,
          y: 0.01,
          z: 0.01,
          duration: 0.35,
          ease: "power2.in",
          onComplete: () => {
            this.scene.remove(oldModel);
          }
        });
      } else {
        this.scene.remove(oldModel);
      }
    }

    // Check if custom GLB uploaded for this stage
    let newModel = null;
    if (this.customGLBModels[stageIndex]) {
      newModel = this.customGLBModels[stageIndex].clone();
    } else {
      // Try loading from assets/models/[fileName]
      const glbUrl = `assets/models/${stageData.modelFileName}`;
      newModel = await this.tryLoadGLB(glbUrl, stageIndex);
    }

    // Fallback to procedural model if GLB not found or failed
    if (!newModel) {
      newModel = this.modelFactory.createModelForStage(stageIndex);
    }

    newModel.scale.set(0.01, 0.01, 0.01);
    this.scene.add(newModel);
    this.currentModelGroup = newModel;

    // Apply wireframe if active
    this.applyWireframe(this.isWireframe);

    // Pop-in scale animation
    if (window.gsap) {
      gsap.to(newModel.scale, {
        x: 1,
        y: 1,
        z: 1,
        duration: 0.6,
        ease: "back.out(1.5)"
      });
    } else {
      newModel.scale.set(1, 1, 1);
    }

    // Create 3D Hotspots
    this.createHotspots(stageData);
  }

  // Attempt to load GLB file with timeout
  tryLoadGLB(url, stageIndex) {
    return new Promise((resolve) => {
      if (typeof THREE.GLTFLoader === 'undefined') {
        return resolve(null);
      }

      const loader = new THREE.GLTFLoader();
      const timeout = setTimeout(() => {
        resolve(null);
      }, 800);

      loader.load(
        url,
        (gltf) => {
          clearTimeout(timeout);
          const model = gltf.scene || gltf.scenes[0];
          model.traverse((child) => {
            if (child.isMesh) {
              child.castShadow = true;
              child.receiveShadow = true;
            }
          });
          resolve(model);
        },
        undefined,
        () => {
          clearTimeout(timeout);
          resolve(null); // safely fallback
        }
      );
    });
  }

  // -------------------------------------------------------------
  // EXPORT CURRENT 3D MODEL TO REAL .GLB FILE (DOWNLOADABLE)
  // -------------------------------------------------------------
  exportCurrentGLB(fileName) {
    if (!this.currentModelGroup) {
      alert("Model 3D belum siap untuk diekspor!");
      return;
    }

    if (typeof THREE.GLTFExporter === 'undefined') {
      alert("GLTFExporter tidak tersedia.");
      return;
    }

    const exporter = new THREE.GLTFExporter();
    exporter.parse(
      this.currentModelGroup,
      (gltfBinary) => {
        const blob = new Blob([gltfBinary], { type: 'model/gltf-binary' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = fileName || `metamorfosis_fase_${this.currentStageIndex + 1}.glb`;
        link.click();
        URL.revokeObjectURL(link.href);
      },
      { binary: true }
    );
  }

  // -------------------------------------------------------------
  // CUSTOM GLB UPLOAD
  // -------------------------------------------------------------
  loadCustomGLBFile(file, stageIndex) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const contents = e.target.result;
        const loader = new THREE.GLTFLoader();
        loader.parse(
          contents,
          '',
          (gltf) => {
            const model = gltf.scene || gltf.scenes[0];
            model.traverse((child) => {
              if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
              }
            });
            this.customGLBModels[stageIndex] = model;
            this.loadStage(stageIndex);
            resolve(true);
          },
          (err) => {
            console.error("Gagal membaca file GLB:", err);
            reject(err);
          }
        );
      };
      reader.readAsArrayBuffer(file);
    });
  }

  // -------------------------------------------------------------
  // VIEW MODES & TOGGLES
  // -------------------------------------------------------------
  toggleNightMode() {
    this.isNightMode = !this.isNightMode;
    if (this.isNightMode) {
      // Night pond biome
      this.scene.background.set(0x020806);
      this.scene.fog.color.set(0x020806);
      this.sunLight.color.set(0x86efac);
      this.sunLight.intensity = 0.5;
      this.causticLight.color.set(0x38bdf8);
      this.causticLight.intensity = 2.4;
      this.backLight.color.set(0x10b981);
    } else {
      // Day sunny biome
      this.scene.background.set(0x061510);
      this.scene.fog.color.set(0x061510);
      this.sunLight.color.set(0xfffaed);
      this.sunLight.intensity = 1.4;
      this.causticLight.color.set(0x06b6d4);
      this.causticLight.intensity = 1.8;
      this.backLight.color.set(0xf59e0b);
    }
    return this.isNightMode;
  }

  toggleWireframe() {
    this.isWireframe = !this.isWireframe;
    this.applyWireframe(this.isWireframe);
    return this.isWireframe;
  }

  applyWireframe(wireframe) {
    if (!this.currentModelGroup) return;
    this.currentModelGroup.traverse((child) => {
      if (child.isMesh && child.material) {
        if (Array.isArray(child.material)) {
          child.material.forEach(m => m.wireframe = wireframe);
        } else {
          child.material.wireframe = wireframe;
        }
      }
    });
  }

  toggleAutoRotate() {
    this.isAutoRotate = !this.isAutoRotate;
    this.controls.autoRotate = this.isAutoRotate;
    this.controls.autoRotateSpeed = 2.0;
    return this.isAutoRotate;
  }

  resetCamera() {
    if (window.gsap) {
      gsap.to(this.camera.position, {
        x: 3.2,
        y: 2.0,
        z: 4.2,
        duration: 1.0,
        ease: "power2.out"
      });
      gsap.to(this.controls.target, {
        x: 0,
        y: 0,
        z: 0,
        duration: 1.0,
        ease: "power2.out"
      });
    } else {
      this.camera.position.set(3.2, 2.0, 4.2);
      this.controls.target.set(0, 0, 0);
    }
  }

  // -------------------------------------------------------------
  // HIGH-RESOLUTION SCREENSHOT FOR UNIVERSITY / COLLEGE REPORT
  // -------------------------------------------------------------
  captureScreenshot(metadata) {
    this.renderer.render(this.scene, this.camera);

    // Create a 2D canvas overlay to stamp high-end report watermark and stage details
    const captureCanvas = document.createElement('canvas');
    captureCanvas.width = this.renderer.domElement.width;
    captureCanvas.height = this.renderer.domElement.height;
    const ctx = captureCanvas.getContext('2d');

    // Draw 3D scene image
    ctx.drawImage(this.renderer.domElement, 0, 0);

    // Overlay Report Badge Header
    const w = captureCanvas.width;
    const h = captureCanvas.height;

    // Subtle dark gradient bar at bottom
    const barGrad = ctx.createLinearGradient(0, h - 110, 0, h);
    barGrad.addColorStop(0, 'rgba(6, 21, 16, 0)');
    barGrad.addColorStop(1, 'rgba(6, 21, 16, 0.95)');
    ctx.fillStyle = barGrad;
    ctx.fillRect(0, h - 140, w, 140);

    // Title & Info
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 24px Outfit, sans-serif';
    ctx.fillText(`🐸 ${metadata.title || "Metamorfosis Katak 3D"}`, 32, h - 55);

    ctx.fillStyle = '#34d399';
    ctx.font = '16px Plus Jakarta Sans, sans-serif';
    ctx.fillText(`${metadata.latinName || ""} • Durasi: ${metadata.duration || ""} • Pernapasan: ${metadata.respiration || ""}`, 32, h - 25);

    // Timestamp & Watermark right side
    ctx.textAlign = 'right';
    ctx.fillStyle = '#94a3b8';
    ctx.font = '14px Plus Jakarta Sans, sans-serif';
    const now = new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' });
    ctx.fillText(`Laporan Tekpend e-Biologi 3D • ${now}`, w - 32, h - 25);

    // Download PNG
    const dataUrl = captureCanvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = `Metamorfosis_Katak_Fase_${this.currentStageIndex + 1}_Screenshot.png`;
    link.click();
  }

  onWindowResize() {
    this.camera.aspect = this.container.clientWidth / this.container.clientHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
  }

  // Render loop
  animate(timestamp) {
    requestAnimationFrame(this.animate);

    const time = timestamp * 0.001;

    // Update model animations
    if (this.currentModelGroup && this.currentModelGroup.userData && this.currentModelGroup.userData.update) {
      this.currentModelGroup.userData.update(time);
    }

    // Ripple rings expanding
    if (this.rippleRings) {
      this.rippleRings.forEach((ring, idx) => {
        const ringTime = (time * 0.8 + idx * 0.5) % 2.5;
        const scale = 1 + ringTime * 0.6;
        ring.scale.set(scale, scale, 1);
        ring.material.opacity = Math.max(0, (1 - ringTime / 2.5) * 0.35);
      });
    }

    // Floating plankton particles
    if (this.particles) {
      this.particles.rotation.y = time * 0.03;
    }

    // Billboard hotspots facing camera
    if (this.hotspotObjects) {
      this.hotspotObjects.forEach((hs, idx) => {
        hs.children[0].lookAt(this.camera.position);
        const pulse = 1.0 + Math.sin(time * 4 + idx) * 0.15;
        hs.children[0].scale.set(pulse, pulse, 1);
      });
    }

    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }
}

window.FrogScene = FrogScene;
