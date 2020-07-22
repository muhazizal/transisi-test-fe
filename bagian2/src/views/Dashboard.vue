<template>
	<div id="dashboard">
		<h1 class="title primary--text text-center text-h4 mt-5">List User</h1>

		<v-container class="my-5">
			<v-layout row wrap>
				<v-flex xs12 sm6 md4 lg3 v-for="user in listUser" :key="user.id">
					<v-card class="text-center ma-3">
						<v-responsive class="pt-3">
							<v-avatar size="100" class="grey lighten-2">
								<img :src="user.avatar" :alt="`${user.firstname} avatar`" />
							</v-avatar>
						</v-responsive>
						<v-card-text>
							<div class="subheading">{{ user.firstname }} {{ user.lastname }}</div>
							<div class="grey--text">{{ user.email }}</div>
						</v-card-text>
						<v-card-actions>
							<v-btn depressed class="grey--text"> </v-btn>
						</v-card-actions>
					</v-card>
				</v-flex>
			</v-layout>
		</v-container>
	</div>
</template>

<script>
export default {
	name: 'Dashboard',

	computed: {
		listUser() {
			const users = this.$store.getters.listUser.data;
			return users;
		},
	},

	created() {
		this.$store.dispatch('getListUser');
	},
};
</script>

<style lang="scss" scoped></style>
