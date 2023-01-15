<script setup lang="tsx">
import {computed, onMounted, ref} from "vue";
import {inject} from '@vue/runtime-core'
import Reason from "./common/Reason.vue";
import {createTriplifier, triplifierOptions} from './config.js'
import {ItemView} from 'obsidian';

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

	const canvasView = this.app.workspace.getActiveViewOfType(ItemView);
	if (canvasView?.getViewType() === "canvas") {
		const canvas = canvasView.canvas;

		const text = JSON.stringify(canvas.data)
		pointer.value = toRdf(text, {path: file.path}, triplifierOptions)
		turtle.value = pointer.value.dataset.toString()
		ver.value = ver.value + 1

	} else {
		let text = await this.app.vault.read(file);
		pointer.value = toRdf(text, {path: file.path}, triplifierOptions)
		turtle.value = pointer.value.dataset.toString()
		ver.value = ver.value + 1
	}

}

const rules = ref(`
@prefix dot: <http://dottriples.org/>.
@prefix ex: <http://example.org/>.

{ ex:eats-meat dot:contains ?somebody.}
=> { ?somebody a ex:carnivore. }.

{ ex:eats-vegetables dot:contains ?somebody. }
=> { ?somebody a ex:herbivore. }.

{ ?somebody a ex:herbivore.
  ?somebody a ex:carnivore. }
=> { ?somebody a ex:omnivore. }.
`)


</script>

<template>
	<h2><a :href="debugLink">Triples</a></h2>

	<template v-if="pointer">
		<Reason :key="ver" :pointer="pointer" :rules="rules"/>
	</template>
</template>

<style scoped>
h2 {
	color: lightcoral;
}
</style>
