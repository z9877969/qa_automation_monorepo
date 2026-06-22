import { setupServer } from './server.js';
import { initMySQLConnection } from './db/initMySQLConnection.js';
import { createDirIfNotExists } from './utils/createDirIfNtExists.js';
import { TEMP_UPLOAD_DIR } from './constants/index.js';

const bootstrap = async () => {
  await initMySQLConnection();
  await createDirIfNotExists(TEMP_UPLOAD_DIR);
  setupServer();
};

bootstrap();
