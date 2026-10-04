import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const SCREENS = [
  'screen-01', 'screen-02', 'screen-03', 'screen-04', 'screen-05', 'screen-06',
  'screen-07', 'screen-08', 'screen-09', 'screen-10', 'screen-11', 'screen-12', 'screen-13',
  'screen-14', 'screen-15', 'screen-16', 'screen-17', 'screen-18', 'screen-19', 'screen-20',
  'screen-21', 'screen-22', 'screen-23', 'screen-24', 'screen-25', 'screen-26', 'screen-27',
  'screen-28', 'screen-29', 'screen-30', 'screen-31', 'screen-32', 'screen-33'
];

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const tempDir = path.resolve('scratch_tests');
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir, { recursive: true });
}

console.log('====================================================');
console.log('Starting CareerPilot 33-Screen Automated DOM Testing');
console.log('====================================================\n');

let passed = 0;
let failed = 0;

for (const screenId of SCREENS) {
  const url = `http://localhost:3000/#${screenId}`;
  const outPath = path.join(tempDir, `${screenId}.html`);

  try {
    // Run headless chrome with virtual time budget to allow React to mount
    const cmd = `"${chromePath}" --headless=new --dump-dom --virtual-time-budget=2000 "${url}" > "${outPath}"`;
    execSync(cmd, { stdio: 'pipe', timeout: 15000 });

    const html = fs.readFileSync(outPath, 'utf-8');
    
    // Check if error boundary caught an error
    const hasError = html.includes('Something went wrong loading this screen') || html.includes('Runtime Error');
    // Check if root mounted
    const isMounted = html.includes('class="app-container"') && html.length > 500;

    if (isMounted && !hasError) {
      console.log(`[PASS] ${screenId} rendered successfully (${html.length} bytes)`);
      passed++;
    } else {
      console.error(`[FAIL] ${screenId} failed! ErrorBoundary triggered or root empty!`);
      failed++;
    }
  } catch (err) {
    console.error(`[ERROR] ${screenId} execution error:`, err.message);
    failed++;
  }
}

console.log('\n====================================================');
console.log(`Test Results: ${passed} PASSED, ${failed} FAILED out of ${SCREENS.length} screens.`);
console.log('====================================================');

// Clean up tempDir
try {
  fs.rmSync(tempDir, { recursive: true, force: true });
} catch (e) {}

if (failed > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
