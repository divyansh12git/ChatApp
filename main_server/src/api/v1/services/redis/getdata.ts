import RedisClient from "../../../../config/redis";

const getCacheData=async({parameters}:{parameters:any})=>{
    const redis=RedisClient.getInstance();
    const client=redis.getClient;
    const redisKey = Object.entries(parameters)
        .map(([key, value]) => `${key}:${value}`)
        .join(",");
        console.log(redisKey);
    const redisValue=await client.get(redisKey);
    return redisValue;
}

export default getCacheData;