<template>
	<v-container class="register d-flex flex-column">
		<v-row>
			<!-- Left column -->
			<v-col xs="12" sm="8" md="6" lg="5" xl="5" class="ma-auto d-block">
				<h2 class="register__header">Sign Up.</h2>
				<p class="register__subheader grey--text mb-7">Register your data before log in.</p>

				<!-- Form register -->
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
					<v-btn class="mt-3 primary register__submit" large :disabled="$v.$invalid" @click="register">submit</v-btn>

					<!-- Sign in text link -->
					<div class="text-center mt-5 register__sifp">
						<p class="mb-3">
							Already have an account?
							<router-link :to="{ name: 'Login' }">Login</router-link>
						</p>
					</div>
				</form>
			</v-col>

			<!-- Right Column -->
			<v-col cols="7" class="d-none d-lg-block ma-auto">
				<v-img
					src="@/assets/register.svg"
					lazy-src="@/assets/register.svg"
					alt="Signup illustration"
					max-width="500"
					max-height="350"
					class="mx-auto"
				></v-img>
				<p class="mt-5 text-right" id="source">
					Illustration by:
					<a class="font-italic" href="https://undraw.co/" target="_blank">Undraw.co</a>
				</p>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import { validationMixin } from 'vuelidate';
import { required, minLength, email } from 'vuelidate/lib/validators';

export default {
	name: 'Register',

	mixins: [validationMixin],

	validations: {
		email: { required, email },
		password: {
			required,
			minLength: minLength(8),
			alpha(password) {
				return /[a-z]/.test(password); // Checks for alphabet
			},
			numeric(password) {
				return /[0-9]/.test(password); // Checks for numeric
			},
			specialChar(password) {
				return /[!@#$%^&*]/.test(password); // Checks for special char
			},
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
			!this.$v.password.minLength && errors.push('Password must be at least 8 characters long.');
			!this.$v.password.required && errors.push('Password is required.');
			!this.$v.password.alpha && errors.push('Password must contain 1 alphabet character.');
			!this.$v.password.numeric && errors.push('Password must contain 1 numeric character.');
			!this.$v.password.specialChar && errors.push('Password must contain 1 special character.');
			return errors;
		},
	},

	methods: {
		// Register user
		register() {
			this.$v.$touch();

			const isValid = this.$v.$touch;

			if (isValid) {
				const dataRegister = {
					email: this.email,
					password: this.password,
				};

				// Call actions register from store user
				this.$store.dispatch('register', dataRegister);
			}
		},
	},
};
</script>

<style lang="scss" scoped>
.register {
	height: 92.5vh;

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

	&__sifp {
		font-size: 14px;
	}

	#source {
		font-size: 14px;
	}
}
</style>
