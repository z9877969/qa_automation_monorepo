import path from 'node:path';
import fs from 'node:fs/promises';
import { PUBLIC_DIR, TEMP_UPLOAD_DIR } from '../constants/index.js';
import { getEnvVar } from './getEnvVar.js';

export const saveFileToPublicDir = async (file, folder) => {
  const destDir = path.join(PUBLIC_DIR, folder);
  await fs.mkdir(destDir, { recursive: true });

  const srcPath = path.join(TEMP_UPLOAD_DIR, file.filename);
  const destPath = path.join(destDir, file.filename);
  await fs.copyFile(srcPath, destPath);
  await fs.unlink(srcPath);

  const domain = getEnvVar('APP_DOMAIN', 'http://localhost:4040');
  return `${domain}/api/uploads/${folder}/${file.filename}`;
};
