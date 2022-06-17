import { Server } from 'socket.io';

function webSocket(server: any) {
  const io = new Server(server);

  // socket 연결중
  io.sockets.on('connection', (socket: any) => {
    console.log('socket 접속');

    // 새로운 접속자 발생
    socket.on('newUser', (newUser: any) => {
      // 현재 접속자 수
      const clientsCount = io.sockets.server.engine.clientsCount;
      console.log(clientsCount);
      // 현재 접속자 목록
      const clientsList: any = {};
      io.sockets.sockets.forEach((data: any) => {
        clientsList[data.name] = data.name;
        console.log(data.name);
      });
      console.log(clientsList);

      // 새로운 접속자 나에게 알림
      socket.emit('update', {
        msg: `${newUser}(나)님이 접속했습니다.`,
        clientsCount,
        clientsList,
      });

      // 새로운 접속자 다른사람들에게 알림
      socket.broadcast.emit('update', {
        msg: `${newUser}님이 접속했습니다.`,
        clientsCount,
        clientsList,
      });

      // 접속자의 name 속성에 이름 저장
      (socket as any).name = newUser;
    });

    // 메세지 전송 발생
    socket.on('chat message', (msg: any) => {
      // 메세지 전송자 이름 추출
      const name = (socket as any).name;
      console.log(msg);
      // 다른사람 화면에 보여지는 메세지
      socket.broadcast.emit('chat message', `${msg.name}: ${msg.msg}`);
      // 내 화면에 보여지는 메세지
      socket.emit('chat message', `나: ${msg.msg}`);
    });

    // 접속자 채팅 종료
    socket.on('disconnect', () => {
      // 현재 접속자 수
      const clientsCount = io.sockets.server.engine.clientsCount;
      console.log(clientsCount);

      // 현재 접속자 이름
      const clientsList: any = {};
      io.sockets.sockets.forEach((data: any) => {
        clientsList[data.name] = data.name;
      });
      console.log(clientsList);

      // 채팅 종료한 접속자를 다른사람들에게 알림
      socket.broadcast.emit('update', {
        msg: `${(socket as any).name}님이 나가셨습니다.`,
        clientsCount,
        clientsList,
      });
    });
  });
}

export default webSocket;
