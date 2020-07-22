import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
	{
		path: '/dashboard',
		name: 'Dashboard',
		component: () => import('@/views/Dashboard.vue'),
	},
	{
		path: '/login',
		name: 'Login',
		component: () => import('@/components/Login.vue'),
	},
	{
		path: '/register',
		name: 'Register',
		component: () => import('@/components/Register.vue'),
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
