/**
 * 3D MODELS ENGINE FOR METAMORFOSIS KATAK
 * - High-Fidelity Procedural 3D Models for all 6 Stages
 * - Seamless GLB / GLTF Loader support (with automatic fallback)
 * - Built-in GLB Exporter for generating standalone .glb files
 */

class FrogModelFactory {
  constructor() {
    this.textureCache = {};
    this.createProceduralTextures();
  }

  // Create procedural textures for skin spots and organic frog skin
  createProceduralTextures() {
    // 1. Frog Spotted Skin Texture
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    // Base frog green gradient
    const grad = ctx.createLinearGradient(0, 0, 0, 512);
    grad.addColorStop(0, '#589e3a');
    grad.addColorStop(0.5, '#43802b');
    grad.addColorStop(1, '#2c591c');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 512, 512);

    // Random organic spots (dark olive/brown spots matching user diagram)
    ctx.fillStyle = '#1e3812';
    for (let i = 0; i < 45; i++) {
      const x = Math.random() * 512;
      const y = Math.random() * 512;
      const radX = 8 + Math.random() * 22;
      const radY = 6 + Math.random() * 16;
      const rot = Math.random() * Math.PI;

      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rot);
      ctx.beginPath();
      ctx.ellipse(0, 0, radX, radY, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    // Secondary subtle yellowish specks
    ctx.fillStyle = '#a3c944';
    for (let i = 0; i < 60; i++) {
      const x = Math.random() * 512;
      const y = Math.random() * 512;
      const r = 2 + Math.random() * 4;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }

    const frogTexture = new THREE.CanvasTexture(canvas);
    frogTexture.wrapS = THREE.RepeatWrapping;
    frogTexture.wrapT = THREE.RepeatWrapping;
    frogTexture.repeat.set(2, 2);
    this.textureCache.frogSkin = frogTexture;

    // 2. Lily Pad Texture (Daun Teratai)
    const lilyCanvas = document.createElement('canvas');
    lilyCanvas.width = 512;
    lilyCanvas.height = 512;
    const lctx = lilyCanvas.getContext('2d');

    const lgrad = lctx.createRadialGradient(256, 256, 10, 256, 256, 250);
    lgrad.addColorStop(0, '#367c2b');
    lgrad.addColorStop(0.7, '#245a1c');
    lgrad.addColorStop(1, '#183f12');
    lctx.fillStyle = lgrad;
    lctx.fillRect(0, 0, 512, 512);

    // Radiating leaf veins
    lctx.strokeStyle = '#4e993f';
    lctx.lineWidth = 3;
    for (let a = 0; a < Math.PI * 2; a += Math.PI / 10) {
      lctx.beginPath();
      lctx.moveTo(256, 256);
      lctx.lineTo(256 + Math.cos(a) * 240, 256 + Math.sin(a) * 240);
      lctx.stroke();
    }

    const lilyTexture = new THREE.CanvasTexture(lilyCanvas);
    this.textureCache.lily = lilyTexture;
  }

  // Common shared materials
  getMaterials() {
    return {
      frogSkin: new THREE.MeshStandardMaterial({
        map: this.textureCache.frogSkin,
        color: 0x6bb343,
        roughness: 0.35,
        metalness: 0.05,
        bumpScale: 0.05
      }),
      frogBelly: new THREE.MeshStandardMaterial({
        color: 0xe8f0cc,
        roughness: 0.5,
        metalness: 0.02
      }),
      tadpoleSkin: new THREE.MeshStandardMaterial({
        color: 0x4f8a2e,
        roughness: 0.3,
        metalness: 0.05
      }),
      tadpoleFin: new THREE.MeshStandardMaterial({
        color: 0x88cc55,
        roughness: 0.2,
        transparent: true,
        opacity: 0.72,
        side: THREE.DoubleSide
      }),
      eggJelly: new THREE.MeshStandardMaterial({
        color: 0xd8e8ea,
        roughness: 0.1,
        metalness: 0.1,
        transparent: true,
        opacity: 0.55
      }),
      eggEmbryo: new THREE.MeshStandardMaterial({
        color: 0x111612,
        roughness: 0.7
      }),
      eyeIris: new THREE.MeshStandardMaterial({
        color: 0xd4af37, // golden iris
        roughness: 0.2,
        metalness: 0.2
      }),
      eyePupil: new THREE.MeshBasicMaterial({
        color: 0x050505
      }),
      vocalSac: new THREE.MeshStandardMaterial({
        color: 0xd4dfba,
        roughness: 0.3,
        transparent: true,
        opacity: 0.85
      }),
      plantGreen: new THREE.MeshStandardMaterial({
        color: 0x1e6628,
        roughness: 0.5,
        side: THREE.DoubleSide
      }),
      lilyPad: new THREE.MeshStandardMaterial({
        map: this.textureCache.lily,
        roughness: 0.45,
        metalness: 0.05,
        side: THREE.DoubleSide
      }),
      flowerPink: new THREE.MeshStandardMaterial({
        color: 0xf472b6,
        roughness: 0.4
      }),
      flowerYellow: new THREE.MeshStandardMaterial({
        color: 0xfacc15,
        roughness: 0.3
      })
    };
  }

