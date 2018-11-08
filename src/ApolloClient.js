import ApolloClient from 'apollo-boost';

const defaultClient = new ApolloClient({
    uri: "http://localhost:4000/"
})
  
export default defaultClient;