import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from './views/Login.vue'
import Signup from './views/Signup.vue'
import Home from './views/Home.vue'
import Article from './views/Article.vue'
import CreateArticle from './views/CreateArticle.vue'
Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/login',
            component: Login
         },
        {
            path: '/signup',
            component: Signup
        },
        {
            path: '/',
            component: Home
        },
        {
            path: '/articles/create',
            component: CreateArticle
        }, 
        {
            path: '/article/:id',
            component: Article
        }
    ]
})

export default router;