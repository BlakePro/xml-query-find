const xmljs = require('xml-js');
const _ = require('lodash');
const attributeInitialKey = '_attr';
const attributeInitalSearch = '_find';

/*
  Key node attributes
    ._attr

  Find key to search in node
    .find
*/

const recursiveTags = (flat, arrayTags, array = [], attributeSearch = attributeInitalSearch) => {
  if(arrayTags.length > 0){

    let tag = arrayTags[0]
    arrayTags.shift()

    flat = _.get(flat, tag, arrayTags)
    if(typeof flat !== 'undefined' && typeof arrayTags[1] !== 'undefined'){
      let newTag = arrayTags[1]

      if(typeof arrayTags[0] !== 'undefined' && arrayTags[0] == attributeSearch){
        arrayTags.shift()
        let find = arrayTags[0]
        let res = []
        for(let k in flat){
          let item = flat[k]
          itemFind = findKeyInObject(find, item)
          if(typeof itemFind !== 'undefined')res.push(itemFind)
        }
        array = res
        flat = findKeyInObject(arrayTags[0], flat, array)
        arrayTags.shift()

      }else tag = `${tag}.${newTag}`

      arrayTags.shift()

      return recursiveTags(flat, arrayTags, array)
    }
  }
  return { string: flat, array }
}


const findKeyInObject = (key, object) => {
  if(_.isObject(object)){
    var value
    Object.keys(object).some(k => {
      if(k === key){
        value = object[k]
        return true
      }
      if(object[k] && _.isObject(object[k])){
        value = findKeyInObject(key, object[k])
        return value !== undefined
      }
    })
    return value
  }
  return
}


const transformJsonFlat = (json, attributeKey = attributeInitialKey) => {
  try{
    let flat = _.flatMap(json, item => item)[0]
    let main = {}
    _.flatMap(flat[attributeKey], (key, item) => main[item] = key)
    delete flat[attributeKey]

    let flatMain = {}
    for(let tag in flat){
      let elem = flat[tag]
      if(_.isObject(elem)){
        let flatTag =_.flatMap(elem, item => item)
        if(flatTag.length == 1)flatTag = flatTag[0]
        flatMain[tag] = flatTag
      }
    }
    return {...main, ...flatMain}
  }catch(e){
    console.log('Not a valid JSON')
  }
  return {}
}

const convertXmlToJson = (xml, removeInKey = [], attributeKey = attributeInitialKey) => {
  let json = {}
  if(xml != ''){
    try{
      let argsXml = {
        attributesKey: attributeKey,
        textKey: attributeKey,
        compact: true,
        ignoreComment: true,
        ignoreDeclaration: true,
        trim: true,
        spaces: 2,
        elementNameFn: val => {
          if(_.isArray(removeInKey) && removeInKey.length > 0){
            for(let item of removeInKey)val = val.replaceAll(item, '')
          }
          val = val.toLowerCase()
          return val
        },
        attributeNameFn: val =>  val.replaceAll('.','').toLowerCase()
      }
      json = xmljs.xml2js(xml, argsXml)
    }catch(e){
      console.log('Not a valid XML');
    }
  }
  return json
}

const formatResult = (str, format) => {
  if(_.isString(str)){
    if(format == 'upper')str = str.toUpperCase()
    else if(format == 'lower')str = str.toLowerCase()
    else if(format == 'capitalize')str = capitalize(str)
  }
  return str
}

const sumArray = array => {
  let sum = 0
  if(_.isArray(array) && array.length > 0){
    for(let number of array){
      number = parseFloat(number)
      if(isNaN(number))number = 0
      sum += number
    }
  }
  return sum
}

const capitalize = string => {
  return string.replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())))
}

