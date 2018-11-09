const {ApolloServer, gql} = require('apollo-server');
const fs = require('fs');
const pathLib = require('path');


module.exports = function(param){
  var baseDir = param.directory ? param.directory : './';
  const typeDefs = gql`
    type Query {
      files(path: String): [File],
      fileContent(path: String) : File
    }



    type File {
      name: String
      path: String,
      isDirectory: Boolean,
      content: String
    }

    type Response {
      status: Int
    }

    type Mutation {
      updateFileContent(file: String): Response
    }
  `


  const resolvers = {
    Query: {
      files(root, {path}, context, info){
        path = path ? pathLib.join(baseDir, path) : baseDir;
        return fs.readdirSync(path).map(filename => {
          var filePath = pathLib.join(path, filename);
          return {
            name: filename,
            path: filePath,
            isDirectory: fs.statSync(filePath).isDirectory()
          }
        }).sort((a,b) => {
          return a.isDirectory === true ? -1 : 1
        })
      },

      fileContent(root, {path}, context, info){
        if(!fs.existsSync(path)){
          return "";
        }
        return {content: fs.readFileSync(path, {encoding:'utf-8'})};
      }
    },
    Mutation: {
      updateFileContent: (root, {file}, context, info) => {
        let fileObj = JSON.parse(file);
        if(fs.existsSync(fileObj.path)){
          fs.writeFileSync(fileObj.path, fileObj.content)
        }
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


