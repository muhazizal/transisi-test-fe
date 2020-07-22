import axios from '@/plugins/axios/axios-user';
import router from '@/router/index';

// User state
const state = {
	userId: null,
	dataLogin: {
		email: null,
		password: null,
	},
	listUser: [],
	newUsers: [],
	userProfile: [],
	deleted: false,
	edited: false,
};

// User mutations
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

	// Is deleted?
	isDeleted(state) {
		state.isDeleted = true;
	},

	// Is Edited?
	isEdited(state) {
		state.isEdited = true;
	},
};

// User actions
const actions = {
	// Register user
	register({ commit }, dataRegister) {
		axios
			.post('/register', dataRegister)
			.then(response => {
				console.log(response);

				alert('Register Success');

				// Call storeUser mutations
				commit('storeUserId', response.data.id);

				// Change route to login
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
			.then(response => {
				console.log(response);

				alert('Login Success');

				// Call isLogin mutations
				commit('isLogin', dataLogin);

				// Change route to users
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
				console.log(response);

				// Call storeListUser mutations
				commit('storeListUser', response.data);
			})
			.catch(error => console.log(error));
	},

	// Get user by id
	getUserById({ commit }, id) {
		axios
			.get(`/users/${id}`)
			.then(response => {
				console.log(response);

				// Call storeUserProfile mutations
				commit('storeUserProfile', response.data.data);
			})
			.catch(error => console.log(error));
	},

	// Create new user
	createNewUser({ commit, state }, dataUser) {
		axios
			.post('/users', dataUser)
			.then(response => {
				console.log(response);

				// Call storeNewUser mutations
				commit('storeNewUser', response.data);

				console.log(state.newUsers);

				alert('Success to add new user');
			})
			.catch(() => {
				alert('Failed to add new user');
			});
	},

	// Edit user by id
	editUserById({ commit }, dataUser) {
		axios
			.put(`/users/${dataUser.id}`)
			.then(response => {
				console.log(response);

				// Call isEdited? mutations
				commit('isEdited');

				alert('User has been edited');

				// Change route to users
				router.replace('/users');
			})
			.catch(() => alert('User cannot be edited'));
	},

	// Delete user by id
	deleteUserById({ commit }, id) {
		axios
			.delete(`/users/${id}`)
			.then(response => {
				console.log(response);

				// Call isDeleted? mutations
				commit('isDeleted');

				alert('User has been deleted');

				// Change route to users
				router.replace('/users');
			})
			.catch(() => alert('User cannot be deleted'));
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
