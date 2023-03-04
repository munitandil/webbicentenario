import Vue from 'vue'
import VuePaginate from 'vue-paginate'
Vue.use(VuePaginate)

const vuePaginate = {}

vuePaginate.install = function(Vue) {
    Vue.mixin({
        created() {
            if (this.paginate !== 'undefined' && this.paginate instanceof Array) {
                this.paginate = paginateDataGenerator(this.paginate)
            }
        },
        methods: {
            paginated(listName) {
                if (!this.paginate || !this.paginate[listName]) {
                    warn(`'${listName}' is not registered in 'paginate' array.`, this)
                    return
                }
                return this.paginate[listName].list
            }
        }
    })
    Vue.component('paginate', Paginate)
    Vue.component('paginate-links', PaginateLinks)
}

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(vuePaginate)
}

export default vuePaginate