import { Server } from 'socket.io';

function webSocket(server: any) {
  const io = new Server(server);
  io.sockets.on('connection', (socket: any) => {
    console.log('socket 접속');
    console.log(socket);

    socket.on('newUser', (newUser: any) => {
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
}

export default webSocket;