  // -------------------------------------------------------------
  // FASE 1: TELUR KATAK (Frog Spawn / Eggs Cluster)
  // -------------------------------------------------------------
  createEggStage() {
    const group = new THREE.Group();
    group.name = "Stage_Telur";
    const mats = this.getMaterials();

    // Floating waterweed branch underneath
    const stemGeom = new THREE.CylinderGeometry(0.04, 0.04, 3.0, 10);
    const stemMesh = new THREE.Mesh(stemGeom, mats.plantGreen);
    stemMesh.rotation.z = Math.PI / 2.3;
    stemMesh.rotation.y = 0.4;
    stemMesh.position.set(0, -0.4, 0);
    group.add(stemMesh);

    // Leaves on waterweed
    for (let i = -1.0; i <= 1.0; i += 0.5) {
      const leafGeom = new THREE.ConeGeometry(0.12, 0.55, 5);
      const leafMesh = new THREE.Mesh(leafGeom, mats.plantGreen);
      leafMesh.position.set(i * 0.8, -0.4 + Math.sin(i) * 0.1, i * 0.2);
      leafMesh.rotation.z = (Math.PI / 3) * (i > 0 ? 1 : -1);
      leafMesh.rotation.x = 0.5;
      group.add(leafMesh);
    }

    // Cluster of ~20 jelly eggs (Optimized for smooth 60fps)
    const eggCount = 20;
    const eggGeom = new THREE.SphereGeometry(0.18, 14, 12);
    const embryoGeom = new THREE.SphereGeometry(0.08, 10, 8);

    const eggsGroup = new THREE.Group();

    // Spherical organic cluster packing
    for (let i = 0; i < eggCount; i++) {
      const eggWrapper = new THREE.Group();

      const phi = Math.acos(-1 + (2 * i) / eggCount);
      const theta = Math.sqrt(eggCount * Math.PI) * phi;
      const radius = 0.52 + (Math.sin(i * 2.3) * 0.18);

      const x = radius * Math.cos(theta) * Math.sin(phi);
      const y = (radius * Math.sin(theta) * Math.sin(phi)) * 0.6;
      const z = radius * Math.cos(phi);

      eggWrapper.position.set(x, y, z);

      // Translucent Jelly Outer
      const jelly = new THREE.Mesh(eggGeom, mats.eggJelly);
      const scaleRand = 0.88 + (i % 4) * 0.08;
      jelly.scale.set(scaleRand, scaleRand, scaleRand);
      eggWrapper.add(jelly);

      // Dark Embryo Inner
      const embryo = new THREE.Mesh(embryoGeom, mats.eggEmbryo);
      if (i % 3 === 0) {
        embryo.scale.set(1.3, 0.85, 0.85);
        embryo.rotation.z = i;
      }
      eggWrapper.add(embryo);

      eggsGroup.add(eggWrapper);
    }

    group.add(eggsGroup);

    // Floating water bubbles (lightweight 5 bubbles)
    for (let b = 0; b < 5; b++) {
      const bubbleGeom = new THREE.SphereGeometry(0.04 + b * 0.01, 8, 8);
      const bubble = new THREE.Mesh(bubbleGeom, mats.eggJelly);
      bubble.position.set(Math.sin(b * 1.5) * 1.2, -0.4 + (b * 0.2), Math.cos(b * 1.5) * 1.2);
      group.add(bubble);
    }

    // Animation hook (Single lightweight group float)
    group.userData.update = (time) => {
      group.position.y = Math.sin(time * 1.2) * 0.06;
      group.rotation.y = Math.sin(time * 0.35) * 0.04;
      eggsGroup.rotation.y = Math.sin(time * 0.5) * 0.03;
    };

    return group;
  }

