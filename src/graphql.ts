import mongodb from "mongodb";
import apolloServerExpress from "apollo-server-express";
import graphqlTools from "graphql-tools";

const { ObjectId } = mongodb;
const { ApolloServer, gql } = apolloServerExpress;
const { makeExecutableSchema } = graphqlTools;

const graphiqlEndpoint = "/graphiql";
const graphqlEndpoint = "/graphql";

const prepare = (o) => {
  o._id = o._id.toString();
  return o;
};

export const startGraphQL = async ({ application, connection }) => {
  try {
    const Hospitals = connection.collection("hospitals");
    const Users = connection.collection("users");

    const typeDefs = gql`
      type Query {
        hospital(_id: String): Hospital
        hospitals: [Hospital]
        user(_id: String): User
        users: [User]
      }
      type Hospital {
        _id: String
        address: String
        name: String
        users: [User]
      }
      type User {
        _id: String
        hospitalId: String
        hospitals: [Hospital]
        name: String
      }
      type Mutation {
        createHospital(name: String, address: String): Hospital
        createUser(hospitalId: String, name: String): User
      }
      schema {
        query: Query
        mutation: Mutation
      }
    `;

    const resolvers = {
      Query: {
        hospital: async (root, { _id }) => {
          return prepare(await Hospitals.findOne(ObjectId(_id)));
        },
        hospitals: async (root, { _id }) => {
          return (await Hospitals.find({}).toArray()).map(prepare);
        },
        user: async (root, { _id }) => {
          return prepare(await Users.findOne(ObjectId(_id)));
        },
        users: async () => {
          return (await Users.find({}).toArray()).map(prepare);
        },
      },
      Hospital: {
        users: async ({ _id }) => {
          return (await Users.find({ hospitalId: _id }).toArray()).map(prepare);
        },
      },
      User: {
        hospitals: async ({ hospitalId }) => {
          return (
            await Hospitals.find({ _id: ObjectId(hospitalId) }).toArray()
          ).map(prepare);
        },
      },
      Mutation: {
        createHospital: async (root, args) => {
          const response = await Hospitals.insertOne(args);
          return prepare(response.ops[0]);
        },
        createUser: async (root, args) => {
          const response = await Users.insertOne(args);
          return prepare(await Users.findOne({ _id: response.insertedId }));
        },
      },
    };

    const server = new ApolloServer({
      typeDefs,
      resolvers,
    });

    server.applyMiddleware({ app: application });

    console.log(`GraphQLi available at ${graphiqlEndpoint}`);
  } catch (error) {
    console.error(error);
  }
};
