import RedisClient from "../../../config/redis";

async function pubsub(){
    const initRedis=new RedisClient();
    const initRedis2=new RedisClient();
    const pubisher=initRedis.getclient;
    const subscriber=initRedis2.getclient;

    pubisher.publish("room-1","Hi guys of room 1...");
    
    subscriber.subscribe("room-1",(err,count)=>{
        if (err) console.error(err.message);
        console.log(`Subscribed to ${count} channels.`);
    })
    
    subscriber.on("message",(channel,message)=>{
        console.log(`Received message from ${channel} channel.`);
        console.log(message);
    })
}
export {pubsub};