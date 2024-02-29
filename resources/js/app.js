import './bootstrap';
import { createApp } from 'vue';
import AppComponent from './components/AppComponent.vue';
import DashboardComponent from './components/dashboard/DashboardComponent.vue';
import FooterContent from './footer/FooterContent.vue';
import AnimeIndex from './components/anime/AnimeIndex.vue';
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'dashboard-component',
    component: DashboardComponent
  },
  {
    path: '/anime',
    name: 'anime-index',
    component: AnimeIndex
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

const app = createApp(AppComponent);

app.use(router);

app.component('dashboard-component', DashboardComponent)
app.component('anime-index', AnimeIndex)
app.component('footer-content', FooterContent)

app.mount('#app');