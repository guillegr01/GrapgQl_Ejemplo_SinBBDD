export const typeDefs = `#graphql

    type Dinosaur {
        id: ID!
        name: String!
        type: String!
    }

    type Query {
        dinosaurs: [Dinosaur!]
        dinosaur(id:ID!): Dinosaur
    }

`;