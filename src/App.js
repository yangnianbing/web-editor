import React from 'react';
import './App.css';
import {ApolloProvider} from 'react-apollo';
import client from './ApolloClient';

import Titlebar from './component/titlebar/Titlebar'
import Activitybar from './component/activitybar/Activitybar'
import Sidebar from './component/sidebar/Sidebar';
import Bottompanel from './component/bottompanel/Bottompanel';
import Editor from  './component/editor/Editor'



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
