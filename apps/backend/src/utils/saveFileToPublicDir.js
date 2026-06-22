import path from 'node:path';
import fs from 'node:fs/promises';
import { PUBLIC_DIR, TEMP_UPLOAD_DIR } from '../constants/index.js';
import { getEnvVar } from './getEnvVar.js';

export const saveFileToPublicDir = async (file, folder) => {
  const destDir = path.join(PUBLIC_DIR, folder);
  await fs.mkdir(destDir, { recursive: true });

  const destPath = path.join(destDir, file.filename);
  await fs.rename(path.join(TEMP_UPLOAD_DIR, file.filename), destPath);

  const domain = getEnvVar('APP_DOMAIN', 'http://localhost:5000');
  return `${domain}/api/uploads/${folder}/${file.filename}`;
};
