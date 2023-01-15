<script setup lang='ts'>

import {defineProps, onMounted, ref} from 'vue'
import {reason} from '../reason.js'
import {NInput} from 'naive-ui';



const query = `
@prefix ex: <http://example.org/>.
{?s a ?o} => {?s a ?o}.
{?s ex:likes ?o} => {?s ex:likes ?o}.
`

const props = defineProps({
	pointer: {
		required: true,
		type: Object,
	},
	rules: {
		required:true,
		type: String
	}
})

onMounted(async () => {
	const {dataset, terms} = props.pointer
	result.value = await reason(dataset.toString(), props.rules, query)
})

const result = ref()

</script>

<template>

	<n-input
		v-model:value="result"
		type="textarea"
		:autosize="{
        minRows: 3,
      }"
	/>
	<n-input
		v-bind:value="rules"
		type="textarea"
		:autosize="{
        minRows: 3,
      }"
	/>
</template>

<style>

.term {
	word-break: break-word;
}


</style>
