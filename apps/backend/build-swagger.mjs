import { execSync } from 'node:child_process';
import { readFileSync, writeFileSync, unlinkSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';

const __dir = dirname(fileURLToPath(import.meta.url));

// Load .env from monorepo root (two levels up from apps/backend/)
dotenv.config({ path: resolve(__dir, '../../.env') });

const APP_DOMAIN = process.env.APP_DOMAIN ?? 'http://localhost:4040';
const serverUrl = `${APP_DOMAIN}/api`;

const openapiSrc = resolve(__dir, 'docs/openapi.yaml');
const openapiTmp = resolve(__dir, 'docs/openapi.tmp.yaml');

const original = readFileSync(openapiSrc, 'utf8');
// Replace the server url line (first match only — supports single-server specs)
const patched = original.replace(/^(\s*-\s*url:\s*).+$/m, `$1${serverUrl}`);

writeFileSync(openapiTmp, patched, 'utf8');

try {
  execSync('redocly bundle docs/openapi.tmp.yaml --ext json -o docs/swagger.json', {
    stdio: 'inherit',
    cwd: __dir,
  });
} finally {
  unlinkSync(openapiTmp);
}
