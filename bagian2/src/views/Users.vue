<template>
	<div id="dashboard">
		<h2 class="title text-center text-h5 font-weight-bold mt-5">List User</h2>
		<div class="text-center mt-5">
			<AddNewUser />
		</div>

		<!-- List user (old) -->
		<v-container>
			<v-layout row wrap>
				<v-flex xs12 sm6 md4 lg3 v-for="user in listUser" :key="user.id">
					<v-card class="text-center ma-3">
						<v-responsive class="pt-3">
							<!-- Users avatar -->
							<v-avatar size="100" class="grey lighten-2">
								<img :src="user.avatar" :alt="`${user.first_name} avatar`" lazy-src="@/assets/dummy-profile.jpg" />
							</v-avatar>
						</v-responsive>
						<v-card-text>
							<!-- Users name and email -->
							<div class="subheading black--text font-bold">{{ user.first_name }} {{ user.last_name }}</div>
							<div class="grey--text">{{ user.email }}</div>
						</v-card-text>
						<!-- Button show user profile -->
						<v-card-actions>
							<router-link :to="'/users/' + user.id" tag="li" class="mx-auto mb-3 show-profile"
								>Show Profile</router-link
							>
						</v-card-actions>
					</v-card>
				</v-flex>
			</v-layout>
		</v-container>
	</div>
</template>

<script>
import AddNewUser from '@/components/AddNewUser.vue';

export default {
	name: 'Users',

	components: {
		AddNewUser,
	},

	computed: {
		listUser() {
			// Call listUser from store user getters
			return this.$store.getters.listUser.data;
		},
	},

	created() {
		// Get list user from store user actions
		this.$store.dispatch('getListUser');
	},
};
</script>

<style lang="scss" scoped>
.show-profile {
	list-style-type: none;
	color: #2b81d6;

	&:hover {
		text-decoration: underline;
		cursor: pointer;
	}
}
</style>
