<template>
	<v-container class="login d-flex flex-column">
		<v-row>
			<!-- Left column -->
			<v-col cols="7" class="d-none d-lg-block ma-auto">
				<v-img
					src="@/assets/login.svg"
					lazy-src="@/assets/login.svg"
					alt="Sign In illustration"
					max-width="500"
					max-height="350"
					class="mx-auto"
				></v-img>
				<p class="mt-5" id="source">
					Illustration by:
					<a class="font-italic" href="https://undraw.co/" target="_blank">Undraw.co</a>
				</p>
			</v-col>

			<!-- Right Column -->
			<v-col xs="12" sm="8" md="6" lg="5" xl="5" class="d-block ma-auto">
				<h2 class="login__header">Sign In.</h2>
				<p class="login__subheader grey--text mb-7">Login with your data from registration.</p>

				<!-- Form login -->
				<form>
					<!-- Email field -->
					<v-text-field
						id="email"
						v-model="email"
						:error-messages="emailErrors"
						label="E-mail"
						required
						outlined
						@blur="$v.email.$touch()"
					></v-text-field>

					<!-- Password field -->
					<v-text-field
						id="password"
						v-model="password"
						:error-messages="passwordErrors"
						:append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
						:type="show ? 'text' : 'password'"
						label="Password"
						outlined
						@blur="$v.password.$touch()"
						@click:append="show = !show"
					></v-text-field>

					<!-- Button Submit -->
					<v-btn class="mt-3 primary login__submit" :disabled="$v.$invalid" large @click="login">Sign In</v-btn>

					<!-- Sign in and forgot password  text link -->
					<div class="text-center mt-5 login__sufp">
						<p class="mb-3">
							Don't have an account?
							<router-link :to="{ name: 'Register' }">Register</router-link>
						</p>
					</div>
				</form>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import { validationMixin } from 'vuelidate';
import { required, email } from 'vuelidate/lib/validators';

export default {
	name: 'Login',

	mixins: [validationMixin],

	validations: {
		email: { required, email },
		password: {
			required,
		},
	},

	data: () => ({
		email: '',
		password: '',
		show: false,
	}),

	computed: {
		emailErrors() {
			const errors = [];
			if (!this.$v.email.$dirty) return errors;
			!this.$v.email.email && errors.push('E-mail must be valid.');
			!this.$v.email.required && errors.push('E-mail is required.');
			return errors;
		},
		passwordErrors() {
			const errors = [];
			if (!this.$v.password.$dirty) return errors;
			!this.$v.password.required && errors.push('Password is required');
			return errors;
		},
	},

	methods: {
		// Login user
		login() {
			this.$v.$touch();

			const isValid = this.$v.$touch;

			if (isValid) {
				const dataLogin = {
					email: this.email,
					password: this.password,
				};

				// Call actions login from store user actions
				this.$store.dispatch('login', dataLogin);
			}
		},
	},
};
</script>

<style lang="scss" scoped>
.login {
	height: 92.5vh;

	#source {
		font-size: 14px;
	}

	a {
		text-decoration: none;

		&:hover {
			text-decoration: underline;
		}
	}

	&__submit {
		width: 50%;
		display: block;
		margin: 0 auto;
	}

	&__sufp {
		font-size: 14px;
	}
}
</style>
