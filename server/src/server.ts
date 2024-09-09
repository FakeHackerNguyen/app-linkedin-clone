import 'dotenv/config';
import http from 'http';
import Database from './config/database';

// const db: Database =
//   process.env.NODE_ENV === 'development'
//     ? new Database(process.env.DB_LOCAL as string, {})
//     : new Database(process.env.DB_HOST as string, {});

const db = new Database(process.env.DB_LOCAL as string, {});
db.connect();

import app from './app';

const PORT = process.env.PORT || 8000;
const server = http.createServer(app);
server.listen(PORT, () => {
  console.log(`App is running on ${PORT}`);
});
