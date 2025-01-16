import client from "../config/cassandra"


const query1='SELECT * FROM chat_messages';
const query2=`INSERT INTO chat_messages (id, chat_id,timestamp,message,receiver_id,sender_id,time) VALUES(uuid(),'test1_test2', toTimestamp(now()), 'valgaur moharis', 55,56,'dasa');`
let parameters:string[]=[];
let parameters2:string[]=[];




client.connect((err) => {
  if (err) {
      console.error('Error connecting to Cassandra', err);
      return;
  }



    client.execute(query2, parameters, (err, result) => {
        if (err) {
            console.error('Error executing query', err);
        } else {
            console.log('Query result:', result);
            // console.log(result.rows);
        }
  
        // Closing the client prematurely
        client.shutdown();  // <-- This is the issue
    });
}
 );


