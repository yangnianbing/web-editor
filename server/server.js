const {ApolloServer, gql} = require('apollo-server');
const fs = require('fs');
const pathLib = require('path');

module.exports = function(param){
  var baseDir = param.directory ? param.directory : './';
  const typeDefs = gql`
    type Query {
      files(path: String): [File]
    }

    type File {
      name: String
      path: String,
      isDirectory: Boolean,
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
      files: (root, {path}, context, info) => {
        path = path ? pathLib.join(baseDir, path) : baseDir;
        return fs.readdirSync(path).map(file => t= {
          name: file,
          path: file,
          isDirectory: fs.statSync(pathLib.join(path, file)).isDirectory(),
          children: [{
            name: 'test',
            path: 'test',
            isDirectory: false
          }]
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


