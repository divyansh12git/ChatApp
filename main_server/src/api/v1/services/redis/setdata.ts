import RedisClient from "../../../../config/redis";

const setCacheData=({parameters,result}:{parameters:any,result:any})=>{
    const redis=RedisClient.getInstance();
    const client=redis.getClient;
    const redisKey = Object.entries(parameters)
        .map(([key, value]) => `${key}:${value}`)
        .join(",");
    // console.log(redisKey);
    const redisValue=JSON.stringify(result);

    client.set(redisKey,redisValue).then(() => {
        // console.log("Cache set successfully:", { redisKey, redisValue });
        return true;
    })
    .catch((error) => {
        console.error("Failed to set cache:", error);
    });;
    return false;
}

export default setCacheData;