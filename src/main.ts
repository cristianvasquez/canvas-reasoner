import {Plugin, TFile} from "obsidian";
import {EventEmitter} from "./lib/EventEmitter.js";
import {MainView} from './view'
import {PLUGIN_NAME, VIEW_NAME} from "./consts";

interface Settings {
	mySetting: string;
}

const DEFAULT_SETTINGS: Settings = {
	mySetting: 'default'
}

export default class TreeWalker extends Plugin {
	settings: Settings;

	async onload() {
		await this.loadSettings();

		/**
		 * Event logic
		 */
		const events = new EventEmitter()
		const saveCommandDefinition = (this.app as any).commands?.commands?.['editor:save-file'];
		const save = saveCommandDefinition?.callback;
		if (typeof save === 'function') {
			saveCommandDefinition.callback = async () => {
				const file = this.app.workspace.getActiveFile();
				events.emit('index', file)
			};
		}
		// @ts-ignore
		let plugin = app.plugins.plugins[PLUGIN_NAME]

		plugin.registerEvent(
			this.app.metadataCache.on('changed', file => {
				console.log('file changed')
				events.emit('update', file)
			})
		)
		plugin.registerEvent(
			this.app.vault.on('rename', async (file, oldPath) => {
				if (!(file instanceof TFile)) return
				console.log('renaming')
				events.emit('update', file)
			})
		)
		plugin.registerEvent(
			this.app.vault.on('delete', async af => {
				if (!(af instanceof TFile)) return
				console.log('deleting')
				// await deleteIndex(af.path)
				events.emit('update', undefined)
			})
		)
		plugin.registerEvent(
			this.app.workspace.on('file-open', (file) => {
				events.emit('update', file)
			})
		)

		const appContext = {
			app: this.app,
			events: events,
			plugin: plugin
		}

		this.registerView(VIEW_NAME, (leaf) => new MainView(leaf, appContext))

		await this.activateView()
	}

	onunload() {
		this.app.workspace.detachLeavesOfType(VIEW_NAME)
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}

	async activateView() {
		if (this.app.workspace.getLeavesOfType(VIEW_NAME).length === 0) {
			await this.app.workspace.getRightLeaf(false).setViewState({
				type: VIEW_NAME, active: true,
			})
		}
		this.app.workspace.revealLeaf(this.app.workspace.getLeavesOfType(VIEW_NAME)[0])
	}
}


