import axios from '@/plugins/axios/axios-user';
import router from '@/router/index';

const state = {
	userId: null,
	dataLogin: {
		email: null,
		password: null,
	},
	listUser: [],
};

const mutations = {
	// Store user state
	storeUserId(state, userId) {
		state.userId = userId;
	},

	// Store data login
	isLogin(state, dataLogin) {
		state.dataLogin.email = dataLogin.email;
		state.dataLogin.password = dataLogin.password;
	},

	storeListUser(state, listUser) {
		state.listUser = listUser;
	},
};

const actions = {
	// Register user
	register({ commit }, dataRegister) {
		axios
			.post('/register', dataRegister)
			.then(response => {
				alert('Register Success');

				// Call storeUser mutations
				commit('storeUserId', response.data.id);

				// Change route to signin
				router.replace('/login');
			})
			.catch(() => {
				alert('Register Failed');
			});
	},

	// Login user
	login({ commit }, dataLogin) {
		axios
			.post('/login', dataLogin)
			.then(() => {
				alert('Login Success');

				// Call isLogin mutations
				commit('isLogin', dataLogin);

				// Change route to home
				router.replace('/dashboard');
			})
			.catch(() => {
				alert('Login Failed');
			});
	},

	// Get list user
	getListUser({ commit }) {
		axios
			.get('/users?page=1')
			.then(response => {
				commit('storeListUser', response.data);
			})
			.catch(error => console.log(error));
	},
};

const getters = {
	// Get user id
	user(state) {
		return state.userId;
	},

	// Get list user
	listUser(state) {
		return state.listUser;
	},
};

export default {
	state,
	mutations,
	actions,
	getters,
};
