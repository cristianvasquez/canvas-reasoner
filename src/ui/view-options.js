import { ns, rdf } from './config.js'

const ignoreProperties = rdf.termSet(
	[ns.schema.name, ns.rdfs.label, ns.dot.wikipath, ns.dot.external, ns.dot.selector])

const externalLabels = rdf.clownface({ dataset: rdf.dataset() })

// externalLabels.node(ns.dot.related).addOut(ns.schema.name, rdf.literal('R'))
// externalLabels.node(ns.dot.contains).addOut(ns.schema.name, rdf.literal('C'))
// externalLabels.node(ns.schema.name).
// 	addOut(ns.schema.name, rdf.literal('schema:name'))

const imagePostfix = ['.png', '.jpg', '.jpeg']

const defaultOptions = {
	sortRows: false,
	technicalCues: true,
	highlightLanguage: true,
	embedLists: true,
	embedNamedNodes: true,
	embedBlankNodes: true,
	maxLevel: 10,
	groupValuesByProperty: true,
	groupPropertiesByValue: true,
	externalLabels,
	ignoreProperties,
	renderAs: (cf, options, context) => {
		// Adds 'Image' tag to the specified properties
		// if (context.incomingProperty) {
		// 	for (const imageProperty of [ns.ex.img, ns.schema.image]) {
		// 		if (imageProperty.equals(context.incomingProperty)) {
		// 			return 'Image'
		// 		}
		// 	}
		// }

		for (const image of imagePostfix) {
			if (cf.term.value.endsWith(image)) {
				return 'Image'
			}
		}

		return undefined
	},

}
export { defaultOptions }
