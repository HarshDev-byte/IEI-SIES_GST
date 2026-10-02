import fs from 'fs';
import path from 'path';
import QRCode from 'qrcode';
import { fileURLToPath } from 'url';
import { 
  facultyLeadership, 
  seniorCouncil, 
  juniorCouncil, 
  activeCoordinators 
} from '../src/data/membersData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Production Base URL (matches MemberProfilePage.jsx & .env.example)
const PRODUCTION_BASE = process.env.VITE_SITE_URL || 'https://iei-sies-gst.vercel.app';

// Helper to format member file name: Name_ID.png
function getSafeFileName(member) {
  const cleanName = member.name
    .replace(/[^a-zA-Z0-9]/g, '_')
    .replace(/_+/g, '_')
    .replace(/^_|_$/g, '');
  return `${cleanName}_${member.id}.png`;
}

// QR Code generation options matching high-res institutional standard
const QR_OPTIONS = {
  width: 400,
  margin: 2,
  errorCorrectionLevel: 'M',
  color: {
    dark: '#000000',
    light: '#ffffff'
  }
};

async function generateQRsForGroup(groupName, members, targetDir, publicDir) {
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }
  if (publicDir && !fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  console.log(`\nGenerating QR codes for [${groupName}] (${members.length} members)...`);

  for (const member of members) {
    const fileName = getSafeFileName(member);
    const targetPath = path.join(targetDir, fileName);
    const profileUrl = `${PRODUCTION_BASE}/#/member/${member.id}`;

    await QRCode.toFile(targetPath, profileUrl, QR_OPTIONS);
    console.log(`  ✓ ${fileName} -> ${profileUrl}`);

    if (publicDir) {
      const publicPath = path.join(publicDir, fileName);
      fs.copyFileSync(targetPath, publicPath);
    }
  }
}

async function run() {
  console.log('================================================================');
  console.log('IEI SIES GST — STATIC QR CODE GENERATOR');
  console.log(`Target Production URL: ${PRODUCTION_BASE}`);
  console.log('================================================================');

  // 1. Junior Council (12 members)
  const juniorDir = path.join(rootDir, 'IEI_SIES_GST_Junior_Council_QRCodes');
  const publicJuniorDir = path.join(rootDir, 'public', 'qrcodes', 'junior');
  await generateQRsForGroup('Junior Council', juniorCouncil, juniorDir, publicJuniorDir);

  // 2. All Coordinators (31 members)
  const coordsDir = path.join(rootDir, 'IEI_SIES_GST_Coordinators_QRCodes');
  const publicCoordsDir = path.join(rootDir, 'public', 'qrcodes', 'coordinators');
  await generateQRsForGroup('Coordinators', activeCoordinators, coordsDir, publicCoordsDir);

  // 3. Faculty (2 members, strictly without principal)
  const facultyDir = path.join(rootDir, 'IEI_SIES_GST_Faculty_QRCodes');
  const publicFacultyDir = path.join(rootDir, 'public', 'qrcodes', 'faculty');
  await generateQRsForGroup('Faculty Leadership', facultyLeadership, facultyDir, publicFacultyDir);

  // 4. Senior Council (14 members)
  const seniorDir = path.join(rootDir, 'IEI_SIES_GST_Senior_Core_QRCodes');
  const publicSeniorDir = path.join(rootDir, 'public', 'qrcodes', 'senior');
  await generateQRsForGroup('Senior Council', seniorCouncil, seniorDir, publicSeniorDir);

  // 5. Combined All Team Directory
  const allTeamDir = path.join(rootDir, 'IEI_SIES_GST_All_Team_QRCodes');
  if (!fs.existsSync(allTeamDir)) {
    fs.mkdirSync(allTeamDir, { recursive: true });
  }

  const allMembers = [
    ...facultyLeadership,
    ...seniorCouncil,
    ...juniorCouncil,
    ...activeCoordinators
  ];
  await generateQRsForGroup('All Team Members Combined', allMembers, allTeamDir, null);

  console.log('\nAll QR code images successfully generated.');
}

run().catch((err) => {
  console.error('Error generating QR codes:', err);
  process.exit(1);
});
