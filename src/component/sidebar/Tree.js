import React, {Component} from 'react';
import {queryFiles} from './query'; 
import {Query} from 'react-apollo'
import TreeNode from './TreeNode'

export default class Tree extends Component{
    state = {
        fils: [],
        path: ''
    }
    render(){
        return <Query query={queryFiles}>
                {
                      ({loading, error, data, refetch, client}) => {
                        if(loading) return <p>loading</p>
                        if(error) return <p>error</p>
                        return <ul> {data.files.map((file, index) => <TreeNode file={file} key={index}></TreeNode>) }</ul>
                      }
                }
            </Query>
    }
}