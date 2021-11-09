#!/usr/bin/env node

import { ensureConfig } from './routines/ensure-config';
import { mainMenu } from './routines/main-menu';

(async () => {
  if (!await ensureConfig()) {
    return;
  }
  await mainMenu();
})();