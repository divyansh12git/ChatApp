import express, { urlencoded } from 'express';
import http from "http";
import cors from "cors";
import SocketService from './api/v1/services/socketio';
import path from "node:path";
import { connectionRouter } from './api/v1/routes/connection';
import {dbRouter} from "./api/v1/routes/db"
import { ClientToServerEvents,InterServerEvents,
        ServerToClientEvents,SocketData
 } from './api/v1/interfaces/events';
(()=>{
    const port=4000 ;
    
    const app=express();
    const httpServer = http.createServer(app);
    const socketService=new SocketService(httpServer);
    

    app.use(express.json());
    app.use(express.urlencoded());
    app.use(cors());
    app.use("/connect",connectionRouter);
    app.use("/messages",dbRouter);
    //socket  
    socketService.initListeners();

    app.get('/test', (req, res) => {
        res.sendFile(path.join(__dirname,'..','/testclient.html')  );
    });
    app.get('/',(req,res)=>{
        res.send("Socket Server is running...");
    }) 
    
    httpServer.listen(port,()=>{
        console.log(`Server is running on port: ${port}`);
    })


}
)();