import 'dotenv/config';
import logger from 'jet-logger';
import ENV from 'src/constants/ENV';
import { connectDB } from 'src/db';
import server from 'src/server';

(async () => {
  try {
    await connectDB();                  // block until Mongo is ready
    server.listen(ENV.Port, () =>
      logger.info(`Express server started on port ${ENV.Port}`),
    );
  } catch (err) {
    throw new Error(`❌  Failed to start server: ${err}`);
  }
})();