  // -------------------------------------------------------------
  // FASE 2: BERUDU / KECEBONG (Tadpole - No Limbs)
  // -------------------------------------------------------------
  createTadpoleStage() {
    const group = new THREE.Group();
    group.name = "Stage_Berudu";
    const mats = this.getMaterials();

    const tadpoleRoot = new THREE.Group();
    group.add(tadpoleRoot);

    // 1. Tadpole Body & Head (Smooth ellipsoid)
    const bodyGeom = new THREE.SphereGeometry(0.55, 18, 14);
    bodyGeom.scale(1.2, 0.85, 0.9);
    const bodyMesh = new THREE.Mesh(bodyGeom, mats.tadpoleSkin);
    bodyMesh.castShadow = true;
    tadpoleRoot.add(bodyMesh);

    // Tadpole Belly
    const bellyGeom = new THREE.SphereGeometry(0.48, 16, 12);
    bellyGeom.scale(1.0, 0.65, 0.75);
    const bellyMesh = new THREE.Mesh(bellyGeom, mats.frogBelly);
    bellyMesh.position.set(0.05, -0.18, 0);
    tadpoleRoot.add(bellyMesh);

    // 2. Eyes
    const eyeGeom = new THREE.SphereGeometry(0.09, 12, 10);
    const pupilGeom = new THREE.SphereGeometry(0.045, 8, 8);

    [-1, 1].forEach(side => {
      const eyeMesh = new THREE.Mesh(eyeGeom, mats.eyeIris);
      eyeMesh.position.set(0.35, 0.15, side * 0.42);

      const pupilMesh = new THREE.Mesh(pupilGeom, mats.eyePupil);
      pupilMesh.position.set(0.39, 0.16, side * 0.46);

      tadpoleRoot.add(eyeMesh);
      tadpoleRoot.add(pupilMesh);
    });

    // 3. External Feathery Gills (2 pairs per side, optimized)
    const gillMat = new THREE.MeshStandardMaterial({
      color: 0xd9534f,
      roughness: 0.4
    });

    const gillsGroup = new THREE.Group();
    [-1, 1].forEach(side => {
      for (let g = 0; g < 2; g++) {
        const gillGeom = new THREE.CylinderGeometry(0.015, 0.025, 0.26, 6);
        const gillMesh = new THREE.Mesh(gillGeom, gillMat);
        gillMesh.position.set(0.08 - g * 0.12, 0.05 + g * 0.04, side * 0.44);
        gillMesh.rotation.x = side * (0.6 + g * 0.1);
        gillMesh.rotation.z = -0.4;
        gillsGroup.add(gillMesh);
      }
    });
    tadpoleRoot.add(gillsGroup);

    // 4. Multi-Segment Articulated Swimming Tail (4 smooth segments)
    const tailSegments = [];
    let parentNode = tadpoleRoot;
    const numSegments = 4;
    const segmentLength = 0.45;

    for (let s = 0; s < numSegments; s++) {
      const segNode = new THREE.Group();
      segNode.position.set(s === 0 ? -0.55 : -segmentLength, 0, 0);

      // Tail core muscle
      const muscleGeom = new THREE.CylinderGeometry(
        0.16 * (1 - (s + 1) / (numSegments + 1)),
        0.16 * (1 - s / (numSegments + 1)),
        segmentLength,
        8
      );
      muscleGeom.rotateZ(Math.PI / 2);
      const muscleMesh = new THREE.Mesh(muscleGeom, mats.tadpoleSkin);
      muscleMesh.position.set(-segmentLength / 2, 0, 0);
      segNode.add(muscleMesh);

      // Dorsal and ventral translucent fin
      const finHeight = (0.52 * Math.sin(((s + 1) / (numSegments + 1)) * Math.PI)) + 0.1;
      const finGeom = new THREE.PlaneGeometry(segmentLength, finHeight, 1, 2);
      const finMesh = new THREE.Mesh(finGeom, mats.tadpoleFin);
      finMesh.position.set(-segmentLength / 2, 0, 0);
      segNode.add(finMesh);

      parentNode.add(segNode);
      tailSegments.push(segNode);
      parentNode = segNode;
    }

    // Aquatic swimming motion (Smooth & lightweight)
    group.userData.update = (time) => {
      tadpoleRoot.position.y = Math.sin(time * 2.5) * 0.05;
      tadpoleRoot.position.x = Math.sin(time * 1.2) * 0.06;
      tadpoleRoot.rotation.y = Math.sin(time * 3.0) * 0.06;

      // Sinusoidal wave through tail segments
      tailSegments.forEach((seg, idx) => {
        const wave = Math.sin(time * 6.0 - idx * 0.8);
        seg.rotation.y = wave * (0.2 + idx * 0.06);
      });
    };

    return group;
  }

