import { ApolloServer } from '@apollo/server';
import {expressMiddleware} from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import {User} from "./users/index";
import { Authentication } from './authentication';


const startApolloGraphqlServer=async():Promise<ApolloServer>=>{
    const gqlServer = new ApolloServer({
        typeDefs:`
            ${User.typedef}
            ${Authentication.typedef}
            type Query{
                ${User.queries}
            }
            type Mutation{
                ${User.mutation}
                ${Authentication.mutation}
            }
        `,
        resolvers:{
            Query:{
                ...User.resolvers.queries,
            },
            Mutation:{
                ...User.resolvers.mutation,
                ...Authentication.Resolver.mutation
            }
        },
      });


      await gqlServer.start().then(()=>{
            console.log(`Apollo Graphql server is ready to listen at route /graphql`);
      });

      return gqlServer;
}

export default startApolloGraphqlServer;