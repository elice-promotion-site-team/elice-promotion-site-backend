import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { Server } from 'socket.io';
import http from 'http';

const app = express();
app.use(cors());

const PORT = process.env.SERVER_PORT;

app.get('/', (req: express.Request, res: express.Response) => {
  res.send('test');
});

const server = app.listen(PORT, () => console.log(`server is running ${PORT}`));

const io = new Server(server);

io.on('connection', (socket) => {
  console.log('socket 실행');
});
