<p align="center">
  <a href="https://github.com/BlakePro">
    <img src="xml-query-find-2.png" alt="Xml query find dot notation" width="400" height="200">
  </a>
</p>

Find content in Xml by dot notation and return values or array

## 👉🏻 Features
  * Easy parsing by dot
  * Find in arrays
  * Typed results
  * Include functions


## 👉🏻 Installation
This is a [Node.js](https://nodejs.org/en/) module available through the
[npm registry](https://www.npmjs.com/).

##### Npm
```bash
npm i @blakepro/xml-query-find
```

##### Yarn
```bash
yarn add @blakepro/xml-query-find
```

## 💥 Typed and functions
|Type|Function|Parameter|Parameter|
|-|-|-|-|
|number||||
|string||||
|string|upper|||
|string|lower||
|string|capitalize||
|string|replace|find|replace|
|string|substring|start|end|
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

## 👉🏻 Usage
```js
const { _json, _query } = require('@blakepro/xml-query-find');
```

## 👨🏻‍💻 👩🏼‍💻 Example
```js
const { _json, _query } = require('@blakepro/xml-query-find');

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

let remove = ['my-']

let extract = {
  to: {
    query: ['note.to._attr'],
    type: 'string'
  },
  to_upper: {
    query: ['note.to._attr'],
    type: 'string',
    function: 'upper'
  },
  to_lower: {
    query: ['note.to._attr'],
    type: 'string',
    function: 'lower'
  },
  to_replace: {
    query: ['note.to._attr'],
    type: 'string',
    function: 'replace',
    find: 't',
    replace: '@'
  },
  to_substring: {
    query: ['note.to._attr'],
    type: 'string',
    function: 'substring',
    start: 0,
    end: 1
  },
  to_substring_upper: {
    query: ['note.to._attr'],
    type: 'string',
    function: 'substring_upper',
    start: 0,
    end: 1
  },
  to_capitalize: {
    query: ['note.to._attr'],
    type: 'string',
    function: 'capitalize'
  },
  numbers: {
    query: ['note.numbers.number._find._attr'],
    type: 'array'
  },
  numbers_to_number: {
    query: ['note.numbers.number._find._attr'],
    type: 'array',
    function: 'number'
  },
  numbers_count: {
    query: ['note.numbers.number._find._attr'],
    type: 'array',
    function: 'count'
  },
  numbers_sum: {
    query: ['note.numbers.number._find._attr'],
    type: 'array',
    function: 'sum'
  },
  numbers_average: {
    query: ['note.numbers.number._find._attr'],
    type: 'array',
    function: 'average'
  },
  type: {
    query: ['note.contacts.contact._find._attr.type'],
    type: 'array',
  },
  names: {
    query: ['note.contacts.contact._find._attr.name'],
    type: 'array',
  },
  names_upper: {
    query: ['note.contacts.contact._find._attr.name'],
    type: 'array',
    function: 'upper'
  },
  names_capitalized: {
    query: ['note.contacts.contact._find._attr.name'],
    type: 'array',
    function: 'capitalize'
  },
  names_substring: {
    query: ['note.contacts.contact._find._attr.name'],
    type: 'array',
    function: 'substring',
    start: 0,
    end: 3
  },
  names_substring_upper: {
    query: ['note.contacts.contact._find._attr.name'],
    type: 'array',
    function: 'substring_upper',
    start: 0,
    end: 2
  },
  phone: {
    query: ['note.contacts.contact._find._attr.phone'],
    type: 'array',
    function: 'capitalize'
  },
  phone_replace: {
    query: ['note.contacts.contact._find._attr.phone'],
    type: 'array',
    function: 'replace',
    find: '[.:-]',
    replace: ' '
  }
}

let json = _json(xml, remove)
console.log(json)

let data = _query(json, extract)
console.log(data)
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

<p align="center">
  <br/>
  <a href="https://www.buymeacoffee.com/BlakePro">
  <img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" width="280">
  </a>
</p>
