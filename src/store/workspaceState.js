import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useWorkspaceState = defineStore('workspace-store', () => {
	const currentTurtle = ref('')
	// watch(currentMarkdown, () => triplifyContents())
	return {
		currentTurtle,
	}
})

