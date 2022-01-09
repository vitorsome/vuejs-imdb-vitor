import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/home/Home.vue';
import Experience from '../components/experience/Experience.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  { path: '', component: Home },
  { path: '/experience', component: Experience }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
