import Create from './components/Create.vue';
import Edit from './components/Edit.vue';
import Index from './components/Index.vue';
import Login from './components/Login.vue'

const routes = [
    {
      name: 'Create',
      path: '/create',
      component: Create,
      meta: { requireAuth: true, grantAll: false, grants:['ADM']}
    },
    {
      name: 'Edit',
      path: '/edit/:id',
      component: Edit,
      meta: { requireAuth: true, grantAll: false, grants:['ADM']}
    },
    {
      name: 'Index',
      path: '/index',
      component: Index,
      meta: { requireAuth: true, grantAll: false, grants:['ADM','USER']}
    },
    {
      name: 'Login',
      path: '/login',
      component: Login
    }
    
  ];

  export default routes;