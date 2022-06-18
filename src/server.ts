import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { chatRouter } from './routes';
import webSocket from './socket';

const app = express();
app.use(cors());

const PORT = process.env.SERVER_PORT;

app.get('/', (req: express.Request, res: express.Response) => {
  res.send('test');
});

app.use('/chat', chatRouter);

const server = app.listen(PORT, () => console.log(`server is running ${PORT}`));

// // socket
webSocket(server);
