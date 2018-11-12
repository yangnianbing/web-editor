import client from "../ApolloClient";
import {updateFileContentFragment} from './graphql';


export var updateFileContent = function(file){
    return client.mutate({
        mutation: updateFileContentFragment,
        variables: {file:JSON.stringify(file)}
    })
}
