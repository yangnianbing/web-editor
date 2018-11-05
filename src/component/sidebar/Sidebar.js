import React, {Component} from 'react'
import gql from "graphql-tag"
import {Query} from 'react-apollo'

import './Sidebar.css'


export default class  Sidebar extends Component {
  render(){
    return  <Query
              query={
                gql`
                  {
                    files {
                      name,
                      path,
                      isDirectory
                    }
                  }
                `
              }>
              {
                ({loading, error, data}) => {
                  if(loading) return <p>loading</p>
                  if(error) return <p>error</p>
                  return <div class="part sidebar">
                          <div class="sidebar-title">
                            <div class="title-label">
                              <span>资源管理器</span>
                            </div>
                            <div class="title-actions"></div>
                          </div>
                          <div class="sidebar-content">
                            <div class="section open-file">
                              <div class="header expand">
                                <i class="expand-status iconfont icon-expand"></i>
                                <span>打开的编辑器</span>
                              </div>
                              <div class="content hide">
                                  <ul>
                                    <li class="selected"><span>index.html</span></li>
                                    <li><span>index.css</span></li>
                                  </ul>
                              </div>
                            </div>
                            <div class="section file-tree">
                              <div class="header expand">
                                <i class="expand-status iconfont icon-expand"></i>
                                <span>CODE</span>
                              </div>
                              <div class="content">
                                <ul>
                                  {
                                    data.files.map((file, index) =>  <li key={index} onClick={this.expand.bind(this, file)}>
                                      <div class="wholerow">&nbsp;</div>
                                      {file.isDirectory == true ? <i class="expand-status iconfont icon-expand"></i> : ''}
                                      {file.isDirectory == false ? <i class="file-icon iconfont icon-file"></i> : ''}
                                      <span>{file.name}</span>
                                    </li>)
                                  }
                                </ul>
                              </div>
                            </div>
                            <div class="section out-line">
                              <div class="header expand">
                                <i class="expand-status iconfont icon-expand"></i>
                                <span>大纲</span>
                              </div>
                              <div class="content hide"></div>
                            </div>
                          </div>
                        </div>
                }
              }
            </Query>
   
  }
  expand(file, status){
    if(file.isDirectory === true){
      
    }
  }
}