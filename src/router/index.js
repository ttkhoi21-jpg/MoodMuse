import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {path: "/", redirect : "/home"},
    {path: "/home", component: () => import("../views/Home.vue")},
    {path: "/signin", component: () => import("../views/Signin.vue")},
    {path: "/login", component: () => import("../views/Login.vue")},
    {path: "/feed", component: () => import("../views/Feed.vue"),
       meta: {
        requiresAuth: true,
      }
    },
    {path: "/search", component: () => import("../views/Search.vue"),
      meta: {
        requiresAuth: true,
      }
    },
    {path: "/rate", component: () => import("../views/Rate.vue"),
      meta: {
        requiresAuth: true,
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const auth = getAuth();
  if (to.matched.some(record => record.meta.requiresAuth)) {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        next();
      } else {
        alert("You are not logged in");
        next("/home");
      }
    });
  }
  else
    next();
});

export default router
