import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/login/login.vue'
import Home from '../components/home/home.vue'
import Information from '@/components/information/information.vue'
import bmhd from '@/components/bmhd/bmhd.vue'
import jsjl from '@/components/jsjl/jsjl.vue'
import wdhd from '@/components/wdhd/wdhd.vue'
import record from '@/components/record/record.vue'
import Admin from '@/components/admin/admin.vue'
import Hygl from '@/components/hygl/hygl.vue'
import tjhd from '@/components/tjhd/tjhd.vue'
import hdgl from '@/components/hdgl/hdgl.vue'
import jsgl from '@/components/jsgl/jsgl.vue'
import jpgl from '@/components/jpgl/jpgl.vue'

Vue.use(Router)
const originalPush = Router.prototype.push;
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err);
};
export default new Router({
  routes: [
    {
      name:'login',
      path: '/login',
      component:Login
    },
    {
      name:'home',
      path: '/',
      component:Home,
      children:[
        {
          name:'bmhd',
          path:'bmhd',
          component: bmhd,
        },
        {
          name:'information',
          path:'information',
          component: Information,
        },
        {
          name:'jsjl',
          path:'jsjl',
          component: jsjl,
        },
        {
          name:'wdhd',
          path:'wdhd',
          component: wdhd,
        },
        {
          name:'record',
          path:'record',
          component: record,
        }

    ]
    },
    {
      name:'admin',
      path: '/admin',
      component:Admin,
      children:[
        {
          name:'Hygl',
          path:'hygl',
          component: Hygl,
        },
        {
          name:'tjhd',
          path:'tjhd',
          component: tjhd,
        },
        {
          name:'hdgl',
          path:'hdgl',
          component: hdgl,
        },
        {
          name:'jsgl',
          path:'jsgl',
          component: jsgl,
        },
        {
          name:'jpgl',
          path:'jpgl',
          component: jpgl,
        }

    ]
    },
  ]
})
