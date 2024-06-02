import DashboardComponent from './component/DashboardComponent.vue';
import AnimeIndexComponent from './component/animes/AnimeIndexComponent.vue';
import CreateAnimeComponent from './component/animes/CreateAnimeComponent.vue';
import RecoveryAnimeComponent from './component/animes/RecoveryAnimeComponent.vue';

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
  },
  {
    path: '/anime/create',
    name: 'create-anime-component',
    component: CreateAnimeComponent,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/anime/recovery-anime',
    name: 'recovery-anime-component',
    component: RecoveryAnimeComponent,
    meta: {
      requiresAuth: true
    }
  }
];

export default routes;