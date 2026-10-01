const http = require('http');

const endpoints = [
  '/',
  '/index.html',
  '/css/style.css',
  '/vendor/three.min.js',
  '/vendor/OrbitControls.js',
  '/vendor/GLTFLoader.js',
  '/vendor/GLTFExporter.js',
  '/vendor/gsap.min.js',
  '/vendor/confetti.browser.min.js',
  '/js/data.js',
  '/js/audio.js',
  '/js/models.js',
  '/js/scene.js',
  '/js/quiz.js',
  '/js/app.js'
];

function check(url) {
  return new Promise((resolve) => {
    http.get('http://localhost:3000' + url, (res) => {
      let size = 0;
      res.on('data', chunk => size += chunk.length);
      res.on('end', () => {
        resolve({ url, status: res.statusCode, contentType: res.headers['content-type'], size });
      });
    }).on('error', err => {
      resolve({ url, error: err.message });
    });
  });
}

async function run() {
  console.log('Testing server endpoints...');
  for (const ep of endpoints) {
    const res = await check(ep);
    if (res.error) {
      console.error(`❌ ${ep} -> Error: ${res.error}`);
    } else {
      console.log(`✅ ${ep} -> ${res.status} (${res.contentType}, ${res.size} bytes)`);
    }
  }
}

run();
