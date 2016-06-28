import test from 'ava'
import cp from 'child_process'

testi.cb('coinr-cli does something awesome', t => {
  t.plan(1)

  cp.execFile('./index.js', (err, stdout, stderr) => {
    t.true(stdout.includes('coinr'))
    t.end()
  })
})
