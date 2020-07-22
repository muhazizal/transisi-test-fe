import axios from '@/plugins/axios/axios-user';
import router from '@/router/index';

const state = {
	userId: null,
	dataLogin: {
		email: null,
		password: null,
	},
	listUser: [],
	newUsers: [],
	userProfile: [],
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

	// Store list user
	storeListUser(state, listUser) {
		state.listUser = listUser;
	},

	// Store new users
	storeNewUser(state, newUser) {
		state.newUsers = newUser;
	},

	// Store user profile
	storeUserProfile(state, userProfile) {
		state.userProfile = userProfile;
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
				router.replace('/users');
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

	// Get user by id
	getUserById({ commit }, id) {
		axios
			.get(`/users/${id}`)
			.then(response => {
				commit('storeUserProfile', response.data.data);
			})
			.catch(error => console.log(error));
	},

	// Create new user
	createNewUser({ commit, state }, dataUser) {
		axios
			.post('/users', dataUser)
			.then(response => {
				commit('storeNewUser', response.data);
				console.log(state.newUsers);
				alert('Success to add new user');
			})
			.catch(() => {
				alert('Failed to add new user');
			});
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

	// Get user by id
	userProfile(state) {
		return state.userProfile;
	},

	// Get new user data
	newUsers(state) {
		return state.newUsers;
	},
};

export default {
	state,
	mutations,
	actions,
	getters,
};
