import Vue from 'vue';
import Vuex from 'vuex';
import {Action} from '../comet/Message'
import {send} from '../comet/comet'

Vue.use(Vuex);
export default new Vuex.Store({
    state : {  
        //get by store.state.x
        //mapState
        $eventBus : new Vue(),
        x : 1,
        currentShowFile :{},
        currentSelectFile : {},
        openFiles : [],
        files : {'test': {
            name : 'test',
            isFolder : true,
            children : [
                {
                    name : 'test1',
                    isFolder : true,
                    children : [
                        {
                            name : 'test1.js',
                            isFolder : false,
                            content : "content1"
                        }
                    ]
                },{
                    name : 'test2',
                    isFolder : true,
                    children : [
                        {
                            name : 'test2.j',
                            isFolder : false,
                            content : "content2"
                        }
                    ]
                },{
                    name : 'test3',
                    isFolder : true,
                    children : [
                        {
                            name : 'test3.js',
                            isFolder : false,
                            content : "content3"
                        }
                    ]
                }
            ]
        }},
        menuItems : [{
            name : 'File',
            items : [
                {
                    name : 'New File',
                    commander : 'createFile'
                }, {
                    name : 'New Folder',
                    commander : 'createFile'
                },{
                    name : 'New Component',
                    commander : 'createFile'
                },{
                    name : 'Save As',
                    commander : 'createFile'
                }
            ]
        },{
            name : 'Edit'
        }]
    },
    mutations : {
        //call by store.commit('increment', param);
        //or call by store.commit({
        //      type:'increment',
        //      ...
        //})
        //mutations must be synchronous
        //map to component mapMutations
        setCurrentShowFile(state, param){
            state.currentShowFile = param.currentShowFile;
            var areadyOpen = false;
            state.openFiles.every(function(file){
                if(file.path == param.currentShowFile.path){
                    areadyOpen = true;
                    return false;
                }
                return true;
            })
            !areadyOpen && state.openFiles.push(param.currentShowFile);
        },

        setCurrentSelectFile(state, param){
            state.currentSelectFile = param.currentSelectFile;
        },

    },
    actions : {
        //call action by store.dispatch('increment')
        //like actions but some different
        // commit by mutation
        //it is asynchronous
        incrment(context){
            //can do some async operations
            context.commit('increment')
        },

        //增删查改移动文件
        crudmFile(context, param){
            console.log(param)
            switch(param.action){
                case Action.FILE_ADD:
                    send(param.model).then(() => {
                        
                    });
                case Action.FILE_DELETE:
                case Action.FILE_MODIFY:
                case Action.FILE_RENAME:
                case Action.FILE_MOVE:
                    console.log(param.content);
            }
        }
    },
    getters : {
        //get by store.getters.x
        //mapGetters
        x : state => {
            return state.x;
        }
    }
})
