<template>
	<menu>
		<router-link v-if="$route.path !== '/'" to="/">Home</router-link>
		<router-link :to="'/add/'">Toevoegen</router-link>
		<router-link v-if="hasCamera" :to="'/scan/'">Scan (Toevoegen)</router-link>
	</menu>
</template>
<script>
import { deviceHasCamera } from "./../book-scanner";
export default {
	data() {
		return {
			hasCamera: undefined,
		};
	},
	beforeCreate() {
		deviceHasCamera().then(
			() => {
				this.hasCamera = true;
			},
			() => {
				this.hasCamera = false;
			}
		);
	},
};
</script>