import './bootstrap';
import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import Paginate from 'vuejs-paginate-next';
import FloatingVue from 'floating-vue';
import routes from './routes';
import IndexComponent from './component/IndexComponent.vue';
import 'datatables.net-bs5/css/dataTables.bootstrap5.min.css';
import 'datatables.net-fixedcolumns-dt';
import 'floating-vue/dist/style.css';

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
app.use(FloatingVue);
app.component(Paginate);

app.mount('#app');