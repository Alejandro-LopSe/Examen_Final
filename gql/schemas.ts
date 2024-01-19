// The GraphQL schema
export const typeDefs = `#graphql
  type name  {
    id: String!
    name: String!
    pais: String!
    tlf: String!
    time: String!
  }

  type Query {
    getContacts: [name!]!
    getContact(id:String!): name!
  }

  type Mutation {
    """---------------------/ADDS/-------------------------"""
    addContact(
      name: String!,
      tlf: String!
    ): name!
    """---------------------/UPDATES/-------------------------"""
    updateContact(
      id: ID!,
      name: String,
      tlf: String
    ): name!
    """--------------------/DELETES/--------------------------"""
    deleteContact(
      id: ID!,
    ): Boolean!

  }
`;
