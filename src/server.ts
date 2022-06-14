import express from 'express';
import cors from 'cors';
import 'dotenv/config';

const app = express();
app.use(cors());

const PORT = process.env.SERVER_PORT;

app.get('/', (req: express.Request, res: express.Response) => {
  res.send('test');
});

app.listen(PORT);
