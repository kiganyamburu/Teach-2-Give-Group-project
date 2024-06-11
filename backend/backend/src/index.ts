import app from './app';
import { connectPool } from './config/dbConfig';

const PORT = process.env.PORT || 3000;

connectPool().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch(err => {
  console.error('Failed to connect to the database:', err);
  process.exit(1);
});