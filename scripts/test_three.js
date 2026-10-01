const fs = require('fs');
const path = require('path');
const THREE = require('three');

console.log('Testing Node Three.js export...');
try {
  // Simple test
  const scene = new THREE.Scene();
  const box = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshStandardMaterial({ color: 0x22c55e }));
  scene.add(box);
  console.log('Scene created successfully with', scene.children.length, 'objects');
} catch (e) {
  console.error('Error:', e);
}
