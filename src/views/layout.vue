
<script>
var rowHeight = 10;
var num = window.innerHeight / rowHeight;
var testLayout = [
    {"x":0,"y":0,"w":10,"h":2.5,"i":"0", 'type':'component', 'content':'TopBar', 'd':false, 'r':false},
    {"x":0,"y":2.5,"w":10,"h":2.4,"i":"0", 'type':'component', 'content':'ToolBar','d':false,'r':false},
    {"x":0,"y":4.9,"w":2,"h":num-4.9,"i":"0", 'type':'component', 'content':'IdeLeftTree'},
    {"x":2,"y":4.9,"w":8,"h":num-4.9,"i":"0", 'type':'component', 'content':'IdeRightContent'}
];
import {GridLayout, GridItem} from 'vue-grid-layout'

import TopBar from '../components/topBar'
import ToolBar from '../components/toolBar'
import IdeLeftTree from '../components/ideLeftTree'
import IdeRightContent from '../components/ideRightContent'

import '../assets/css/index.css'

export default {
    data(){
        return {
            layout : testLayout
        }
    },
    components : {
        GridLayout,GridItem,TopBar, ToolBar,IdeLeftTree,IdeRightContent
    },
    render(createElement){
        return createElement('grid-layout', {
                props : {
                    layout : this.layout,
                    'col-num' : 10,
                    'row-height':rowHeight,
                    'is-draggable':true,
                    'is-resizable':true,
                    'vertical-compact':true,
                    'use-css-transforms':true,
                    margin : [0, 0]
                }
            },
            this.layout.map(item => 
                createElement('grid-item', {
                    props : {
                        x : item.x,
                        y : item.y,
                        w:item.w,
                        h:item.h,
                        i : item.i,
                        'is-draggable':item.d === false ? false : true,
                        'is-resizable':item.r === false ? false : true
                    }
                }, (function(){
                    if(item.type == 'component'){
                        return [createElement(item.content)]
                    }else if(item.type){
                        return [createElement('span', item.content)]
                    }
                })()
                )
            )
        )
    }
}

</script>

<style>
    .vue-grid-item .ide-left-tree{
        width: 100%;
    }

    .vue-grid-item .ide-right-content{
        width: 100%;
    }
</style>
