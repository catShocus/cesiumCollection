import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('../components/PublicMenu.vue')
        }, 
        {
            path: '/node',
            name: 'node',
            component: () => import('../views/NodeAnimationView.vue')
        },
        {
            path:'/coordinate',
            name:'coordinate',
            component:() => import('../views/ConvertCoordinateView.vue')
        },
        {
            path:'/arrow',
            name:'arrow',
            component:() => import('../views/DynamicArrowView.vue')
        },
        {
            path:'/geojson',
            name:'geojson',
            component:() => import('../views/LoadGeojsonView.vue')
        }
    ]
})

export default router