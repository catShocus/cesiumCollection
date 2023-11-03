import { createRouter,createWebHistory } from "vue-router";

const router = createRouter({
    history:createWebHistory(),
    routes:[
        {
            path:'/',
            name:'home',
            component:() => import('../components/OpenMap.vue')
        },{
            path:'/node',
            name:'node',
            component:() => import('../views/NodeAnimationView.vue')        
        }
    ]
})

export default router