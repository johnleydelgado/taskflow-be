// scripts/build.ts
import fs from 'fs-extra';
import logger from 'jet-logger';
import childProcess from 'child_process';

(async () => {
  try {
    // 1) Clean out old build directory
    await remove('./dist/');

    // 2) Compile TS → dist/
    await exec('tsc --build tsconfig.prod.json');

    // 3) Copy static assets into dist/
    await copy('./src/public', './dist/public');
    await copy('./src/views', './dist/views');

    // 4) Copy compiled config.js from dist → project root
    await copy('./dist/config.js', './config.js');

  } catch (err) {
    logger.err(err);
    // eslint-disable-next-line n/no-process-exit
    process.exit(1);
  }
})();

function remove(path: string): Promise<void> {
  return fs.remove(path);
}

function copy(src: string, dest: string): Promise<void> {
  return fs.copy(src, dest);
}

function exec(cmd: string, cwd: string = process.cwd()): Promise<void> {
  return new Promise((resolve, reject) => {
    childProcess.exec(cmd, { cwd }, (err, stdout, stderr) => {
      if (stdout) logger.info(stdout.trim());
      if (stderr) logger.warn(stderr.trim());
      return err ? reject(err) : resolve();
    });
  });
}
