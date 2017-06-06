import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
export default new Vuex.Store({
    state : {  
        //get by store.state.x
        //mapState
        x : 1,
        currentShowFile :{},
        openFiles : [],
        files : {
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
        },
        menuItems : [{
            name : 'File',
            items : [
                {
                    name : 'New File'
                }, {
                    name : 'New Folder'
                },{
                    name : 'Save'
                }
            ]
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
        increment(state, param){
            state.x++;
        }
    },
    actions : {
        //call action by store.dispatch('increment')
        //like actions but some different
        // commit by mutation
        //it is asynchronous
        incrment(context){
            //can do some async operations
            context.commit('increment')
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
