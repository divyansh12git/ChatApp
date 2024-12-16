import express, { urlencoded } from 'express';
import http from "http";
import cors from "cors";
import SocketService from './api/v1/services/socketio';
import path from "node:path";
import { connectionRouter } from './api/v1/routes/connection';
import { ClientToServerEvents,InterServerEvents,
        ServerToClientEvents,SocketData
 } from './api/v1/interfaces/events';
 import {Server} from "socket.io";
(()=>{
    const port=4000 ;
    
    const app=express();
    const httpServer = http.createServer(app);
    const socketService=new SocketService(httpServer);
    // const io=new Server(httpServer);
    

    app.use(express.json());
    app.use(express.urlencoded());
    app.use(cors());
    app.use("/connect",connectionRouter);

    //socket  
    // socketService.io.attach(httpServer);
    socketService.initListeners();

    //   io.on('connection', (socket) => {
    //     console.log('a user connected');
    //     socket.on('disconnect', () => {
    //       console.log('user disconnected');
    //     });
    //   });

    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname,'..','/testclient.html')  );
    });
      
    
    httpServer.listen(port,()=>{
        console.log(`Server is running on port: ${port}`);
    })


}
)();