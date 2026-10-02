import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const portraitsDir = path.join(rootDir, 'public', 'assets', 'team-portraits');

if (!fs.existsSync(portraitsDir)) {
  fs.mkdirSync(portraitsDir, { recursive: true });
}

// Curated high-resolution editorial portrait mappings matching the 3:4 institutional aesthetic
const PORTRAIT_SOURCES = [
  // 1. Faculty Leadership
  {
    fileName: 'faculty-kharche.jpg',
    url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&crop=faces&w=600&h=800&q=85'
  },
  {
    fileName: 'faculty-hirani.jpg',
    url: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&crop=faces&w=600&h=800&q=85'
  },
  // 2. Executive Officers
  {
    fileName: 'exec-tejraj.jpg',
    url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&crop=faces&w=600&h=800&q=85'
  },
  {
    fileName: 'exec-sarang.jpg',
    url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&crop=faces&w=600&h=800&q=85'
  },
  {
    fileName: 'exec-shardul.jpg',
    url: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&crop=faces&w=600&h=800&q=85'
  },
  {
    fileName: 'exec-harshad.jpg',
    url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&crop=faces&w=600&h=800&q=85'
  },
  {
    fileName: 'exec-anushka.jpg',
    url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&crop=faces&w=600&h=800&q=85'
  },
  // 3. Technical & Domain Mentors
  {
    fileName: 'exec-harsh.jpg',
    url: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&crop=faces&w=600&h=800&q=85'
  },
  {
    fileName: 'exec-sahil.jpg',
    url: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&crop=faces&w=600&h=800&q=85'
  },
  {
    fileName: 'exec-soham.jpg',
    url: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&crop=faces&w=600&h=800&q=85'
  },
  {
    fileName: 'exec-aditya.jpg',
    url: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&crop=faces&w=600&h=800&q=85'
  },
  {
    fileName: 'exec-ananya.jpg',
    url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&crop=faces&w=600&h=800&q=85'
  },
  {
    fileName: 'exec-ayush.jpg',
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&crop=faces&w=600&h=800&q=85'
  },
  {
    fileName: 'exec-kaushik.jpg',
    url: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&crop=faces&w=600&h=800&q=85'
  },
  {
    fileName: 'exec-shravani.jpg',
    url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&crop=faces&w=600&h=800&q=85'
  }
];

async function downloadAll() {
  console.log('Downloading curated portraits for team leadership...');

  for (const item of PORTRAIT_SOURCES) {
    const dest = path.join(portraitsDir, item.fileName);
    if (fs.existsSync(dest)) {
      console.log(`  ✓ ${item.fileName} already exists, skipping.`);
      continue;
    }

    try {
      console.log(`  Downloading ${item.fileName}...`);
      const res = await fetch(item.url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const buffer = Buffer.from(await res.arrayBuffer());
      fs.writeFileSync(dest, buffer);
      console.log(`  ✓ Saved ${item.fileName} (${buffer.length} bytes)`);
    } catch (err) {
      console.error(`  ✗ Failed ${item.fileName}:`, err.message);
    }
  }

  console.log('Finished downloading portraits.');
}

downloadAll();
