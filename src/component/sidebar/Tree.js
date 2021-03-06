import React, {Component} from 'react';
import {queryFilesFragment} from '../../service/graphql'; 
import {Query} from 'react-apollo'
import TreeNode from './TreeNode'

export default class Tree extends Component{
    state = {
        file: {name: '#'},
        ...this.props
    }
    render(){
        return <Query query={queryFilesFragment} variables={this.state.file}>
                {
                      ({loading, error, data}) => {
                        if(loading) return <p>loading</p>
                        if(error) return <p>error</p>
                        this.state.file.children = data.files;
                        return <ul> {data.files.map((file, index) => <TreeNode file={file} key={index}></TreeNode>) }</ul>
                      }
                }
            </Query>
    }
}