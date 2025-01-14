import cassandra from "cassandra-driver";


const client = new cassandra.Client({
    contactPoints: ['localhost'], // Docker container running Cassandra
    protocolOptions: { port: 7001 },
    localDataCenter: 'datacenter1', // Use the same data center as in Cassandra
    keyspace: 'chatapp', // Optional: specify your keyspace
    credentials: { username: 'divyansh', password: 'divyansh' }, // Authentication
});

export default client;