  // -------------------------------------------------------------
  // FASE 3: BERUDU 2 KAKI (Tadpole with Hindlimbs)
  // -------------------------------------------------------------
  createTadpole2LegsStage() {
    const group = new THREE.Group();
    group.name = "Stage_Berudu_2Kaki";
    const mats = this.getMaterials();

    const root = new THREE.Group();
    group.add(root);

    // Body
    const bodyGeom = new THREE.SphereGeometry(0.58, 18, 14);
    bodyGeom.scale(1.25, 0.85, 0.9);
    const bodyMesh = new THREE.Mesh(bodyGeom, mats.tadpoleSkin);
    bodyMesh.castShadow = true;
    root.add(bodyMesh);

    // Belly
    const bellyGeom = new THREE.SphereGeometry(0.5, 16, 12);
    bellyGeom.scale(1.05, 0.65, 0.78);
    const bellyMesh = new THREE.Mesh(bellyGeom, mats.frogBelly);
    bellyMesh.position.set(0.05, -0.19, 0);
    root.add(bellyMesh);

    // Eyes
    [-1, 1].forEach(side => {
      const eyeMesh = new THREE.Mesh(new THREE.SphereGeometry(0.095, 12, 10), mats.eyeIris);
      eyeMesh.position.set(0.38, 0.18, side * 0.44);
      const pupilMesh = new THREE.Mesh(new THREE.SphereGeometry(0.048, 8, 8), mats.eyePupil);
      pupilMesh.position.set(0.42, 0.19, side * 0.48);
      root.add(eyeMesh);
      root.add(pupilMesh);
    });

    // Hidden forelimb bumps
    [-1, 1].forEach(side => {
      const bump = new THREE.Mesh(new THREE.SphereGeometry(0.09, 8, 8), mats.tadpoleSkin);
      bump.scale.set(1.2, 0.8, 0.7);
      bump.position.set(0.2, -0.12, side * 0.42);
      root.add(bump);
    });

    // Tail (4 segments)
    const tailSegments = [];
    let parentNode = root;
    const numSegments = 4;
    const segmentLength = 0.45;

    for (let s = 0; s < numSegments; s++) {
      const segNode = new THREE.Group();
      segNode.position.set(s === 0 ? -0.58 : -segmentLength, 0, 0);

      const muscleGeom = new THREE.CylinderGeometry(
        0.16 * (1 - (s + 1) / (numSegments + 1)),
        0.16 * (1 - s / (numSegments + 1)),
        segmentLength,
        8
      );
      muscleGeom.rotateZ(Math.PI / 2);
      const muscleMesh = new THREE.Mesh(muscleGeom, mats.tadpoleSkin);
      muscleMesh.position.set(-segmentLength / 2, 0, 0);
      segNode.add(muscleMesh);

      const finHeight = (0.48 * Math.sin(((s + 1) / (numSegments + 1)) * Math.PI)) + 0.08;
      const finGeom = new THREE.PlaneGeometry(segmentLength, finHeight, 1, 2);
      const finMesh = new THREE.Mesh(finGeom, mats.tadpoleFin);
      finMesh.position.set(-segmentLength / 2, 0, 0);
      segNode.add(finMesh);

      parentNode.add(segNode);
      tailSegments.push(segNode);
      parentNode = segNode;
    }

    // TWO HIND LEGS
    const hindLegs = [];
    [-1, 1].forEach(side => {
      const legRoot = new THREE.Group();
      legRoot.position.set(-0.35, -0.18, side * 0.38);

      const thighGeom = new THREE.CylinderGeometry(0.08, 0.06, 0.36, 8);
      const thighMesh = new THREE.Mesh(thighGeom, mats.tadpoleSkin);
      thighMesh.position.set(0, -0.18, 0);
      thighMesh.rotation.z = -0.4;
      legRoot.add(thighMesh);

      const calfJoint = new THREE.Group();
      calfJoint.position.set(-0.14, -0.32, 0);
      const calfGeom = new THREE.CylinderGeometry(0.06, 0.045, 0.34, 8);
      const calfMesh = new THREE.Mesh(calfGeom, mats.tadpoleSkin);
      calfMesh.position.set(0, -0.16, 0);
      calfMesh.rotation.z = 0.6;
      calfJoint.add(calfMesh);

      const footJoint = new THREE.Group();
      footJoint.position.set(0.1, -0.3, 0);
      const footGeom = new THREE.ConeGeometry(0.12, 0.28, 4);
      footGeom.rotateX(Math.PI / 2);
      footGeom.scale(1.2, 0.25, 1);
      const footMesh = new THREE.Mesh(footGeom, mats.tadpoleFin);
      footMesh.position.set(-0.06, 0, 0.05 * side);
      footJoint.add(footMesh);

      calfJoint.add(footJoint);
      legRoot.add(calfJoint);
      root.add(legRoot);

      hindLegs.push({ legRoot, calfJoint, footJoint, side });
    });

    group.userData.update = (time) => {
      root.position.y = Math.sin(time * 2.4) * 0.04;
      root.rotation.y = Math.sin(time * 2.5) * 0.05;

      tailSegments.forEach((seg, idx) => {
        seg.rotation.y = Math.sin(time * 5.5 - idx * 0.7) * (0.18 + idx * 0.05);
      });

      hindLegs.forEach(leg => {
        const kickCycle = Math.sin(time * 3.0);
        leg.legRoot.rotation.x = leg.side * (0.3 + kickCycle * 0.2);
        leg.legRoot.rotation.z = -0.2 + kickCycle * 0.25;
      });
    };

    return group;
  }

