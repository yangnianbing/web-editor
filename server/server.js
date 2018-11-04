const {ApolloServer, gql} = require('apollo-server');


const typeDefs = gql`
  type Query {
    files: [File]
  }

  type File {
    name: String
    path: String,
    isDirectory: Boolean
  }

  type Response {
    status: Int
  }

  type Mutation {
    file(name: String): Response
  }
`


const fs = require('fs');
const resolvers = {
  Query: {
    files: () => {
      return fs.readdirSync('./').map(file => t= {
        name: file,
        path: file,
        isDirectory: true
      })
    }
  },
  Mutation: {
    file: (path) => {
      return {
        status:0
      }
    }
  }
}

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});