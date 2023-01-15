import { fromTermMapper } from 'vault-triplifier/index.js'
import ns from 'vault-triplifier/src/namespaces.js'
import rdf from 'vault-triplifier/src/rdf-ext.js'
import {
	customMapper,
} from 'vault-triplifier/src/termMapper/defaultCustomMapper.js'
import {
	createTermMapper,
} from 'vault-triplifier/src/termMapper/defaultTermMapper.js'

const baseNamespace = rdf.namespace('http://example.org/')

const triplifierOptions = {
	splitOnTag: true,
	splitOnHeader: true,
	splitOnId: true,
	addLabels: true,
	includeWikipaths: true,
}

async function createVaultFromObsidian (app) {
	return {
		getPathByName: (
			noteMD, activePath) => {
			return app.metadataCache.getFirstLinkpathDest(noteMD,
				activePath)
		},
	}
}

async function createTriplifier (app) {
	const { getPathByName } = await createVaultFromObsidian(app)
	const termMapper = createTermMapper({
		getPathByName, customMapper, baseNamespace,
	})

	return fromTermMapper(termMapper)
}

export { ns, rdf, baseNamespace, createTriplifier, triplifierOptions }
