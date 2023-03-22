import { createRouter, createWebHashHistory } from 'vue-router';
import TheHome from './components/TheHome.vue';
import TheRegistration from './components/TheRegistration.vue';
import TheLogin from './components/TheLogin.vue';
import UserDash from './components/UserDash.vue';

const router=createRouter({
    history:createWebHashHistory(),
    routes:[
        {path:"/",redirect:'/home'},

        {path:"/home",component:TheHome},

        {path:"/registration",component:TheRegistration},
        {path:"/login",component:TheLogin},//burası muhtemelen silinicek login zaten home menüsüne dahil edilmiş.

        {path:"/user",component:UserDash},
    ]
})

export default router;