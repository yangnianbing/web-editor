import gql from "graphql-tag"
import client from "../ApolloClient";



const updateFileContentFragment = gql`
    mutation updateFileContent($file: String!){
        updateFileContent(file: $file){
            status
        }
    }
`

export var updateFileContent = function(file){
    return client.mutate({
        mutation: updateFileContentFragment,
        variables: {file:JSON.stringify(file)}
    })
}
