import cassandra from "cassandra-driver";


const client = new cassandra.Client({
    contactPoints: ['localhost'], // Docker container running Cassandra
    protocolOptions: { port: 7001 },
    localDataCenter: 'datacenter1', // Use the same data center as in Cassandra
    keyspace: 'chatapp', // Optional: specify your keyspace
    credentials: { username: 'divyansh', password: 'divyansh' }, // Authentication
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