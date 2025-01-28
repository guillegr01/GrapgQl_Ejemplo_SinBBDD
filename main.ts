import { MongoClient } from "mongodb"
import { ApolloServer } from "npm:@apollo/server"
import { startStandaloneServer } from "npm:@apollo/server/standalone"
import {DinosaurModel} from "./types.ts"
import { typeDefs } from "./schema.ts"
import { resolvers } from "./resolvers.ts"

const MONGO_URL = Deno.env.get("MONGO_URL");

if (!MONGO_URL) {
  throw new Error("Please enter a valid MONGO_URL");
}
console.info("Connected succesfully to DDBB");
const client = new MongoClient(MONGO_URL);
await client.connect();

const db = client.db("BBDD_GraphQL");
const DinosaurCollection = db.collection<DinosaurModel>("dinosaurs");

const server = new ApolloServer({
  typeDefs,
  resolvers
});

const { url } = await startStandaloneServer(server, {
  context: async() => ({DinosaurCollection}),
});

console.log('Server running at: ${url}');