import express, { urlencoded } from 'express';
import http from "http";
import cors from "cors";
import SocketService from './api/v1/services/socketio';
import path from "node:path";
import { connectionRouter } from './api/v1/routes/connection';
import { ClientToServerEvents,InterServerEvents,
        ServerToClientEvents,SocketData
 } from './api/v1/interfaces/events';

(()=>{
    const port=4000 || 4001;
    
    const app=express();
    const socketService=new SocketService();
    const httpServer = http.createServer(app);
    
    

    app.use(express.json());
    app.use(express.urlencoded());
    app.use(cors());
    app.use("/connect",connectionRouter);

    //socket  
    socketService.io.attach(httpServer);
    socketService.initListeners();
    

    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname,'..','/testclient.html')  );
    });
      
    
    httpServer.listen(port,()=>{
        console.log(`Server is running on port: ${port}`);
    })


}
)();