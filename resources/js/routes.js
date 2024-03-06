import DashboardComponent from './component/DashboardComponent.vue';
import AnimeIndexComponent from './component/animes/AnimeIndexComponent.vue';

const routes = [
  {
    path: '/:pathMatch(.*)',
    redirect: '/'
  },
  {
    path: '/',
    name: 'dashboard-component',
    component: DashboardComponent,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/anime',
    name: 'index-anime-component',
    component: AnimeIndexComponent,
    meta: {
      requiresAuth: true
    }
  }
];

export default routes;