import { createRouter, createWebHashHistory, RouteRecordRaw,createWebHistory, useRoute } from 'vue-router'
import login from '../views/login/login.vue'
import notfount from '../views/notfount/ontfount.vue'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect:"/login",
    component: login
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    meta:{
      title:"登录后台"
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/login/login.vue')
  },
  {
    // 通过useRouter的 params方式传参记得要在路由参数的最后加上一个/‘斜杠’才可以使用子路由并且传参的时候要使用username这个key才能匹配上value
    path: '/home/:username/',
    name: 'home',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    children: [
      {
        // 当 /user/:id/profile 匹配成功
        // UserProfile 将被渲染到 User 的 <router-view> 内部
        path: 'viewhome',
        name:"viewhome",
        component:()=>import("../views/view_home/viewhome.vue"),
      },
      {
        // 当 /user/:id/profile 匹配成功
        // UserProfile 将被渲染到 User 的 <router-view> 内部
        path: 'salepanel',
        name:"salepanel",
        component:()=>import("../views/salePanel/salePanel.vue"),
      },
      // {
      //   // 当 /user/:id/posts 匹配成功
      //   // UserPosts 将被渲染到 User 的 <router-view> 内部
      //   path: 'posts',
      //   component: UserPosts,
      // },
      {
        // 当 /user/:id/profile 匹配成功
        // UserProfile 将被渲染到 User 的 <router-view> 内部
        path: 'store',
        name:"store",
        component:()=>import("../views/store/store.vue"),
      }
    ],
    meta: { 
      title : "办公台",
      isto: false
    },
    // 独享路由守卫
    beforeEnter :(to, from)=>{
      const token = localStorage.getItem('token');
      if(token){
        // 存在token就允许访问
        return true
      }else{
        // 否则就拒绝访问
        alert("非法的访问")
        router.push("/login")
        return false
      }
    },
    component: () => import(/* webpackChunkName: "home" */ '../views/home/index.vue')
    
  },
  {
    path:'/:pathMatch(.*)',
    name:"notfount",
    component:notfount
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})
interface Routerindex{
  path:string
  name:string
}
router.beforeEach((to,from,next)=>{
  // ts不能推断的值类型要用断言
  // 请善用断言
  document.title = to.meta.title  as string;
  next();
})

export default router
