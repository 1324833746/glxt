import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/login/login.vue'
import Home from '../components/home/home.vue'
import Notice from '@/components/notice/notice.vue'
import Information from '@/components/information/information.vue'
import Books from '@/components/books/books.vue'
import Mybooks from '@/components/mybooks/mybooks.vue'
import Events from '@/components/events/events.vue'
import Myevents from '@/components/myevents/myevents.vue'
import Suggestion from '@/components/suggestion/suggestion.vue'

Vue.use(Router)

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
          name:'notice',
          path:'notice',
          component: Notice,
        },
        {
          name:'information',
          path:'information',
          component: Information,
        },
        {
          name:'books',
          path:'books',
          component: Books,
        },
        {
          name:'mybooks',
          path:'mybooks',
          component: Mybooks,
        },
        {
          name:'events',
          path:'events',
          component: Events,
        },
        {
          name:'myevents',
          path:'myevents',
          component: Myevents,
        },
        {
          name:'suggestion',
          path:'suggestion',
          component: Suggestion,
        },

    ]
    }
  ]
})
