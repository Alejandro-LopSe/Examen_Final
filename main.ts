// @deno-types="npm:@types/express@4"
import mongoose from "mongoose";
import { load } from "https://deno.land/std@0.204.0/dotenv/mod.ts";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { Query } from "./resolvers/query.ts";
import { typeDefs } from "./gql/schemas.ts";
import { Mutation } from "./resolvers/mutation.ts";

const env = await load()
const MONGO_URL = Deno.env.get("MONGO_URL") || env["MONGO_URL"];


await mongoose.connect(MONGO_URL!);
console.info("Connected to MongoDB");


const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query,
    Mutation
  },
});

const x= await startStandaloneServer(server);
console.info(`Server ready at ${x.url} `);
