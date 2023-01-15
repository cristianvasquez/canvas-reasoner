import {ItemView, WorkspaceLeaf} from 'obsidian';
import {App as VueApp, createApp} from 'vue';
import App from './ui/App.vue';
import {createPinia} from 'pinia'
import {VIEW_NAME} from './consts.js'

export class MainView extends ItemView {
	vueapp: VueApp;
	private appContext: any;

	constructor(leaf: WorkspaceLeaf, appContext: any) {
		super(leaf);
		this.appContext = appContext
	}

	getViewType(): string {
		return VIEW_NAME;
	}

	getDisplayText(): string {
		return "Canvas Reasoner";
	}

	getIcon(): string {
		return "dice";
	}

	async onOpen() {
		const container = this.containerEl.children[1];
		container.empty();
		container.createEl("div", {
			cls: "tree-walker-view"
		});
		const pinia = createPinia()
		this.vueapp = createApp(App);
		this.vueapp.provide('context', this.appContext)
		this.vueapp.use(pinia)
		this.vueapp.mount('.tree-walker-view');
	}

	async onClose() {
		this.vueapp.unmount();
	}

}
