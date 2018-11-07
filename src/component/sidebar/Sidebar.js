import React, {Component} from 'react'
import './Sidebar.css'
import Tree from './Tree';

export default class  Sidebar extends Component {
  state = {
    path: ''
  }
  render(){
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
                        <Tree></Tree>
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
    // return  <Query query={queryFiles} variables={this.state}>
    //           {
    //             ({loading, error, data, refetch, client}) => {
    //               if(loading) return <p>loading</p>
    //               if(error) return <p>error</p>
    //               return <div class="part sidebar">
    //                       <div class="sidebar-title">
    //                         <div class="title-label">
    //                           <span>资源管理器</span>
    //                         </div>
    //                         <div class="title-actions"></div>
    //                       </div>
    //                       <div class="sidebar-content">
    //                         <div class="section open-file">
    //                           <div class="header expand">
    //                             <i class="expand-status iconfont icon-expand"></i>
    //                             <span>打开的编辑器</span>
    //                           </div>
    //                           <div class="content hide">
    //                               <ul>
    //                                 <li class="selected"><span>index.html</span></li>
    //                                 <li><span>index.css</span></li>
    //                               </ul>
    //                           </div>
    //                         </div>
    //                         <div class="section file-tree">
    //                           <div class="header expand">
    //                             <i class="expand-status iconfont icon-expand"></i>
    //                             <span>CODE</span>
    //                           </div>
    //                           <div class="content">
    //                             <ul>
    //                               {
    //                                 data.files.map((file, index) =>  <li key={file.path} onClick={this.treeItemClickHander.bind(this, file, {refetch, client})}>
    //                                   <div class="wholerow">&nbsp;</div>
    //                                   {file.isDirectory === true ? <i class="expand-status iconfont icon-expand"></i> : ''}
    //                                   {file.isDirectory === false ? <i class="file-icon iconfont icon-file-icon"></i> : ''}
    //                                   <span>{file.name}</span>
    //                                   {file.children !== undefined ? 
    //                                     <ul>
    //                                       {
    //                                         file.children.map((subFile, index) => <li></li>)
    //                                       }
    //                                     </ul>
    //                                     :
    //                                     ''
    //                                   }
    //                                 </li>)
    //                               }
    //                             </ul>
    //                           </div>
    //                         </div>
    //                         <div class="section out-line">
    //                           <div class="header expand">
    //                             <i class="expand-status iconfont icon-expand"></i>
    //                             <span>大纲</span>
    //                           </div>
    //                           <div class="content hide"></div>
    //                         </div>
    //                       </div>
    //                     </div>
    //             }
    //           }
    //         </Query>
   
  }
}