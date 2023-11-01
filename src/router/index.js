import { createRouter,createWebHistory } from "vue-router";

const router = createRouter({
    history:createWebHistory(),
    routes:[
        {
            path:'/',
            name:'home',
            component:() => import('../components/OpenMap.vue')
        },{
            path:'/test',
            name:'test',
            component:() => import('../views/TestViewOne.vue')
        }
    ]
})

export default router