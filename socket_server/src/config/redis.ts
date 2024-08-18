import {Redis} from "ioredis";

class RedisClient{
    private _client;
    constructor(){
        this._client=new Redis();
    }
    get getclient(){
        return this._client;
    }
}

export default RedisClient;