import { Redis } from "ioredis";

class RedisClient {
    private static _instance: RedisClient | null = null;
    private _client: Redis;

    private constructor() {
        this._client = new Redis();
    }

    static getInstance(): RedisClient {
        if (!RedisClient._instance) {
            RedisClient._instance = new RedisClient();
        }
        return RedisClient._instance;
    }


    get getClient(): Redis {
        return this._client;
    }
}

export default RedisClient;
