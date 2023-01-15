<script setup lang='ts'>

import {defineProps, onMounted, ref} from 'vue'

const props = defineProps({
	pointer: {
		required: true,
		type: Object,
	},
})

onMounted(() => {
	const {dataset, terms} = props.pointer
	model.value = dataset.toString()
})

const model = ref()

</script>

<template>
	{{ model }}
</template>

<style>

.term {
	word-break: break-word;
}

div .bringDown {
	color: #4f4f4f;
}

.vocab {
	color: #4f4f4f;
	font-size: 0.7rem;
}

.vocab::after {
	content: ':';
}

.language {
	color: #4f4f4f;
	font-size: 0.7rem;
	margin-left: 4px;
}

.datatype {
	color: #4f4f4f;
	font-size: 0.5rem;
	margin-left: 4px;
}

.BlankNode a {
	color: #4f4f4f;
	overflow: hidden;
	display: -webkit-box;
	-webkit-line-clamp: 1;
	-webkit-box-orient: vertical;
}

.img-container {
	margin-left: auto;
	margin-right: auto;
}

.img-container img {
	max-width: 100%;
}

</style>
