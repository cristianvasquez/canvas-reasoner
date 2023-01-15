<script setup lang="tsx">
import {computed, onMounted, ref} from "vue";
import {inject} from '@vue/runtime-core'
import {getActiveFileContent} from 'obsidian-community-lib'
import Reason from "./common/Reason.vue";
import {createTriplifier, triplifierOptions} from './config.js'

const context = inject('context')

const pointer = ref()
let ver = ref(1)

const turtle = ref()
const debugLink = computed(() => {
	return `https://converter.zazuko.com/#value=${encodeURIComponent(turtle.value)}&format=application%2Ftrig`
})

onMounted(async () => {
	const toRdf = await createTriplifier(app)

	const activeFile = this.app.workspace.getActiveFile();
	if (activeFile) {
		await triplifyCurrent(toRdf, activeFile)
	}

	context.events.on('update', async (file) => {
		await triplifyCurrent(toRdf, file)
	})

	context.events.on('index', async (file) => {
		await triplifyCurrent(toRdf, file)
	})
})


async function triplifyCurrent(toRdf, file) {

	const text = await getActiveFileContent(false)
	pointer.value = toRdf(text, {path: file.path}, triplifierOptions)
	turtle.value = pointer.value.dataset.toString()
	ver.value = ver.value + 1

}

</script>

<template>
	<h2><a :href="debugLink">Debug</a></h2>

	<template v-if="pointer">
		<Reason :key="ver" :pointer="pointer"/>
	</template>

</template>

<style scoped>
h2 {
	color: lightcoral;
}
</style>