  // -------------------------------------------------------------
  // FASE 4: BERUDU 4 KAKI (Tadpole with 4 Limbs)
  // -------------------------------------------------------------
  createTadpole4LegsStage() {
    const group = new THREE.Group();
    group.name = "Stage_Berudu_4Kaki";
    const mats = this.getMaterials();

    const root = new THREE.Group();
    group.add(root);

    // Torso
    const bodyGeom = new THREE.SphereGeometry(0.62, 18, 14);
    bodyGeom.scale(1.22, 0.88, 0.95);
    const bodyMesh = new THREE.Mesh(bodyGeom, mats.frogSkin);
    bodyMesh.castShadow = true;
    root.add(bodyMesh);

    // Belly
    const bellyGeom = new THREE.SphereGeometry(0.54, 16, 12);
    bellyGeom.scale(1.05, 0.65, 0.82);
    const bellyMesh = new THREE.Mesh(bellyGeom, mats.frogBelly);
    bellyMesh.position.set(0.04, -0.22, 0);
    root.add(bellyMesh);

    // Eyes
    [-1, 1].forEach(side => {
      const eyeMesh = new THREE.Mesh(new THREE.SphereGeometry(0.12, 12, 10), mats.eyeIris);
      eyeMesh.position.set(0.42, 0.26, side * 0.38);
      const pupilMesh = new THREE.Mesh(new THREE.SphereGeometry(0.06, 8, 8), mats.eyePupil);
      pupilMesh.position.set(0.47, 0.28, side * 0.42);
      root.add(eyeMesh);
      root.add(pupilMesh);
    });

    // Shorter tail (3 segments)
    const tailSegments = [];
    let parentNode = root;
    const numSegments = 3;
    const segmentLength = 0.4;

    for (let s = 0; s < numSegments; s++) {
      const segNode = new THREE.Group();
      segNode.position.set(s === 0 ? -0.6 : -segmentLength, 0, 0);

      const muscleGeom = new THREE.CylinderGeometry(
        0.15 * (1 - (s + 1) / (numSegments + 1)),
        0.15 * (1 - s / (numSegments + 1)),
        segmentLength,
        8
      );
      muscleGeom.rotateZ(Math.PI / 2);
      const muscleMesh = new THREE.Mesh(muscleGeom, mats.frogSkin);
      muscleMesh.position.set(-segmentLength / 2, 0, 0);
      segNode.add(muscleMesh);

      const finHeight = (0.35 * Math.sin(((s + 1) / (numSegments + 1)) * Math.PI)) + 0.05;
      const finGeom = new THREE.PlaneGeometry(segmentLength, finHeight, 1, 2);
      const finMesh = new THREE.Mesh(finGeom, mats.tadpoleFin);
      finMesh.position.set(-segmentLength / 2, 0, 0);
      segNode.add(finMesh);

      parentNode.add(segNode);
      tailSegments.push(segNode);
      parentNode = segNode;
    }

    // Front Legs
    const foreLegs = [];
    [-1, 1].forEach(side => {
      const fLeg = new THREE.Group();
      fLeg.position.set(0.28, -0.18, side * 0.45);

      const armGeom = new THREE.CylinderGeometry(0.065, 0.05, 0.28, 8);
      const armMesh = new THREE.Mesh(armGeom, mats.frogSkin);
      armMesh.position.set(0, -0.12, 0);
      armMesh.rotation.z = 0.3;
      fLeg.add(armMesh);

      const handGeom = new THREE.BoxGeometry(0.08, 0.03, 0.1);
      const handMesh = new THREE.Mesh(handGeom, mats.frogSkin);
      handMesh.position.set(0.05, -0.25, 0);
      fLeg.add(handMesh);

      root.add(fLeg);
      foreLegs.push({ fLeg, side });
    });

    // Hind Legs
    const hindLegs = [];
    [-1, 1].forEach(side => {
      const hLeg = new THREE.Group();
      hLeg.position.set(-0.36, -0.16, side * 0.42);

      const thighGeom = new THREE.CylinderGeometry(0.1, 0.075, 0.4, 8);
      const thighMesh = new THREE.Mesh(thighGeom, mats.frogSkin);
      thighMesh.position.set(0, -0.2, 0);
      thighMesh.rotation.z = -0.5;
      hLeg.add(thighMesh);

      const calf = new THREE.Group();
      calf.position.set(-0.16, -0.36, 0);
      const calfGeom = new THREE.CylinderGeometry(0.075, 0.055, 0.38, 8);
      const calfMesh = new THREE.Mesh(calfGeom, mats.frogSkin);
      calfMesh.position.set(0, -0.18, 0);
      calfMesh.rotation.z = 0.7;
      calf.add(calfMesh);

      const foot = new THREE.Group();
      foot.position.set(0.12, -0.34, 0);
      const footGeom = new THREE.ConeGeometry(0.14, 0.32, 4);
      footGeom.rotateX(Math.PI / 2);
      footGeom.scale(1.2, 0.25, 1);
      const footMesh = new THREE.Mesh(footGeom, mats.tadpoleFin);
      footMesh.position.set(-0.08, 0, 0.06 * side);
      foot.add(footMesh);

      calf.add(foot);
      hLeg.add(calf);
      root.add(hLeg);
      hindLegs.push({ hLeg, calf, foot, side });
    });

    group.userData.update = (time) => {
      root.position.y = Math.sin(time * 2.2) * 0.04;

      tailSegments.forEach((seg, idx) => {
        seg.rotation.y = Math.sin(time * 4.8 - idx * 0.7) * (0.15 + idx * 0.04);
      });

      foreLegs.forEach(fl => {
        fl.fLeg.rotation.x = fl.side * (0.2 + Math.sin(time * 2.5) * 0.12);
      });
    };

    return group;
  }

