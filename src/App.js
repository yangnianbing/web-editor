import React from 'react';
import './App.css';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';


import Titlebar from './component/titlebar/Titlebar'
import Activitybar from './component/activitybar/Activitybar'
import Sidebar from './component/sidebar/Sidebar';
import Bottompanel from './component/bottompanel/Bottompanel';
import Editor from  './component/editor/Editor'

const client = new ApolloClient({
  uri: "http://localhost:4000/"
})


const App = () => (
  <ApolloProvider client={client}>
    <div class="workbench">
    <Titlebar></Titlebar>
    <Activitybar></Activitybar>
    <Sidebar></Sidebar>
    <Editor></Editor>
    <Bottompanel></Bottompanel>
    </div>
  </ApolloProvider>
)
export default App;
