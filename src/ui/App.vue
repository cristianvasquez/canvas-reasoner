<script setup lang="tsx">
import {computed, onMounted, ref} from "vue";
import {inject} from '@vue/runtime-core'
import Reason from "./common/Reason.vue";
import {createTriplifier, triplifierOptions} from './config.js'
import {ItemView} from 'obsidian';

const context = inject('context')
let ver = ref(1)
const turtle = ref()
const debugLink = computed(() => {
	return `https://converter.zazuko.com/#value=${encodeURIComponent(turtle.value)}&format=application%2Ftrig`
})
const data = ref([])
const rules = ref('')

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

	const canvasView = this.app.workspace.getActiveViewOfType(ItemView);

	if (canvasView?.getViewType() === "canvas") {
		const canvas = canvasView.canvas;

		const rules = canvas.data.nodes
			.filter(x => x.type === 'text' && x.text.startsWith('@prefix'))
			.map(x => x.text)
		const text = JSON.stringify(canvas.data)
		const pointer = toRdf(text, {path: file.path}, triplifierOptions)
		turtle.value = pointer.dataset.toString()
		data.value = [turtle.value, ...rules]
		ver.value = ver.value + 1
	}

}

</script>

<template>
	<h2><a :href="debugLink">Triples</a></h2>
	<template v-if="data">
		<Reason :key="ver" :data="data"/>
	</template>
</template>

<style scoped>
h2 {
	color: lightcoral;
}
</style>