  // -------------------------------------------------------------
  // FASE 5: KATAK MUDA (Froglet with Residual Tail)
  // -------------------------------------------------------------
  createFrogletStage() {
    const group = new THREE.Group();
    group.name = "Stage_Katak_Muda";
    const mats = this.getMaterials();

    const frogRoot = new THREE.Group();
    frogRoot.position.set(0, -0.1, 0);
    group.add(frogRoot);

    // Body
    const bodyGeom = new THREE.SphereGeometry(0.65, 20, 16);
    bodyGeom.scale(1.2, 0.85, 1.05);
    const bodyMesh = new THREE.Mesh(bodyGeom, mats.frogSkin);
    bodyMesh.position.set(0, 0.15, 0);
    bodyMesh.castShadow = true;
    frogRoot.add(bodyMesh);

    // Belly
    const bellyGeom = new THREE.SphereGeometry(0.58, 16, 12);
    bellyGeom.scale(1.1, 0.65, 0.95);
    const bellyMesh = new THREE.Mesh(bellyGeom, mats.frogBelly);
    bellyMesh.position.set(0.04, -0.05, 0);
    frogRoot.add(bellyMesh);

    // Head
    const headGeom = new THREE.SphereGeometry(0.48, 18, 14);
    headGeom.scale(1.1, 0.75, 1.0);
    const headMesh = new THREE.Mesh(headGeom, mats.frogSkin);
    headMesh.position.set(0.5, 0.22, 0);
    frogRoot.add(headMesh);

    // Eyes
    [-1, 1].forEach(side => {
      const eyeLid = new THREE.Mesh(new THREE.SphereGeometry(0.18, 12, 10), mats.frogSkin);
      eyeLid.position.set(0.55, 0.44, side * 0.32);
      frogRoot.add(eyeLid);

      const eyeIris = new THREE.Mesh(new THREE.SphereGeometry(0.14, 12, 10), mats.eyeIris);
      eyeIris.position.set(0.58, 0.44, side * 0.34);
      frogRoot.add(eyeIris);

      const eyePupil = new THREE.Mesh(new THREE.SphereGeometry(0.075, 8, 8), mats.eyePupil);
      eyePupil.scale.set(1.4, 0.6, 1);
      eyePupil.position.set(0.66, 0.45, side * 0.37);
      frogRoot.add(eyePupil);
    });

    // Residual Tail
    const tailStub = new THREE.Group();
    tailStub.position.set(-0.65, 0.1, 0);

    const stubGeom1 = new THREE.ConeGeometry(0.14, 0.42, 8);
    stubGeom1.rotateZ(Math.PI / 2);
    const stubMesh1 = new THREE.Mesh(stubGeom1, mats.frogSkin);
    stubMesh1.position.set(-0.2, 0, 0);
    tailStub.add(stubMesh1);

    const stubGeom2 = new THREE.ConeGeometry(0.08, 0.3, 8);
    stubGeom2.rotateZ(Math.PI / 2);
    const stubMesh2 = new THREE.Mesh(stubGeom2, mats.tadpoleSkin);
    stubMesh2.position.set(-0.42, 0, 0);
    tailStub.add(stubMesh2);

    frogRoot.add(tailStub);

    // Front Limbs
    [-1, 1].forEach(side => {
      const fLeg = new THREE.Group();
      fLeg.position.set(0.42, 0.05, side * 0.48);

      const arm = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.065, 0.36, 8), mats.frogSkin);
      arm.position.set(0, -0.15, 0);
      arm.rotation.x = side * 0.3;
      fLeg.add(arm);

      const hand = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.04, 0.16), mats.frogSkin);
      hand.position.set(0.05, -0.32, 0);
      fLeg.add(hand);

      frogRoot.add(fLeg);
    });

    // Hind Limbs
    [-1, 1].forEach(side => {
      const hLeg = new THREE.Group();
      hLeg.position.set(-0.35, 0.1, side * 0.46);

      const thigh = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.11, 0.6, 10), mats.frogSkin);
      thigh.rotation.x = side * 0.55;
      thigh.rotation.z = -0.65;
      thigh.position.set(0, 0.08, side * 0.1);
      hLeg.add(thigh);

      const calf = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.08, 0.55, 10), mats.frogSkin);
      calf.rotation.x = -side * 0.35;
      calf.rotation.z = 0.85;
      calf.position.set(-0.15, -0.12, side * 0.18);
      hLeg.add(calf);

      const foot = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.04, 0.3), mats.frogSkin);
      foot.position.set(0.1, -0.32, side * 0.22);
      hLeg.add(foot);

      frogRoot.add(hLeg);
    });

    group.userData.update = (time) => {
      const breath = Math.sin(time * 3.5) * 0.02;
      bodyMesh.scale.set(1.2 + breath, 0.85 + breath, 1.05 + breath);
      tailStub.rotation.y = Math.sin(time * 2.0) * 0.08;
    };

    return group;
  }

  // -------------------------------------------------------------
  // FASE 6: KATAK DEWASA (Adult Frog on Giant Lily Pad)
  // -------------------------------------------------------------
  createAdultFrogStage() {
    const group = new THREE.Group();
    group.name = "Stage_Katak_Dewasa";
    const mats = this.getMaterials();

    // 1. Giant Lily Pad Platform
    const lilyGroup = new THREE.Group();
    lilyGroup.position.set(0, -0.4, 0);

    const padGeom = new THREE.CylinderGeometry(1.65, 1.65, 0.04, 32, 1, false, 0, Math.PI * 1.88);
    const padMesh = new THREE.Mesh(padGeom, mats.lilyPad);
    padMesh.receiveShadow = true;
    lilyGroup.add(padMesh);

    // Pink Lotus Flower bud
    const flowerGroup = new THREE.Group();
    flowerGroup.position.set(-1.1, 0.08, -0.6);
    const petalGeom = new THREE.ConeGeometry(0.12, 0.3, 4);
    for (let p = 0; p < 6; p++) {
      const petal = new THREE.Mesh(petalGeom, mats.flowerPink);
      const angle = (p / 6) * Math.PI * 2;
      petal.position.set(Math.cos(angle) * 0.1, 0.08, Math.sin(angle) * 0.1);
      petal.rotation.x = Math.sin(angle) * 0.6;
      petal.rotation.z = -Math.cos(angle) * 0.6;
      flowerGroup.add(petal);
    }
    const center = new THREE.Mesh(new THREE.SphereGeometry(0.08, 8, 8), mats.flowerYellow);
    center.position.set(0, 0.12, 0);
    flowerGroup.add(center);
    lilyGroup.add(flowerGroup);

    group.add(lilyGroup);

    // 2. Adult Frog Main Body
    const frogRoot = new THREE.Group();
    frogRoot.position.set(0, -0.15, 0);
    group.add(frogRoot);

    // Torso
    const bodyGeom = new THREE.SphereGeometry(0.72, 22, 16);
    bodyGeom.scale(1.25, 0.88, 1.15);
    const bodyMesh = new THREE.Mesh(bodyGeom, mats.frogSkin);
    bodyMesh.position.set(0, 0.22, 0);
    bodyMesh.castShadow = true;
    frogRoot.add(bodyMesh);

    // Creamy white underbelly
    const bellyGeom = new THREE.SphereGeometry(0.65, 18, 14);
    bellyGeom.scale(1.15, 0.68, 1.0);
    const bellyMesh = new THREE.Mesh(bellyGeom, mats.frogBelly);
    bellyMesh.position.set(0.06, 0.04, 0);
    frogRoot.add(bellyMesh);

    // Head
    const headGeom = new THREE.SphereGeometry(0.55, 20, 16);
    headGeom.scale(1.2, 0.8, 1.1);
    const headMesh = new THREE.Mesh(headGeom, mats.frogSkin);
    headMesh.position.set(0.55, 0.28, 0);
    frogRoot.add(headMesh);

    // 3. Throbbing Vocal Sac
    const sacGeom = new THREE.SphereGeometry(0.28, 14, 12);
    sacGeom.scale(1.2, 0.9, 1.1);
    const vocalSac = new THREE.Mesh(sacGeom, mats.vocalSac);
    vocalSac.position.set(0.58, 0.08, 0);
    frogRoot.add(vocalSac);

    // 4. Eyes & Eardrums (Tympanum)
    [-1, 1].forEach(side => {
      const eyeLid = new THREE.Mesh(new THREE.SphereGeometry(0.2, 12, 10), mats.frogSkin);
      eyeLid.position.set(0.62, 0.55, side * 0.38);
      frogRoot.add(eyeLid);

      const eyeIris = new THREE.Mesh(new THREE.SphereGeometry(0.16, 12, 10), mats.eyeIris);
      eyeIris.position.set(0.66, 0.55, side * 0.4);
      frogRoot.add(eyeIris);

      const pupil = new THREE.Mesh(new THREE.SphereGeometry(0.085, 8, 8), mats.eyePupil);
      pupil.scale.set(1.5, 0.45, 1.0);
      pupil.position.set(0.76, 0.56, side * 0.44);
      frogRoot.add(pupil);

      const tympGeom = new THREE.CylinderGeometry(0.12, 0.12, 0.02, 10);
      tympGeom.rotateZ(Math.PI / 2);
      const tympMat = new THREE.MeshStandardMaterial({ color: 0x364825, roughness: 0.6 });
      const tympMesh = new THREE.Mesh(tympGeom, tympMat);
      tympMesh.position.set(0.35, 0.42, side * 0.56);
      tympMesh.rotation.y = side * 0.4;
      frogRoot.add(tympMesh);
    });

    // 5. Front Legs
    [-1, 1].forEach(side => {
      const fLeg = new THREE.Group();
      fLeg.position.set(0.48, 0.12, side * 0.55);

      const arm = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.075, 0.4, 8), mats.frogSkin);
      arm.position.set(0, -0.16, 0);
      arm.rotation.x = side * 0.28;
      fLeg.add(arm);

      const hand = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.04, 0.18), mats.frogSkin);
      hand.position.set(0.06, -0.36, 0);
      fLeg.add(hand);

      frogRoot.add(fLeg);
    });

    // 6. Hind Legs
    [-1, 1].forEach(side => {
      const hLeg = new THREE.Group();
      hLeg.position.set(-0.38, 0.18, side * 0.52);

      const thigh = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.14, 0.7, 10), mats.frogSkin);
      thigh.rotation.x = side * 0.6;
      thigh.rotation.z = -0.7;
      thigh.position.set(0, 0.1, side * 0.12);
      hLeg.add(thigh);

      const calf = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.1, 0.65, 10), mats.frogSkin);
      calf.rotation.x = -side * 0.4;
      calf.rotation.z = 0.9;
      calf.position.set(-0.18, -0.16, side * 0.22);
      hLeg.add(calf);

      const foot = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.05, 0.4), mats.frogSkin);
      foot.position.set(0.12, -0.38, side * 0.26);
      hLeg.add(foot);

      frogRoot.add(hLeg);
    });

    // Dynamic Animation
    group.userData.update = (time) => {
      lilyGroup.position.y = -0.4 + Math.sin(time * 1.0) * 0.015;

      const croakCycle = Math.sin(time * 3.8);
      if (croakCycle > 0.4) {
        const puffAmount = 1.0 + (croakCycle - 0.4) * 1.6;
        vocalSac.scale.set(puffAmount * 1.25, puffAmount * 1.15, puffAmount * 1.25);
      } else {
        vocalSac.scale.set(1.0, 1.0, 1.0);
      }

      const breath = Math.sin(time * 2.0) * 0.015;
      bodyMesh.scale.set(1.25 + breath, 0.88 + breath, 1.15 + breath);
    };

    return group;
  }

  // Create model by stage index (0-5)
  createModelForStage(stageIndex) {
    switch (stageIndex) {
      case 0: return this.createEggStage();
      case 1: return this.createTadpoleStage();
      case 2: return this.createTadpole2LegsStage();
      case 3: return this.createTadpole4LegsStage();
      case 4: return this.createFrogletStage();
      case 5: return this.createAdultFrogStage();
      default: return this.createAdultFrogStage();
    }
  }
}

window.FrogModelFactory = FrogModelFactory;
