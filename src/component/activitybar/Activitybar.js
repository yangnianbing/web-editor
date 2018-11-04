import React, {Component} from 'react';
import "./Activitybar.css"

class Activitybar extends Component{
  render(){
    return <div class="part activitybar">
            <ul class="activity-menu-container">
              <li class="activity-menu-item">
                <i class="iconfont icon-file"></i>
              </li>
              <li class="activity-menu-item">
                <i class="iconfont icon-sousuo"></i>
              </li>
              <li class="activity-menu-item">
                <i class="iconfont icon-git-branch"></i>
              </li>
              <li class="activity-menu-item">
                <i class="iconfont icon-debug"></i>
              </li>
              <li class="activity-menu-item">
                <i class="iconfont icon-extension"></i>
              </li>
              <li class="activity-menu-item">
                <i class="iconfont icon-folder"></i>
              </li>
            </ul>
            <div class="activitybar-config"></div>
          </div>
  }
}

export default Activitybar;