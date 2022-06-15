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
    socket.emit('update', `${newUser}(나)님이 접속했습니다.`);
    socket.broadcast.emit('update', `${newUser}님이 접속했습니다.`);
    (socket as any).name = newUser;
  });

  socket.on('chat message', (msg: any) => {
    const name = (socket as any).name;
    console.log(msg);
    // 다른사람 화면에 보여지는 메세지
    socket.broadcast.emit('chat message', `${msg.name}: ${msg.msg}`);
    // 내 화면에 보여지는 메세지
    socket.emit('chat message', `나: ${msg.msg}`);
  });

  socket.on('disconnect', () => {
    socket.broadcast.emit('update', `${(socket as any).name}님이 나가셨습니다.`);
  });
});
