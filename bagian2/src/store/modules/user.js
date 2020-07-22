import axios from '@/plugins/axios/axios-user';
import router from '@/router/index';

const state = {
	userId: null,
	register: false,
};

const mutations = {
	// Store user state
	storeUser(state, userId) {
		state.userId = userId;
	},
};

const actions = {
	// Register user
	register({ commit }, dataRegister) {
		axios
			.post('/register', dataRegister)
			.then(response => {
				commit('storeUser', response.data.id);

				// Change route to signin
				router.replace('/login');
			})
			.catch(error => {
				console.log(error);
			});
	},

	// Login user
	login({ commit }, dataLogin) {
		axios
			.get('login')
			.then(response => {
				// Init data response and user object
				console.log(response);
				const dataResponse = response.data;
				const user = {
					email: '',
					password: '',
				};

				// Loop for in data response
				// Check the email and password is exist
				for (let key in dataResponse) {
					if (dataResponse[key].email === dataLogin.email && dataResponse[key].password === dataLogin.password) {
						user.email = dataResponse[key].email;
						user.password = dataResponse[key].password;
					}
				}

				// Call storeUser mutations
				commit('storeUser', user);

				// Change route to home
				router.replace('/dashboard');
			})
			.catch(error => console.log(error));
	},
};

const getters = {
	// Get user data
	user(state) {
		return state.userId;
	},
};

export default {
	state,
	mutations,
	actions,
	getters,
};
