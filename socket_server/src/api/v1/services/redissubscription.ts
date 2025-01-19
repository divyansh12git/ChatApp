// import { Redis } from "ioredis";
// import {createClient} from "../controller/redis"
// import { subscription,reverseSubscription } from "../interfaces/redis";

// class RedisSubscriptionManager{
//     private static instance: RedisSubscriptionManager;
//     private subscriber: Redis;
//     public publisher: Redis;
//     private subscriptions: subscription;//user to room
//     private reverseSubscriptions: reverseSubscription;//room to users array web socket

//     private  constructor(){
//         this.subscriber= createClient();
//         this.publisher = createClient();
//         this.publisher.connect();
//         this.subscriber.connect();
//         this.subscriptions = new Map<string, string[]>();
//         this.reverseSubscriptions = new Map<string, { [userId: string]: { userId: string; ws: any; } }>();
//     }

//     static getInstance(){
//         if(!this.instance){
//             this.instance = new RedisSubscriptionManager();
//         }
//         return this.instance;
//     }

//     subscribe(userId: string, room: string, ws: any) {
//         this.subscriptions.set(userId,[
//             ...(this.subscriptions.get(userId) || []),
//             room,
//         ]);

//         this.reverseSubscriptions.set(room, {
//             ...(this.reverseSubscriptions.get(room) || {}),
//             [userId]: {userId: userId, ws}
//         });

//         if (Object.keys(this.reverseSubscriptions.get(room) || {})?.length === 1) {
//             console.log(`subscribing message from ${room}`);
//             // This is the first subscriber to this room
//             this.subscriber.subscribe(room, (payload) => {
//                 try {
//                     // const parsedPayload = JSON.parse(payload);
//                     const subscribers = this.reverseSubscriptions.get(room) || {};
//                     Object.values(subscribers).forEach(({ws}) =>
//                         ws.send(payload)
//                     );
//                 } catch (e) {
//                     console.error("erroneous payload found?");
//                 }
//             });
//         }
//     }
//     unsubscribe(userId: string, room: string) {
        
//         this.subscriptions.set(
//             userId,
//             this.subscriptions.get(userId)?.filter((x) => x !== room) || []
//         );
//         if (this.subscriptions.get(userId)?.length === 0) {
//             this.subscriptions.delete(userId);
//         }
//         delete this.reverseSubscriptions.get(room)?.[userId];
//         if (
//             !this.reverseSubscriptions.get(room) ||
//             Object.keys(this.reverseSubscriptions.get(room) || {}).length === 0
//         ) {
//             console.log("unsubscribing from " + room);
//             this.subscriber.unsubscribe(room); // unsubscribing from redis...
//             this.reverseSubscriptions.delete(room);
//         }
//     }

//     private publish(room: string, message: any) {
//         console.log(`publishing message to ${room}`);
//         this.publisher.publish(room, JSON.stringify(message));
//     }

//     async addChatMessage(   
//         room: string,
//         message: string
//     ) {
//         this.publish(room, {
//             type: "message",
//             payload: {
//                 message
//             },
//         });
//     }

    
// }