const fs = require('fs');
const path = require('path');
const https = require('https');

const dirs = [
  'assets',
  'assets/models',
  'assets/audio',
  'assets/images',
  'css',
  'js',
  'vendor'
];

dirs.forEach(d => {
  const full = path.join(__dirname, '..', d);
  if (!fs.existsSync(full)) {
    fs.mkdirSync(full, { recursive: true });
    console.log('Created dir:', d);
  }
});

function download(url, dest) {
  return new Promise((resolve, reject) => {
    if (fs.existsSync(dest) && fs.statSync(dest).size > 1000) {
      console.log('Already exists:', path.basename(dest));
      return resolve();
    }
    const file = fs.createWriteStream(dest);
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return download(res.headers.location, dest).then(resolve).catch(reject);
      }
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log('Downloaded:', path.basename(dest));
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      console.warn('Failed to download ' + url + ':', err.message);
      resolve(); // Do not block if network has issue
    });
  });
}

async function run() {
  const vendorDir = path.join(__dirname, '..', 'vendor');
  
  // Download standalone vendor libs so XAMPP works 100% offline
  await download('https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js', path.join(vendorDir, 'three.min.js'));
  await download('https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js', path.join(vendorDir, 'OrbitControls.js'));
  await download('https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/loaders/GLTFLoader.js', path.join(vendorDir, 'GLTFLoader.js'));
  await download('https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/exporters/GLTFExporter.js', path.join(vendorDir, 'GLTFExporter.js'));
  await download('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js', path.join(vendorDir, 'gsap.min.js'));
  await download('https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js', path.join(vendorDir, 'confetti.browser.min.js'));

  console.log('Setup finished!');
}

run();
