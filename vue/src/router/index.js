import {
  createRouter,
  createWebHistory
} from "vue-router";
import Login from '../views/Login.vue'
import Dashboard from '../views/Dashboard.vue'
import Register from '../views/Register.vue'
import Default from '../components/Default.vue'
import Surveys from '../views/Surveys.vue'
import store from "../store";
const routes = [{
    path: '/',
    redirect: '/dashboard',
    name: 'Dashboard',
    component: Default,
    meta: {
      requiresAuth: true
    },
    children: [{
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard,
      },
      {
        path: '/surveys',
        name: 'Surveys',
        component: Surveys
      }
    ]

  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  }

];

const router = createRouter({
  history: createWebHistory(),
  routes
})
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !store.state.user.token) {
    next({
      name: "Login"
    })
  } else if (
    store.state.user.token && (to.name === 'Login' || to.name === 'Register')) {
    next({
      name: 'Dashboard'
    });
  }
})
export default router;
