// 单页面应用程序中路由发生变化页面不能进行刷新显示对应视图的的内容
//手写路由相关插件功能
let Vue;

class VueRouter {
    constructor(options) {
        this.$options = options;
        // 创建一个保存url变量
        // current必须是一个响应式的数据
        // 好处是未来router-view使用current时就产生依赖关系
        // current发生变化，router-view的render会重新执行
        const initial = window.location.hash.slice(1) || "/";

        Vue.util.defineReactive(this, "current", initial)

        window.addEventListener("hashchange", this.handleHashChange.bind(this))
        window.addEventListener("load", this.handleHashChange.bind(this))
    }
    handleHashChange() {
        this.current = window.location.hash.slice(1)
    }

}

VueRouter.install = function (_Vue) {
    Vue = _Vue;

    //1.挂载$router到Vue的原型上，使用全局混入
    Vue.mixin({
        beforeCreate() {
            //只有根组件拥有router选项
            //如果VueRouter的实例上有router选项，则将其赋值到vue的原型上
            if (this.$options.router) {
                //vm.$router
                Vue.prototype.$router = this.$options.router
            }
        }
    })

    //2.实现两个全局组件router-link router-view
    Vue.component("router-link", {
        props: {
            to: {
                type: String,
                required: true
            }
        },
        render(h) {
            return h("a", { attrs: { href: "#" + this.to } }, this.$slots.default)
        }
    })

    Vue.component("router-view", {
        render(h) {
            //1.获取路由器的实例
            let component = null;
            const route = this.$router.$options.routes.find(route => route.path === this.$router.current)
            if (route) {
                component = route.component
            }
            return h(component)
        }
    })
}

export default VueRouter;
