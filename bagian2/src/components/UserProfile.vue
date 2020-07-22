<template>
	<div id="users">
		<h2 class="title text-center text-h5 font-weight-bold mt-5">User Profile</h2>

		<!-- List user (old) -->
		<v-container>
			<v-layout row wrap>
				<v-flex xs12>
					<v-card class="text-center ma-3 mx-auto" width="350px">
						<v-responsive class="pt-5">
							<v-avatar size="100" class="grey lighten-2">
								<img
									:src="userProfile.avatar"
									:alt="`${userProfile.first_name} avatar`"
									lazy-src="@/assets/dummy-profile.jpg"
								/>
							</v-avatar>
						</v-responsive>
						<v-card-text>
							<div class="subheading  black--text font-bold">
								{{ userProfile.first_name }} {{ userProfile.last_name }}
							</div>
							<div class="grey--text">{{ userProfile.email }}</div>
						</v-card-text>
						<v-card-actions>
							<EditUser />
							<v-btn color="error" class="mx-auto mb-5" width="120px" @click="deleteUser">Delete User</v-btn>
						</v-card-actions>
					</v-card>
				</v-flex>
			</v-layout>
		</v-container>
	</div>
</template>

<script>
import EditUser from './EditUser.vue';

export default {
	name: 'userProfile',

	components: {
		EditUser,
	},

	computed: {
		userProfile() {
			return this.$store.getters.userProfile;
		},
	},

	created() {
		this.$store.dispatch('getUserById', this.$route.params.id);
	},

	methods: {
		deleteUser() {
			this.$store.dispatch('deleteUserById', this.$route.params.id);
		},
	},
};
</script>

<style lang="scss" scoped></style>
