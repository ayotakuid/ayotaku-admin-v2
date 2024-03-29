import './bootstrap';
import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import routes from './routes';
import IndexComponent from './component/IndexComponent.vue';

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const isLoggedIn = () => {
  const stateLogin = localStorage.getItem('stateLogin');
  if(stateLogin) {
    return true
  }

  return false
}

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth && !isLoggedIn()) {
    next('/login')
  } else {
    next()
  }
})

const app = createApp(IndexComponent);
app.use(router);

app.mount('#app');