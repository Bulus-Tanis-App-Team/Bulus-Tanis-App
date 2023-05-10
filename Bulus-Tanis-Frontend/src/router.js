import { createRouter, createWebHashHistory } from 'vue-router';
import TheHome from './components/TheHome.vue';
import TheRegistration from './components/TheRegistration.vue';
import UserDash from './components/UserDash.vue';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', redirect: '/home' },
    { path: '/home', component: TheHome },
    { path: '/registration', component: TheRegistration },
    { path: '/user', component: UserDash, meta: { requiresAuth: true } }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const isAuthenticated = !!localStorage.getItem('token'); // Örnek olarak, token'ı localStorage'de kontrol ediyoruz.

    if (!isAuthenticated) {
      // Kimlik doğrulama başarısızsa, kullanıcıyı giriş yapma sayfasına yönlendiriyoruz.
      console.log('Kimlik doğrulama başarısız!');
      next('/home');
    }else{
        next(); // Kimlik doğrulama başarılıysa veya sayfa kimlik doğrulama gerektirmiyorsa, sayfaya geçişe izin verilir.
    }
  }else{
    next(); // Kimlik doğrulama başarılıysa veya sayfa kimlik doğrulama gerektirmiyorsa, sayfaya geçişe izin verilir.
  }
});

export default router;
