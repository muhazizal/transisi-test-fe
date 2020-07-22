import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
	{
		path: '/users',
		name: 'Users',
		component: () => import('@/views/Users.vue'),
	},
	{
		path: '/users/:id',
		name: 'UserProfile',
		component: () => import('@/components/UserProfile.vue'),
	},
	{
		path: '/login',
		name: 'Login',
		component: () => import('@/views/Login.vue'),
	},
	{
		path: '/register',
		name: 'Register',
		component: () => import('@/views/Register.vue'),
	},
	{
		path: '*',
		redirect: '/login',
	},
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
});

export default router;
