<template>
	<div>
		<div v-if="hasCamera === true">
			<StreamBarcodeReader @decode="onDecode" @loaded="onLoaded"></StreamBarcodeReader>
		</div>
		<div v-else-if="hasCamera === false">
			<p>Your device has no camera</p>
		</div>
		<div v-else>
			<p>Searching for camera</p>
		</div>

	</div>

</template>

<script>
import { StreamBarcodeReader } from "vue-barcode-reader";

import { fetchBook, deviceHasCamera } from "./../book-scanner";
export default {
	components: {
		StreamBarcodeReader,
	},
	data() {
		return {
			hasCamera: null,
			scannerLoaded: null,
		};
	},
	methods: {
		onLoaded() {
			console.log("loaded");
			this.scannerLoaded = true;
		},
		onDecode(barCode) {
			this.$router.push({ path: `/add/${barCode}` });
		},
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