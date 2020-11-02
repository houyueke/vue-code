
//实现vuex
let Vue;

class Store{
    constructor(options = {}){
        Vue.util.defineReactive(this,"state",options.state)

        this._mutations = options.mutations || {};

        this._actions = options.actions || {};

        this.commit = this.commit.bind(this)

        this.dispatch = this.dispatch.bind(this)
       
    }
    get state(){
        return this.state;
    }
    set state(v){
        console.log("please use stateReplace to change state!");
    }
    commit(type,payload){
        const entry = this._mutations[type]
        if(!entry){
            console.log("not exist ");
            return false
        }
        entry(this.state,payload)
    }

    dispatch(type,payload){
        const entry = this._actions[type]
        if(!entry){
            return false
        }
        entry(this,payload)
    }
}
function install (_Vue){
    Vue = _Vue;
    Vue.mixin({
        beforeCreate(){
            if(this.$options.store){
                Vue.prototype.$store = this.$options.store
            }
        }
    })
}

export default {Store,install}

