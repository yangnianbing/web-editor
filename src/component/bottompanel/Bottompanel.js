import React, {Component} from 'react'
import './Bottompanel.css'

import TerminalInstance from './Terminal/Terminal'


export default class Bottompanel extends Component{
  render(){
    return <div class="part panel bottom">
            <div class="tabs">
              <ul class="tab-list">
                <li class="tab search selected"><span class="label">搜索</span></li>
                <li class="tab terminal"><span class="label">终端</span></li>
              </ul>
              <div class="tab-actions">

              </div>
            </div>
            <div class="content">
              <TerminalInstance></TerminalInstance>
            </div>
          </div>
  }
}