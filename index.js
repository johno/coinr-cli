#!/usr/bin/env node

const meow = require('meow')
const shtml = require('shtml')
const coinr = require('coinr')
const isPresent = require('is-present')
const toPercentage = require('to-percentage')

const cli = meow(shtml`
  <div>
    <underline>Usage</underline>

    $ coinr [currency]<br><br>

    <underline>Options</underline>

    -h, --help - Get help menu
    -l, --limit - Limit list of currencies
    -v, --version - Get the version<br><br>

    <underline>Examples</underline>

    $ coinr
    $ coinr -l 20
    $ coinr bitcoin
    $ coinr ethereum
  </div>
`, {
  alias: {
    v: 'version',
    h: 'help',
    l: 'limit'
  }
})

coinr(cli.input[0])
  .then(d => {
    console.log('')
    if (isPresent(cli.input[0])) {
      console.log(renderCurrency(d))
    } else {
      if (cli.flags.limit) {
        d = d.slice(0, cli.flags.limit)
      }

      console.log(shtml`
        ${d.map(renderCurrency).join(shtml`<p>---------</p>`)}
      `)
    }
  })

const renderCurrency = currency => {
  const {
    name, symbol, price_usd, percent_change_1h, percent_change_24h, percent_change_7d
  } = currency
  
  return shtml`
<div>
  <gray><underline>${name}</underline>(${symbol})</gray><br>
  \$${price_usd.toString()}
  Changes: ${redOrGreen(percent_change_1h)}1h ${redOrGreen(percent_change_24h)}24h ${redOrGreen(percent_change_7d)}7d
</div>
  `
}

const redOrGreen = val => (
  val < 0 ?
    shtml`<red>${toPercentage(val/100)}</red>` :
    shtml`<green>${toPercentage(val/100)}</green>`
  )
