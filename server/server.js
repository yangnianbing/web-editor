const {ApolloServer, gql} = require('apollo-server');
const fs = require('fs');
const path = require('path');

module.exports = function(param){
  var baseDir = param.directory ? param.directory : './';
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


  const resolvers = {
    Query: {
      files: (dir) => {
        dir = dir ? path.join(baseDir, dir) : baseDir;
        return fs.readdirSync(dir).map(file => t= {
          name: file,
          path: file,
          isDirectory: fs.statSync(path.join(dir, file)).isDirectory()
        }).sort((a,b) => {
          return a.isDirectory === true ? -1 : 1
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

}


