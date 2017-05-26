import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
export default new Vuex.Store({
    state : {  
        //get by store.state.x
        //mapState
        x : 1,
        currentShowFile : 'test/test1/test3'

    },
    mutations : {
        //call by store.commit('increment', param);
        //or call by store.commit({
        //      type:'increment',
        //      ...
        //})
        //mutations must be synchronous
        //map to component mapMutations
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
