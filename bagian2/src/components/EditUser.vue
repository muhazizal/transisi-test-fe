<template>
	<v-dialog max-width="500px" transition="dialog-transition" v-model="dialog">
		<template v-slot:activator="{ on, attrs }">
			<v-btn color="primary" class="mx-auto mb-5" width="120px" v-bind="attrs" v-on="on">Edit Profile</v-btn>
		</template>

		<!-- Edit user profile -->
		<v-card>
			<v-card-title>Edit Profile</v-card-title>
			<v-card-text>
				<!-- Form -->
				<form>
					<!-- Name field -->
					<v-text-field
						id="name"
						v-model="name"
						:error-messages="nameErrors"
						label="Name"
						outlined
						@blur="$v.name.$touch()"
					></v-text-field>

					<!-- Job field -->
					<v-text-field
						id="job"
						v-model="job"
						:error-messages="jobErrors"
						label="Job"
						outlined
						@blur="$v.job.$touch()"
					></v-text-field>

					<v-flex row justify-center class="mt-3">
						<v-btn depressed class="success" @click="addUser" :disabled="$v.$invalid">
							<span>Edit Profile</span>
						</v-btn>
					</v-flex>
				</form>
			</v-card-text>
		</v-card>
	</v-dialog>
</template>

<script>
import { validationMixin } from 'vuelidate';
import { required } from 'vuelidate/lib/validators';

export default {
	name: 'addNewUser',
	mixins: [validationMixin],

	validations: {
		name: { required },
		job: { required },
	},

	data() {
		return {
			name: '',
			job: '',
			dialog: false,
		};
	},

	computed: {
		nameErrors() {
			const errors = [];
			if (!this.$v.name.$dirty) return errors;
			!this.$v.name.required && errors.push('Name required.');
			return errors;
		},
		jobErrors() {
			const errors = [];
			if (!this.$v.job.$dirty) return errors;
			!this.$v.job.required && errors.push('Job required');
			return errors;
		},
	},

	methods: {
		// Add user
		addUser() {
			this.$v.$touch();

			const isValid = this.$v.$touch;

			if (isValid) {
				const dataUser = {
					name: this.name,
					job: this.job,
					id: this.$route.params.id,
				};

				// Call actions login from store user
				this.$store.dispatch('editUserById', dataUser);

				this.dialog = false;
			}
		},
	},
};
</script>
