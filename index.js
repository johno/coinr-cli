#!/usr/bin/env node

const meow = require('meow')
const shtml = require('shtml')
const coinr = require('coinr')
const isPresent = require('is-present')

const cli = meow(shtml`
  <div>
    <bold>coinr</bold>
  </div>
`, {
  alias: {
    v: 'version',
    h: 'help'
  }
})

coinr(cli.input[0])
  .then(d => {
    if (isPresent(cli.input[0])) {
      console.log(renderCurrency(d))
    } else {
      console.log(shtml`
        ${d.map(renderCurrency)}
      `)
    }
  })

const renderCurrency = currency => {
  console.log(currency)
  
  return shtml`
    <div>
      <underline>${currency.name}</underline>
      <bold>${currency}</bold>
    </div>
  `
}
