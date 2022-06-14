import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { Server } from 'socket.io';
import { chatRouter } from './routes';

const app = express();
app.use(cors());

const PORT = process.env.SERVER_PORT;

app.use('/css', express.static('./static/css'));
app.use('/ts', express.static('./static/ts'));

app.get('/', (req: express.Request, res: express.Response) => {
  res.send('test');
});

app.use('/chat', chatRouter);

const server = app.listen(PORT, () => console.log(`server is running ${PORT}`));

// // socket
const io = new Server(server);

io.sockets.on('connection', (socket) => {
  console.log('socket 접속');

  socket.on('newUser', (newUser) => {
    console.log(`${newUser}님이 접속하였습니다.`);

    (socket as any).name = newUser;

    io.emit('update', { type: 'connect', name: 'SERVER', message: `${newUser}님이 접속하였습니다.` });
  });

  socket.on('chat message', (msg) => {
    msg.name = (socket as any).name;
    // console.log(msg);
    socket.broadcast.emit('chat message', msg);
    // socket.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    console.log(`${(socket as any).name}님이 나가셨습니다.`);
    socket.broadcast.emit('update', {
      type: 'disconnect',
      name: 'SERVER',
      message: `${(socket as any).name}님이 접속하였습니다.`,
    });
  });
});
