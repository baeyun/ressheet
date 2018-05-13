/*
 * RESSheet
 *
 * A prop-based LESS-like StyleSheet for React Components
 */
export default class RESSheet {
  constructor(props, RESSheet) {
    if (
      typeof props !== 'object'
      && props.constructor !== Object
    ) throw Error('Provide props to validate styles')

    if (
      typeof RESSheet !== 'object'
      && RESSheet.constructor !== Object
    ) throw Error('Provide an appropriate RESSheet')

    this.styleObj = {}
    
    return this._evaluateRESS(
      this._qualifyProps(props),
      RESSheet
    )
  }

  /*
   * qualifyProps
   *
   * Lists an array of all truthy props
   * from prop object.
   *
   * @params rawPropsObj {object}
   * @return {array} truthy props
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
   * @params arr1 {array}, arr2 {array}
   * @return true {bool} upon first match
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
   * @params qualifiedProps {object}, RESSheet {object}, selector {string} optional
   * @return {object} of style properties
   */
  _evaluateRESS(qualifiedProps, RESSheet, selector=null) {
    if (selector)
      if (this._arrayInArray(qualifiedProps, selector.split(/\s*\,\s*/)))
        for (let k in RESSheet) {
          let styleVal = RESSheet[k]
          
          if (
            typeof styleVal === 'object'
            && styleVal.constructor === Object
            || styleVal === null // cater for null value in React Native
          )
            // Recursion of this._evaluateRESS() if property is object
            this._evaluateRESS(
              qualifiedProps,
              styleVal,
              k
            )
          else
            this.styleObj[k] = styleVal
        }
      else
        return null
    else
      for (let selector in RESSheet) {
        if (
          this._arrayInArray(qualifiedProps, selector.split(/\s*\,\s*/))
          || selector.includes('default')
        ) for (let k in RESSheet[selector]) {
          let styleVal = RESSheet[selector][k]
          
          if (
            typeof styleVal !== 'object'
            && styleVal.constructor !== Object
            || styleVal === null // cater for null value in React Native
          )
            this.styleObj[k] = styleVal
          else // Handle nested styles
            this._evaluateRESS(
              qualifiedProps,
              RESSheet[selector][k],
              k
            )
        }
      }

    return this.styleObj
  }
}