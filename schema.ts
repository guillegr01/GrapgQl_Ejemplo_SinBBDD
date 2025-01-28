export const typeDefs = `#graphql

    type Dinosaur {
        id: ID!
        name: String
        type: String
    }

    type Query {
        dinosaurs: [Dinosaur!]
        dinoasur: (id:ID!): Dinosaur
    }

`;