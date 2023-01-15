<script setup lang='ts'>

import {defineProps, onMounted, ref, toRaw} from 'vue'
import {reason} from '../reason.js'
import {NInput, NSwitch} from 'naive-ui';

const query = `
	{?s ?p ?o} => {?s ?p ?o}.
`

const props = defineProps({
	data: {
		required: true,
		type: Array
	}
})

onMounted(async () => {
	result.value = await reason(toRaw(props.data), query)
})

const result = ref()
const showData = ref(false)

</script>

<template>
	<n-switch v-model:value="showData" />
	<template v-if="showData">
		<template v-for="current of data">
			<n-input
				v-bind:value="current"
				type="textarea"
				:autosize="{
        minRows: 2,
      }"
			/>
		</template>
	</template>

	<n-input
		v-bind:value="result"
		type="textarea"
		:autosize="{
        minRows: 2,
      }"
	/>

</template>

<style>

.term {
	word-break: break-word;
}


</style>
