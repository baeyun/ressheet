/*
 * RESS
 *
 * A prop orientated LESS-like StyleSheet for React Components
 */
export default class RESS {
	constructor(RESSheet, props) {
		if (
			typeof RESSheet !== 'string'
			&& RESSheet.constructor !== String
		) throw Error('Provide an appropriate RESSheet')

		if (
			typeof props !== 'object'
			&& props.constructor !== Object
		) throw Error('Provide props to validate styles')
		
		return this._evaluateRESS(
			RESSheet,
			this._qualifyProps(props)
		)
	}

	/*
	 * qualifyProps
	 *
	 * Lists an array of all truthy props
	 * from prop object.
	 *
	 * @params rawPropsObj [object]
	 * @return [array] truthy props
	 */
	_qualifyProps(rawPropsObj) {
		let qualifiedProps = []

		for (let prop in rawPropsObj)
			if (rawPropsObj[prop])
				qualifiedProps.push(prop)

		return qualifiedProps
	}

	/*
	 * arrayInArray
	 *
	 * @params arr1 [array], arr2 [array]
	 * @return true [bool] upon first match
	 */
	_arrayInArray(arr1, arr2) {
		if (
			typeof arr1 !== 'array' && arr1.constructor !== Array
			|| typeof arr2 !== 'array' && arr2.constructor !== Array
		) throw Error('Please provide arrays as args')
		
		for (let i = 0; i < arr1.length; i++)
			if (arr2.includes(arr1[i]))
				return true

		return false
	}

	/*
	 * evaluateRESS
	 *
	 * @params RESSheet [string], qualifiedProps [array]
	 * @return [object] of style properties
	 */
	_evaluateRESS(RESSheet, qualifiedProps) {
		let codeblocks = RESSheet.split(/\}/g),
			styles = {}

		for (let i = 0; i < codeblocks.length; i++) {
			let codeblock = codeblocks[i],
				selector = codeblock.match(/(.+)\{/)

			if (selector) {
				let selectorProps = selector[1].split(/,\s*/).map(s => s.trim())

				if ( // Bail if not qualified
					!this._arrayInArray(selectorProps, qualifiedProps)
				) continue

				codeblock
				.replace(selector[0], '')
				.trim()
				.split(/\n/)
				.forEach(style => {
					let styleProp = style.match(/\w+/)[0],
						styleVal = style.match(/\w+:(.+)/)[1].trim()
					
					styles[styleProp] = !isNaN(styleVal)
										? Number(styleVal)
										: styleVal
				})
			}
		}

		return styles
	}
}