const extractJsonDotNotation = (json, extract, attributeKey = attributeInitialKey) => {
  let response = {}
  let data = {}
  if(_.isObject(extract)){
    try{
      let flat = transformJsonFlat(json, attributeKey)
      if(_.isObject(flat)){
        for(let key in extract){
          let itemQuery = extract[key]
          let query = itemQuery?.query

          if(_.isArray(query) && query.length > 0){

            let type = itemQuery?.type
            if(_.isString(type))type = type.toLowerCase()
            else type = ''

            let format = itemQuery?.function
            if(_.isString(format))format = format.toLowerCase()
            else format = ''

            //Replace Options
            let str_find = itemQuery?.find
            if(!_.isString(str_find))str_find = ''
            str_find = new RegExp(str_find, 'g')

            let str_replace = itemQuery?.replace
            if(!_.isString(str_replace))str_replace = ''

            //Substring Options
            let num_start = parseInt(itemQuery?.start)
            if(!_.isNumber(num_start))num_start = 0

            let num_end = parseInt(itemQuery?.end)
            if(!_.isNumber(num_end))num_end = 0

            //Array Tags
            for(let tags of query){
              tags = tags.toLowerCase()

              //Recursive
              let arrayTags = tags.split('.')

              let recursive = recursiveTags(flat, arrayTags)
              let arrayResult = recursive.array
              let stringResult = recursive.string
              let result

              //Type
              if(type != ''){
                let lastSting =  ''
                if(_.isArray(stringResult)){
                  lastSting = _.last(stringResult)
                }

                if(typeof lastSting === 'undefined')lastSting = ''
                if(typeof stringResult === 'undefined')stringResult = ''
                if(typeof stringResult === 'object')stringResult = ''

                let arr = []
                switch(type){

                  case 'string':
                    result = typeof lastSting === 'object' ? lastSting : stringResult

                    if(['capitalize', 'lower', 'upper'].includes(format))result = formatResult(result, format)
                    else if(format == 'replace')result = result.replaceAll(str_find, str_replace)
                    else if(format == 'substring')result = result.substring(num_start, num_end)
                    else if(format == 'substring_lower')result = result.substring(num_start, num_end).toLowerCase()
                    else if(format == 'substring_upper')result = result.substring(num_start, num_end).toUpperCase()
                  break

                  case 'number':
                    let number = parseFloat(stringResult)
                    if(isNaN(number))number = 0
                    result = number
                  break

                  case 'array':
                    if(_.isArray(arrayResult)){
                      if(['number', 'capitalize', 'lower', 'upper', 'replace', 'substring', 'substring_lower', 'substring_upper'].includes(format)){

                        for(let str of arrayResult){
                          if(_.isString(str)){
                            if(format == 'replace')str = str.replaceAll(str_find, str_replace)
                            else if(format == 'number'){
                              str = parseFloat(str)
                              if(isNaN(str))str = 0
                            }
                            else if(format == 'substring')str = str.substring(num_start, num_end)
                            else if(format == 'substring_lower')str = str.substring(num_start, num_end).toLowerCase()
                            else if(format == 'substring_upper')str = str.substring(num_start, num_end).toUpperCase()
                            else str = formatResult(str, format)
                            arr.push(str)
                          }
                        }
                        result = arr

                      }else if(format == 'sum'){
                        result = sumArray(arrayResult)

                      }else if(format == 'count'){
                        result = arrayResult.length

                      }else if(format == 'average'){
                        let sum = sumArray(arrayResult)
                        let len = arrayResult.length
                        result = sum / len

                      }else{
                        for(let str of arrayResult){
                          if(_.isString(str)){
                            str = formatResult(str, format)
                            arr.push(str)
                          }
                        }
                        result = arr
                      }
                    }
                  break

                  default:
                    if(typeof recursive[type] !== 'undefined')result = recursive[type]
                    else result = stringResult
                }

              }else{
                let lenArrayResult = arrayResult.length
                if(lenArrayResult == 1 && arrayResult[0] == stringResult)result = stringResult
                else if(lenArrayResult > 0 )result = arrayResult
                else result = stringResult
              }
              data[key] = result

              //Stop for if there is a result
              let typeResult = typeof result
              {}
              if(typeResult == 'number' && result > 0)break
              else if(typeResult == 'string' && result != '')break
              else if(typeResult == 'object' && result.length > 0)break

            }
          }
        }
      }

      for(let key in extract){
        response[key] = typeof data[key] === 'undefined' ? '' : data[key]
      }

    }catch(e){
      console.log(e)
    }
  }
  return response
}

const extractXmlDotNotation = (xml, extract, removeInKey = [], attributeKey = attributeInitialKey) => {
  let json = convertXmlToJson(xml, removeInKey, attributeKey)
  return extractJsonDotNotation(json, extract, attributeKey)
}

module.exports = {
  convertXmlToJson: convertXmlToJson,
  transformJsonFlat: transformJsonFlat,
  extractJsonDotNotation: extractJsonDotNotation,
  extractXmlDotNotation: extractXmlDotNotation
};
