<p align="center">
  <a href="https://github.com/BlakePro/WhatsAppApiNodeJS">
    <img src="xml-query-find.png" alt="Xml query find by dot notation" width="400" height="200">
  </a>
</p>

Find easily nodes in xml by dot notation and return with function powers

## 👉🏻 Features
  * Easy parsing by dot
  * Find in arrays
  * Typed for results
  * Power with functions


## 👉🏻 Installation
This is a [Node.js](https://nodejs.org/en/) module available through the
[npm registry](https://www.npmjs.com/).

##### Npm
```bash
npm install xml-query-find
```

##### Yarn
```bash
yarn add xml-query-find
```

## 👉🏻 Usage
```js
const { convertXmlToJson, extractJsonDotNotation, extractXmlDotNotation } = require('@blakepro/xml-query-find');
```


## 💥 Typed and functions
|Type|Function|Parameter|Parameter|
|-|-|-|-|
|number||||
|||||
|string||||
|string|upper|||
|string|lower||
|string|capitalize||
|string|replace|find|replace|
|string|substring|start|end|
|||||
|array||||
|array|number|||
|array|count|||
|array|sum|||
|array|average|||
|array|upper|||
|array|lower||
|array|capitalize||
|array|replace|find|replace|
|array|substring|start|end|
|array|substring_upper|start|end|
|array|substring_lower|start|end|


## 👨🏻‍💻 👩🏼‍💻 Example
```js
const { extractXmlDotNotation } = require('@blakepro/xml-query-find');

let xml = `<note>
  <to>Love tech</to>
  <from>Cristian</from>
  <heading>XML Query Find</heading>
  <body>Always use superpowers!</body>
  <numbers>
    <number>1</number>
    <number>5</number>
    <number>7</number>
  </numbers>
  <my-contacts>
    <contact type="friend" name="blake Pro" phone="123-567-890"></contact>
    <contact type="boss" name="mrs vane" phone="27.57.96.4"></contact>
    <contact type="mom" name="Sandy" phone="55:101:797:26"></contact>
  </my-contacts>
</note>`

let removeInKey = ['my-']

let extractList = {
  to: {
    query: ['to'],
    type: 'string'
  },
  to_upper: {
    query: ['to'],
    type: 'string',
    function: 'upper'
  },
  to_lower: {
    query: ['to'],
    type: 'string',
    function: 'lower'
  },
  to_upper: {
    query: ['to'],
    type: 'string',
    function: 'upper'
  },
  to_replace: {
    query: ['to'],
    type: 'string',
    function: 'replace',
    find: 't',
    replace: '@'
  },
  to_substring: {
    query: ['to'],
    type: 'string',
    function: 'substring',
    start: 0,
    end: 1
  },
  to_substring_upper: {
    query: ['to'],
    type: 'string',
    function: 'substring_upper',
    start: 0,
    end: 1
  },
  to_capitalize: {
    query: ['to'],
    type: 'string',
    function: 'capitalize'
  },
  numbers: {
    query: ['numbers._find._attr'],
    type: 'array'
  },
  numbers_to_number: {
    query: ['numbers._find._attr'],
    type: 'array',
    function: 'number'
  },
  numbers_count: {
    query: ['numbers._find._attr'],
    type: 'array',
    function: 'count'
  },
  numbers_sum: {
    query: ['numbers._find._attr'],
    type: 'array',
    function: 'sum'
  },
  numbers_average: {
    query: ['numbers._find._attr'],
    type: 'array',
    function: 'average'
  },
  type: {
    query: ['contacts._find.type'],
    type: 'array',
  },
  names: {
    query: ['contacts._find.name'],
    type: 'array',
  },
  names_upper: {
    query: ['contacts._find.name'],
    type: 'array',
    function: 'upper'
  },
  names_capitalized: {
    query: ['contacts._find.name'],
    type: 'array',
    function: 'capitalize'
  },
  names_substring: {
    query: ['contacts._find.name'],
    type: 'array',
    function: 'substring',
    start: 0,
    end: 3
  },
  names_substring_upper: {
    query: ['contacts._find.name'],
    type: 'array',
    function: 'substring_upper',
    start: 0,
    end: 2
  },
  phone: {
    query: ['contacts._find.phone'],
    type: 'array',
    function: 'capitalize'
  },
  phone_replace: {
    query: ['contacts._find.phone'],
    type: 'array',
    function: 'replace',
    find: '[.:-]',
    replace: ' '
  }
}

let extracted = extractXmlDotNotation(xml, extractList, removeInKey)

console.log(extracted)
```

## 😎 Results
```js
{
  to: 'Love tech',
  to_upper: 'LOVE TECH',
  to_lower: 'love tech',
  to_replace: 'Love @ech',
  to_substring: 'L',
  to_substring_upper: 'L',
  to_capitalize: 'Love Tech',
  numbers: [ '1', '5', '7' ],
  numbers_to_number: [ 1, 5, 7 ],
  numbers_count: 3,
  numbers_sum: 13,
  numbers_average: 4.333333333333333,
  type: [ 'friend', 'boss', 'mom' ],
  names: [ 'blake Pro', 'mrs vane', 'Sandy' ],
  names_upper: [ 'BLAKE PRO', 'MRS VANE', 'SANDY' ],
  names_capitalized: [ 'Blake Pro', 'Mrs Vane', 'Sandy' ],
  names_substring: [ 'bla', 'mrs', 'San' ],
  names_substring_upper: [ 'BL', 'MR', 'SA' ],
  phone: [ '123-567-890', '27.57.96.4', '55:101:797:26' ],
  phone_replace: [ '123 567 890', '27 57 96 4', '55 101 797 26' ]
}
```
