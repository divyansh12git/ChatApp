import cassandra from "cassandra-driver";
import  path  from "path";
require('dotenv').config();
const connection=process.env.BUNDLEPATH || "";
const keyspace=process.env.KEYSPACE || "chatapp";

// console.log(connection);
// console.log(process.env.CLIENT);
const client = new cassandra.Client({
    cloud: {
        secureConnectBundle: path.resolve(connection),
    },
    credentials: {
        username: process.env.CLIENT || "",
        password: process.env.PASSWORD || "",
    },
    keyspace: keyspace,
});


export default client;

class cassandraClient{
    private static instance: cassandra.Client | null = null;
    static connected: boolean = false;
    private constructor(){
        cassandraClient.connected=false;
        cassandraClient.instance=client;
        this.connectToCassandra();
    }
    public static getInstance(): cassandra.Client {
        if (!cassandraClient.instance) {
            new cassandraClient();
        }
        if (!cassandraClient.instance) {
            throw new Error('Cassandra client instance is not initialized');
        }
        return cassandraClient.instance;
    }
    connectToCassandra = async () => {
        try {
            await client.connect();
            cassandraClient.connected = true;
            console.log('Connected to Cassandra');
        } catch (e) {
            cassandraClient.connected = false;
            console.error('Error connecting to Cassandra:', e);
        }
    };

    getConnection = async () => {
        if (!cassandraClient.connected) {
            await this.connectToCassandra();
        }
        return cassandraClient.instance;
    };
    

}
export {cassandraClient};